import React from 'react'
import axios from '../../../api/axios'
import { useEffect, useState } from 'react'
import useAuth from '../../../hook/useAuth'
import defaultUser from '../../../assets/img/defaultUser.png'

const GET_PROVINCE_URL = '/api/v1/web/address/province';
const GET_DISTRICT_URL = '/api/v1/web/address/district';
const GET_COMMUNE_URL = '/api/v1/web/address/commune';
const Account = () => {
    const { auth, authAction } = useAuth()
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [commune, setCommune] = useState('');
    const [isUpdate, setIsUpdate] = useState(false)
    const [currentUser, setCurrentUser] = useState({});
    const [currentPassword, setCurrentPassword] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setCurrentUser({ ...auth.currentUser })
    }, [auth.loading])

    useEffect(() => {
        async function getProvince() {
            try {
                const respone = await axios.get(GET_PROVINCE_URL);
                setProvinces(respone?.data)
            } catch (error) {
                console.log(error);
            }
        }
        getProvince();
    }, [])

    useEffect(() => {
        async function getDistrict() {
            try {
                const respone = await axios.get(`${GET_DISTRICT_URL}/${province}`);
                setDistricts(respone?.data)
            } catch (error) {
                console.log(error);
            }
        }
        getDistrict();
    }, [province])

    useEffect(() => {
        async function getCommune() {
            try {
                const respone = await axios.get(`${GET_COMMUNE_URL}/${district}`);
                setCommunes(respone?.data)
            } catch (error) {
                console.log(error);
            }
        }
        getCommune();
    }, [province])


    //function log out
    function logout() {
        localStorage.removeItem('token')
        // authAction({type: 'setCurrentUser', payload: null})
        // setCurrentUser({})
        window.location.href = "/"
    }
    
    //function Change password
    async function changePassword(e){
        e.preventDefault()
        const URL = 'api/v1/web/auth/reset'
        const accessToken = localStorage.getItem('token')
        const body = {current_password: currentPassword, password: password, password2: password2}
        try {
            const response = await axios.post(URL, body,
                {
                    headers: {
                        token: accessToken
                    }
                }    
            );
            console.log('changePass',response)
            setCurrentPassword('')
            setPassword('')
            setPassword2('')
            setError('')
            setSuccess(response.data.message + ' Redirect login in 5 seconds')
            localStorage.removeItem('token')
            setTimeout(navigateLogin, 5000)
        } catch (error) {
            console.log(error);
            setError(error?.response.data.message)
        }
    }

    //navigate Login
    function navigateLogin(){
        window.location.href = '/Login'
    }

    async function UpdateUser(e){
        e.preventDefault()
        const URL = 'api/v1/web/users'
        const accessToken = localStorage.getItem('token')
        const body = {fullname: currentUser.fullname, phone: currentUser.phone,gender: currentUser.gender}
        try {
            const response = await axios.put(URL, body,
                {
                    headers: {
                        token: accessToken
                    }
                }    
            );
            console.log(response)
            setIsUpdate(false)
            window.location.reload()
        } catch (error) {
            console.log(error);
            setError(error?.response.data.message)
        }
    }

    const headerStyle = {
        position: 'relative',
        content: '',
        height: '0px',
        width: '0px',
        left: '0px',
        borderWidth: '175px 1500px',
        borderStyle: 'solid',
        borderColor: '#9C57FF transparent transparent #9C57FF'
    }

    const containerUserImage = {
        height: '150px',
        width: '150px',
        backgroundColor: 'white',
        backgroundImage: `url(${currentUser ? currentUser.urlImage : defaultUser})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: '20px auto',
        borderRadius: '50%'
    }

    const bodyAccountStyle = {
        height: '500px',
        backgroundColor: 'white',
        padding: '100px'
    }


    console.log(currentUser)
    return (
        <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', padding: '10px 100px', left: '0px', zIndex: '1', backgroundColor: 'transparent', width: '100%', height: '350px' }}>
                <span className='text-white fs-1 fw-bold float-start mt-5'>My Account</span>
                <div className='float-end mt-3 rounded-3 shadow' style={{ width: '500px', height: '400px', backgroundColor: 'white' }}>
                    <div className='shadow' style={containerUserImage}>

                    </div>
                    <span className='fw-bold mt-3'>{currentUser ? currentUser.fullname : 'Name'}</span>
                    <p className='mt-3'>{currentUser?.phone}</p>
                    <button className='btn mt-3 me-3' style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', color: 'white' }} data-bs-toggle="modal" data-bs-target="#exampleModal">Change password</button>
                    <button className='btn mt-3' onClick={logout} style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', color: 'white' }}>Log out</button>
                </div>
            </div>
            <div style={headerStyle}>
            </div>
            <div style={bodyAccountStyle}>
                {/* <!-- Modal --> */}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Change password</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    {
                                        error === '' ? '' : <div class="alert alert-danger mt-3" role="alert">
                                            {error}
                                        </div>
                                    }
                                    {
                                        success === '' ? '' : <div class="alert alert-success mt-3" role="alert">
                                            {success}
                                        </div>
                                    }
                                    <div className="text-start mb-3">
                                        <label htmlFor="currentPassword" className="form-label fw-bold">Current password</label>
                                        <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="form-control" id="currentPassword" placeholder="Enter current password" />
                                    </div>
                                    <div className="text-start mb-3">
                                        <label htmlFor="password" className="form-label fw-bold">New password</label>
                                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" placeholder="Enter new password" />
                                    </div>
                                    <div className="text-start mb-3">
                                        <label htmlFor="password2" className="form-label fw-bold">Confirm password</label>
                                        <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} className="form-control" id="password2" placeholder="Confirm password" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', color: 'white'}} class="btn btn-primary" onClick={changePassword}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <form>
                    <div className='d-flex'>
                        <div className='w-50 px-2'>
                            <div className="text-start mb-3">
                                <label htmlFor="nameUser" className="form-label fw-bold">Name</label>
                                <input type="text" value={currentUser?.fullname} onChange={(e) => setCurrentUser({ ...currentUser, fullname: e.target.value })} readOnly={!isUpdate} className="form-control" id="nameUser" placeholder="Enter your name" />
                            </div>
                            <div className="text-start mb-3">
                                <label htmlFor="phoneUser" className="form-label fw-bold">Phone number</label>
                                <input type="text" value={currentUser?.phone} onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })} readOnly={!isUpdate} className="form-control" id="phoneUser" placeholder="Enter your phone" />
                            </div>
                            {/* <div className="text-start mb-3">
                                <label htmlFor="phoneUser" className="form-label fw-bold">Mail</label>
                                <input type="email" className="form-control" id="phoneUser" placeholder="Enter your mail" />
                            </div> */}
                            <div className='d-flex pt-3'>
                                <div className="form-check me-3">
                                    <input className="form-check-input" type="radio" disabled={!isUpdate} value={true} onChange={(e) => setCurrentUser({...currentUser, gender: Boolean(e.target.value)})} checked={currentUser?.gender} name="genderUser" id="" />
                                    <label className="form-check-label" htmlFor="">
                                        Male
                                    </label>
                                </div>
                                <div className="form-check me-3">
                                    <input className="form-check-input" type="radio" disabled={!isUpdate} value={false} onChange={(e) => setCurrentUser({...currentUser, gender: !Boolean(e.target.value)})} checked={!(currentUser?.gender)} name="genderUser" id="" />
                                    <label className="form-check-label" htmlFor="">
                                        Female
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='ms-5 w-50'>
                            {/* <div className='mb-3'>
                                <label className='float-start form-label fw-bold' htmlFor="">Province</label>
                                <select className="form-select" value={currentUser?.address?.id_province} aria-label="Default select example">
                                    <option >Select Province</option>
                                    {provinces?.map((province, index) => (
                                        <option key={index} value={province._id}>{province.name}</option>
                                    ))}
                                </select>
                            </div> */}
                            {/* <div className='mb-3'>
                                <label className='float-start form-label fw-bold' htmlFor="">Districts</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option >Select Districts</option>
                                    {districts?.map((district, index) => (
                                        <option key={index} value={district._id}>{district.name}</option>
                                    ))}
                                </select>
                            </div> */}
                            {/* <div className='mb-3'>
                                <label className='float-start form-label fw-bold' htmlFor="">Commune</label>
                                <select className="form-select" aria-label="Default select example">
                                    <option >Select Commune</option>
                                    {communes?.map((commune, index) => (
                                        <option key={index} value={commune._id}>{commune.name}</option>
                                    ))}
                                </select>
                            </div> */}

                            {/* <div className="text-start">
                                <label className="form-label fw-bold" htmlFor="">
                                    Address
                                </label>
                                <input className="form-control" type="text" name="" id="" placeholder='Enter your address'/>
                            </div> */}
                        </div>
                    </div>
                    {
                        isUpdate ?
                        <>
                            <button className='btn float-start me-4' onClick={UpdateUser} style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', color: 'white'}} type='button' disabled={!isUpdate}>Submit</button>
                            <button className='btn float-start' onClick={() => setIsUpdate(false)} style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', color: 'white'}} type='button' disabled={!isUpdate}>Cancel</button>
                        </>:
                        <button className='btn float-start' onClick={() => setIsUpdate(true)} style={{ background: 'linear-gradient(180deg, #7D89FF 0%, #AB40FF 66.67%)', color: 'white'}} type='button' disabled={isUpdate}>Update</button>
                    }
                </form>
            </div>
        </div>
    )
}

export default Account