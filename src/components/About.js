import React from "react";
import "../components/About.css";
import Uma from "../assets/uma.png";
import Isaiah from "../assets/isaiah.jpeg";
import Ercan from "../assets/ercan4.jpg";
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div id="aboutCtn">
      <h1 className="card-header">About Us</h1>
      <div className="card-deck mb-3">
        {/* <div className="card-body" id="cardHeader">
          <h1 className="card-header">About Us</h1>
        </div> */}
      </div>
      <div className="card-deck">
        <div className="card mb-4" id="cardAbout">
          <div>
            <img
              className="card-img-top img-fluid"
              id="uma"
              src={Uma}
              alt="Card cap"
            />
          </div>
          <div className="card-body-about" id="cardBody">
            <div className="card-title" id="aboutTitle1">
              Uma Maheswari Malikireddy
            </div>
            <br></br>
            <div className="skill font-weight-bold " value="address">
              Fullstack Web & App Developer
            </div>
            <div className="institute font-weight-bold">WBS Coding School</div>
            <div className="addressAbout font-weight-bold">Berlin, Germany</div>
            <br></br>
            <Link to="https://www.linkedin.com/in/malikireddyuma/"
              className="linkedIn font-weight-bold"
            >
              <i className="bi bi-linkedin"></i>
            </Link>
            <br></br>
            <div className="card-text">
              <strong>Passion</strong>: Passionate, Motivated and Dynamic Full-Stack Web Developer !
            </div>
          </div>
        </div>

        <div className="card" id="cardAbout">
          <div>
            <img
              className="card-img-top img-fluid"
              id="ercan"
              src={Ercan}
              alt="Card cap"
            />
          </div>
          <div className="card-body-about">
            <div className="card-title" id="aboutTitle2">
              Ercan Yanmaz
            </div>
            <br></br>
            <div className="skill font-weight-bold " value="address">
              Fullstack Web & App Developer
            </div>
            <div className="institute font-weight-bold">WBS Coding School</div>
            <div className="addressAbout font-weight-bold">Berlin, Germany</div>
            <br></br>
            <Link to="https://www.linkedin.com/in/ercan-yanmaz-425232234/"
              className="linkedIn font-weight-bold"
            >
              <i className="bi bi-linkedin"></i>
            </Link>
            <br></br>
            <div className="card-text">
              <strong>Passion</strong>: My passions were only Swimming, Football, DIY (mandala)..etc, Until recently I came across to the Coding and it become my main  passion.
            </div>
          </div>
        </div>

        <div className="card" id="cardAbout">
          <div>
            <img
              className="card-img-top img-fluid"
              id="isaiah"
              src={Isaiah}
              alt="Card cap"
            />
          </div>
          <div className="card-body-about">
            <div className="card-title" id="aboutTitle3">
              Isaiah Umukoro
            </div>
            <br></br>
            <div className="skill font-weight-bold " value="address">
              Fullstack Web & App Developer
            </div>
            <div className="institute font-weight-bold">WBS Coding School</div>
            <div className="addressAbout font-weight-bold">Berlin, Germany</div>
            <br></br>
            <Link to="https://www.linkedin.com/in/isaiah-umukoro-387a8523a/"
              className="linkedIn font-weight-bold"
            >
              <i className="bi bi-linkedin"></i>
            </Link>
            <br></br>
            <div className="card-text">
              <strong>Passion</strong>: Passionate and Ambitious about creativity, especially in the area of Web and App development!
            </div>
          </div>
        </div>
      </div>
      <div className="textAreaContainer">
        <h2 className="text-center">Organic Farming</h2>
        <div className="text-left" id="textAreaFooter">
          In 2019, 34.110 farms (12.9 per cent of all German farms) met the
          requirements qualifying them as organic farms. The amount of farmland
          being used for organic farming increased by 0,8 per cent, bringing the
          proportion of German farmland being used for organic farming to 9,7
          per cent.
        </div><br></br>
        <div className="text-left" id="textAreaFooter">
          These figures vary from one regional-state to another Organic farming
          in <strong>Brandenburg, Saarland, Hesse and Mecklenburg-West</strong> Pomerania greatly
          exceeded the national average, in contrast to Lower Saxony, Saxony and
          Schleswig-Holstein
        </div><br></br>
        <div className="text-left" id="textAreaFooter">
          The demand for organic products is growing in Germany, which is
          Europe’s largest organic product market and organic food producer,
          with sales amounting to 11.97 billion € in 2019. Despite the increase
          in the amount of farmland being used for organic farming, the demand
          for organic products continues to substantially outpace supply. Some
          of these imports could also be produced at home, although this would
          entail greater effort in terms of the planning certainty and
          reliability of subsidy policies.

          <div className="text-right">
            <small>- Copied from Umwelt Bundesamt</small>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
