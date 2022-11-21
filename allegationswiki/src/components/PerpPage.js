import { useState } from "react";
import { useEffect } from "react";
import PerpInfoCard from "./perpPage/PerpInfoCard";

import { useDispatch } from "react-redux";
import perpsService from "../services/perps";

const PerpPage = ({ perpCode }) => {
  
  const [perpInfo, setPerpInfo] = useState("");
  useEffect(() => {
    let isMounted = true;
    if (perpCode){
    perpsService.getSpecificPerp(perpCode).then((myPerp) => {
      if (isMounted) setPerpInfo(myPerp[0]);
    })}
    else {
      perpsService.getRandomPerp().then(myPerpCode => perpsService.getSpecificPerp(myPerpCode[0].webid)).then((myPerp) => {

        if (isMounted) setPerpInfo(myPerp[0]);
      });

    }
    return () => {
      isMounted = false;
    };
  }, []);
  const myPerpCancelled = perpInfo.svcout >= 0.65 || perpInfo.lrout >= 0.65;

  const imgBorderStyle =
    myPerpCancelled 
      ? "#8B0000"
      : "#006400"

  //Style
  const imgStyle = { border: "7px solid " + imgBorderStyle };

  const nameStyle = { fontSize: "30px" };

  const allegationStatusStyle = { size: "10px", color: imgBorderStyle };

  //Content
  const allegationStatusText = 
  myPerpCancelled
    ? 'CANCELLED'
    : 'Unproblematic'
    
  const allegationSocialStatusText =
    myPerpCancelled 
      ? 'Cancelled'
      : 'Good'
      

  if (!perpInfo) {
    return <div className="pp-loading">LOADING</div>;
  } else if (perpInfo === "Not Found") {
    return <div className="pp-notfound">NOT FOUND</div>;
  } else {
    return (
      <PerpInfoCard perpInfo = {perpInfo} myPerpCancelled = {myPerpCancelled}/>
    );
  }
};

export default PerpPage;

