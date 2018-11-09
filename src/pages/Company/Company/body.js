
import React, { Component} from 'react';



class CompanyBody extends Component{

  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="detail" style={{ padding:15,paddingTop:30,}}>
        { this.props.children}
      </div>
    )
  }
}

export default CompanyBody
