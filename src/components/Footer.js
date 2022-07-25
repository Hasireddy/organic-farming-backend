import React from "react";
import "./Footer.css";
import "../assets/Facebook.png";
import logo from "../assets/logo.png";



function Footer() {

  return (
    <div>
      <footer>
        <div className="footerContainer" id="footerContainer">
          <div className="row">
            <div className="col-md-4 footer-column" id="footerProducts">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <span className="footer-title">
                    Organic Farming Community
                  </span>
                </li>
                <a className="navbar-footer" href="#/">
                  <img
                    src={logo}
                    alt=""
                    width="100"
                    height="100"
                    id="footerLogo"
                    className="d-inline-block align-text-center"
                  />
                </a>
              </ul>
            </div>
            <div className="col-md-4 footer-column">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <span className="footer-title">About Us</span>
                </li>
                <li className="nav-item">
                  <p>
                    This is about our products and other the okdr
                    <br />
                    In publishing and graphic design, Lorem ipsum <br />
                    is a placeholder text commonly used to demonstrate <br />
                    the visual form of a document or a typeface without
                    <br />
                    relying on meaningful content. Lorem ipsum may be <br />
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-md-4 footer-column">
              <ul className="nav flex-column">
                <div className="contactLink">
                  <li className="nav-item">
                    <span className="footer-title">Contact </span>
                  </li>
                  <li className="nav-item">
                    <span className="nav-footer">
                      <i className="fas fa-phone"></i>+49 45 80 80 80
                    </span>
                  </li>
                  <li className="nav-item">
                    <a className="nav-footer" href="/#">
                      <i className="fas fa-envelope"></i>info@organicfarming.com
                    </a>
                  </li>
                </div>

                {/* <div className="input-group mb-2">
                  <input
                    type="text"
                    className="form-control1"
                    placeholder="Enter email address"
                    aria-label="Recipient's username"
                    aria-describedby="button-addon2"
                    />
                  <button 
                    className="btnFooter btn-outline-success btn-lg"
                    type="button"
                    id="button-addon2"
                  // btn-sm
                  >
                    Submit
                  </button>
                 
                </div> */}
              </ul>
            </div>
          </div>

          <div className="text-center">
            <i className="fas fa-ellipsis-h"></i>
          </div>

          <div className="row text-center">
            <div className="col-md-4 box">
              <span className="copyright quick-footers">
                Copyright &copy; www.organicfarming.com{" "}
                <script>document.write(new Date().getFullYear())</script>
              </span>
            </div>
            <div className="col-md-4 box">
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a href="/#">
                    <i className="bi bi-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="../assets/Facebook.png">
                    <i className="bi bi-facebook"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/#">
                    <i className="bi bi-footeredin"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/#">
                    <i className="bi bi-whatsapp"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="/#">
                    <i className="bi bi-github"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
