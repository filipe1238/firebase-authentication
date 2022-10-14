import { doc, getDoc, updateDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { GoArrowLeft } from 'react-icons/go';
import { useParams } from 'react-router-dom'
import { database } from '../firebaseConfig';
import Alert from './Alert';
import UpdateForm from './forms/UpdateForm';
import Loading from "./extra components/Loading";

const readDocument = async (docRef, SetOldStudent, SetNewStudent, setLoading) => {
  try {
    const docSnap = await getDoc(docRef);
    SetOldStudent(docSnap.data());
    SetNewStudent(docSnap.data());
    setLoading(false);
  } catch (error) {
    console.log(error)

  }
}
const UpdateStudent = () => {
  const [message, setMessage] = useState('initial message, no errors')
  const [messageType, setMessageType] = useState('');
  const [isMessageVis, setMessageVis] = useState(false);
  const [oldStudent, SetOldStudent] = useState({});
  const [newStudent, SetNewStudent] = useState({});
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

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
  const docRef = useMemo(() => {
    return doc(database, "students", id);
  }, [id]);

  useEffect(() => {
    readDocument(docRef, SetOldStudent, SetNewStudent, setLoading);
  }, [docRef]);

  const handleChange = (event) => {
    let newInput = { [event.target.name]: event.target.value }
    SetNewStudent({ ...newStudent, ...newInput });
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    /* old value, and new one, to update the docRef (old) */
    updateDoc(docRef, newStudent)
      .then(() => {
        showAlert('Data Updated', 'info');
      }).catch((err) => {
        alert(err.message);
      })

  }

  return (
    <article className="App">
      <section className="card">
        <div className="container">
          <div className="p-2">
            {/*    <p>new user: {newStudent.user}</p> */}
            <a href="/readdata" className='link-secondary'><GoArrowLeft className='icon-backarrow' /></a>
            <h3>Update for student '{oldStudent.user}' its id is: '{id}'</h3>
            {isLoading ? <Loading /> :
              <UpdateForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                newData={newStudent}
                isMessageVis={isMessageVis}
                messageType={messageType}
                message={message}
                removeAlert={removeAlert}
              />
            }
          </div>
        </div>
      </section>
    </article >

  )
}

export default UpdateStudent