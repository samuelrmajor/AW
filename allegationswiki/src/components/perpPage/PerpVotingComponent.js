import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import perpsService from "../../services/perps";

const PerpVotingComponent = ({ perpInfo, myPerpCancelled}) => {
    const [perpVoteStage, setPerpVoteStage] = useState("Q1");
    const [displayQuestions, setDisplayQuestions] = useState(true)

  const handleQ1Click = async (event) =>{
    event.preventDefault();
    if (event.target.name === 'cancelledQ1') {
      setPerpVoteStage('Q2')
      const cancelledResponse = await perpsService.votePerp(perpInfo.webid, 0);
    }

    else {
      setPerpVoteStage("Done")
      setTimeout(() => {
          setDisplayQuestions(false);
       }, 3000);
    }

    if (event.target.name==='unsureQ1'){
        const cancelledResponse = await perpsService.votePerp(perpInfo.webid, 1);
    }

    else if (event.target.name === "notCancelledQ1") {
      const cancelledResponse = await perpsService.votePerp(perpInfo.webid, 2);
    }
  }

  const handleQ2Click = async (event) => {
        event.preventDefault();

        if (event.target.name === "sexualQ2") {
          const cancelledResponse = await perpsService.votePerp(
            perpInfo.webid,
            3
          );
        }
        else if (event.target.name === "domesticQ2") {
          const cancelledResponse = await perpsService.votePerp(
            perpInfo.webid,
            4
          );
        }
        else if (event.target.name === "discQ2") {
          const cancelledResponse = await perpsService.votePerp(
            perpInfo.webid,
            5
          );
        } else {
            const cancelledResponse = await perpsService.votePerp(
              perpInfo.webid,
              6
            );
        }
      setPerpVoteStage("Done");
      setTimeout(() => {
        setDisplayQuestions(false);
      }, 3000);
      //Submit to Database
    };

    const handleQ3Click = async (event) => {
      event.preventDefault();

      console.log("Clicked q3");
    };




  const q1Form = (
    <div className="q1">
      <button
        name="cancelledQ1"
        style={{ color: "red" }}
        onClick={handleQ1Click}
      >
        Cancelled
      </button>
      <button
        name="unsureQ1"
        style={{ color: "Orange" }}
        onClick={handleQ1Click}
      >
        Unsure
      </button>
      <button
        name="notCancelledQ1"
        style={{ color: "Green" }}
        onClick={handleQ1Click}
      >
        Not Cancelled
      </button>
    </div>
  );

  const q2Form = (
    <div className="q2">
      <button name="sexualQ2" onClick={handleQ2Click}>
        Sexual Misconduct
      </button>
      <button name="domesticQ2" onClick={handleQ2Click}>
        Domestic Violence
      </button>
      <button name="discQ2" onClick={handleQ2Click}>
        Discrimination
      </button>
      <button name="otherQ2" onClick={handleQ2Click}>
        Other
      </button>
      
    </div>
  );

  const q3Form = (
      <form>
        <button onClick={handleQ1Click}>q1Form</button>
      </form>
    );

  const doneForm = (
    <span>
       
    </span>
  );
      const currentQuestion =
          perpVoteStage === "Q1"
            ? 'How do you view this person?'
            : perpVoteStage === "Q2"
            ? 'What offenses has this person comitted?'
            : perpVoteStage === "Q3"
            ? q3Form
            : 'Thank you for submitting.';

    const currentQuestionForm = perpVoteStage === "Q1" ? q1Form : perpVoteStage === 'Q2' ? q2Form : perpVoteStage === 'Q3' ? q3Form : doneForm

    const myStatusStyles = myPerpCancelled
      ? {
          background: "linear-gradient(to bottom right, #3a2727,#8B0000)",
          boxShadow: "0 0 10px #8B0000",
        }
      : {
          background: "linear-gradient(to bottom right, #273a2d,#006400)",
          boxShadow: "0 0 10px #006400",
        };

  //Style
  return (
    <div>
      {displayQuestions && (
        <div className="pp-info-vote" style={myStatusStyles}>
          <div className="pp-info-vote-question">
            <span>{currentQuestion}</span>
          </div>
          <div className="pp-info-vote-options">{currentQuestionForm}</div>
        </div>
      )}
    </div>
  );
};

export default PerpVotingComponent;

