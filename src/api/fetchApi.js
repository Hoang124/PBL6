import axios from "./axios";

export const loginReq = async ({ email, password }) => {
    const data = {email, password}
    try {
        const response = await axios.post(LOGIN_URL,
            JSON.stringify(data),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                }
            }
        );
        const data = response?.data
        console.log('data', data)
        dispatch({ type: 'setCurrentUser', payload: data })
        localStorage.setItem('token', data.token)
        navigate('/')
    }
    catch (error) {
        console.log(error)
    }
}

export const registerReq = async ({}) => {

}
