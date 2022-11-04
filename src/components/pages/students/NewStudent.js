import React, { useCallback, useState } from 'react'
import { app, database } from "../../../firebaseConfig"
import { addDoc, collection  } from 'firebase/firestore';
import Alert from '../../Alert';

const CreateData = () => {
  /*   let navigate = useNavigate(); */
  const collectionRef = collection(database, 'students');

  const [data, setData] = useState({});
  const [message, setMessage] = useState('initial message, no errors')
  const [messageType, setMessageType] = useState('');
  const [isMessageVis, setMessageVis] = useState(false);
/* 
  const Alert = useCallback(() => {
    return (<Alert />)
  }, []) */

  const handleChange = (event) => {
    let newInput = { [event.target.name]: event.target.value }
    setData({ ...data, ...newInput });
  }
  const removeAlert = () => {
    setMessage('')
    setMessageType('')
    setMessageVis(false);
  }
  const showAlert = (message, type) => {
    setMessage(message);
    setMessageType(type);
    setMessageVis(true);
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    addDoc(collectionRef,
      {
        user: data.user,
        password: data.password
      }
    ).then(() => {
      showAlert('Data Added', 'info')
    }).catch((err) => {
      showAlert(err.message, 'danger')
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">new student</h5>
              <form onSubmit={(e) => {
                handleSubmit(e)
              }}>
                <div className="form-floating mb-3">
                  <input
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    name="user"
                    type="user"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Your user" />
                  <label htmlFor="floatingInput">User Name</label>
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
                      register
                    </button>
                  </div>
                  <div>
                    {isMessageVis && <Alert type={messageType} message={message} removeAlert={removeAlert} />}
                  </div>
                </div>

                <hr className="my-4" />

              </form>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateData