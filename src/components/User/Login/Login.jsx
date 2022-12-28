import React, { useState, useContext } from 'react';
import {Link } from 'react-router-dom';
import useAuth from '../../../hook/useAuth';
import axios from '../../../api/axios';
import imgLogin from '../../../assets/img/mainLogin.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';

const LOGIN_URL = '/api/v1/web/auth/login'
const GET_USER_URL = '/api/v1/web/users';

const Login = () => {
  const { auth, authAction } = useAuth();
  const [email, setEmail] = useState('')
  const [password, setPassWord] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          }
        }
      );
      const data = response?.data
      console.log(response)
      localStorage.setItem('token', data.token)
      try {
        authAction({ type: 'setLoading', payload: true });
        const respone = await axios.get(GET_USER_URL,
          {
            headers: {
              token: localStorage.getItem('token')
            }
          }
        );
        console.log('getUser', respone)
        authAction({ type: 'setCurrentUser', payload: respone?.data?.user })
        authAction({ type: 'setLoading', payload: false })
      } catch (error) {
        console.log(error);
        authAction({ type: 'setError', payload: true })
      }
      window.location.href = "/";
    }
    catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }
  }

  return (
    <div style={{ backgroundImage: `linear-gradient(90deg, rgba(107, 120, 255, 0.99) 0%, #8609E9 48.55%, rgba(134, 9, 233, 0) 97.4%), url(${imgLogin})`, height: "1024px" }}>
      <div className='row'>
        <div className="col-xl-6 col-md-6 col-sm-12 pt-5 text-start ps-5">
          <h2 className='text-white fs-1'>My Account</h2>
          <h3 className='text-white pt-4'>Login</h3>
          <p className='text-white mt-3'>
            Dont have Account?
            <Link className='text-white fs-5 text-decoration-none fw-bold' to="/SignUp">sign up</Link>
          </p>
          <div className='d-flex'>
            <a className='text-dark fs-5 text-decoration-none d-block bg-white me-4 text-center pt-2' style={{ width: '180px', height: '48px', borderRadius: '5px' }} href="#"><FontAwesomeIcon icon={faGoogle} /> Google</a>
            <a className='text-dark fs-5 text-decoration-none d-block bg-white text-center pt-2' style={{ width: '180px', height: '48px', borderRadius: '5px' }} href="#"><FontAwesomeIcon icon={faFacebookF} /> FaceBook</a>
          </div>
          <form onSubmit={handleSubmit}>
            {
              error ===''?'':<div class="alert alert-danger mt-5" role="alert">
                {error}
            </div>
            }
            <div className='mt-3'>
              <label className='text-white mb-2' htmlFor="">Email</label>
              <input className='w-100 form-control' style={{ height: '48px', borderRadius: '5px' }} onChange={(e) => setEmail(e.target.value)} value={email} type="email" name='email' placeholder='Email' />
            </div>
            <div className='mt-3'>
              <label className='text-white mb-2' htmlFor="">password</label>
              <input style={{ height: '48px', borderRadius: '5px' }} type='password' className='w-100 form-control' onChange={(e) => setPassWord(e.target.value)} value={password} name='password' placeholder='Password' />
            </div>
            <div className='mt-3 d-flex justify-content-between'>
              <div>
                <input className='form-check-input' style={{ width: '20px', height: '20px' }} name="remember" id='remember' type="checkbox" />
                <label className='text-white ms-2' htmlFor="remember">Remember me</label>
              </div>
              <a className='text-white text-decoration-none' href="#">Forget password</a>
            </div>
            <button className='btn bg-white fs-5 fw-bold mt-3 float-end' style={{ width: '180px', height: '48px', color: '#7D89FF', borderRadius: 'none' }} type='submit'>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login