
import React, { Component} from 'react';

import Office from '../Office/Office';
import Store from '../Store/Store';
import User from '../User/User';



class CompanyBody extends Component{

  constructor(props){
    super(props);


    this.name = 'Company Main';

    this.data = {
      offices:[],
      stores:[],
      users:[]
    }

    this.state = {
      onTab:'',
      onAction:'',
      status:'',

    }

  }

  setData(name,value){
    this.data[name] = value;
  }

  onStateChange(newState){

      /*keep private data*/
      //Object.assign(this.state,newState);

      //alert(JSON.stringify(this.state))
      /* share gia tri cho parent component dùng  : để parent react component*/
      //this.props.onStateChange(this.state);

      this.setState(Object.assign(this.state,newState));



  }

  onDataChange(newState){
     this.setState(Object.assign(this.state,newState))
  }



  render(){

    const onTab = this.props.onTab ;
    const onAction = this.props.onAction;
    const test = this.props.test;


    return(
      <div className="detail" >

        <Office onStateChange={ (newState)=>{ this.onStateChange(newState) } } onTab={onTab} onAction={ onAction } />
        <Store onStateChange={ (newState)=>{ this.onStateChange(newState) } }  onTab={onTab} onAction={onAction} />
        <User onStateChange={ (newState)=>{ this.onStateChange(newState) } }  onTab={onTab} onAction={onAction} />

      </div>
    )
  }
}

export default CompanyBody
