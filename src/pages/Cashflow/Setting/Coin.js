
import React, { Component } from 'react';

import { Button } from 'reactstrap';

/* OBJECT - PLUGIN*/
import Store from '../../../redux/store';
import Model from '../../../model/model';

/* HOOKED*/
/*............*/


/* NAMED*/
import { COINS } from '../../../model/model-mode';
import { COIN_NAME } from '../../../model/model-name';
import { POST, SEARCH } from '../../../model/action-mode';
/*------------*/

/* MODAL FORM & CTRL */
import CoinForm from './CoinForm';
import coinFormCtrl from './coinFormCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';

class Coin extends Component{

  constructor(props){
    super(props);
    this.state = {
      typeAction:'',
      onAction:'',
      status:'',

      tab:'coin'
    }

    this.data = {
      coins:[]
    }

    this.grid = {
      colums:[
        {headerName: "Tên", field: "code"},
        {headerName: "Loại", field: "name", width:320},
        {headerName: "Số TK", field: "address", width:410},
        {headerName: "Phiếu thu", field: "creator_id"},
        {headerName: "Phiếu Chi", field: "date_created"},
        {headerName: "Người tạo", field: "date_created"},
        {headerName: "Ngày tạo", field: "date_created"},

      ],
      rowData: []
    }

    this._setup();

    this.onBtnNew = this.onBtnNew.bind(this)

  }

  _setup(){

    this.model = new Model(COINS);
    this.model.set('paginate',{
      offset:0,
      p:0,
      max:20,
      is_deleted:0,
      key:''
    });

    this.modal = new coinFormCtrl(this.model);


    this._listenStore();

  }

  /* HOW */
  resetGrid(){
      /*let list = this.data.users || []  ;

      list.filter((item)=>{
        item['str_job_level'] = userConf.job_level[item['job_level']];
        item['str_job_type'] = userConf.job_type[item['job_type']];
        item['str_phone'] = item['phone'] === null ? 'n/a' : item['phone'];
        item['str_date_created'] = moment(item['date_created']).format('YYYY-MM-DD');
      });

      //alert('resetGrid');
      this.grid.rowData = list ;*/

  }

  _doOpenModalPost(){

    this.modal.open('post');
    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })

  }
  _doOpenModalUpdate(data){

  }
  /* END HOW*/

  /* WHEN*/

  onBtnNew(){
    this._doOpenModalPost();
  }

  componentDidMount(){
    //this._isMounted = true;
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  _listenStore(){

    this.unsubscribe = Store.subscribe(()=>{
      this.data.coins = Store.getState().coin.list || []  ;

      this._whereStateChange({
        onAction:'_listenStore'
      });

    })
  }
  componentWillReceiveProps(newProps){

  }

  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }
  render(){

    const formTitle = this.state.typeAction === POST ? 'Tạo '+ COIN_NAME : 'Chỉnh sửa '+ COIN_NAME;

    return(

      <div hidden={  this.props.onTab === this.state.tab ? false : true } >

          <CoinForm
            name={ formTitle }
            typeAction={ this.state.typeAction }
            modal={this.modal}

          />
          <BenGrid

             height='74vh'

             onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
             isRightTool={ true }

             nextColums={ this.grid.colums }
             rowData={this.grid.rowData}
             model={ this.model }

             customButton={
               <Button onClick={this.onBtnNew}  style={{ marginRight:10, borderRadius:0}}  className="btn-ubuntu"  > <i className="fa fa-plus"></i> Tạo tài khoản  </Button>

             }
          />
      </div>
    )

  }
}

export default Coin;
