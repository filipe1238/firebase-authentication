import React from 'react'
import Alert from '../Alert'


const UpdateForm = ({ handleSubmit, handleChange, newData, isMessageVis, messageType, message, removeAlert }) => {
  return (
    <form onSubmit={(e) => {
      handleSubmit(e)
    }}>
      {Object.entries(newData).sort().map(([key, value]) => {
        return <div key={`form-${key}`} className="mb-3">
          <label className="form-label">Student's {key}</label>
          <input type="user" onChange={(e) => {
            handleChange(e)
          }} name={key} defaultValue={value} className="form-control" aria-describedby="emailHelp" />
        </div>
      })}
      <div>
        {isMessageVis && <Alert type={messageType} message={message} removeAlert={removeAlert} />}
      </div>
      <button type="submit" className="btn btn-secondary btn-login text-uppercase fw-bold">update</button>
    </form >

  )
}

export default UpdateForm