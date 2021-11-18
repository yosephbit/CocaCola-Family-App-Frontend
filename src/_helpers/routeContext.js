import { createContext } from 'react'

const pathStr = localStorage.getItem('_path')

const RouteContext = createContext(pathStr);

export default RouteContext;