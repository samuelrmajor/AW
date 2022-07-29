import { useEffect } from 'react'
import Home from './components/Home'
import RequestNewForm from './components/RequestNewForm'
import PerpPage from './components/PerpPage'
import { useDispatch, useSelector } from 'react-redux'
import perpsService from './services/perps'
import './styles.css'


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch
} from "react-router-dom"

const App = () => {
  //State Declarations
  //Hooks
    //Sets xxxx

    const padding = {
    padding: 5
  }

  const match = useMatch('/perp/:perpCode')
  const perpCode = match ? match.params.perpCode : null

  return (
    <div className ='appbody'>
      <div className = 'main-app'>
        <header className = 'main-nav-bar'>
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/RequestNew">Request a New Entry</Link>
        </header>
        <div className='main-routes'>
        <Routes>
          <Route path="/" element={<Home/>} />  
          <Route path="/RequestNew" element={<RequestNewForm/>} />
          <Route path="/perp/:perpCode" element={<PerpPage perpCode={perpCode} />} />  
        </Routes>
        </div> 
        <div>
          Footer
        </div>
    </div>
      <div className='bottom-bar'>
        <br />
        <em>Mysterious Wolf Treehouse</em>
      </div>
    </div>
  )
}

export default App

