import { useState } from 'react'
import { useEffect } from 'react'

import { useDispatch} from 'react-redux'
import perpsService from '../services/perps'



const PerpPage = ({perpCode}) => {
    const [perpInfo, setPerpInfo] = useState('')
    useEffect(() => {
        let isMounted = true;
        perpsService.getSpecificPerp(perpCode).then(myPerp=>{
            if (isMounted) setPerpInfo(myPerp);
        })
        return () => {isMounted = false}
}, [])
    console.log(perpInfo)
    

    

  if (!perpInfo) {
    return (
        <div className='pp-loading'>
            LOADING
        </div>
        
    )
  }

  else if (perpInfo === 'Not Found') { return (
    <div className='pp-notfound'>
      NOT FOUND
    </div>
  )
  }

  else { return (
    <div className='pp-main'>
      {perpInfo.employee_name}
    </div>
  )
  }

}


export default PerpPage