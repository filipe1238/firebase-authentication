import React, { useEffect, useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import { BsGoogle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Alert from '../Alert';
import { app } from "../../firebaseConfig"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import '../styles.css';
import { type } from '@testing-library/user-event/dist/type';

function Login({ setShowNav }) {
  let auth = getAuth(app);
  let googleProvider = new GoogleAuthProvider(app)
  let navigate = useNavigate();
  const [data, setData] = useState({});
  const [message, setMessage] = useState('initial message, no errors')
  const [messageType, setMessageType] = useState('');
  const [isMessageVis, setMessageVis] = useState(false);

  useEffect(() => {
    setShowNav(false);
  }, []);

  const removeAlert = () => {
    setMessage('')
    setMessageType('')
    setMessageVis(false);
  }
  const showAlert = (message, type) => {
    setMessage(message)
    setMessageType(type)
    setMessageVis(true);
  }
  const resetPassword = (event, email) => {
    event.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then((response) => {
        showAlert(response.message, 'success')
      })
      .catch((error) => {
        showAlert(error.message, 'danger')
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }


  const handleChange = (event) => {
    let newInput = { [event.target.name]: event.target.value }
    setData({ ...data, ...newInput });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    /* use 'createUserWithEmailAndPassword' for registrations */
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        /*    const stringifiedPerson = localStorage.getItem('user'); */
        const personAsObjectAgain = JSON.parse(localStorage.getItem('user'));
        setShowNav(true);
        navigate("/");
      })
      .catch((err) => {
        showAlert(err.message, 'danger');
      })
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <form onSubmit={(e) => {
                handleSubmit(e)
              }}>
                <div className="form-floating mb-3">
                  <input
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    name="email"
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    name="password"
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password" />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                  <label className="form-check-label" htmlFor="rememberPasswordCheck">
                    Remember password
                  </label>
                </div>
                <div className="d-grid gap-3">
                  <div className="p-2 bg-light">
                    <button className="btn btn-secondary btn-login text-uppercase fw-bold" type="submit">
                      Sign in
                    </button></div>
                  <div>
                    {isMessageVis && <Alert message={message} type={messageType} removeAlert={removeAlert} />}
                  </div>
                {/*   <div>
                    <p>Or choose</p>
                  </div>
                  <div className="row justify-content-left">
                    <button className="col-md-1 nav-btn"><BsGoogle type='nav-icons' /></button>
                  </div> */}
                </div>

                <hr className="my-4" />
                {/*  <div className="d-grid mb-2">
                  <button className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                    <i className="fab fa-google me-2"></i> Sign in with Google
                  </button>
                </div>
                <div className="d-grid">
                  <button className="btn btn-facebook btn-login text-uppercase fw-bold" type="submit">
                    <i className="fab fa-facebook-f me-2"></i> Sign in with Facebook
                  </button>
                </div> */}
              </form>

              <div><a href="/resetpassword" class="link-secondary">forgot password ?</a></div>
              <a href="/home" className='link-secondary'><GoArrowLeft className='icon-backarrow' /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login