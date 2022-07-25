import React, { useState, useEffect, useRef } from "react";
import image from "../assets/fattoria-banner-1.jpg";
import image1 from "../assets/farmer.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

import { useLocation } from 'react-router-dom';
// const navigate = useNavigate();

const Update = ({ farmertoken, isAuthenticated }) => {
    const location = useLocation();
    const ref = useRef();
    // { location.updatedetails.id }
    // console.log("Product ID:")
    // console.log("Product ID:" + location.state.id)
    const [ProductId, setProductId] = useState(null);
    setProductId(location.state.id);

    // const [ProductName, setProductName] = useState('');
    // const [Description, setDescription] = useState('');
    // const [Price, setPrice] = useState('');
    // const [Category, setCategory] = useState('');
    // const [Image, setImage] = useState('');
    const [
        { ProductName, Description, Price, Category, Image },
        setFormState,
    ] = useState({
        ProductName: "",
        Description: "",
        Price: "",
        Category: "",
        Image: null
    });

    useEffect(() => {
        getProductDetails(ProductId);
    }, [ProductId]);



    const getProductDetails = async (ProductId) => {

        let result = await fetch(process.env.REACT_APP_SERVERURL + `details/${ProductId}`)
        result = await result.json();
        // console.log(result);
        setFormState({ ProductName: result.ProductName, Description: result.Description, Price: result.Price, Category: result.Category, Image: result.Image });

    };

    const handleChange = (e) => {

        setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleFile = (e) => {
        // alert("filechange");
        // console.log("e.target.files[0]");
        // console.log(e.target.files[0]);
        setFormState((prev) => ({ ...prev, Image: e.target.files[0] }));
    };
    const handleSubmit = async (e) => {
        // console.log("check formState image", {
        //     ProductName,
        //     Description,
        //     Price,
        //     Category,
        //     Image,
        // });
        try {
            e.preventDefault();
            if (
                !ProductName ||
                !Description ||
                !Price ||
                !Category ||
                !Image
            )
                return toast.error("Please enter all Fields!", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            const formData = new FormData();
            formData.append("ProductName", ProductName);
            formData.append("Description", Description);
            formData.append("Price", Price);
            formData.append("Category", Category);
            formData.append("Image", Image);
            // console.log("formData", formData);

            const res = await fetch(process.env.REACT_APP_SERVERURL + `auth/updateProductByFIdPId/${ProductId}`, {
                method: "PUT",
                headers: {
                    authorization: farmertoken,//localStorage.getItem("logintoken"),
                },
                body: formData,
            });
            const { _id, error } = await res.json();
            // console.log(_id);

            if (_id) {
                toast.success("Product updated successfully.", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                //Start clearing values in form once the data is inserted in Database
                // setFormState((prev) => ({ ...prev, ProductName: "", Description: "", Price: "", Category: "", Image: "" }));
                // ref.current.value = "";
                // //End clearing values in form once the data is inserted in Database
                // return localStorage.setItem("ProdcutID", _id);

            }
            if (error) {
                console.log("details error", error)
                // return toast.error(error, {
                //     position: "bottom-center",
                //     autoClose: 3000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                // });
            }

        } catch (error) {
            console.log("details error catch", error)
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
    };
    // if (isAuthenticated) return <Navigate to='/' />;

    return (
        <>
            <div className="container" style={{ backgroundImage: `url(${image}` }}>
                <div className="row">

                    <p>Update Product</p>
                    <hr />
                    <div className="col-8">
                        <br />
                        <form onSubmit={handleSubmit}>
                            <input
                                className="form-control form-control-sm"
                                type="text"
                                title="Please
                                enter string"
                                pattern="[a-zA-Z]*"
                                placeholder="ProductName"
                                aria-label=".form-control-sm"
                                id="ProductName"
                                maxLength={255}
                                minLength={4}
                                value={ProductName}
                                onChange={handleChange}
                            ></input>
                            <br />
                            <input
                                className="form-control form-control-sm"
                                type="text"
                                placeholder="Description"
                                aria-label=".form-control-sm"
                                id="Description"
                                value={Description}
                                onChange={handleChange}
                            ></input>
                            <br />
                            <input
                                className="form-control form-control-sm"
                                type="number"
                                placeholder="Price"
                                aria-label=".form-control-sm"
                                id="Price"
                                value={Price}
                                onChange={handleChange}
                            ></input>
                            <br />

                            <select
                                name="category-list"
                                id="Category"
                                className="form-select-lg form-control "
                                style={{ padding: "7px" }}
                                onChange={handleChange}
                                value={Category}
                            >
                                <option value="">Select</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="DairyProd">Dairy Products</option>
                            </select>

                            <br />
                            <input
                                type="file"
                                id="Image"
                                onChange={handleFile}
                                name={Image}
                                ref={ref}
                            />

                            <div className="row">
                                <div className="col text-left">
                                    <button type="submit" className="updatebtn">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div
                        className="col-3"
                        id="farmer"
                        style={{ backgroundImage: `url(${image1}` }}
                    ></div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Update;