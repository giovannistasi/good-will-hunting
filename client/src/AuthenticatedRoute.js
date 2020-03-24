import React from "react"
import { Route, Redirect } from "react-router-dom"

function AuthenticatedRoute ({component: Component, loggedIn, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => loggedIn === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

export default AuthenticatedRoute;