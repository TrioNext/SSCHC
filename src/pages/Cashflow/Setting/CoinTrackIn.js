
import React, { Component } from 'react';


class CoinTrackIn extends Component{

  constructor(props){
    super(props);
    this.state = {

      tab:'cointrack_in'
    }
  }

  /* WHEN*/
  /* NHẬN lệnh : từ NEW PROPS TỪ BODY OBJECT*/
  componentWillReceiveProps(newProps){

  }

  /* WHERE*/
  render(){
    return(

      <div hidden={  this.props.onTab === this.state.tab ? false : true } >
        Loại PHIẾU THU
      </div>
    )

  }
}

export default CoinTrackIn;
