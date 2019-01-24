import React, { Component } from 'react';

import { ButtonGroup, Button } from 'reactstrap';

/* OBJECT - PLUGIN*/
import Store from '../../../redux/store';
import Model from '../../../model/model';

/* HOOKED*/
/*............*/

/* NAMED*/
import { ORDERS } from '../../../model/model-mode';
import { ORDER_NAME } from '../../../model/model-name';
import { POST, SEARCH } from '../../../model/action-mode';
/*------------*/

/* MODAL FORM & CTRL*/
import OrderForm from './Form';
import orderFormCtrl from './formCtrl';

/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';


class OrderView extends Component{

  constructor(props){
    super(props);

    this.state = {

      typeAction:'',
      onAction:'',
      status:'',

    }

    this.data = {
      orders:[]
    }

    this.grid = {
      colums:[
        {headerName: "Mã KH", field: "type"},
        {headerName: "Mã Đơn hàng", field: "type"},
        {headerName: "Trạng thái", field: "type"},
        {headerName: "HT Thanh toán", field: "date_created"},
        {headerName: "Ngày tạo báo giá", field: "note"},
        {headerName: "Ngày xuất kho", field: "code"},
        {headerName: "Chưa VAT", field: "inventory_id"},
        {headerName: "Thành tiền", field: "action_type"},
        {headerName: "Có VAT", field: "group_code"},
        {headerName: "Ngày kết thúc", field: "creator_id"},
        {headerName: "Đã thanh toán", field: "status"},
        {headerName: "Phụ trách", field: "note"},
        

      ],
      rowData: []
    }

    this._setup();

  }

  _setup(){

    this.model = new Model(ORDERS);
    this.model.set('paginate',{
      offset:0,
      p:0,
      max:20,
      is_deleted:0,
      key:''
    });

    this.formCtrl = new orderFormCtrl(this.model);

    this._listenStore();

    this.onBtnNew = this.onBtnNew.bind(this);


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

  _doOpenForm(){

    this.formCtrl.open('post');

    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })
  }

  /* WHEN*/

  onBtnNew(){
    this._doOpenForm();
  }
  /*componentDidMount(){}*/
  componentWillUnmount() {
    this.unsubscribe();
  }
  _listenStore(){

    this.unsubscribe = Store.subscribe(()=>{

      this.data.orders = Store.getState().order.list || []  ;

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

    const formTitle = this.state.typeAction === POST ? 'Tạo '+ ORDER_NAME  : 'Chỉnh sửa '+ORDER_NAME;
    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, padding:10}}>
            <main>

              <OrderForm

                width='90%'
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


                      <Button style={{ marginRight:10, borderRadius:0}} onClick={ this.onBtnNew }  className="btn-ubuntu"  > <i className="fa fa-plus mr-5"></i> Tạo Báo Giá  </Button>

                   </ButtonGroup>

                 }
              />
            </main>
        </div>
      </div>
    )
  }
}

export default OrderView;
