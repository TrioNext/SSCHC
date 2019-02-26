
import React, { Component } from 'react';


/* INCLUDE */
import {BenExplorer} from '../../../components/BenExplorer';

import CusTypePage from './CusTypePage/';
import CusStatusPage from './CusStatusPage/';
import CusOriginPage from './CusOriginPage/';
import CusPointRulePage from './CusPointRulePage/';



class Customer extends Component{

  constructor(){
    super();

    this.state = {
      typeAction:'',
      onAction:'',
      status:'',

      onTab:'CusPointRulePage',
      leftData:[
        {icon:'', code:'CusTypePage',name:'Nhóm khách hàng'},
        {icon:'', code:'CusStatusPage',name:'Trạng thái khách hàng'},
        {icon:'', code:'CusOriginPage',name:'Nguồn khách hàng'},
        {icon:'', code:'CusPointRulePage',name:'Công thức tính điểm',active:true},

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

                 <CusTypePage {...this.state} />
                 <CusStatusPage {...this.state} />
                 <CusOriginPage {...this.state} />

                 <CusPointRulePage {...this.state} />

              </BenExplorer>
            </main>
        </div>
      </div>
    )
  }
}

export default Customer;
