import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Landing from './Landing';
import Dashboard from './Dashboard'
import SurveyNew from './surveys/SurveyNew';
import Policies from './Policies';
import PrivateRoute from './PrivateRoute';
import { withRouter } from 'react-router-dom'
import { fetchUser } from '../actions';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth && this.props.auth !== prevProps.auth) {
      if (this.props.auth.agreed) {
        localStorage.setItem("agreed", true);
        this.props.history.push('/surveys');
      }
    }
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/policies" component={Policies} />
          <PrivateRoute exact path="/surveys" component={Dashboard} />
          <PrivateRoute path="/surveys/new" component={SurveyNew} />
        </BrowserRouter>
      </div>
    );
  }
}

function mapStateToProps({ auth }){
  return { auth };
}


export default withRouter(connect(mapStateToProps, { fetchUser })(App));

