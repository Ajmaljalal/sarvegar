import React, { Component } from 'react'
import {connect} from 'react-redux';
import ReactChartkick, { PieChart } from 'react-chartkick'
import Chart from 'chart.js'
import {fetchSurveys} from '../actions';
import './CSS/survey.css';

ReactChartkick.addAdapter(Chart)
PieChart.options = {
    colors: ["#b00", "#666"]
  }

class SurveyList extends Component {

    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderChart(yes, no){
        if(yes > 0 || no > 0){
            return <PieChart data={[["Yes", yes], ["No", no]]} download={true} legend="left"/>
        } else {
            return <p>No response yet!</p>
        }
    }

    renderSurveys(){
        if(this.props.surveys.length > 0){

            return this.props.surveys.reverse().map(survey => {
                return (
                    <div className="card hoverable">
                        <div className="card-content">
                            <span className="card-title green darken-3 white-text">{survey.title}</span>
                            <div className ='card-body'>
                                <p>{survey.body}</p>
                                <p className = 'right'>Sent on: {new Date(survey.dateSent).toLocaleDateString()}</p> <br/>
                                <p className='right'>Last resoponded: {new Date(survey.lastResponded).toLocaleDateString()}</p>
                            </div>
                        </div>
                        
                        
                        <div className="card-action center">
                            {this.renderChart(survey.yes, survey.no)}
                        </div>
                    </div>
                );
            })
        } else {
            return (
                <div> <p>You do not have any survey sent yet, pleas click the <strong>+</strong> button down bellow to start sending a survey.</p></div>
            )
        }
    }


    render() {
        return (
        <div>
            <h4>Sent Surveys:</h4>
            {this.renderSurveys()}
        </div>
        )
    }
}

function mapStateToProps(state){
    return {
        surveys: state.surveys,
    }
}

export default connect(mapStateToProps, {fetchSurveys})(SurveyList);
