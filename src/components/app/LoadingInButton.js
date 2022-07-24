import React from 'react'

export const LoadingInButton = ({isLoading, btnText}) => {
    
  return (
    <>
      {(() => {
            switch(isLoading) {
                case true:
                    return <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                case false:
                    return <label>{btnText}</label>
                default:
                    return <label>{btnText}</label>
            }
      })()}
    </>
  )
}
