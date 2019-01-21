'use strict'

import React, { Component } from 'react';
import {  Row, Col, Label,  Form, FormGroup,FormText, Input } from 'reactstrap';

/* LIB*/
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'


import BenColor from '../../../../components/BenColor';
import BenModal from '../../../../components/BenModal';
import { COIN_TYPES } from '../../../../config/coin.type';




export default class CusOriginForm extends Component {

   render(){

    const modal = this.props.modal || {};
    const data = modal.data || {};

    const coinType = [
      'Tiền mặt'
    ];


     return(
       <BenModal name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
           <Row>
             <Col md={4}>
               <FormGroup>
                 <Label for="code"> Loại <span className="text-danger">*</span></Label>
                 <Input type="text" id="code"/>
               </FormGroup>
             </Col>
             <Col md={2}>
                <BenColor onChange={(data)=>{  console.log(data); }} />
             </Col>
           </Row>

           <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="code"> Tên <span className="text-danger">*</span></Label>
                  <Input type="text" id="name"  defaultValue={ data.name }  placeholder="nhập tên nhà kho" />
                </FormGroup>
              </Col>
           </Row>

           <Row>
              <Col md={12}>
              <FormGroup>
                <Label for="code"> Ghi chú </Label>
                <Input type="textarea" id="name"   />
              </FormGroup>
              </Col>
           </Row>

       </BenModal>
     )
   }
 }
