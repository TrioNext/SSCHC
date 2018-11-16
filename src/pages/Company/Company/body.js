
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

  onStateChange(newState){

      /*keep private data*/
      Object.assign(this.state,newState)

      //alert(JSON.stringify(this.state))
      /* share gia tri cho parent component dùng */
      this.props.onStateChange(this.state);

  }

  onDataChange(type,newData){

  }

  /* NHẬN lệnh : từ NEW PROPS TỪ MAIN OBJECT*/
  componentWillReceiveProps(newProps){

    /* CẬP NHẬN STATE */
    /* GUI CHO COMPONENT OFFICE : re-render*/
    this.setState(Object.assign(this.state,newProps));




  }

  render(){

    const onTab = this.props.onTab ;
    const onAction = this.props.onAction;

    return(
      <div className="detail" >

        <Office onStateChange={ (newState)=>{ this.onStateChange(newState) } } onDataChange={ (newData)=>{ this.onDataChange('office',newData) } } onTab={onTab} tabAction={ onAction } />
        <Store onStateChange={ (newState)=>{ this.onStateChange(newState) } } onDataChange={ (newData)=>{ this.onDataChange('store',newData) } }  onTab={onTab} tabAction={onAction} />
        <User onStateChange={ (newState)=>{ this.onStateChange(newState) } } onDataChange={ (newData)=>{ this.onDataChange('user',newData) } } onTab={onTab} tabAction={onAction} />

      </div>
    )
  }
}

export default CompanyBody
