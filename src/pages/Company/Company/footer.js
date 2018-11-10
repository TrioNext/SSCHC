import React from 'react';

export default (props)=>{
    return(
      <div style={{position:'fixed',bottom:0}}>
        { props.status }
      </div>
    )
}
