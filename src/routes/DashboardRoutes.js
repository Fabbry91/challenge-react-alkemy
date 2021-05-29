import React, { Fragment } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { HeroScreen } from '../components/heroes/HeroScreen'
import { Home } from '../components/Home'
import { Navbar } from '../components/ui/Navbar'
import { Search } from '../components/ui/Search'

export const DashboardRoutes = () => {
    return (
        <Fragment>
            <Navbar />
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/hero/:heroId" component={HeroScreen} />
                    <Route exact path="/search" component={ Search } />
                    
                    <Redirect to="/" />
                </Switch>
            </div>
        </Fragment>
    )
}
