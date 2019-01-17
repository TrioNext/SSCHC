import React, { Component } from 'react';
import {  Row, Col, Label,  Form, FormGroup,FormText, Input, Table, Button, ButtonGroup  } from 'reactstrap';

import BenModal from '../../../components/BenModal';
import BenButtonSelect from '../../../components/BenButtonSelect';

const COINTRACK_IN_OBJECTS = [
  '---',
  'Nhân viên',
  'Khách hàng',
  'Nhà cung cấp',
  'Khác'
];

const PAYMENT_METHODS = [
  '---',
  'Tiền mặt',
  'ATM / Online Banking',
  'Debit / Credit card',
  'Voucher/ Gift Card',
  'Điểm tích luỹ',
  'COD'
];

const PAYMENT_PERIODS = [
  '---',
  'Đặt cọc',
  'Trả nợ',
  'Thanh toán hết'
];

function FrmLeft(props){

  const modal = props.modal;
  const data = modal.data;

  return(
    <div>
      <Row>
          <Col md="12">

            <div className="form-group">
              <label> Chọn đối tượng </label>
              <Input type="select">
                {
                  COINTRACK_IN_OBJECTS.map((item,index)=>{
                    return (<option value={index} key={index} >  {item} </option>)
                  })
                }
              </Input>


            </div>
            <div className="form-group">
              <label> Tên phiếu  </label>
              <input onChange={(e)=>{ modal.onChange('name',e) }}  className="form-control" id="name" defaultValue={ data.name }   type="text" placeholder="Nhập tên"/>
            </div>
          </Col>
      </Row>

      <Row>
          <Col md="6">
            <div className="form-group">
              <label> Hạng mục </label>
              <Input  className="form-control" id="code"    type="select">
                <option> Vui lòng chọn </option>
              </Input>
            </div>
          </Col>
          <Col md="6">
            <div className="form-group">
              <label> Phương thức thanh toán  </label>
              <Input  className="form-control" id="code"    type="select">
                {
                  PAYMENT_METHODS.map((item,index)=>{
                    return (<option key={index} value={index} > { item } </option>)
                  })
                }
              </Input>
            </div>
          </Col>
        </Row>
        <Row>
            <Col md="6">
              <div className="form-group">
                <label> Tài khoản </label>
                <Input  className="form-control" id="code"    type="select">
                  <option> Vui lòng chọn </option>
                </Input>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <label> Số tiền  </label>
                <Input  className="form-control" id="code"    type="text"/>

              </div>
            </Col>
        </Row>

        <Row>
            <Col md="6">
              <div className="form-group">
                <label> Kỳ thanh toán </label>
                <Input  className="form-control" id="code"    type="select">
                  {
                    PAYMENT_PERIODS.map((item,index)=>{
                      return (<option value={index} key={index} > { item } </option>)
                    })
                  }
                </Input>
              </div>
            </Col>
            <Col md="6">
              <div className="form-group">
                <label> Ngày hiệu lực  </label>
                <Input  className="form-control" id="code"    type="text"/>
              </div>
            </Col>
        </Row>

        <Row>
            <Col md="12">
              <div className="form-group">
                <label> Ghi chú </label>
                <Input type="textarea" style={{ height:90 }} name="text" id="exampleText" />
              </div>
            </Col>
        </Row>

        <Row>

          <Col md={6}>
            <FormGroup>
                <Label htmlFor="name">Trạng thái</Label>
                <BenButtonSelect
                  data={[
                    {icon:'',name:'Chưa thanh toán',active:true},
                    {icon:'',name:'Đã thanh toán'}
                  ]}
                />
            </FormGroup>

          </Col>
        </Row>
    </div>

  )
}

function FrmRight(props){

  return (
    <Row>
        <Col md="12">
          <div className="form-group">
            <label> Đối tượng  </label>
            <Input  className="form-control" id="code"    type="select">
              <option> Vui lòng chọn </option>
            </Input>
          </div>
        </Col>

    </Row>
  )
}

class CoinTrackForm extends Component {

   render(){


     return(
       <BenModal width={ this.props.width } name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
          <Row>
            <Col md={8}>
                <FrmLeft modal={ this.props.modal }/>
            </Col>

            <Col md={4}>
                <FrmRight modal={ this.props.modal }/>
            </Col>
          </Row>
       </BenModal>
     )
   }
 }

 export default CoinTrackForm;
