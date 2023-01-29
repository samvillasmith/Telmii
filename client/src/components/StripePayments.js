import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class StripePayments extends Component {
    render() {
        return (
        <div>
            <StripeCheckout 
                name="Telmii"
                description="$5 for 5 email camapaign tokens, each campaign token grants you to the ability to send out 1 email to your list of users."
                amount={500}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}>
                <button className="btn">Add Tokens</button>
            </StripeCheckout>
        </div>
        );
        }
    }

export default connect(null, actions)(StripePayments);