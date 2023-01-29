import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
    //Parent component for SurveyForm
    state = { formReviewVisible: false };
    renderContent() { 
        if (this.state.formReviewVisible) {
            return <SurveyFormReview 
            onCancel={() => this.setState({ formReviewVisible: false })} />
        }
        return <SurveyForm 
        onSurveySubmit={() => this.setState({ formReviewVisible: true })} />
    }
    render() {
        return (
        <div>
            {this.renderContent()}
        </div>
        );
    }
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);