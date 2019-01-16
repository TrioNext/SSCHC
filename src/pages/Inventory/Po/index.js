
import React, { Component } from 'react';

import {ButtonGroup, Button} from 'reactstrap';

/* OBJECT - PLUGIN*/
import Store from '../../../redux/store';
import Model from '../../../model/model';


/* HOOKED*/
/*............*/

/* NAMED*/
import { PURCHASE } from '../../../model/model-mode';
import { PURCHASE_NAME } from '../../../model/model-name';
import { POST, SEARCH } from '../../../model/action-mode';
/*------------*/


/* MODAL FORM & CTRL */
import PoForm from './Form';
import formCtrl from './formCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';

class Po extends Component{

  constructor(props){
    super(props);

    this.state = {

      typeAction:'',
      onAction:'',
      status:'',

    }

    this.data = {
      purchases:[]
    }

    this.grid = {
      colums:[
        {headerName: "Mã ĐH", field: "type"},
        {headerName: "Nguồn", field: "date_created"},
        {headerName: "Trạng thái", field: "date_created"},
        {headerName: "Gắn thẻ", field: "code"},
        {headerName: "Kho", field: "inventory_id"},
        {headerName: "Phiếu chi", field: "action_type"},
        {headerName: "NCC", field: "group_code"},
        {headerName: "Người tạo", field: "creator_id"},
        {headerName: "Ngày tạo", field: "status"}
      ],
      rowData: []
    }

    this._setup();

  }

  _setup(){

    this.model = new Model(PURCHASE);
    this.model.set('paginate',{
      offset:0,
      p:0,
      max:20,
      is_deleted:0,
      key:''
    });

    this.formCtrl = new formCtrl(this.model);

    this._listenStore();

    //this.onBtnNewReceIn = this.onBtnNewReceIn.bind(this);
    //this.onBtnNewReceOut = this.onBtnNewReceOut.bind(this);

    this.onBtnNew = this.onBtnNew.bind(this);
    this.onBtnUpdate = this.onBtnUpdate.bind(this);


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


    this.formCtrl.open('post');
    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })

  }

  _doOpenModalUpdate(data){

  }

  /* WHEN */

  onBtnUpdate(data){
    this._doOpenModalUpdate(data);
  }
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


      this.data.purchases = Store.getState().purchase.list || []  ;

      this._whereStateChange({
        onAction:'_listenStore'
      });

    })
  }

  /* WHERE */
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }
  render(){

    const formTitle = this.state.typeAction === POST ? 'Tạo '+ PURCHASE_NAME : 'Chỉnh sửa '+ PURCHASE_NAME

    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, padding:10}}>
            <main>

              <PoForm

                width='90%'
                name={ formTitle }
                typeAction={ this.state.typeAction }
                modal={this.formCtrl}

              />
                <BenGrid

                   onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
                   isRightTool={ true }

                   nextColums={ this.grid.colums }
                   rowData={this.grid.rowData}
                   model={ this.model }
                   customButton={
                     <ButtonGroup>

                        <Button
                            style={{ marginRight:10, borderRadius:0}} onClick={ this.onBtnNew }  className="btn-ubuntu"  >
                            <i className="fa fa-plus-circle mr-5"></i> Đề xuất mua

                        </Button>

                     </ButtonGroup>

                   }
                />
            </main>
        </div>
      </div>
    )
  }
}

export default Po;
