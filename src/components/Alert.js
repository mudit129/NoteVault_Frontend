import React from 'react'

const Alert = (props) => {
    // const capitalize=(word)=>{
    //     if(word === 'danger')
    //         word = 'error';
    //     return word.slice(0,1).toUpperCase() + word.slice(1).toLowerCase();
    // }
  return (
    <>
    {
        props.alert && 
        <div style={{height:'50px'}} className={`alert alert-${props.alert.type} alert-dimmisible fade show`} role="alert">
        <strong>{props.alert.type}</strong> : {props.alert.msg}
        </div>
    }
    </>
  )
}

 export default Alert

//  