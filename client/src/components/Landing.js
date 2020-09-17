import React from 'react'
import {Link} from 'react-router-dom';
import connect from '../../node_modules/react-redux/lib/connect/connect';

const Landing = (props) => {
  return (
    <div style = {{textAlign: "center"}} className='landing black-text'>
      <h3>
        Sarvegar
      </h3>
      <p>You cannot ignore customers' feedback, if so why not handle it the easy way!</p>
      <p>Try our product and send 3 surveys for free now!</p>
      <Link className='dashboad_btn black-text'
          to = {props.auth ? '/dashboard' : '/'} 
          >
          {props.auth ? 'Back to Dashboard': 'Login with google account above!'}
      </Link>
    </div>
  )
}

const mapStateToProps = ({auth}) => {
  return ({auth})
}

export default connect(mapStateToProps)(Landing);