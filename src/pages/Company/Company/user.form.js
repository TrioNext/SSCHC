import React, {Component} from 'react';

import {  Row, Col, Label,  Form, FormGroup,FormText, Input } from 'reactstrap';

import moment from 'moment';

import BenModal from '../../../components/BenModal';




function FrmR1(props){

  const modal = props.modal;
  return (
    <Row form>
      <Col md={8}>
        <FormGroup>
          <Label> Họ tên <span className="text-danger">*</span></Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('name', e);  } } defaultValue={ modal.form.name }  placeholder="nhập tên đầy đủ" />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label> Giới tính <span className="text-danger">*</span></Label>
          <Input type="select"  >
            <option value={1}> Nam </option>
            <option value={0}> Nữ </option>
          </Input>
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

      <Col md={6}>
        <FormGroup>
          <Label> E-mail </Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('email', e);  } } defaultValue={ modal.form.email }  placeholder="nhập e-mail" />

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> Số ĐT <span className="text-danger">*</span></Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('phone', e);  } } defaultValue={ modal.form.phone }  placeholder="nhập số ĐT" />
        </FormGroup>
      </Col>


    </Row>
  )
}

function FrmR3(props){

  const modal = props.modal;
  const { form } = props.modal ;
  return (
    <Row form>

      <Col md={6}>
        <FormGroup>
          <Label> Văn phòng làm việc </Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('email', e);  } } defaultValue={ modal.form.email }  placeholder="nhập e-mail" />

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> Loại hình công việc <span className="text-danger">*</span></Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('phone', e);  } } defaultValue={ modal.form.phone }  placeholder="nhập số ĐT" />
        </FormGroup>
      </Col>

    </Row>
  )
}


function FrmR4(props){

  const modal = props.modal;
  const { form } = props.modal ;
  return (
    <Row form>

      <Col md={6}>
        <FormGroup>
          <Label> Bộ phận </Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('email', e);  } } defaultValue={ modal.form.email }  placeholder="nhập e-mail" />

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> Cấp bậc <span className="text-danger">*</span></Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('phone', e);  } } defaultValue={ modal.form.phone }  placeholder="nhập số ĐT" />
        </FormGroup>
      </Col>

    </Row>
  )
}

function FrmR5(props){

  const modal = props.modal;
  const { form } = props.modal ;
  return (
    <Row form>

      <Col md={6}>
        <FormGroup>
          <Label> ID Nội bộ </Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('email', e);  } } defaultValue={ modal.form.email }  placeholder="nhập e-mail" />

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> Chức vụ <span className="text-danger">*</span></Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('phone', e);  } } defaultValue={ modal.form.phone }  placeholder="nhập số ĐT" />
        </FormGroup>
      </Col>

    </Row>
  )
}




class UserForm extends Component{

  constructor(props){
    super(props);

    this.state = {
      onAction:this.props.onAction
    }

    this.modal = props.modal;
    this.name = props.name;



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

      <BenModal name={ modalTitle + this.name } state={ this.state} modal={ this.modal }  >

        <FrmR1 modal={ this.modal }  />
        <FrmR2 modal={ this.modal }  />
        <FrmR3 modal={ this.modal }  />
        <FrmR4 modal={ this.modal }  />
        <FrmR5 modal={ this.modal }  />




      </BenModal>


    )
  }
}

export default UserForm
