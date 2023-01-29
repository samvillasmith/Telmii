import _ from 'lodash';
import react from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => { 
    const reviewFields = _.map(formFields, ({ name, label }) => { 
        return(
            <div key={name}>
                <label>{label}</label>
                <div>
                {formValues[name]}
                </div>
            </div>
        );
    });
    return (
        <div>
            <h5>Please review before sending</h5>
                {reviewFields}
                <button 
                    className="red btn-flat white-text"
                    onClick={onCancel}>
                    Back
                </button>
                <button 
                    onClick={() => submitSurvey(formValues, history)}
                    className="teal btn-flat right white-text"
                    >Send
                    <i className="material-icons right">send</i>
                    </button>
        </div>
    );
};

function mapStateToProps(state) { 
    return { formValues: state.form.surveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));