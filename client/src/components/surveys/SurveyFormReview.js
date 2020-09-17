import _ from 'lodash';
import React from 'react'
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import formFields from './formFields';
import * as actions from '../../actions';

const SurveyFormReview= ({onCancel, formValues, submitSurvey, history}) => {
  const reviewFields = _.map(formFields, ({name, label}) => {
    return(
      <div key={name} style={{marginBottom: '30px'}}>
        <label style={{fontSize:'14px', fontWeight: 'bold', color: 'black'}}>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    )
  });


  return (
    <div>
      <h5 style={{marginBottom: '25px'}}>Please review your entries!</h5>
      {reviewFields}
      <button
        className='red btn-flat white-text left'
        onClick={onCancel}
      >
        Back
        <i className='material-icons left'>arrow_back</i>
      </button>

      <button
        className='teal btn-flat white-text right'
        onClick ={()=>submitSurvey(formValues, history)}
      >
        Send Survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  )
}

function mapStateToProps(state){
  return{
    formValues: state.form.surveyForm.values,
  }

}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview))
