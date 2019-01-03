
import React, { Component } from 'react';
import {  Input } from 'reactstrap';

/*
SelectDist
  props
    modal : controller class
        listDistrict:[]
        onChangeDist()

    selected: string
*/
function SelectDist(props){


  const modal = props.modal ;

  let list = [];


  props.subregions.map((item)=>{
    list.push(<option id={item.id} key={item.id} value={ item.code } > { item.name_with_type } </option>)
  })

  return(
    <Input onChange={ (e)=>{  modal.onChangeDist(e)  } }  type="select" defaultValue={ props.selected }>
      {list}
    </Input>
  )
}

export default SelectDist ;
