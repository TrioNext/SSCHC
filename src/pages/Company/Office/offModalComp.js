import React, {Component} from 'react';

import {  Row, Col, Label,  Form, FormGroup,FormText, Input } from 'reactstrap';

import moment from 'moment';

import BenModal from '../../../components/BenModal';
import SelectCity from '../../../components/SelectCity';
import SelectDist from '../../../components/SelectDist';
import SelectHour from '../../../components/SelectHour';
import SelectMinute from '../../../components/SelectMinute';


function FrmR1(props){

  const modal = props.modal;
  const form = modal.form ;
  const data = modal.data ;

  const defaultValue = props.onAction === 'post' ? '' : form.code;

  return (
    <Row form>
      <Col md={4}>
        <FormGroup>
          <Label id="la-code"> Mã văn phòng <span className="text-danger">*</span></Label>
          <Input type="text" id="code" onChange={ (e)=>{ modal.onChange('code', e);  } } defaultValue={ defaultValue }  placeholder="Tạo mã" />
        </FormGroup>
      </Col>
      <Col md={8}>
        <FormGroup>
          <Label id="la-name"> Tên văn phòng <span className="text-danger">*</span></Label>
          <Input type="text" id="name" onChange={ (e)=>{ modal.onChange('name', e);  } } defaultValue={ form.name }  placeholder="Nhập tên" />
        </FormGroup>
      </Col>
    </Row>
  )
}



function FrmR2(props){


  const modal = props.modal ;
  const data = modal.data ;
  const form = modal.form ;

  return(
    <Row form>
      <Col md={4}>
        <FormGroup>
          <Label id="la-phone"> Số ĐT <span className="text-danger">*</span></Label>
          <Input type="text" id="phone" onChange={ (e)=>{ modal.onChange('phone', e);  } } defaultValue={ form.phone }  placeholder="nhập số ĐT" />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label> Tỉnh / Thành </Label>
            <SelectCity modal={ modal } regions={ props.regions} selected={ form.region_code} />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label> Quận/Huyện </Label>

            <SelectDist modal={ modal } subregions={ props.subregions }  selected={ form.subregion_code } />
        </FormGroup>
      </Col>
    </Row>
  )
}

function FrmR3(props){

  const modal = props.modal;
  const data = modal.data ;
  const form = modal.form ;

  return (
    <div>
      <FormGroup>
        <Label id="la-address">Địa chỉ <span className="text-danger">*</span></Label>
          <Input type="text" id="address" onChange={ (e)=>{ modal.onChange('address', e);  } } defaultValue = { form.address } placeholder="Nhập địa chỉ"/>
      </FormGroup>

      <FormGroup>
        <Label>IP được chấm công</Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('ip_chamcong', e);  } } defaultValue = { form.ip_chamcong }  placeholder="Nhập địa chỉ IP"/>
      </FormGroup>
    </div>
  )
}


function FrmR4(props){

  const modal = props.modal ;
  const data = modal.data ;
  const form = modal.form ;


  const begin = moment('2018-11-20 '+form.working_begin).format('HH:mm').split(':');



  return (
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label> Giờ làm việc </Label>

            <SelectHour modal={ modal } type="working_begin" selected={ Number(begin[0]) } />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> . </Label>
            <SelectMinute modal={ modal } type="working_begin" selected={ Number(begin[1]) } />
        </FormGroup>
      </Col>
    </Row>
  )
}

function FrmR5(props){

  const modal = props.modal ;
  const data = modal.data ;
  const form = modal.form ;

  const end = moment('2018-11-20 '+form.working_end).format('HH:mm').split(':');


  return (
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label> Giờ tan ca </Label>

              <SelectHour modal={ modal } type="working_end" selected={  Number(end[0]) } />

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> . </Label>

            <SelectMinute modal={ modal } type="working_end" selected={ Number(end[1]) } />
        </FormGroup>
      </Col>
    </Row>
  )
}


class OffModalComp extends Component{

  constructor(props){
    super(props);

    this.state = {
      onAction:''
    }


  }

  render(){


    return (

      <BenModal name={this.props.name} onAction={ this.props.onAction } modal={ this.props.modal }  >

          <FrmR1 onAction={ this.props.onAction } modal={ this.props.modal } />

          <FrmR2 onAction={ this.props.onAction } regions={ this.props.regions } subregions={ this.props.subregions } modal={ this.props.modal } />

          <FrmR3 onAction={ this.props.onAction } modal={ this.props.modal } />

          <FrmR4 onAction={ this.props.onAction } modal={ this.props.modal } />

          <FrmR5 onAction={ this.props.onAction } modal={ this.props.modal } />

      </BenModal>


    )
  }
}

export default OffModalComp
