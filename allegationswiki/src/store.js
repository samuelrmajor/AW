import { configureStore } from '@reduxjs/toolkit'
import toggleableReducer from './reducers/toggleableReducer'

const store = configureStore({
  reducer: {
    toggleable: toggleableReducer,

  }
})




export default store