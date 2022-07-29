import axios from 'axios'
const baseUrl = '/api/perps'


const getPerpsAll = async () => {
  const response = await axios.get('http://localhost:3003/data')
  return response.data
}

const getPerpsFiltered = async (searchedName) => {
  const response = await axios.get('http://localhost:3003/data')
  return response.data
}

const getSpecificPerp = async (id) => {
    const response = await axios.get('http://localhost:3003/data')
    const myNames = await response.data
    const myPerp = await myNames.find(perp => perp.id === Number(id))
    if (myPerp) return myPerp
    return "Not Found"

}


export default { getPerpsAll, getPerpsFiltered, getSpecificPerp}


// const myNamesPromise = await fetch('http://localhost:3003/data')
        