import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Switch } from 'react-router-dom';
import Navbar from './components/User/navbar/Navbar';
import Category from './components/User/category/Category';
import Footer from './containers/footer/Footer';
import ProductAdmin from './components/Admin/productAdmin/ProductAdmin';
import SideBarAdmin from './components/Admin/sideBarAdmin/SideBarAdmin';
import SignUp from './components/User/signUp/SignUp';
import HeaderMainPage from './components/User/headerHomePage/HeaderHomePage';
import Login from './components/User/Login/Login';
import Home from './components/User/home/Home';
import AboutUs from './components/User/aboutUs/AboutUs';
import Account from './components/User/account/Account';
import ItemDetail from './components/User/itemDetail/ItemDetail';
import { useEffect } from 'react'
import axios from '../src/api/axios'
import useAuth from './hook/useAuth';
import Carts from './components/User/carts/Carts';
import CheckOut from './components/User/checkOut/CheckOut';
import Status from './components/User/status/Status';
import ForgotPW from './components/User/forgotPW/ForgotPW';

function App() {
  const GET_USER_URL = '/api/v1/web/users';
  const INSERT_CART_URL = '/api/v1/web/cart/'
  const { auth, authAction, cart, cartAction } = useAuth()
  useEffect(() => {
    async function getUser() {
      const accessToken = localStorage.getItem('token')
      if (accessToken) {
        try {
          authAction({ type: 'setLoading', payload: true });
          const respone = await axios.get(GET_USER_URL,
            {
              headers: {
                token: accessToken
              }
            }
          );
          authAction({ type: 'setCurrentUser', payload: respone?.data?.user })
          authAction({ type: 'setLoading', payload: false })
        } catch (error) {
          console.log(error);
          authAction({ type: 'setError', payload: true })
        }
      }
    }
    const getCart = async () => {
      const URL = '/api/v1/web/cart/'
      const accessToken = localStorage.getItem('token')
      try {
        if (accessToken) {
          const response = await axios.get(URL,
            {
              headers: {
                token: accessToken
              }
            }
          )
          cartAction({ type: 'setCurrentCart', payload: response.data.cart.product })
        }
      } catch (error) {
        console.log(error)
      }
    }
    getUser();
    getCart();
    return {

    };
  }, [])


  return (
    <div className="App">
      <Navbar />
      <div style={{ height: '70px' }}></div>
      {/* <Category/> */}
      {/* <div className='row w-100'>
        <SideBarAdmin />
        <ProductAdmin />
      </div> */}
      {/* <SignUp/> */}
      {/* <HeaderMainPage /> */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Category' element={<Category />} />
        <Route path='/Category/:catergoryId' element={<Category />} />
        <Route path='/Category/:catergoryId/:keyword' element={<Category />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/ForgotPW' element={<ForgotPW />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/Account' element={<Account />} />
        <Route path='/Status' element={<Status />} />
        <Route path='/Status/:type' element={<Status/>}/>
        <Route path='/Carts' element={<Carts />} />
        <Route path='/CheckOut' element={<CheckOut />} />
        <Route path='/Category/ItemDetail/:product' element={<ItemDetail />} />
        <Route path='/Category/*' element={<ItemDetail />} />
        <Route path='/ItemDetail/:product' element={<ItemDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
