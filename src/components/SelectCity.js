import React, { Component } from 'react';
import { Input } from 'reactstrap';

/*
props :
  controller class
    listCity:[]
    onChangeCity

  selected : code
*/

function SelectCity(props){

  let list = [] ;
  const modal = props.modal;

  modal.listCity.map((item)=>{
    list.push(<option id={item.id} value={item.code} key={item.id} > { item.name } </option>)
  })

  return(
    <Input onChange={ (e)=>{  modal.onChangeCity(e)  } }  type="select" defaultValue={ props.selected }>
      {list}
    </Input>
  )
}

export default SelectCity;
