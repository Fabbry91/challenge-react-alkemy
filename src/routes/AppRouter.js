import React, { useContext } from 'react'
import { BrowserRouter as Router,Switch } from 'react-router-dom'
import { Login } from '../components/auth/Login'
import { UserContext } from '../context/UserContext'
import { DashboardRoutes } from './DashboardRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'


export const AppRouter = () => {
    const { user } = useContext(UserContext);
    return (

        <Router>
            <div>
                <Switch>
                    <PublicRoute 
                    exact
                    path="/login"
                    component={Login}
                    isAuthenticated={user.logged}/>
                    
                    <PrivateRoute
                        path="/"
                        component={DashboardRoutes}
                        isAuthenticated={user.logged} />
                </Switch>
            </div>
        </Router>
    )
}
