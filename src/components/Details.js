import React, { useState, useRef } from "react";
import image from "../assets/fattoria-banner-1.jpg";
// import image1 from "../assets/farmer.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
import "../components/Details.css";


const Details = ({ isAuthenticated }) => {
    // alert('details pare');
    // alert(isAuthenticated);
    const ref = useRef();
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


    const handleChange = (e) =>
        setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

    const handleFile = (e) => {
        // console.log("e.target.files here", e.target.files[0]);
        setFormState((prev) => ({ ...prev, Image: e.target.files[0] }));
    };
    const handleSubmit = async (e) => {
        // console.log("check formState image", {
        // ProductName,
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
            //  console.log("formData", formData);

            const res = await fetch(process.env.REACT_APP_SERVERURL + "details", {
                method: "POST",
                headers: {
                    authorization: localStorage.getItem("logintoken"),
                },
                body: formData,
            });
            const { _id, error } = await res.json();
            //    console.log(_id);

            if (_id) {
                toast.success("Product added successfully.", {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                //Start clearing values in form once the data is inserted in Database
                setFormState((prev) => ({ ...prev, ProductName: "", Description: "", Price: "", Category: "", Image: "" }));
                ref.current.value = "";
                //End clearing values in form once the data is inserted in Database
                return localStorage.setItem("ProdcutID", _id);

            }
            if (error) {
                //  console.log("details error", error)
                return toast.error(error, {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
            <div className="container-fluid" style={{ backgroundImage: `url(${image}`, backgroundRepeat: "no-repeat" }} >
                <div className="row">
                    <h1 className="font-weight-bold">Products</h1>
                    <p>Please fill in this form to add a Product</p>
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
                            {/* <input
                                className="form-control form-control-sm"
                                type="text"
                                placeholder="Category"
                                aria-label=".form-control-sm"
                                id="Category"
                                value={Category}
                                onChange={handleChange}>
                            </input> */}

                            <select
                                name="category-list"
                                id="Category"
                                className="form-select-lg form-control "
                                style={{ padding: "7px" }}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Vegetables">Vegetables</option>
                                <option value="DairyProd">Dairy Products</option>
                            </select>

                            <br />
                            {/* <input
                                type="file"
                                id="Image"
                                onChange={handleFile}
                                name={Image}
                                ref={ref}
                            /> */}
                            {/* <button onClick={handleApi}>Upload</button> */}
                            <div className="row" >
                                <div className="col10" >
                                    <input
                                        type="file"
                                        id="Image"
                                        onChange={handleFile}
                                        name={Image}
                                        ref={ref}
                                    />
                                    <button type="submit" className="registerbtn">
                                        Submit
                                    </button>
                                </div>

                            </div>
                        </form>
                    </div>
                    {/* <div
                        className="col-3"
                        id="farmer"
                        style={{ backgroundImage: `url(${image1}` }}
                    ></div> */}
                </div>
            </div>
            <ToastContainer />
            <br />
        </>
    );
};

export default Details;
