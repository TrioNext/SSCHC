
import React, { Component } from 'react';


/* INCLUDE */
import {BenExplorer} from '../../../components/BenExplorer';

import Coin from './Coin'; // LOAD TÀI KHOẢN
import CoinTrackIn from './CoinTrackIn'; // LOAD PHIẾU THU
import CoinTrackOut from './CoinTrackOut'; // LOAD PHIẾU THU
import CointSetting from './CointSetting'; // LOAD PHIẾU THU


class CashflowSetting extends Component{


  constructor(props){
    super(props);

    this.state = {
      typeAction:'',
      onAction:'',
      status :'',

      onTab:'cointrack_setting',
      leftData:[
        {icon:'', code:'coin',name:'Loại tài khoản'},
        {icon:'', code:'cointrack_in',name:'Loại phiếu thu'},
        {icon:'', code:'cointrack_out',name:'Loại phiếu chi'},
        {icon:'', code:'cointrack_setting',name:'Cấu hình Thu - Chi',active:true}
      ]
    }

    this._onLeftSideChange = this._onLeftSideChange.bind(this);


  }

  /* WHEN */
  _onLeftSideChange(code){

    this._whereStateChange({
      onTab:code
    })
  }

  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }
  render(){


    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, padding:10}}>
            <main>

                <BenExplorer onLeftSideChange={ this._onLeftSideChange } data={this.state.leftData} >
                   <Coin {...this.state} />
                   <CoinTrackIn {...this.state} />
                   <CoinTrackOut {...this.state} />
                   <CointSetting {...this.state} />

                </BenExplorer>

            </main>
        </div>
      </div>
    )
  }
}

export default CashflowSetting;
