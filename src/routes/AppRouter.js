import React, { useContext } from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { Login } from '../components/auth/Login'
import { HeroScreen } from '../components/heroes/HeroScreen'
import { Home } from '../components/Home'
import { Navbar } from '../components/ui/Navbar'
import { Search } from '../components/ui/Search'
import { UserContext } from '../context/UserContext'
import { DashboardRoutes } from './DashboardRoutes'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'


export const AppRouter = () => {

    const { user } = useContext(UserContext);

    return (
        <Router>
            <div>
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/hero/:heroId" component={HeroScreen} />
                        <Route exact path="/search" component={Search} />

                        <Redirect to="/" />
                    </Switch>
                </div>                
            </div>
        </Router>
    )
}
