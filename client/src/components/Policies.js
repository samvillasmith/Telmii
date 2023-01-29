import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import PoliciesText from './PoliciesText';
import { useDispatch } from 'react-redux';
import * as actions from '../actions';

function Policies() {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();
 
  useEffect(() => {
    const agreed = JSON.parse(localStorage.getItem('agreed'));
    const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (agreed && isLoggedIn) {
      setRedirect(true);
    }
  }, []);


  const handleAgree = async () => {
    await fetch('/api/agree', {
        method: 'POST',
        credentials: 'include',
    });
    dispatch(actions.agree());
    dispatch(actions.fetchUser());
    window.location.href = '/surveys';

    // Save the agreement in local storage
    localStorage.setItem('agreed', true);
    localStorage.setItem('isLoggedIn', true);

    setRedirect(true);
  }

  if (redirect) {
    return <Redirect to='/surveys' />
  }
  return (
      <div>
          <PoliciesText />
          <div>
              <button onClick={handleAgree}>Agree</button>
          </div>
      </div>
  );
}


export default Policies;

