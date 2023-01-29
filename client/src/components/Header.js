import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import StripePayments from './StripePayments';
import React, { Component } from 'react';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return (
                    <li><a href="/auth/google"><img src="../../btn_google_signin_light_normal_web.png" alt="sign in with Google" style={{paddingTop: '10px'}} /> </a></li>
                );
            default:
                if (this.props.location.pathname !== '/policies') {
                    return [
                        <li key="1"><StripePayments /></li>,
                        <li key="3" style={{margin: '0 10px'}}>Tokens: {this.props.auth.tokens}</li>,
                        <li key="2"><a href="/api/logout">Logout</a></li>
                    ];
                } else {
                    return <li key="2"><a href="/api/logout">Logout</a></li>
                }
        } 
    }
    render() {
        return (
            <nav>
                <div className="nav-wrapper black">
                    {this.props.location.pathname !== '/policies' ? 
                    <Link className="left brand-logo" 
                    to={this.props.auth ? '/surveys' : '/'}
                    >
                        <img src="../../telmii-alt3.png" alt="logo" style={{height: '65px', width: '65px', padding: '2px', paddingRight: '20px', paddingBottom: '20px', marginRight: '5px', marginBottom: '5px', marginLeft: '5px', marginTop: '5px'}}/>
                    </Link>
                    : null}
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        );
    } 
    };

function mapStateToProps({ auth }){
    return { auth };
}

export default withRouter(connect(mapStateToProps)(Header));
