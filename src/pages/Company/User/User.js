
/*
npm install --save ag-grid-community ag-grid-react
npm install --save ag-grid-enterprise

*/

import React, {Component} from 'react';

import {   Row, Col, ButtonGroup, Button, Input } from 'reactstrap';

import moment from 'moment';


import userConf from '../../../config/user.conf';

import Model from '../../../model/model';


import userModalCtrl from './userModalCtrl';
import UserModalComp from './userModalComp';


import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import GridFooter from '../../../components/GridFooter';
import Department from '../Department/Department';


class User extends Component{

    constructor(props){
      super(props);

      this.name = 'Thành viên';
      this.base = 'users';

      this.data = {
        name:'user',
        id:0,
        p:0,
        list:[],
        department:{
          id:0,
          list:[]
        },
        job_type:userConf.job_type,
        job_level: userConf.job_level
      }

      this.state = {
        onAction:'',
        status:'',

        onTab:props.onTab,
        isIniData:false
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
                {headerName: "Văn phòng", field: "offices.name"},
                {headerName: "Cấp bậc", field: "job_level"},
                {headerName: "Loại hình công việc", field: "job_type"},
                {headerName: "Số Phone ", field: "phone"},
                {headerName: "E-mail ", field: "email"},
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
      this.model = new Model(this.base);
      this.office = new Model('offices');

      this.model.set('paginate',{
        offset:0,
        p:0,
        max:20,
        is_deleted:0
      });

      this.office.set('paginate',{
        offset:0,
        p:0,
        max:'all',
        is_deleted:0
      });

      this.modal = new userModalCtrl(this);


    }


    resetGrid(){
        const list = this.data.list ;


        list.filter((item)=>{
          item['job_level'] = this.data.job_level[item['job_level']];
          item['job_type'] = this.data.job_level[item['job_type']];
          item['phone'] = item['phone'] === null ? 'n/a' : item['phone'];
          item['date_created'] = moment(item['date_created']).format('YYYY-MM-DD');
        });


        this.table.rowData = list ;

    }


    onDepartmentChange(moDep){

       const list = moDep.getData('departments');
       this.data.department.list = list ;


    }
    onStateChange(newState){

      /* KEEP PRIVATE DATA : refesh inside compoents */
      this.data.list = this.model.getData() || [] ;


      const { paginate } = this.model.setting;
      this.data.p = paginate.p ;

      this.resetGrid();

      this.setState(Object.assign(this.state,newState));

    }


    /*
    type : get - pre - next
    */
    loadUser(type){
      const _this = this ;


      this.model[type]((res)=>{

        if(typeof res.count !== 'undefined'){
          _this.onStateChange({status:'success'});
        }


      })

    }

    initData(){
      this.loadUser('get');
      this.state.isIniData = true ;
    }

    componentDidMount(){
      if(!this.state.isIniData){
        this.initData()
      }
    }
    componentWillReceiveProps(newProps){

        /* nhận lện có liên quan đến tab : office */

        if(newProps.onTab===this.data.name){

          Object.assign(this.state,newProps);


          if(newProps.onAction==='post'){
              this.modal.open('post');
          }
        }

    }


    componentDidUpdate(prevProps, prevState){
      /*alert('ok man : componentDidUpdate');
      alert(JSON.stringify(prevProps));
      alert(JSON.stringify(prevState));*/

    }

    onGridReady(params){

       //alert('grid ready ');
       this.gridApi = params.api;

       //console.log(this.gridApi);

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

    btnEdit(e){

      const selectedNodes = this.gridApi.getSelectedNodes()
      const selectedData = selectedNodes.map( node => node.data )

      console.log(selectedData);



    }
    render(){

        /* list : users */
        const list = this.state.data ;
        const modalTitle = this.props.onAction ==='post' ? 'Tạo '+this.name : 'Cập nhật '+this.name;




        return(
            <div hidden={  this.props.onTab === this.data.name ? false : true } >


              <UserModalComp
                  moOffice={ this.office }
                  departments={ this.props.department }
                  name={ modalTitle }
                  onStateChange={(newState)=>{ this.onStateChange(newState) }}
                  onAction={ this.props.onAction} modal={ this.modal }
              />

              <div className="ubuntu-app mb-4">

                  <Department   />

                  <main>

                    <div className="toolbar">
                      <Row>
                        <Col md={6}>
                            <ButtonGroup>

                              <Button onClick={ this.btnEdit.bind(this) } className={ 'btn-ubuntu'} > <i className="fa fa-pencil"></i> </Button>
                              <Button className={ 'btn-ubuntu'} > <i className="fa fa-trash"></i> </Button>
                              <Button className={ 'btn-ubuntu'} > <i className="fa fa-download"></i> </Button>


                            </ButtonGroup>
                        </Col>
                        <Col>

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
                              rowData={this.table.rowData}>

                          </AgGridReact>

                          <GridFooter p={ this.data.p} onStateChange={(newState)=>{  this.onStateChange(newState)  }}  model={ this.model } />


                     </div>
                  </main>
              </div>

            </div>
        )
    }

}

/* GẮNG : redux data -> component props
function mapStateToProps(state){

   return {
     store:state
   }
}*/

export default User ;
