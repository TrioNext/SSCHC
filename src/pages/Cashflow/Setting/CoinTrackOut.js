
import React, { Component } from 'react';


class CoinTrackOut extends Component{

  constructor(props){
    super(props);
    this.state = {

      tab:'cointrack_out'
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
        Loại PHIẾU Chi
      </div>
    )

  }
}

export default CoinTrackOut;
