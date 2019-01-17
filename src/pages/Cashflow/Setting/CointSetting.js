
import React, { Component } from 'react';


class CoinTrackSetting extends Component{

  constructor(props){
    super(props);
    this.state = {

      tab:'cointrack_setting'
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
          thiết lập
      </div>
    )

  }
}

export default CoinTrackSetting;
