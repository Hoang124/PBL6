import axios from "axios";

export default axios.create({
    // baseURL: 'http://103.197.184.17:3002'
    // baseURL: 'http://188.166.245.252:3002',
    baseURL: 'http://206.189.146.194:3002',
    headers: {
        'Content-Type': 'application/json',
    }
})