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

  let list = [];
  props.jobtype.map((item,index)=>{
    list.push(<option value={item} key={index} id={ index} > { item } </option>)
  })

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
          <Input type="select">
              { list }
          </Input>

        </FormGroup>
      </Col>

    </Row>
  )
}


function FrmR4(props){

  const modal = props.modal;
  const { form } = props.modal ;

  let list = [];
  props.joblevel.map((item,index)=>{
    list.push(<option value={item} key={index} id={ index} > { item } </option>)
  })

  let listDep = [];
  props.departments.map((item,index)=>{
    listDep.push(<option value={item.id} key={index} id={ item.id} > { item.name } </option>)
  })


  return (
    <Row form>

      <Col md={6}>
        <FormGroup>
          <Label> Bộ phận </Label>
          <Input type="select">
            {listDep}
          </Input>

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> Cấp bậc <span className="text-danger">*</span></Label>
          <Input type="select">
            {list}
          </Input>
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
          <Label> Mã Nội bộ </Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('code', e);  } } defaultValue={ modal.form.code }  placeholder="nhập mã" />

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> Chức vụ <span className="text-danger">*</span></Label>
          <Input type="text" onChange={ (e)=>{ modal.onChange('position', e);  } } defaultValue={ modal.form.position }  placeholder="nhập chức vụ" />
        </FormGroup>
      </Col>

    </Row>
  )
}




class UserForm extends Component{

  constructor(props){
    super(props);

    this.state = {
      onAction:props.onAction
    }


    this.job_type = [
      'Nhân viên chính thức',
      'Bán thời gian',
      'Thử việc',
      'Làm thêm ngoài giờ',
      'Nhân viên thời vụ',
      'Làm dự án'
    ];

    this.job_level = [
      'Mới tốt nghiệp/ Thực tập',
      'Nhân viên',
      'Trưởng nhóm/ Giám sát',
      'Phó phòng',
      'Trưởng phòng',
      'Phó cửa hàng',
      'Trưởng cửa hàng',
      'Phó giám đốc',
      'Giám đốc',
      'Giám đốc điều hành',
      'Phó chủ tịch',
      'Chủ tịch'
    ];
    
  }



  render(){


    return (

      <BenModal name={ this.props.name } onAction={ this.props.onAction } modal={ this.props.modal }  >

        <FrmR1 modal={ this.props.modal }  />
        <FrmR2 modal={ this.props.modal }  />
        <FrmR3 modal={ this.props.modal } jobtype={ this.job_type }  />
        <FrmR4 modal={ this.props.modal } departments={ this.props.departments }  joblevel={ this.job_level }  />
        <FrmR5 modal={ this.props.modal }  />

      </BenModal>


    )
  }
}

export default UserForm
