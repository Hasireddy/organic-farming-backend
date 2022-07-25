import React, { useEffect, useState, useMemo } from "react";
import "../components/ProductsCatalog.css";
import axios from "axios";
import { Link } from "react-router-dom";


const Products = () => {
    const [allProducts, setAllProducts] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);


    useEffect(() => {
        axios
            .get(process.env.REACT_APP_SERVERURL + "details")
            // .then(response => console.log(response))
            .then((response) => {
                setAllProducts(response.data);
            });
    }, []);
    // Function to get filtered list
    function getFilteredList() {
        // Avoid filter when selectedCategory is null
        if (!selectedCategory) {
            return allProducts;
        }
        return allProducts.filter((item) => item.Category === selectedCategory);
    }

    // Avoid duplicate function calls with useMemo
    var filteredList = useMemo(getFilteredList, [selectedCategory, allProducts]);

    function handleChange(event) {
        setSelectedCategory(event.target.value);
        // console.log(allProducts);
        // console.log(allProducts.filter((item) => item.Category === event.target.value));
        // //  return setAllProducts(allProducts.filter((item) => item.category === event.target.value));
    }

    // const FarmDetails = async (farmerObject) => {
    //     // console.log("farmerObject");
    //     // console.log(farmerObject);
    //     navigate("/FarmerContact", { state: { farmerObject: farmerObject } });
    // };

    return (
        <>
            <div className="containerProduct">
                <select
                    name="category-list"
                    id="Category"
                    style={{ padding: "7px" }}
                    onChange={handleChange}
                >
                    <option value="">All Products</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="DairyProd">Dairy Products</option>
                </select><br></br>

                <Link to="/Maps">Click here to search for nearby Farms</Link>

                {/* cards row 1  */}
                <div className="row row-1 row-cols-md-3 g-4">
                    {filteredList ? (
                        filteredList.map((item) => (
                            <div className=" col col-5 col-md-3 col-lg-3" key={item._id}>
                                <Link to={`/Products/${item._id}`}>
                                    {/* <div className="card" >
                           <img class="card-img-top" src={process.env.REACT_APP_SERVERURL  + item.Image.path} alt="Card image cap" />

                       </div> */}
                                    <div
                                        id="rowProductCatalog"
                                        style={{
                                            backgroundImage: `url(${process.env.REACT_APP_SERVERURL} +${item.Image.path}`,
                                        }}
                                    >
                                        <img
                                            src={item.Image.publicUrl || process.env.REACT_APP_SERVERURL + item.Image.path}
                                            alt="salad leaf"
                                            style={{ width: "25vh", height: "25vh" }}
                                        />
                                    </div>
                                    <div
                                        className="col col-9 row-cols-md-3 g-4 "
                                        id="product-catalog"
                                    >
                                        <h3 className="card-title-catalog">{item.ProductName}</h3>

                                        <p className="card-text-catalog">Price:{item.Price} euros</p>
                                        {/*  <button onClick={async () => { await FarmDetails(item.farmer) }}>Farm Details</button> */}
                                    </div>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div>
                            <h1>No Prodcuts found</h1>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Products;
