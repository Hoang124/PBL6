import React, { useState, useContext } from 'react';
import {Link } from 'react-router-dom';
import useAuth from '../../../hook/useAuth';
import axios from '../../../api/axios';
import imgLogin from '../../../assets/img/mainLogin.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';


const ForgotPW = () => {
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    async function handleSubmit(e){
        e.preventDefault()
        const URL = 'api/v1/web/auth/forgot'
        try{
            const response = await axios.post(URL,
                JSON.stringify({ email }),
                {
                  headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                  }
                }
            );
            console.log(response)
            setMessage(response.data.message)
        }
        catch (error){
            console.log(error)
            setMessage(error?.response.data.message)
        }
    }
    return (
        <div style={{ backgroundImage: `linear-gradient(90deg, rgba(107, 120, 255, 0.99) 0%, #8609E9 48.55%, rgba(134, 9, 233, 0) 97.4%), url(${imgLogin})`, height: "1024px" }}>
          <div className='row'>
            <div className="col-xl-6 col-md-6 col-sm-12 pt-5 text-start ps-5">
              <h2 className='text-white fs-1'>My Account</h2>
              <h3 className='text-white pt-4'>Forgot Password</h3>
              <p className='text-white mt-3'>
                <Link className='text-white fs-5 text-decoration-none fw-bold' to="/Login">Login </Link>now
              </p>

              <form onSubmit={handleSubmit}>
                {
                  message ===''?'':<div class="alert alert-primary mt-5" role="alert">
                    {message}
                </div>
                }
                <div className='mt-3'>
                  <label className='text-white mb-2' htmlFor="">Email</label>
                  <input className='w-100 form-control' style={{ height: '48px', borderRadius: '5px' }} onChange={(e) => setEmail(e.target.value)} value={email} type="email" name='email' placeholder='Email' />
                </div>
                <button className='btn bg-white fs-5 fw-bold mt-3 float-end' style={{ width: '180px', height: '48px', color: '#7D89FF', borderRadius: 'none' }} type='submit'>Send</button>
              </form>
            </div>
          </div>
        </div>
      )
    }
    

export default ForgotPW