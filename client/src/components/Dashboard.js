import React from 'react'
import { Link } from 'react-router-dom';
import connect from '../../node_modules/react-redux/lib/connect/connect';
import SurveyList from './SurveyList';


const Dashboard = (props) => {

  // checkTrail checks if the user has enough credits (at least 1) and already used the trial version(sent out 3 surveys for free)
  const checkTrail = () => {
    if (props.auth) {
      if (props.auth.credits < 1 && props.surveys.length >= 3) {
        return 'btn-floating btn-large green darken-3 disabled';
      } else {
        return 'btn-floating btn-large green darken-3';
      }
    }
  }

  // renderMessange returns a message to let the user if he/she has enought credits
  const renderMessage = () => {
    if (props.auth) {
      if (props.auth.credits < 1 && props.surveys.length >= 3) {
        return <p style={{ color: 'white', border: '1px solid red', backgroundColor: 'red', textAlign: 'center', padding: '10px', borderRadius: '5px' }}>You do not have credits and your trail version has been ended. Please buy some credits to send surveys!</p>
      } else {
        return '';
      }
    }
  }

  // renderProfile renders the profile of the user, avatar, email and name
  const renderProfile = () => {
    if (props.auth) {
      return (
        <div className='profile'>
          <img src={props.auth.imageURL} alt='ajmaljalal' />
          <div className='profile_name'>
            <p style={{ fontWeight: 'bold' }}>{props.auth.name}</p>
            <p>{props.auth.email}</p>
          </div>
        </div>
      )
    }
  }


  return (
    <div className='dashboard_wrapper'>

      {renderMessage()}  {/**** renders the alert about credits here*****/}

      <div className='profile-container'>
        <h3>Welcome! </h3>
        {renderProfile()} {/**** renders the profile here*****/}
      </div>

      <SurveyList />

      <div className='fixed-action-btn'>
        <Link to='/surveys/new' className={checkTrail()}>
          <i className='material-icons'>add</i>
        </Link>
      </div>
    </div>
  )
}

const mapStateToProps = ({ auth, surveys }) => {
  return ({ auth, surveys })
}

export default connect(mapStateToProps)(Dashboard);
