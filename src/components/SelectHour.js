
import React, { Component } from 'react';

import { Input } from 'reactstrap';


/*
props :
  modal : controller class
    onHourChange()

  selected : code
*/

function SelectHour(props){

  const modal = props.modal;

  let list = [] ;
  for(let i=0 ; i < 24 ; i++){
   const num = i < 10 ? '0'+i : i
   list.push(<option key={i} value={ i }  > {  num +' giờ' } </option>)
  }

  return(
    <Input onChange={(e)=>{ modal.onHourChange(props.type, e) }}  type="select" defaultValue={ props.selected }>
      {list}
    </Input>
  )
}

export default SelectHour;
