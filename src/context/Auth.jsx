import React, { createContext, useContext, useEffect, useState } from 'react'

const Auth = createContext()
const initialState = { isAuth: false, user: {} }

const AuthContext = ({ children }) => {
  const [isAppLoading, setIsAppLoading] = useState(true)
  const [state, setState] = useState(initialState)

  const readProfile = () => {
    // const user = { name: 'Awais', age: 16, email: 'awais.developer22@gmail.com', password: '123456' }
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      setState({ isAuth: true, user })

    }
    setTimeout(() => {
      setIsAppLoading(false)
    }, 800)
  }

  useEffect(() => {
    readProfile()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setState(initialState)
  }

  return (
    <Auth.Provider value={{ ...state, isAppLoading, handleLogout, dispatch: setState }}>
      {children}
    </Auth.Provider>
  )
}

export default AuthContext
export const useAuth = () => useContext(Auth)