import { createContext } from 'react'

const userStr = localStorage.getItem('_user')
let user;
try {
    user = JSON.parse(userStr)
} catch (e) {
    user = null
}

const UserContext = createContext(user);

export default UserContext;