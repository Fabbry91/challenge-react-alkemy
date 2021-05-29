import React, { useEffect, useReducer, useState } from 'react'
import { UserContext } from './context/UserContext';
import { authReducer } from './reducer/authReducer';
import { AppRouter } from './routes/AppRouter';
import './App.css'

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false };
}


export const App = () => {

  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user])

  const [heroCont, setHeroCont] = useState([])

  return (
    <UserContext.Provider value={{ heroCont, setHeroCont, user, dispatch, }}>
      <AppRouter />
    </UserContext.Provider>
  )
}
