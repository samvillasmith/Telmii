import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const agreed = JSON.parse(localStorage.getItem('agreed'));
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  return (
    <Route
      {...rest}
      render={props => {
        if (agreed && isLoggedIn) {
          return <Component {...props} />
        } else {
          return <Redirect to='/policies' />
        }
      }}
    />
  )
}


function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(PrivateRoute);
