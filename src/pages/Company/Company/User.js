
/*
npm install --save ag-grid-community ag-grid-react
npm install --save ag-grid-enterprise

*/

import React, {Component} from 'react';

import {   Row, Col, ButtonGroup, Button, Input } from 'reactstrap';


import Model from '../../../config/model';
import Hook from '../../../config/hook.class';

import FormCtrl from './user.form.class';
import UserForm from './user.form';




import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import GridFooter from '../../../components/GridFooter';



import CompanyAside from './CompanyAside';



class User extends Component{

    constructor(props){
      super(props);

      this.code = 'user';
      this.name = 'Thành viên';

      this.data = {
        id:0,
        list:[]
      }

      this.state = {
        onAction:'',
        status:'',

        onTab:props.onTab
      }

      this.table = {
        columnDefs: [


                {
                  headerName: "SID",field: "id",width:130,checkboxSelection: true,
                  filterParams: { newRowsAction: "keep" },
                  checkboxSelection: function(params) {
                    return params.columnApi.getRowGroupColumns().length === 0;
                  },
                  headerCheckboxSelection: function(params) {
                    return params.columnApi.getRowGroupColumns().length === 0;
                  }

                },
                {headerName: "Họ & Tên", field: "name"},
                {headerName: "Văn phòng", field: "office_id"},
                {headerName: "Cấp bậc", field: "job_level"},
                {headerName: "Loại hình công việc", field: "job_type"},
                {headerName: "Số Phone ", field: "phone"},
                {headerName: "Người tạo ", field: "creator_id"},
                {headerName: "Ngày ", field: "date_created"},



            ],
            rowSelection: "multiple",

            /*defaultColDef: {
              editable: true,
              enableRowGroup: true,
              enablePivot: true,
              enableValue: true
            },*/
            rowData: []
      }

      this.setup();
    }

    setup(){
      this.model = new Model('users');

      this.model.set('paginate',{
        p:0,
        max:10,
        sort_by:'id',
        sort_type:'desc'
      });

      this.hook = new Hook(this);

      this.modal = new FormCtrl(this);




    }

    setData(name,value){
      this.data[name] = value ;
    }

    onStateChange(newState){

      /* KEEP PRIVATE DATA : refesh inside compoents */
      this.setState(Object.assign(this.state,newState));

      /* trả giá tri về cho parent component sử dụng */
      this.props.onStateChange(this.state);


    }

    onDataChange(list){

      /* TRẢ GIÁ TRỊ VỀ CHO PARENT COMPONENT SỬ DỤNG*/

      this.data.list = list ;
      this.props.onDataChange(this.data);

      /* RE RENDER : ON DATA CHANGE THÀNH CÔNG */
      this.onStateChange({
        status:'done'
      })
    }

    /* COMPONENT NÀY DÙNG MODAL : INTERAC INSIDE  */
    getInfo(id){

      return this.data.list.find(item=> item.id == id);


    }

    goto(p){

      const _this = this ;

      this.mode.goto(p,(res)=>{
        const list = res.rows;
        _this.onDataChange(list);
      },(err)=>{
        _this.hook.err(err)
      })
    }

    /*
    type : get - pre - next
    */
    loadUser(type){
      const _this = this ;


      this.model[type]((res)=>{
        const list = res.rows;
        _this.onDataChange(list);
      },(err)=>{
          _this.hook.err(err)
      })

    }
    componentDidMount(){
      this.loadUser('get');
    }
    componentWillReceiveProps(newProps){

        /* nhận lện có liên quan đến tab : office */
        if(newProps.onTab===this.code){

          Object.assign(this.state,newProps);




          if(newProps.tabAction==='create'){
              this.modal.open('post');
          }
        }else{

          /* không liên quan => change tab*/
          this.setState({
            onTab:newProps.onTab
          })
        }

    }





    componentDidUpdate(prevProps, prevState){
      /*alert('ok man : componentDidUpdate');
      alert(JSON.stringify(prevProps));
      alert(JSON.stringify(prevState));*/

    }

    onGridReady(params){
      /*this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      const httpRequest = new XMLHttpRequest();
      const updateData = data => {
        this.setState({ rowData: data });
      };

      httpRequest.open(
        "GET",
        "https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json"
      );
      httpRequest.send();
      httpRequest.onreadystatechange = () => {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          updateData(JSON.parse(httpRequest.responseText));
        }
      };*/
    }
    render(){

        /* list : users */
        const list = this.state.data ;

        



        return(
            <div hidden={  this.state.onTab === this.code ? false : true } >


              <UserForm name={ this.name } onAction={ this.state.onAction} modal={ this.modal } />

              <div className="ubuntu-app mb-4">
                  <CompanyAside  />
                  <main>

                    <div className="toolbar">
                      <Row>
                        <Col md={6}>
                            <ButtonGroup>

                              <Button className={ 'btn-ubuntu'} > <i className="fa fa-pencil"></i> </Button>
                              <Button className={ 'btn-ubuntu'} > <i className="fa fa-trash"></i> </Button>
                              <Button className={ 'btn-ubuntu'} > <i className="fa fa-download"></i> </Button>


                            </ButtonGroup>
                        </Col>
                        <Col>
                            sdsd
                        </Col>
                      </Row>
                    </div>
                    <div className="ag-theme-material" id="myGrid" style={{boxSizing: "border-box", height: '72vh', padding:'1rem' }}>

                          <AgGridReact

                              enableSorting={true}
                              rowSelection={this.table.rowSelection}
                              enableColResize={true}
                              defaultColDef={this.table.defaultColDef}
                              onGridReady={this.onGridReady.bind(this)}
                              columnDefs={this.table.columnDefs}
                              rowData={this.data.list}>

                          </AgGridReact>

                          <GridFooter onDataChange={(list)=>{  this.onDataChange(list)  }}  model={ this.model } />


                     </div>
                  </main>
              </div>

            </div>
        )
    }





}

export default User;
