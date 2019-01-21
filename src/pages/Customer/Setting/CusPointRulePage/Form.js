'use strict'

import React, { Component } from 'react';
import {  Row, Col, Label,  Form, FormGroup,FormText, Input, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import classnames from 'classnames';



/* LIB*/
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'


import BenColor from '../../../../components/BenColor';
import BenModal from '../../../../components/BenModal';
import { COIN_TYPES } from '../../../../config/coin.type';



function FrmLeft(props){

  const modal = props.modal;
  const data = modal.data ;

  return(
    <div>
      <h5 className="font-12 text-uppercase txt-green"> Thông tin chung </h5>
       <Row>
         <Col md={12}>
           <FormGroup>
             <Label for="code"> Tên <span className="text-danger">*</span></Label>
             <Input type="text" id="code"/>
           </FormGroup>
         </Col>
       </Row>

       <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="code"> Giá trị đơn hàng tối thiểu <span className="text-danger">*</span></Label>
              <Input type="text" id="name"  defaultValue={ data.name }  placeholder="nhập tên nhà kho" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="code"> Giá trị đơn hàng tối đa <span className="text-danger">*</span></Label>
              <Input type="text" id="name"  defaultValue={ data.name }  placeholder="nhập tên nhà kho" />
            </FormGroup>
          </Col>
       </Row>

       <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="code"> Số lượng đơn hàng tối thiểu <span className="text-danger">*</span></Label>
              <Input type="text" id="name"  defaultValue={ data.name }  placeholder="nhập tên nhà kho" />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="code"> Số lượng đơn hàng tối đa <span className="text-danger">*</span></Label>
              <Input type="text" id="name"  defaultValue={ data.name }  placeholder="nhập tên nhà kho" />
            </FormGroup>
          </Col>
       </Row>

       <Row>
         <Col md={12}>
           <FormGroup>
             <Label for="code"> Chỉ áp dụng các ĐƠN HÀNG có Tag này <span className="text-danger">*</span></Label>
             <Input type="text" id="code"/>
           </FormGroup>
         </Col>
       </Row>

       <Row>
         <Col md={12}>
           <FormGroup>
             <Label for="code"> Chỉ áp dụng các KHÁCH HÀNG có Tag này <span className="text-danger">*</span></Label>
             <Input type="text" id="code"/>
           </FormGroup>
         </Col>
       </Row>
    </div>
  )
}

class FrmRight extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render(){
    return(
      <div>
        <h5 style={{
            marginBottom:30
          }} className="txt-green text-uppercase font-12"> Áp dụng cho </h5>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              Nguồn đơn hàng
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              Phương thức thanh toán
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={() => { this.toggle('3'); }}
            >
              Loại khách hàng
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '4' })}
              onClick={() => { this.toggle('3'); }}
            >
              Nguồn khách hàng
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
              1
          </TabPane>
          <TabPane tabId="2">
              2
          </TabPane>
          <TabPane tabId="3">
            3
          </TabPane>
          <TabPane tabId="4">
            4
          </TabPane>
        </TabContent>

      </div>


    )
  }

}


export default class customForm extends Component {

   render(){

    const modal = this.props.modal || {};
    const data = modal.data || {};

    const coinType = [
      'Tiền mặt'
    ];


     return(
       <BenModal width={ this.props.width} name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
          <Row>
            <Col md="6">
                <FrmLeft modal={ this.props.modal } />
            </Col>
            <Col md="6">
                <FrmRight modal={ this.props.modal} />
            </Col>
          </Row>
       </BenModal>
     )
   }
 }
