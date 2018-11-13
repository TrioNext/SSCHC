
import React, { Component} from 'react';



class CompanyBody extends Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="detail" >
        { this.props.children}
      </div>
    )
  }
}

export default CompanyBody
