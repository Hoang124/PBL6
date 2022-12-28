const authState = {
    currentUser: null,
    loading: false,
    error: false
}

function authReducer(state, action){
    switch(action.type){
        case 'setCurrentUser': 
            return{
            ...state, currentUser: action.payload
            }
        case 'setLoading':
            return{
                ...state, loading: action.payload
            }
        case 'setError': 
            return{
                ...state, error: action.payload
            }
        default: 
            throw new Error()
    }
}

export {authState}
export default authReducer