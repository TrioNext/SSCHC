import React, { Component } from 'react';
import {  Row, Col, Label,  Form, FormGroup,FormText, Input, Table, Button, ButtonGroup  } from 'reactstrap';

import BenModal from '../../../components/BenModal';
import BenButtonSelect from '../../../components/BenButtonSelect';


function GeneralInfoRow(props){

  return(
    <div className="row-form">
      <h6 className="txt-organge text-uppercase"> Thông tin chung  </h6>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> Mã KH </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label> Công ty </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Người liên hệ </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
      </Row>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> Số ĐT </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label> E-mail </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Mã số thuế </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
      </Row>
    </div>
  )
}

function ContactInfoRow(props){
  return(
    <div className="row-form">
      <h6 className="txt-organge text-uppercase"> Thông tin Liên hệ  </h6>
      <Row>
          <Col md="6">
            <FormGroup>
              <label> Địa chỉ </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Tỉnh / Thành </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Quận / Huyện </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
      </Row>
      <Row>
          <Col md="6">
            <FormGroup>
              <label> Địa chỉ giao hàng </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <label> Địa chỉ xuất hoá đơn </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>

      </Row>
    </div>
  )
}


function ClassifyInfoRow(props){
  return(
    <div className="row-form">
      <h6 className="txt-organge text-uppercase"> Phân loại khách hàng  </h6>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> Loại KH </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Cấp bậc </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>

          <Col md="3">
            <FormGroup>
              <label> Nhóm KH </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Nguồn </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
      </Row>

    </div>
  )
}


function OtherInfoRow(props){
  return(
    <div className="row-form">
      <h6 className="txt-organge text-uppercase"> Thông tin khác  </h6>
      <Row>
          <Col md="3">
            <FormGroup>
              <label> NV Phụ trách </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="3">
            <FormGroup>
              <label> Gán thẻ  </label>
              <Input  className="form-control" id="code"    type="text"/>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label> Ghi chú </Label>
              <Input style={{ height:90}} type="textarea"   />
            </FormGroup>
          </Col>
      </Row>
    </div>
  )
}




class CustomerForm extends Component {

   render(){


     return(
       <BenModal width={ this.props.width } name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
          <GeneralInfoRow modal={ this.props.modal } />
          <ContactInfoRow modal={ this.props.modal } />
          <ClassifyInfoRow modal={ this.props.modal }  />
          <OtherInfoRow modal={ this.props.modal} />

       </BenModal>
     )
   }
 }

 export default CustomerForm;
