import React, { useCallback, useState } from 'react'
import { app, database } from "../../firebaseConfig"
import { addDoc, collection } from 'firebase/firestore';
import Alert from '../Alert';
import NewProducForm from './forms/NewProducForm';

const NewProduct = () => {
  /*   let navigate = useNavigate(); */
  const collectionRef = collection(database, 'products');

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
        product: data.product,
        price: data.price,
        quantity: data.quantity,
      }
    ).then(() => {
      showAlert('Data Added', 'info')
    }).catch((err) => {
      showAlert(err.message, 'danger')
    })
  }

  return (
    <>
      <NewProducForm handleSubmit={handleSubmit} handleChange={handleChange} />
      <div>
        {isMessageVis && <Alert type={messageType} message={message} removeAlert={removeAlert} />}
      </div>
    </>

  )
}

export default NewProduct