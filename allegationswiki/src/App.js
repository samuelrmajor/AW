import { useEffect } from "react";
import Home from "./components/Home";
import RequestNewForm from "./components/RequestNewForm";
import PerpPage from "./components/PerpPage";
import { useDispatch, useSelector } from "react-redux";
import perpsService from "./services/perps";
import "./styles.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from "react-router-dom";

const App = () => {
  //State Declarations
  //Hooks
  //Sets xxxx
  const getRandomPerp = async () => {
    const myRandomPerp = await perpsService.getRandomPerp()
    console.log(myRandomPerp)
  }
  const padding = {
    padding: 5,
    fontSize: 22,
    textDecoration: "none",
  };

  const match = useMatch("/perp/:perpCode");
  const matchHome = useMatch("/");
  const perpCode = match ? match.params.perpCode : null;
  const showLogoTL = !matchHome ? padding : { display: "none" };
  const showRandomTR = perpCode ? { display: "none" } : padding;
  return (
    <div className="appbody">
      <div className="main-app">
        <header className="main-nav-bar">
          <div className="header-gap-1"></div>
          <div className="main-nav-bar-home">
            <Link style={showLogoTL} to="/">
              <span>
                <span className="main-nav-bar-home-allegations">
                  Allegations
                </span>
                <span className="main-nav-bar-home-wiki">.wiki</span>
              </span>
            </Link>
          </div>
          <div className="header-gap-2"></div>

          <div className="header-gap-2"></div>
          <div className="header-request-new">
            <Link style={showRandomTR} to="/Random">
              Random Perp
            </Link>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Random" element={<PerpPage perpCode= {''} />} />
          <Route
            path="/perp/:perpCode"
            element={<PerpPage perpCode={perpCode} />}
          />``
          <Route path="/ContactUs" element={<PerpPage perpCode={perpCode} />} />
        </Routes>
        <div className="bodyGap"></div>
        <div className="main-footer"></div>
      </div>
      <div className="bottom-bar">
        <br />
        <span>
          <em>Mysterious Wolf Treehouse: </em>
          <u>Contact Us</u>
        </span>
      </div>
    </div>
  );
};

export default App;
