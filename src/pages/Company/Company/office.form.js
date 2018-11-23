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
  return (
    <Row form>
      <Col md={4}>
        <FormGroup>
          <Label> Mã văn phòng <span className="text-danger">*</span></Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('code', e);  } } defaultValue={ modal.form.code }  placeholder="Tạo mã" />
        </FormGroup>
      </Col>
      <Col md={8}>
        <FormGroup>
          <Label> Tên văn phòng <span className="text-danger">*</span></Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('name', e);  } } defaultValue={ modal.form.name }  placeholder="Nhập tên" />
        </FormGroup>
      </Col>
    </Row>
  )
}



function FrmR2(props){


  const modal = props.modal ;
  const form = props.modal.form;

  return(
    <Row form>
      <Col md={4}>
        <FormGroup>
          <Label> Số ĐT <span className="text-danger">*</span></Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('phone', e);  } } defaultValue={ modal.form.phone }  placeholder="nhập số ĐT" />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label> Tỉnh / Thành </Label>
            <SelectCity modal={ modal } selected={ form.region_code} />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label> Quận/Huyện </Label>

            <SelectDist modal={ modal } selected={ form.subregion_code } />
        </FormGroup>
      </Col>
    </Row>
  )
}

function FrmR3(props){

  const modal = props.modal;
  const { form } = props.modal ;
  return (
    <div>
      <FormGroup>
        <Label>Địa chỉ <span className="text-danger">*</span></Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('address', e);  } } defaultValue = { form.address } placeholder="Nhập địa chỉ"/>
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
  const { form } =  props.modal;

  const begin = moment('2018-11-20 '+form.working_begin).format('HH:mm').split(':');


  return (
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label> Giờ làm việc </Label>

            <SelectHour modal={ modal } selected={ Number(begin[0]) } />
        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> . </Label>
            <SelectMinute modal={ modal } selected={ Number(begin[1]) } />
        </FormGroup>
      </Col>
    </Row>
  )
}

function FrmR5(props){

  const modal = props.modal ;
  const { form } =  props.modal;


  const end = moment('2018-11-20 '+form.working_end).format('HH:mm').split(':');


  return (
    <Row form>
      <Col md={6}>
        <FormGroup>
          <Label> Giờ tan ca </Label>

              <SelectHour modal={ modal } selected={  Number(end[0]) } />

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> . </Label>

            <SelectMinute modal={ modal } selected={ Number(end[1]) } />
        </FormGroup>
      </Col>
    </Row>
  )
}


class OfficeForm extends Component{

  constructor(props){
    super(props);

    this.state = {
      onAction:this.props.onAction
    }

    this.modal = props.modal;
    this.name = props.name;
    
    this.refErr = React.createRef();


  }


  componentWillReceiveProps(newProps){

      this.modal = newProps.modal;

      this.setState({
        onAction:newProps.onAction
      });


  }




  render(){

    const modalTitle = this.state.onAction ==='post' ? 'Tạo ': 'Cập nhật ';

    return (

      <BenModal name={modalTitle + this.name } state={ this.state} modal={ this.modal } refErr={ this.refErr} >

          <FrmR1 modal={ this.modal } />

          <FrmR2 modal={ this.modal } />

          <FrmR3 modal={ this.modal } />

          <FrmR4 modal={ this.modal } />

          <FrmR5 modal={ this.modal } />

      </BenModal>


    )
  }
}

export default OfficeForm