import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../actions';
import { connect } from 'react-redux';

class Payments extends Component {
  render() {
    return (
      <div>
        <StripeCheckout
            name = 'Sarvergar'
            description = '$10 for 100 emails'
            amount = {500}
            token  = {token => this.props.handleToken(token)}
            stripeKey = {process.env.REACT_APP_STRIPE_KEY}
        >
            <button className = 'btn'>Add Credit</button>
        </StripeCheckout>
        
      </div>
    )
  }
}
export default connect(null, actions)(Payments);