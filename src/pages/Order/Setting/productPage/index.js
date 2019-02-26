
import React, { Component } from 'react';

import { Button } from 'reactstrap';

/* OBJECT - PLUGIN*/
import Store from '../../../../redux/store';
import Model from '../../../../model/model';

/* HOOKED*/
/*............*/


/* NAMED*/
import { PRODUCTS } from '../../../../model/model-mode';
import { PRODUCT_NAME } from '../../../../model/model-name';
import { POST, SEARCH } from '../../../../model/action-mode';
/*------------*/

/* MODAL FORM & CTRL */
import MyForm from './Form';
import formCtrl from './formCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../../components/BenGrid2';


export default class CusOriginPage extends Component{

  constructor(props){
    super(props);

    this.state = {
      typeAction:'', // post - put - delete ...
      onAction:'', // string method
      status:'', // status
      
      tab:'productPage'
    }

    this.data = {
      products:[]
    }

    this.grid = {
      colums:[
        {headerName: "Mã", field: "code"},
        {headerName: "Tên SP", field: "name"},
        {headerName: "Loại", field: "name"},
        {headerName: "Danh Mục", field: "name"},
        {headerName: "Giá nhà máy", field: "name"},
        {headerName: "Giá gốc", field: "name"},
        {headerName: "Giá đại lý", field: "name"},
        {headerName: "Giá lẻ", field: "name"},
        {headerName: "ĐVT", field: "name"},
        {headerName: "Bảo hành", field: "name"},
        {headerName: "Serial", field: "name"},
        {headerName: "Người tạo", field: "date_created"},
        {headerName: "Ngày tạo", field: "date_created"}

      ],
      rowData: []
    }

    this._setup();
    this.onBtnNew = this.onBtnNew.bind(this)


  }

  _setup(){

    this.model = new Model(PRODUCTS);
    this.model.set('paginate',{
      offset:0,
      p:0,
      max:20,
      is_deleted:0,
      key:''
    });

    this.modal = new formCtrl(this.model);

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

      this.data.products = Store.getState().product.list || []  ;

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

    const formTitle = this.state.typeAction === 'post' ? 'Tạo '+PRODUCT_NAME : 'Chỉnh sửa '+PRODUCT_NAME;

    return(
      <div hidden={  this.props.onTab === this.state.tab ? false : true } >

          <MyForm
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
               <Button onClick={this.onBtnNew}  style={{ marginRight:10, borderRadius:0}}  className="btn-ubuntu"  > <i className="fa fa-plus"></i> Tạo  </Button>

             }
          />
      </div>
    )
  }
}
