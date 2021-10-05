import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { Routes } from './routes'
import { MAIN_ROUTE } from './utils/consts'

const AppRouter = () => {
    const routes = Routes
    return (
        <Switch>
            {routes.map(({ path, Component }) => (
                <Route key={path} path={path} component={Component} exact />
            ))}
            <Redirect to={MAIN_ROUTE} />
        </Switch>
    )
}

export default AppRouter
