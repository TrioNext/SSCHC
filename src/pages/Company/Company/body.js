
import React, { Component} from 'react';

import Office from './Office';
import Store from './Store';
import User from './User';



class CompanyBody extends Component{

  constructor(props){
    super(props)
  }

  render(){

    const onTab = this.props.onTab ;
    const onAction = this.props.onAction;

    

    return(
      <div className="detail" >

        <Office tab={onTab} tabAction={ onAction } />
        <Store tab={onTab} tabAction={onAction} />
        <User tab={onTab} tabAction={onAction} />

      </div>
    )
  }
}

export default CompanyBody
