
import React, { Component } from 'react';

function LeftSide(props){

  return(
    <nav>
      <ul style={{
          paddingTop:'20px'
        }} className="nav">

          {
            props.data.map((item,index)=>{

              const active = item.active ? 'active' : '';
              return(
                <li key={index} onClick={ ()=>{ props.onClick(item) } }  className={'nav-item '+active}>
                  <span  className="nav-link" >
                    <a ><i className="fa fa-chevron-circle-right  mr-5"></i> { item.name }  </a>
                  </span>
                </li>
              )
            })
          }

      </ul>
    </nav>
  )
}

export default LeftSide;
