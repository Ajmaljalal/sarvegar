import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import SurveyFields from './SurveyFields';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {

  renderFields(){
    return _.map(formFields, ({label, name})=>{
      return(
        <Field key={name} type='text' component={SurveyFields} label={label} name={name} />
      )
    })
    
  }


  render() {
    return (
      <div>
        <h5 style={{marginBottom: '35px'}}>Please fill out the fields bellow to create a new survey!</h5>
        <form onSubmit ={this.props.handleSubmit(this.props.onClickNext)}>
            {this.renderFields()}

            <Link to='/dashboard' className='red btn-flat left white-text'>
              Cancel
              <i className='material-icons right'>close</i>
            </Link>
            <button type='submit' className='teal btn-flat right white-text'>
              Next
              <i className='material-icons right'>arrow_forward</i>
            </button>
        </form>
      </div>
    )
  }
}

function validate(values){
  const errors={};

  errors.recipients = validateEmails(values.recipients || '')

  _.each(formFields, ({name, error})=>{
    if(!values[name]){
      errors[name] = error;
    }
  })

  return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);
