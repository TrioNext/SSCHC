import React, { Component } from 'react';
import {  Row, Col, Label,  Form, FormGroup,FormText, Input } from 'reactstrap';

import BenModal from '../../../components/BenModal';

import  BenGridBasic  from '../../../components/BenGridBasic';



function FrmRight(props){

  return(
    <div>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Mã NCC</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text" id=""  />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input"> Loại </Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="select"></Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Kho </Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="select"></Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input"> Ghi Chú </Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="textarea" style={{ height:120 }} name="text" id="exampleText" />
          </Col>
        </FormGroup>
    </div>

  )
}

function FrmLeft(props){

  const grid = props.grid;


  return(
    <div>

      <div className="toolbar">
        <Row>
          <Col md={12}>
              <Input  placeholder="Tìm kiếm"  />
          </Col>

        </Row>
      </div>
      <BenGridBasic
        height={'60vh'}
        nextColums={ grid.colums }
        rowData={ grid.rowData}
      />
    </div>

  )
}

class FormIn extends Component {


   constructor(props){

     super(props);

     this.grid = {
       colums:[
         {headerName: "Phiếu", field: "type"},
         {headerName: "Ngày", field: "date_created"},
         {headerName: "Mã", field: "code"},
         {headerName: "Kho", field: "inventory_id"},
         {headerName: "Loại", field: "action_type"},
         {headerName: "Mã đơn hàng", field: "group_code"},
         {headerName: "Người tạo", field: "creator_id"},
         {headerName: "Trạng thái", field: "status"},
         {headerName: "Ghi chú", field: "note"}

       ],
       rowData: []
     }


   }
   render(){


     return(
       <BenModal width={ this.props.width } name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
          <Row>
            <Col md={8}>
                <FrmLeft grid={ this.grid } modal={ this.props.modal } />
            </Col>


            <Col md={4}>
                <FrmRight modal={ this.props.modal} />
            </Col>
          </Row>
       </BenModal>
     )
   }
 }

 export default FormIn;
