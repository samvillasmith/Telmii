import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import SurveyList from './surveys/SurveyList';

const Dashboard = () => {
  const auth = useSelector(state => state.auth);
  const history = useHistory();
  const agreed = JSON.parse(localStorage.getItem('agreed'));
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    if (auth && !agreed) {
      history.push('/policies');
    }
  }, [auth, history, agreed]);

  return (
    <div>
      {showAlert && 
        <div className="alert-box">
          <p><strong><u>This is a test version of Telmii.</u></strong>
          <br />
          <strong>Please do <u>not</u> use your real credit card details.</strong>
          <br />
          <br />
          Please when attempting to order tokens, put in the following test credit card details:
          <br />
          <br />
          <strong>Email</strong>: Your Email Address
          <br />
          <strong>Card Number</strong>: 4242 4242 4242 4242
          <br />
          <strong>Expiry Date</strong>: 04/29
          <br />
          <strong>CVC:</strong> 242
          </p>
          <button onClick={() => setShowAlert(false)}>Dismiss</button>
        </div>
      }
      <SurveyList />
        <div className="floating-action-btn" style={{ position: 'fixed', bottom: '20px', right: '20px' }}>
            <Link to="/surveys/new" class="btn-floating btn-large waves-effect waves-teal">
            <i class="material-icons">edit</i>
            </Link>
        </div>
    </div>
  );
}

export default Dashboard;
