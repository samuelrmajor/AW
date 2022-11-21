import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
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
import { Provider } from 'react-redux'


ReactDOM.render(<Router><App /></Router>, document.getElementById('root'))