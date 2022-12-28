import React, { useState } from 'react';
import imgLogin from '../../../assets/img/mainLogin.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import e from 'cors';
import axios from '../../../api/axios';

const SignUp = () => {

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pwd, setPwd] = useState('')
  const [confirmPwd, setConfirmPwd] = useState('')

  async function Register(){
    const URL = '/api/v1/web/auth/register'
    const body = {name: name, email: email, password: pwd, password2: confirmPwd}
    try{
      const response = await axios.post(URL, body)
      console.log(response)
    }catch(error){
      console.log(error)
    }
  }

  function Submit(e){
    e.preventDefault();
    Register()
  }

  return (
    <div style={{ backgroundImage: `linear-gradient(90deg, rgba(107, 120, 255, 0.99) 0%, #8609E9 48.55%, rgba(134, 9, 233, 0) 97.4%), url(${imgLogin})`, height: "1024px" }}>
      <div className='row'>
        <div className="col-xl-6 col-md-6 col-sm-12 pt-5 text-start ps-5">
          <h2 className='text-white fs-1'>My Account</h2>
          <h3 className='text-white pt-4'>Sign Up</h3>
          <p className='text-white mt-3'>
            Do you have Account?
            <Link className='text-white fs-5 text-decoration-none fw-bold' to="/Login">Login</Link>
          </p>
          <div className='d-flex'>
            <a className='text-dark fs-5 text-decoration-none d-block bg-white me-4 text-center pt-2' style={{ width: '180px', height: '48px' , borderRadius:'5px'}} href="#"><FontAwesomeIcon icon={faGoogle} /> Google</a>
            <a className='text-dark fs-5 text-decoration-none d-block bg-white text-center pt-2' style={{ width: '180px', height: '48px', borderRadius:'5px' }} href="#"><FontAwesomeIcon icon={faFacebookF} /> FaceBook</a>
          </div>
          <form >
          <div className='mt-5'>
              <label className='text-white mb-2' htmlFor="">name</label>
              <input className='w-100 form-control' value={name} onChange={(e) => setName(e.target.value)} style={{ height: '48px', borderRadius:'5px' }} type="name" name='name' placeholder='Name' />
            </div>
            <div className='mt-3'>
              <label className='text-white mb-2' htmlFor="">Email</label>
              <input className='w-100 form-control' value={email} onChange={(e) => setEmail(e.target.value)} style={{ height: '48px', borderRadius:'5px' }} type="email" name='email' placeholder='Email' />
            </div>
            <div className='mt-3'>
              <label className='text-white mb-2' htmlFor="">Password</label>
              <input style={{ height: '48px', borderRadius:'5px' }} value={pwd} onChange={(e) => setPwd(e.target.value)} className='w-100 form-control' type="password" name='password' placeholder='Password' />
            </div>
            <div className='mt-3'>
              <label className='text-white mb-2' htmlFor="">Password Again</label>
              <input style={{ height: '48px', borderRadius:'5px' }} value={confirmPwd} onChange={(e) => setConfirmPwd(e.target.value)} className='w-100 form-control' type="password" name='password' placeholder='Password' />
            </div>
            <div className='mt-3 d-flex justify-content-between'>
              <div>
                <input className='form-check-input' style={{ width: '20px', height: '20px' }} name="remember" id='remember' type="checkbox" />
                <label className='text-white ms-2' htmlFor="remember">Remember me</label>
              </div>
            </div>
            <button className='btn bg-white fs-5 fw-bold mt-3 float-end' style={{width:'180px', height:'48px', color:'#7D89FF', borderRadius:'none'}} onClick={Submit} type='submit'>register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp