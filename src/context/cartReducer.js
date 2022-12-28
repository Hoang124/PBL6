import { stringify } from "query-string"
import axios from "../api/axios"
const cartState = {
    currentCart: [],
    loading: false,
    error: false
}

function cartReducer(state, action) {
    switch (action.type) {
        case 'addCart':
            addCart(action.payload)
            return state
        // break;
        case 'updateCart':
            let listCart = [...state.currentCart]
            for (let i = 0; i < listCart.length; i++) {
                if (listCart[i].slug === action.payload.slug) {
                    listCart[i] = { ...action.payload }
                }
            }
            return {
                ...state, currentCart: [...listCart]
            }
        case 'deleteCart':
            return {
                ...state, currentCart: [...state.currentCart.filter(cart => cart.slug !== action.payload)]
            }
        case 'setCurrentCart':
            return {
                ...state, currentCart: [...action.payload]
            }
        case 'setLoading':
            return {
                ...state, loading: action.payload
            }
        case 'setError':
            return {
                ...state, error: action.payload
            }
        default:
            throw new Error()
    }
}

async function addCart(slug, product) {
    const URL = '/api/v1/web/cart/insert'
    const cart = { ...product }
    console('cartReducerProduct', cart)
    const accessToken = localStorage.getItem('token')
    try {
        if (accessToken) {
            const response = await axios.post(URL, JSON.stringify(cart),
                {
                    headers: {
                        token: accessToken
                    }
                }
            )
        }
    } catch (error) {
        console.log(error)
    }
}

async function updateCart(cart) {

}

async function deleteCart(id) {

}

async function getCart() {
    const URL = '/api/v1/web/cart/'
    const accessToken = localStorage.getItem('token')
    var response = null
    try {
        if (accessToken) {
            response = await axios.get(URL,
                {
                    headers: {
                        token: accessToken
                    }
                }
            )
            console.log('getCart', response)
            // return response
        }
    } catch (error) {
        console.log(error)
    }
    return response
}

export { cartState }
export default cartReducer