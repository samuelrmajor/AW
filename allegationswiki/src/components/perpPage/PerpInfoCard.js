import { useState } from "react";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import perpsService from "../../services/perps";
import PerpVotingComponent from "./PerpVotingComponent";

const PerpInfoCard = ({ perpInfo, myPerpCancelled}) => {


  const imgBorderStyle = myPerpCancelled ? "#8B0000" : "#006400";

  //Style
  const imgStyle = { border: "7px solid " + imgBorderStyle };

  const nameStyle = { fontSize: "30px" };

  const allegationStatusStyle = { size: "10px", color: imgBorderStyle };

  //Content
  const allegationStatusText = myPerpCancelled ? "CANCELLED" : "Unproblematic";

  const allegationSocialStatusText = myPerpCancelled ? "WIP" : "WIP";

  //TODO: Clicking/Tapping Image will 'Flip' the card' and reveal personal information ??
  //Click to reveal allegation info -- will need a new model to determine.
  return (
    <div className="pp-main">
      <div className="pp-picture">
        <img
          style={imgStyle}
          src={
            perpInfo.imageurl !== 'NONE'
              ? perpInfo.imageurl
              : "https://media.istockphoto.com/id/1220827245/vector/anonymous-gender-neutral-face-avatar-incognito-head-silhouette.jpg?s=612x612&w=0&k=20&c=GMdiPt_h8exnrAQnNo7dIKjwZyYqjH4lRQqV8AOx4QU="}
        ></img>
      </div>
      <div className="pp-info">
        <div style={nameStyle} className="pp-info-name">
          {perpInfo.fullname}
        </div>
        <div className="pp-info-allegation-status">
          Allegation.wiki Status:{" "}
          <span style={{ color: imgBorderStyle }}>{allegationStatusText}</span>
        </div>
        <div className="pp-info-allegation-social-status">
          Allegation Social Status:{" "}
          <span style={{ color: imgBorderStyle }}>
            {allegationSocialStatusText}
          </span>
        </div>
        <PerpVotingComponent
          perpInfo={perpInfo}
          myPerpCancelled={myPerpCancelled}
        />
      </div>
    </div>
  );
};

export default PerpInfoCard;

