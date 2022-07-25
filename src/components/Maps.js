
import React, { useRef, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import img1 from "../assets/mapbox-marker-icon-20px-blue.png";
// import img1 from '../assets/logo.png';

mapboxgl.accessToken = process.env.REACT_APP_TOKEN;

const MyMap = () => {
    console.log(mapboxgl.accessToken);
    const mapContainer = useRef(null);
    const mapbox = useRef(null);
    const [lng, setLng] = useState(11.3861);
    const [lat, setLat] = useState(50.5527);
    const [zoom, setZoom] = useState(4.5);

    useEffect(() => {

        if (mapbox.current) return; // initialize map only once
        mapbox.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        getFarmers();

    });

    // Initialize map when component mounts
    useEffect(() => {
        if (!mapbox.current) return; // wait for map to initialize
        mapbox.current.on("move", () => {
            setLng(mapbox.current.getCenter().lng.toFixed(4));
            setLat(mapbox.current.getCenter().lat.toFixed(4));
            setZoom(mapbox.current.getZoom().toFixed(2));
        });
    });

    async function getFarmers() {
        try {

            const res = await fetch(process.env.REACT_APP_SERVERURL + "maps");
            const data = await res.json();
            // console.log(data);
            let locations = {};
            if (data.length > 0) {
                locations = data.map((item) => {
                    return {
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [
                                item.location.coordinates[0],
                                item.location.coordinates[1],
                            ],
                        },
                        properties: {
                            farmName: item.farmName,//label for displaying
                            farmerName: item.firstname + " " + item.lastname,//Label for displaying.
                            searchItems: item.searchitem + " " + item.postcode,
                            address: item.address,
                            postcode: item.postcode,
                        },

                    };
                });
            } else {
                locations = `type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [${lng},${lat}]
                    },
                    properties: {
                        famerName: 'No Farms',
                        icon: '',
                        address: ''
                    }`;
            }

            // setTimeout(() => loadMap(locations), 10000);
            loadMap(locations);

        }
        catch (error) {
            console.log("maps.js error2", error);
            // toast.error(error.message, {
            //     position: "bottom-center",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
        }
    }
    function loadMap(locations) {
        try {
            const mapbox = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center: [lng, lat],
                zoom: zoom,
            });


            mapbox.on("load", function () {
                // Add a symbol layer
                mapbox.addLayer({
                    id: "points",
                    type: "circle",
                    source: {
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: locations
                        },
                    },
                    paint: {
                        "circle-color": "hsl(240, 100%, 50%)",
                        "circle-stroke-width": 1,
                        "circle-stroke-color": "white",
                        'circle-radius': {
                            'base': 5,
                            'stops': [
                                [10, 7],
                                [50, 180]
                            ]
                        },
                    }
                });
                renderListings(locations); //To display search box initially without mouse movement
            });
            //Search code starts
            const filterEl = document.getElementById('feature-filter');
            const listingEl = document.getElementById('feature-listing');
            function renderListings(locations) {
                const empty = document.createElement('p');
                // Clear any existing listings
                listingEl.innerHTML = '';
                if (locations.length) {
                    for (const feature of locations) {
                        const itemLink = document.createElement('p');
                        const label = `${feature.properties.farmName} (${feature.properties.address} ${feature.properties.postcode}) `;
                        // itemLink.href = '';//feature.properties.wikipedia;
                        // itemLink.target = ''//'_blank';
                        itemLink.textContent = label;
                        itemLink.style.cursor = "pointer"
                        itemLink.addEventListener('mouseover', () => {
                            // mapbox.getCanvas().style.cursor = 'pointer';
                            // Highlight corresponding feature on the map
                            popup
                                .setLngLat(feature.geometry.coordinates)
                                .setHTML(`<h5>${feature.properties.farmName} \n ${feature.properties.address} ${feature.properties.postcode}<h5/>`)
                                //.setText(label)
                                .addTo(mapbox);
                        });
                        itemLink.addEventListener('mouseleave', () => {
                            popup.remove();
                        });
                        listingEl.appendChild(itemLink);
                    }

                    // Show the filter input
                    filterEl.parentNode.style.display = 'block';
                } else if (locations.length === 0 && filterEl.value !== '') {
                    empty.textContent = 'No Farms found';
                    listingEl.appendChild(empty);
                } else {
                    empty.textContent = 'Drag the map to populate results';
                    listingEl.appendChild(empty);

                    // Hide the filter input
                    filterEl.parentNode.style.display = 'none';

                    // remove features filter
                    mapbox.setFilter('points', ['has', 'farmName']);
                }
            }
            const popup = new mapboxgl.Popup({
                closeButton: false
            });
            function normalize(string) {
                return string.trim().toLowerCase();
            }
            function getUniqueFeatures(features, comparatorProperty) {
                const uniqueIds = new Set();
                const uniqueFeatures = [];
                for (const feature of features) {
                    const id = feature.properties[comparatorProperty];
                    if (!uniqueIds.has(id)) {
                        uniqueIds.add(id);
                        uniqueFeatures.push(feature);
                    }
                }
                return uniqueFeatures;
            }
            mapbox.on('movestart', () => {
                // reset features filter as the map starts moving
                mapbox.setFilter('points', ['has', 'farmName']);
            });
            mapbox.on('moveend', () => {
                const tempfeatures = mapbox.queryRenderedFeatures({ layers: ['points'] });
                // console.log(tempfeatures);
                if (tempfeatures) {
                    const uniqueFeatures = getUniqueFeatures(tempfeatures, 'farmName');
                    // Populate features for the listing overlay.
                    // console.log(uniqueFeatures);
                    renderListings(uniqueFeatures);
                    // Clear the input container
                    filterEl.value = '';
                    // Store the current features in sn `airports` variable to
                    // later use for filtering on `keyup`.
                    // locations = uniqueFeatures;
                }
            });
            mapbox.on('mousemove', 'points', (e) => {
                // Change the cursor style as a UI indicator.
                mapbox.getCanvas().style.cursor = 'pointer';

                // Populate the popup and set its coordinates based on the feature.
                const tempfeature = e.features[0];
                popup
                    .setLngLat(tempfeature.geometry.coordinates)
                    .setHTML(`<h5>${tempfeature.properties.farmName} \n ${tempfeature.properties.address} ${tempfeature.properties.postcode}<h5/>`)
                    // .setText(
                    //     `${tempfeature.properties.farmerName} 'here' (${tempfeature.properties.address})`
                    // )
                    .addTo(mapbox);
                // new mapboxgl.Popup()
                //     .setLngLat(coordinates)
                //     .setHTML(`<h5>${address}<h5/>`)
                //     .addTo(mapbox);
            });
            mapbox.on('mouseleave', 'points', () => {
                mapbox.getCanvas().style.cursor = '';
                popup.remove();
            });
            filterEl.addEventListener('keyup', (e) => {
                const value = normalize(e.target.value);
                popup.remove();
                // Filter visible features that match the input value.
                const filtered = [];
                for (const feature of locations) {
                    const searchItems = normalize(feature.properties.searchItems);
                    const address = normalize(feature.properties.address);
                    const farmName = normalize(feature.properties.farmName);


                    if (searchItems.includes(value) || address.includes(value) || farmName.includes(value)) {
                        filtered.push(feature);
                    }
                }

                // Populate the sidebar with filtered results
                renderListings(filtered);

                // Set the filter to populate features into the layer.
                if (filtered.length) {
                    mapbox.setFilter('points', [
                        'match',
                        ['get', 'farmName'],
                        filtered.map((feature) => {
                            return feature.properties.farmName;
                        }),
                        true,
                        false
                    ]);
                }
            });

            // Add navigation control (the +/- zoom buttons)
            mapbox.addControl(new mapboxgl.NavigationControl(), "top-right");



            mapbox.on("click", "points", (e) => {
                // Copy coordinates array.
                const coordinates = e.features[0].geometry.coordinates.slice();
                const address = e.features[0].properties.address;
                const farmName = e.features[0].properties.farmName;
                const postcode = e.features[0].properties.postcode;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(`<h5>${farmName} \n ${address} ${postcode}<h5/>`)
                    .addTo(mapbox);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            mapbox.on("mouseenter", "points", () => {
                mapbox.getCanvas().style.cursor = "pointer";
            });

            // Change it back to a pointer when it leaves.
            mapbox.on("mouseleave", "points", () => {
                mapbox.getCanvas().style.cursor = "";
                popup.remove();
            });
            renderListings([]);
            ////


            // Clean up on unmount
            return () => mapbox.remove();

        }
        catch (error) {
            console.log("maps.js error", error);
            // toast.error(error.message, {
            //     position: "bottom-center",
            //     autoClose: 3000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
        }
    }
    return (
        <div ><h1 className="dispaly-4 text-center">
            <i className="fas fa-map-marked mr-4"></i>FARM/PRODUCT LOCATOR</h1>
            <div style={{ display: "flex", border: "1px solid green", borderRadius: "4px" }}>
                <br />
                <div id="map">
                    {/* <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div> */}

                    <div ref={mapContainer} className="map-container" />

                </div>
                <div className="map-overlay">
                    <fieldset>
                        <input id="feature-filter" type="text" placeholder="Search here" />
                    </fieldset>
                    <div id="feature-listing" className="listing"></div>
                </div>

            </div >

            <br />
        </div>

    );
};

export default MyMap;


