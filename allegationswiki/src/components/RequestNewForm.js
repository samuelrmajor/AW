import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {setNotification} from '../reducers/notificationReducer'
import {
  useNavigate
} from 'react-router-dom'

const RequestNewForm = ({handleFormChange}
) => {
  const navigate = useNavigate()
  const [newName, setNewName] = useState('')
  const [newAllegation, setAllegation] = useState('')


  const dispatch = useDispatch()

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNewAllegationChange = (event) => {
    setAllegation(event.target.value)
  }

  const  handleSendRegistration = async (event) => {
    event.preventDefault()
    // const response = await registerService.register({username: username, password:password, email:email, name:name})
    setNewName('')
    setAllegation('')
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSendRegistration}>
        <div>
            Username:
          <input
            type="text"
            value={newName}
            name="newName"
            onChange={handleNewNameChange}
            id = "new-name-input"
          />
        </div>
        <div>
            Allegation:
          <input
            type="text"
            value={newAllegation}
            name="Name"
            onChange={handleNewAllegationChange}
            id = "new-allegation-input"
          />
        </div>
        <button id = "submit-button" type="submit">Submit Request</button>
      </form>
    </div>
  )
}

export default RequestNewForm