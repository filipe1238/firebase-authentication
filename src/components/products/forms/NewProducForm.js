import React from 'react'

const NewProducForm = ({ handleSubmit, handleChange }) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">new product</h5>
              <form onSubmit={(e) => {
                handleSubmit(e)
              }}>

                <div className="form-floating mb-3">
                  <input
                    onChange={(e) => {
                      handleChange(e)
                    }}
                    name="product"
                    type="product"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Your product name" />
                  <label htmlFor="floatingInput">Product Name</label>
                </div>
                <div className="form-floating mb-3 row">
                  <div className="col-sm-3">
                    <input
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      name="price"
                      type="number"
                      className='form-control'
                      id="floatingValue"
                      placeholder="price" />
                  </div>
                  <label htmlFor="floatingValue" className='col'>$</label>
                  <div className="col-sm-4">
                    <input
                      onChange={(e) => {
                        handleChange(e)
                      }}
                      name="quantity"
                      type="number"
                      /*        step="1" 
                             pattern="\d+" */
                      className='form-control'
                      id="floatingValue"
                      placeholder="quantity" />
                  </div>
                  {/* <label htmlFor="floatingValue" className='col'>Qt</label> */}
                  <select
                    className='col form-control mr-3'
                    name="quantityType"
                    type="number"
                    onChange={(e) => {
                      handleChange(e)
                    }}>
                    <option defaultValue > Select</option>
                    <option >UN</option>
                    <option>L</option>
                    <option>Kg</option>
                  </select>
                </div>
                {/*     <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                  <label className="form-check-label" htmlFor="rememberPasswordCheck">
                    Remember password
                  </label>
                </div> */}
                <div className="d-grid gap-3">
                  <div className="p-2 bg-light">
                    <button className="btn btn-secondary btn-login text-uppercase fw-bold" type="submit">
                      register
                    </button>
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

export default NewProducForm