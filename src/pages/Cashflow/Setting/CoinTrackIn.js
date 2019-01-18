
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
import CoinTrackInForm from './CoinTrackInForm';
import coinTrackInFormCtrl from './coinTrackInFormCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';

class CoinTrackIn extends Component{

  constructor(props){
    super(props);
    this.state = {
      typeAction:'',
      onAction:'',
      status:'',

      tab:'cointrack_in'
    }

    this.data = {
      coins:[]
    }

    this.grid = {
      colums:[
        {headerName: "Tên", field: "code", width:320},
        {headerName: "Ghi chú", field: "name", width:450},
        {headerName: "Người tạo", field: "address", width:180},
        {headerName: "Ngày tạo", field: "creator_id", width:180}

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

    this.modal = new coinTrackInFormCtrl(this.model);


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

          <CoinTrackInForm
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
               <Button onClick={this.onBtnNew}  style={{ marginRight:10, borderRadius:0}}  className="btn-ubuntu"  > <i className="fa fa-plus"></i> Tạo loại phiếu thu  </Button>

             }
          />
      </div>
    )

  }
}

export default CoinTrackIn;
