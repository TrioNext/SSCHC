
import React, { Component } from 'react';
import { ButtonGroup, Button } from 'reactstrap';

/* OBJECT - PLUGIN*/
import Store from '../../../redux/store';
import Model from '../../../model/model';

/* HOOKED*/
/*............*/

/* NAMED*/
import { CUSTOMERS } from '../../../model/model-mode';
import { CUSTOMER_NAME } from '../../../model/model-name';
import { POST, SEARCH } from '../../../model/action-mode';
/*------------*/

/* MODAL FORM & CTRL*/
import CustomerForm from './Form';
import customerFormCtrl from './formCtrl';

import ImportForm from './ImportForm';
import importFormCtrl from './importFormCtrl';



/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';



class Customer extends Component{

  constructor(props){
    super(props);

    this.state = {

      typeAction:'',
      onAction:'',
      status:'',

    }

    this.data = {
      coin_tracks:[]
    }

    this.grid = {
      colums:[
        {headerName: "Mã", field: "type"},
        {headerName: "Thông tin liên hệ", field: "type"},
        {headerName: "Tỉnh/Thành", field: "type"},
        {headerName: "Điểm", field: "date_created"},
        {headerName: "Nhóm", field: "code"},
        {headerName: "nguồn", field: "inventory_id"},
        {headerName: "NV Phụ trách", field: "action_type"},
        {headerName: "Đơn hàng", field: "group_code"},
        {headerName: "Doanh thu", field: "creator_id"},
        {headerName: "Trạng thái", field: "status"},
        {headerName: "Người tạo", field: "note"},
        {headerName: "Ngày tạo", field: "note"},
        {headerName: "Cập nhật", field: "note"}

      ],
      rowData: []
    }

    this._setup();

    this.onBtnNewCustomer = this.onBtnNewCustomer.bind(this);
    this.onBtnImportData = this.onBtnImportData.bind(this);
    this.onBtnSchedule = this.onBtnSchedule.bind(this);

  }

  _setup(){

    this.model = new Model(CUSTOMERS);
    this.model.set('paginate',{
      offset:0,
      p:0,
      max:20,
      is_deleted:0,
      key:''
    });

    this.formCtrl = new customerFormCtrl(this.model);
    this.importFormCtrl = new importFormCtrl(this.model);


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

    //this.modal.open('post');
    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })

  }

  _doOpenModalUpdate(data){

  }

  _doOpenForm(type){

    this.formCtrl.open('post');

    this._whereStateChange({
      recType:type,
      typeAction:'post',
      onAction:'open_modal'
    })
  }

  /* WHEN */

  onBtnSchedule(){

    alert('navigate schedule calendar')
  }
  onBtnImportData(){

    this.importFormCtrl.open('navigate');
    this._whereStateChange({
      typeAction:'navigate',
      onAction:'open_modal'
    })
  }
  onBtnNewCustomer(){


    this.formCtrl.open('post');

    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })
  }

  /*componentDidMount(){}*/
  componentWillUnmount() {
    this.unsubscribe();
  }
  _listenStore(){

    this.unsubscribe = Store.subscribe(()=>{

      this.data.customers = Store.getState().customer.list || []  ;

      this._whereStateChange({
        onAction:'_listenStore'
      });

    })
  }


  /* WHERE*/

  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }


  render(){

    const formTitle = this.state.typeAction === POST ? 'Tạo '+ CUSTOMER_NAME : 'Chỉnh sửa '+ CUSTOMER_NAME
    return (

      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, padding:10}}>
            <main>


              <ImportForm

                name={ 'Import file excel' }
                typeAction={ 'import_file' }
                modal={this.importFormCtrl}
              />
              <CustomerForm

                width='60%'
                name={ formTitle }
                typeAction={ this.state.typeAction }
                modal={this.formCtrl}

              />
              <BenGrid

                 onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
                 isRightTool={ true }
                 height="74vh"

                 nextColums={ this.grid.colums }
                 rowData={this.grid.rowData}
                 model={ this.model }
                 customButton={
                   <ButtonGroup>

                      <Button style={{ marginRight:10, borderRadius:0}} onClick={ this.onBtnSchedule }  className="btn-ubuntu"  > <i className="fa fa-calendar-o mr-5"></i> Lịch hẹn  </Button>

                      <Button style={{ marginRight:10, borderRadius:0}} onClick={ this.onBtnImportData }  className="btn-ubuntu"  > <i className="fa fa-file-excel-o mr-5"></i> Import Data  </Button>
                      <Button style={{ marginRight:10, borderRadius:0}} onClick={ this.onBtnNewCustomer}  className="btn-ubuntu"  > <i className="fa fa-plus mr-5"></i> Tạo khách hàng  </Button>

                   </ButtonGroup>

                 }
              />
            </main>
        </div>
      </div>
    )
  }
}

export default Customer;
