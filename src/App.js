import React from 'react'
import { AppRouter } from './routes/AppRouter';
import './App.css'

const init = () => {
  return JSON.parse(localStorage.getItem('user')) || { logged: false };
}


export const App = () => {

  /*const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user])

  const [heroCont, setHeroCont] = useState([])*/

  return (    
      <AppRouter />
  )
}
