import React from 'react'

const ReadDataHeader = ({data, handleChange, handleSearch}) => {
  return (
    <div className="container">
      <div className="p-2 row justify-content-md-left">
        <div className="col-md-auto">
          <p>Click to Update List</p>
        </div>
        <div className="col-md-auto">
          <select onChange={(e) => {
            handleChange(e)
          }}
            className="form-select mb-2"
            name="currentTable">

            <option defaultValue>Student</option>
            <option>One</option>
          </select>
        </div>
        <div className="col-md-auto">
          <button className="btn btn-outline-dark" onClick={handleSearch}>Update</button>
        </div>
        <div className="col-md-auto">
          <p>{data.currentTable} <strong>Selected</strong> </p>
        </div>
      </div>
      
    </div>
  )
}

export default ReadDataHeader