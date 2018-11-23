
import React from 'react';
import { Input } from 'reactstrap';


/*
props :
  modal : controller class
    onHourChange()

  selected : code
*/

function SelectMinute(props){

  const modal = props.modal ;

  let list = [] ;
  for(let i=0 ; i < 60 ; i++){
    const num = i < 10 ? '0'+i : i

    list.push(<option key={i} value={ i } > {  num +' phút' } </option>)
  }

  return(
    <Input onChange={(e)=>{  modal.onMinuteChange(props.type, e)  }}  type="select" defaultValue={ props.selected }>
      {list}
    </Input>
  )

}

export default SelectMinute;
