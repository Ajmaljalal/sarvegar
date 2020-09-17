import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';
import './CSS/index.css'


class App extends React.Component {

  componentDidMount(){
    this.props.fetchUser();
  }

  render(){
    return (
      <div className = 'gen-container'>
        <BrowserRouter>
          <React.Fragment>
            <Header />
            <div style = {{padding: '40px 0px'}} className='container'>
              <Route exact path = '/' component = {Landing} />
              <Route path = '/dashboard' component = {Dashboard} />
              <Route path = '/surveys/new' component = {SurveyNew} />
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
