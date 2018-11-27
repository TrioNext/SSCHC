
import React, { Component} from 'react';

import Office from './Office';
import Store from './Store';
import User from './User';



class CompanyBody extends Component{

  constructor(props){
    super(props);


    this.name = 'Company Main';
    this.info = {}

    this.data = {
      offices:[],
      stores:[],
      users:[]
    }

    this.state = {
      onTab:props.onTab,
      onAction:'',
      status:'',

    }

  }

  setData(name,value){
    this.data[name] = value;
  }

  onStateChange(newState){

      /*keep private data*/
      Object.assign(this.state,newState);
      /* share gia tri cho parent component dùng  : để parent react component*/
      this.props.onStateChange(this.state);
      

  }

  onDataChange(newData){

      //alert(JSON.stringify(newData));
      //this.setData(type,newData);
      this.props.onDataChange(newData);

  }



  render(){

    const onTab = this.props.onTab ;
    const onAction = this.props.onAction;


    return(
      <div className="detail" >

        <Office onStateChange={ (newState)=>{ this.onStateChange(newState) } } onDataChange={ (newData)=>{ this.onDataChange(newData) } } onTab={onTab} onAction={ onAction } />
        <Store onStateChange={ (newState)=>{ this.onStateChange(newState) } } onDataChange={ (newData)=>{ this.onDataChange(newData) } }  onTab={onTab} onAction={onAction} />
        <User onStateChange={ (newState)=>{ this.onStateChange(newState) } } onDataChange={ (newData)=>{ this.onDataChange(newData) } } onTab={onTab} onAction={onAction} />

      </div>
    )
  }
}

export default CompanyBody
