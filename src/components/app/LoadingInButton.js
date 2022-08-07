import React from 'react'

export const LoadingInButton = ({isLoading, btnText}) => {
    
  return (
    <>
      {(() => {
            switch(isLoading) {
                case true:
                    return <i className="fas fa-circle-notch fa-spin"></i>
                case false:
                    return <label>{btnText}</label>
                default:
                    return <label>{btnText}</label>
            }
      })()}
    </>
  )
}
