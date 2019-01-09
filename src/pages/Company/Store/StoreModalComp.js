import React, {Component} from 'react';

import {  Row, Col, Label,  Form, FormGroup,FormText, Input } from 'reactstrap';

import moment from 'moment';

import BenModal from '../../../components/BenModal';
import SelectCity from '../../../components/SelectCity';
import SelectDist from '../../../components/SelectDist';


function FrmR1(props){

  const modal = props.modal;
  const data = modal.data ;

  return (
    <Row form>
      <Col md={4}>
        <FormGroup>
          <Label> Mã <span className="text-danger">*</span></Label>
          <Input type="text" id="code" onChange={ (e)=>{ modal.onChange('code', e);  } } defaultValue={ data.code }  placeholder="Tạo mã" />
        </FormGroup>
      </Col>
      <Col md={8}>
        <FormGroup>
          <Label> Tên <span className="text-danger">*</span></Label>
          <Input type="text" id="name" onChange={ (e)=>{ modal.onChange('name', e);  } } defaultValue={ data.name }  placeholder="Nhập tên" />
        </FormGroup>
      </Col>
    </Row>
  )
}



function FrmR2(props){


  const modal = props.modal ;
  const data = modal.data ;

  return(
    <Row form>
      <Col md={4}>
        <FormGroup>
          <Label> Số ĐT <span className="text-danger">*</span></Label>
          <Input type="text" id="phone"  onChange={ (e)=>{ modal.onChange('phone', e);  } } defaultValue={ data.phone }  placeholder="nhập số ĐT" />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label> Tỉnh / Thành </Label>
            <SelectCity  regions={ props.regions }  modal={ modal } selected={ data.region_code} />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label> Quận/Huyện </Label>

            <SelectDist subregions={ props.subregions } modal={ modal } selected={ data.subregion_code } />
        </FormGroup>
      </Col>
    </Row>
  )
}

function FrmR3(props){

  const modal = props.modal;
  const data = modal.data ;
  return (
    <div>
      <FormGroup>
        <Label>Địa chỉ <span className="text-danger">*</span></Label>
          <Input type="text" id="address" onChange={ (e)=>{ modal.onChange('address', e);  } } defaultValue = { data.address } placeholder="Nhập địa chỉ"/>
      </FormGroup>

      <FormGroup>
        <Label>IP được chấm công</Label>
          <Input type="text" id="ip_chamcong" onChange={ (e)=>{ modal.onChange('ip_chamcong', e);  } } defaultValue = { data.ip_chamcong }  placeholder="Nhập địa chỉ IP"/>
      </FormGroup>
    </div>
  )
}



class StoreForm extends Component{

  constructor(props){
    super(props);

  }


  render(){

    return (

      <BenModal name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >

        <FrmR1 modal={ this.props.modal }  />
        <FrmR2 regions={ this.props.regions } subregions={ this.props.subregions } modal={ this.props.modal }  />
        <FrmR3 modal={ this.props.modal }  />


      </BenModal>


    )
  }
}

export default StoreForm
