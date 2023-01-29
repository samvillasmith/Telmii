import { combineReducers } from 'redux';
import authReducer from './authReducer';
import { reducer as reduxForm } from 'redux-form';
import surveysReducer from './surveysReducer';

const agreedReducer = (state = false, action) => {
    switch(action.type) {
        case 'AGREE':
            return true;
        case 'DISAGREE':
            return false;
        default:
            return state;
    }
}

export default combineReducers({
    auth: authReducer,
    form: reduxForm,
    surveys: surveysReducer,
    agreed: agreedReducer
});
