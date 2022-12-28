import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import StatusType from '../statusType/StatusType'

const Status = () => {
  const param = useParams()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const type = param.type ? param.type : 1
  const bodyStyle = {
    minHeight: '700px',
    margin: '0 70px',
  }

  return (
    <div style={bodyStyle}>
      <div className='d-flex py-2 mb-3' style={{ background: '#eee' }}>
        <Link to="/Status/1" className={type == 1 ? 'text-decoration-none w-100 text-danger' : 'text-decoration-none w-100 text-dark'}>To Confirm</Link>
        <Link to="/Status/2" className={type == 2 ? 'text-decoration-none w-100 text-danger' : 'text-decoration-none w-100 text-dark'}>Confirmed</Link>
        <Link to="/Status/3" className={type == 3 ? 'text-decoration-none w-100 text-danger' : 'text-decoration-none w-100 text-dark'}>To Receive</Link>
        <Link to="/Status/4" className={type == 4 ? 'text-decoration-none w-100 text-danger' : 'text-decoration-none w-100 text-dark'}>Completed</Link>
      </div>

      <div>
        <StatusType type={type} />
      </div>
    </div>
  )
}

export default Status