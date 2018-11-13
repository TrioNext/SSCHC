
/*
npm install --save ag-grid-community ag-grid-react
npm install --save ag-grid-enterprise

*/

import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label } from 'reactstrap';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';






class User extends Component{

    constructor(props){
      super(props);

      this.state = {
        tab:props.tab,
        action:'',

        name:'Nhân viên ',
        modal:{
          status:false
        },

        columnDefs: [


                {headerName: "SID",field: "id",width:120,checkboxSelection: true},
                {headerName: "Họ & Tên", field: "name"},
                {headerName: "Văn phòng", field: "office"},
                {headerName: "Cấp bậc", field: "level"},
                {headerName: "Loại hình công việc", field: "type"},
                {headerName: "Số Phone ", field: "phone"},
                {headerName: "Người tạo ", field: "create_by"},
                {headerName: "Ngày ", field: "date_created"}


            ],
        rowData: [
                {
                  id:1,
                  name:'Benjamin',
                  office:'Văn phòng quận 4',
                  level:'Nhân viên',
                  type:'Chuyên nghiệp',
                  create_by:'mruan',
                  date_created:'12-12-2012'
                },
                {
                  id:2,
                  name:'Takumi HD',
                  office:'Văn phòng quận 11',
                  level:'Nhân viên',
                  type:'Chuyên nghiệp',
                  create_by:'Benjamin',
                  date_created:'12-12-2012'
                }
        ]

      }

      this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal(){
      this.setState({
        modal:{
          status:!this.state.modal.status
        },
        action:''

      });


    }
    onAction(newProps){



      let active = newProps.tab ==='user' ? newProps.tabAction ==='create' ? true: false : false ;


      this.setState({
        tab:newProps.tab,
        action:newProps.tabAction,
        modal:{
          status:active
        }

      })



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

        const list = this.state.data ;

        const modalTitle = this.state.action ==='create' ? 'Tạo ': 'Cập nhật ';



        return(
            <div hidden={ this.state.tab === 'user' ? false : true } >
                <Modal isOpen={this.state.modal.status} fade={false}   toggle={this.toggleModal} >
                   <ModalHeader toggle={this.toggle}> <i className="fa fa-plus"></i> { modalTitle+ this.state.name }  </ModalHeader>
                   <ModalBody>
                      <Row>
                          <Col md="12">
                            <div className="form-group">
                              <label>Tên</label>
                              <input className="form-control" id="name" onChange={ ()=>{ alert('asdasd') }} value="adasd"  type="text" placeholder="Nhập tên"/>
                            </div>
                          </Col>
                      </Row>
                   </ModalBody>
                   <ModalFooter>
                      <div role="group" className="btn-group">
                          <Button className="btn-ubuntu" onClick={ this.toggleModal }> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                          <Button className="btn-ubuntu-ok"> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
                      </div>

                   </ModalFooter>
                 </Modal>

                 <div className="ag-theme-balham" id="myGrid" style={{boxSizing: "border-box", height: '70vh',width: '100%' }}>

                       <AgGridReact

                           onGridReady={this.onGridReady.bind(this)}
                           enableSorting={true}

                           enableColResize={true}
                           rowSelection="multiple"
                           columnDefs={this.state.columnDefs}
                           rowData={this.state.rowData}>
                       </AgGridReact>
                  </div>
            </div>
        )
    }

    componentWillReceiveProps(newProps){


        this.onAction(newProps);
    }





    componentDidUpdate(prevProps, prevState){
      /*alert('ok man : componentDidUpdate');
      alert(JSON.stringify(prevProps));
      alert(JSON.stringify(prevState));*/

    }

}

export default User;
