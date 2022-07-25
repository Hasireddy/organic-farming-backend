import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import "../components/SingleProduct.css";

const SingleProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [farmerId, setFarmerId] = useState('');
    const [farmerOtherProds, setFarmerOtherProds] = useState(null);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_SERVERURL + `details/${id}`)
            // .then(response => console.log(response))
            .then((response) => {
                setProduct(response.data);
                setFarmerId(response.data.farmer._id);

            })
    }, [id]);

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_SERVERURL + `details/getAllProductsByFarmerId/${farmerId}`)
            // .then(response => console.log(response))cd 
            .then((response) => {
                setFarmerOtherProds(response.data.farmerProducts);
            })
    }, [farmerId]);

    // console.log("farmerOtherProds");

    // console.log(farmerOtherProds);

    return (
        <>
            {
                product ? (
                    <div className="farmer-contact-container" >
                        <div className="card-deck" id="cardDeck">
                            <div className="card" id="cardCtn" >
                                <div className="card-header bg-success text-white" id="headerCtn">FARM: {product.farmer.farmName}

                                    {/* <div class="card-footer">
                <button href="/" id="farmerCtn" class="text-white">Check Location</button>
              </div> */}
                                </div>

                                <div id="card-body">
                                    <div>
                                        <div className="farm-address font-weight-bold " value="address">{product.farmer.firstname + ' ' + product.farmer.lastname}</div><br></br>
                                        <div className="farm-address font-weight-bold " value="address">{product.farmer.address}</div><br></br>
                                        <div className="farm-postcode font-weight-bold" value="postcode">{product.farmer.postcode}</div><br></br>
                                    </div>

                                    <div>
                                        <div className="farm-email text-primary" value="email" id="selectedProduct">E-mail:{product.farmer.email}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="card" id="cardCtn" >
                                <div className="card-header text-white" id="headerCtn">PRODUCT</div><br></br>
                                <div className="card-body">

                                    <div id="mainImage">
                                        <div className="farm-email text-primary" value="email"><img src={product.Image.publicUrl} alt="product" /></div>
                                    </div>

                                    <div id="description">
                                        <div className="farm-address font-weight-bold" value="pname" id="prodId"><h3>Product:</h3>  {product.ProductName}</div><br></br>
                                        <div className="farm-address font-weight-bold" value="pname"><h3>Category </h3> {product.Category}</div><br></br>
                                        <div className="farm-address font-weight-bold" value="pdescription"><h3>Description :</h3>  {product.Description}</div><br></br>
                                    </div>


                                </div>

                                {/* <div class="card-footer">
                <button href="/" id="farmerCtn" class="text-white">Check Location</button>
              </div> */}
                            </div>


                        </div>

                    </div >) : (<div><h1>No Farms found</h1></div>)}


            <div id="product1">
                <div className="title"><h1>Our Products</h1></div>
                <div className="row row-1 row-cols-md-3 g-4">

                    {farmerOtherProds ? (
                        farmerOtherProds.map((item) => (


                            <div className="col-12 col-md-3 col-lg-3" key={item._id}>

                                <div
                                    id="rowProductCatalog"
                                    style={{
                                        backgroundImage: `url(${process.env.REACT_APP_SERVERURL} +${item.Image.path}`,
                                    }}
                                >
                                    <img
                                        src={item.Image.publicUrl}
                                        alt="salad leaf"
                                        style={{ width: "100%", height: "100%" }}
                                    />
                                </div>
                                <div
                                    className="col col-10"
                                    id="product-catalog"
                                >
                                    <h3 className="card-title-catalog">Product Name: {item.ProductName}</h3>
                                    <h3 className="card-title-catalog">Category: {item.Category}</h3>

                                    <p className="card-text-catalog">Description: {item.Description} euros</p>

                                    <p className="card-text-catalog">Price: {item.Price} euros</p>

                                </div>

                            </div>

                        ))
                    ) : (
                        <div>
                            <h1>Sorry No Products added Yet</h1>
                        </div>
                    )}
                </div>
            </div>
        </>

    )

};

export default SingleProduct;
