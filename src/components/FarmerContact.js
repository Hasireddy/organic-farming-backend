<<<<<<< HEAD
// import React, { useState } from "react";
// import "../components/FarmerContact.css";
// import { useParams, useLocation } from 'react-router-dom';
=======
import React, { useState } from "react";
import "../components/FarmerContact.css";
import { useLocation } from 'react-router-dom';
>>>>>>> origin/master

// const FarmerContact = () => {

//   const location = useLocation();

<<<<<<< HEAD
//   // console.log(location.state.farmerObject);
//   const [FarmDetails, setFarmDetails] = useState(location.state.farmerObject);
=======
  // console.log(location.state.farmerObject);
  const [FarmDetails, setFarmDetails] = useState(null);
  setFarmDetails(location.state.farmerObject);
>>>>>>> origin/master

//   return (
//     <>
//       {
//         FarmDetails ? (
//           <div className="farmer-contact-container" >
//             <div className="card-deck">
//               <div className="card" id="cardCtn" >
//                 <div className="card-header bg-success text-white" id="headerCtn">{FarmDetails.farmName}</div><br></br>
//                 <div className="card-body">
//                   <div className="farm-address font-weight-bold " value="address">{FarmDetails.firstname + ' ' + FarmDetails.lastname}</div><br></br>
//                   <div className="farm-address font-weight-bold " value="address">{FarmDetails.address}</div><br></br>
//                   <div className="farm-postcode font-weight-bold" value="postcode">{FarmDetails.postcode}</div><br></br>

//                   <div className="farm-email text-primary" value="email">E-mail:{FarmDetails.email}</div>
//                 </div>
//                 {/* <div class="card-footer">
//                   <button href="/" id="farmerCtn" class="text-white">Check Location</button>
//                 </div> */}
//               </div>

//             </div>
//           </div >) : (<div><h1>No Farms found</h1></div>)}
//     </>

//   )

// }


// export default FarmerContact;