import React from 'react'

function ErrorMessage({errorMessage}) {
  return (
    <p className='p-2 alert alert-danger text-center'>{errorMessage}</p>
  )

}

export default ErrorMessage