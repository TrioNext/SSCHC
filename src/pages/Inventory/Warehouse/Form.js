import React, { Component } from 'react';
import {  Row, Col, Label,  Form, FormGroup,FormText, Input } from 'reactstrap';

import BenModal from '../../../components/BenModal';

function FrmR1(props){

  const modal = props.modal;
  const data = modal.data ;

  return (
    <Row>
      <Col md={4}>
        <FormGroup>
          <Label for="code"> Mã <span className="text-danger">*</span></Label>
          <Input type="text" id="code" defaultValue={ data.code }   placeholder="nhập mã kho" />
        </FormGroup>
      </Col>
      <Col md={8}>
        <FormGroup>
          <Label for="code"> Tên <span className="text-danger">*</span></Label>
          <Input type="text" id="name"  defaultValue={ data.name }  placeholder="nhập tên nhà kho" />
        </FormGroup>
      </Col>
    </Row>
  )
}

function FrmR2(props){

  const modal = props.modal;
  const data = modal.data ;

  return (
    <Row>
      <Col md={12}>
        <FormGroup>
          <Label for="code"> Địa chỉ <span className="text-danger">*</span></Label>
          <Input type="text" id="address" defaultValue={ data.address }   placeholder="nhập địa chỉ" />
        </FormGroup>
      </Col>

    </Row>
  )
}

class WareHouseForm extends Component {



   render(){


     return(
       <BenModal name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
          <FrmR1 modal={this.props.modal} />
          <FrmR2 modal={ this.props.modal } />
       </BenModal>
     )
   }
 }

 export default WareHouseForm;
