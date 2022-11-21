import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Autocomplete from "@material-ui/lab/Autocomplete";
import perpsService from "../services/perps";
import { useNavigate } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";
import { mergeClasses } from "@material-ui/styles";

const useStyles = makeStyles({
  root: {
    typography: {
      fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(189, 4, 4, 0.863)",
    },

    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "rgba(189, 4, 4, 0.863)",
    },
  },
});


const SearchBigForm = (user) => {
  const [searchedName, setSearchedName] = useState("");
  const [myOptions, setMyOptions] = useState([]);
  const navigate = useNavigate();
 

  
  const handleSearchedNameChange = async (event) => {
    const myChange = await event.target.value;
    // console.log("myChange", myChange)
    setSearchedName(myChange);
    // console.log("My Searched Name:" + myChange)
    if (!(myChange === "") && myChange.length >= 2) {
      // console.log("Options Fetched from API")
      const myNames = await perpsService.getPerpsFiltered(myChange);

      setMyOptions(myNames);
    } else {
      setMyOptions([]);
    }
  };

  //  <div className = 'searchForm-main' style={{ marginLeft: '4%',marginRight: '4%', marginTop: '1%', maxWidth: '800px' }}></div>
  const classes = useStyles();
  return (
    <div className="searchForm-main">
      {/* <h3 className = 'searchForm-header'>Perp Search</h3> */}
      <div className="searchForm-autocomplete">
        <Autocomplete
          className={classes.root}
          id="test"
          clearOnEscape={true}
          loading={myOptions.length > 0 ? true : false}
          freeSolo={false}
          noOptionsText={
            searchedName.length > 1 ? "No Results Found" : "Search Perps"
          }
          autoComplete={true}
          autoSelect
          autoHighlight
          getOptionLabel={(option) => option.fullname}
          options={myOptions}
          onInputChange={(event, value, reason) => {
            if (reason === "reset") {
              handleSearchedNameChange({ target: { value: value } });
            } else if (reason === "clear") {
              handleSearchedNameChange({ target: { value: "" } });
            }
          }}
          onChange={(option, mySelection) => {
            // console.log("onchange option", option);
            // console.log("onchange selection", mySelection);
            if (option.type === "click" && mySelection) {
              // console.log("reroute to", mySelection.id);
              navigate("/Perp/" + mySelection.webid);
            }
          }}
          renderOption={(
            { fullname, imageurl, webid, perpdesc, ...rest },
            option
          ) => (
            <Box
              component="span"
              className="searchForm-result"
              sx={{
                "& > img": { mr: 0, flexShrink: 0, verticalAlign: "-10px" },
              }}
              {...rest}
            >
              <img
                loading="lazy"
                width="25"
                src={
                  imageurl !== "NONE"
                    ? imageurl
                    : "https://media.istockphoto.com/id/1220827245/vector/anonymous-gender-neutral-face-avatar-incognito-head-silhouette.jpg?s=612x612&w=0&k=20&c=GMdiPt_h8exnrAQnNo7dIKjwZyYqjH4lRQqV8AOx4QU="
                }
              />
              {"   "} {fullname} {"   "}
              {(perpdesc != 'NONE') && (perpdesc != null) ? "   (" + perpdesc + ")" : ""}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.root}
              onChange={handleSearchedNameChange}
              color="primary"
              variant="outlined"
              label="Perp Search"
            />
          )}
        />
      </div>
    </div>
  );
};

export default SearchBigForm;
