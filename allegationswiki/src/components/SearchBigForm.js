import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
import perpsService from '../services/perps'
import {
  useNavigate
} from 'react-router-dom'

const SearchBigForm = (user) => {
  const [searchedName, setSearchedName] = useState('')
  const [myOptions, setMyOptions] = useState([])

  const navigate = useNavigate()
  const handleSearchedNameChange = async (event) => {
    const  myChange = await event.target.value
    // console.log("myChange", myChange)
    setSearchedName(myChange)
    // console.log("My Searched Name:" + myChange)
    if (!(myChange === '')  && myChange.length >= 2) {
        // console.log("Options Fetched from API")
        const tempMyOptions = []

        const myNames = await perpsService.getPerpsFiltered(myChange)

        //can remove this once filter is API based
        const myNamesFiltered = myNames.filter(searchName => searchName.employee_name.toUpperCase().startsWith(myChange.toUpperCase()))
        myNamesFiltered.forEach( searchName => {
          tempMyOptions.push(searchName)
        }
        )
        setMyOptions(tempMyOptions)
      }
    else {
      setMyOptions([])
    }
    }

  //  <div className = 'searchForm-main' style={{ marginLeft: '4%',marginRight: '4%', marginTop: '1%', maxWidth: '800px' }}></div>

  return (
    <div className = 'searchForm-main'>
      <h3 className = 'searchForm-header'>Perp Search</h3>
      <div className = 'searchForm-autocomplete'>
      <Autocomplete
        style={{ minWidth: '40vw' }}
        id = 'test'
        clearOnEscape = {true}
        loading = {myOptions.length > 0 ? true : false}
        freeSolo = {false}
        noOptionsText = {searchedName.length > 1 ? 'No Results Found': 'Search Perps'}
        autoComplete = {true}
        autoSelect
        autoHighlight
        getOptionLabel={(option) => option.employee_name}
        options={myOptions}
        onInputChange = {(event, value, reason) => {
          // console.log("ChangeEvent:", event)
          // console.log("Changevalue:", value)
          // console.log("Changereason:", reason)
          if (reason === 'reset'){
              handleSearchedNameChange({target: {value: value}})
          }
          else if (reason === 'clear'){
              handleSearchedNameChange({target: {value: ''}})
          }
        }
        }

        onChange = { (option, mySelection) => {
          console.log('onchange option',option )
          console.log('onchange selection',mySelection )
          if (option.type === 'click' && mySelection){
            console.log("reroute to", mySelection.id)
            navigate('/Perp/'+mySelection.id)
          }
                                    
      }
        }
        renderOption={(props, option) => (
        <Box component="div" className ='searchForm-result' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://cdn.discordapp.com/emojis/704868846946877470.webp?size=96&quality=lossless`}
            alt=""
          />
          {/* {console.log("option", option)}  */}
          <p >{props.employee_name}</p>
          {/* {console.log("props", props)} */}
          {/* {console.log("options", {myOptions})} */}
        </Box>
      )}
        renderInput={(params) => (
          <div className='searchForm-text'>
          <TextField {...params}
            onChange={handleSearchedNameChange}
            variant="outlined"
            label="Perp"
          />
          </div>
          
        )}
        
      />
      </div>
    </div>
  )}

export default SearchBigForm