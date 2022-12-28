import { useReducer, createContext } from "react";
import authReducer, {authState} from "./authReducer";
import cartReducer, { cartState } from "./cartReducer";

const AuthContext = createContext({})

export const AuthProvider= ({children}) => {

    const [auth, authAction] = useReducer(authReducer, authState)
    const [cart, cartAction] = useReducer(cartReducer, cartState)

    return(
        <AuthContext.Provider value={{auth, authAction, cart, cartAction}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext