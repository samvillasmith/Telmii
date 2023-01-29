import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';


class SurveyList extends Component  { 
    componentDidMount(){
        this.props.fetchSurveys();
    }

    renderSurveys(){
        return this.props.surveys.reverse().map(survey => {
            return(
                <div className="card teal lighten-4" key={survey._id}>
                    <div className="card-content">
                        <span clasSName="card-title"><strong><u>{survey.title}</u></strong></span>
                        <p><strong>Survey Question:</strong> {survey.body}</p>
                        <p><strong>Sending Organization:</strong> <i>{survey.from}</i></p>
                        <p className="right">
                        <strong>Sent On:</strong> {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <a style={{color:"green"}}><strong>Yes: {survey.yes}</strong></a>
                        <a style={{color:"red"}}><strong>No: {survey.no}</strong></a>
                    </div>
                </div>
            )
        })
    }

    render(){
        return(
            <div>
                {this.renderSurveys()}
            </div>
        );
    }
}

function mapStateToProps({ surveys }) {
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);