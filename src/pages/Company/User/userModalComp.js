import React, {Component} from 'react';
import {  Row, Col, Label,  Form, FormGroup,FormText, Input } from 'reactstrap';

import BenModal from '../../../components/BenModal';


import userConf from '../../../config/user.conf';


function FrmR1(props){

  const modal = props.modal;
  const data = modal.data ;


  return (
    <Row form>
      <Col md={8}>
        <FormGroup>
          <Label for="name"> Họ tên <span className="text-danger">*</span></Label>
          <Input type="text" id="name" onChange={ (e)=>{ modal.onChange('name', e);  } } defaultValue={ data.name }  placeholder="nhập tên đầy đủ" />
        </FormGroup>
      </Col>
      <Col md={4}>
        <FormGroup>
          <Label> Giới tính <span className="text-danger">*</span></Label>
          <Input onChange={(e)=>{ modal.onChange('gender',e)  }} defaultValue={ data.gender } type="select"  >
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
  const data = modal.data ;

  return(
    <Row form>

      <Col md={6}>
        <FormGroup>
          <Label> E-mail </Label>
          <Input id="email" type="text" onChange={ (e)=>{ modal.onChange('email', e);  } } defaultValue={ data.email }  placeholder="nhập e-mail" />

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> Số ĐT <span className="text-danger">*</span></Label>
          <Input id="phone" type="text" onChange={ (e)=>{ modal.onChange('phone', e);  } } defaultValue={ data.phone }  placeholder="nhập số ĐT" />
        </FormGroup>
      </Col>


    </Row>
  )
}


function FrmR3(props){
  const modal = props.modal ;
  const data = modal.data ;


  let listOffice = [];
  listOffice.push(<option value={0} key={0}  > { ' Vui lòng chọn' } </option>)
  props.offices.map((item,index)=>{
    listOffice.push(<option value={item.id} key={item.id}  > { item.name } </option>)
  });

  let listJobs = [];
  userConf.job_type.map((item,index)=>{
    listJobs.push(<option value={index} key={index} > { item } </option>)
  })


  return (
    <Row form>

      <Col md={6}>
        <FormGroup>
          <Label> Văn phòng làm việc </Label>
          <Input type="select" id="office_id" defaultValue={ data.office_id } onChange={(e)=>{ modal.onChange('office_id',e)  }} type="select">
            { listOffice }
          </Input>

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> Loại hình công việc <span className="text-danger">*</span></Label>
          <Input type="select" id="job_type" defaultValue={ data.job_type } onChange={(e)=>{ modal.onChange('job_type',e)  }}>
              { listJobs }
          </Input>

        </FormGroup>
      </Col>

    </Row>
  )
}



function FrmR4(props){

  const modal = props.modal;
  const data = modal.data ;

  

  let listJobLevels = [];
  userConf.job_level.map((item,index)=>{
    listJobLevels.push(<option value={index} key={index} id={ index} > { item } </option>)
  })

  let listDep = [];
  listDep.push(<option value={0} key={'no-key'} > { 'Vui lòng chọn' } </option>)
  props.departments.map((item,index)=>{
    listDep.push(<option value={item.id} key={index} id={ item.id} > { item.name } </option>)
  })


  return (
    <Row form>

      <Col md={6}>
        <FormGroup>
          <Label> Bộ phận </Label>
          <Input id="department_id" defaultValue={ data.department_id } onChange={(e)=>{ modal.onChange('department_id',e)  }} type="select">
            {listDep}
          </Input>

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> Cấp bậc <span className="text-danger">*</span></Label>
          <Input id="job_level" type="select" defaultValue={ data.job_level } onChange={(e)=>{ modal.onChange('job_level',e)  }} >
            {listJobLevels}
          </Input>
        </FormGroup>
      </Col>

    </Row>
  )
}

function FrmR5(props){

  const modal = props.modal;
  const data = modal.data ;
  return (
    <Row form>

      <Col md={6}>
        <FormGroup>
          <Label> Mã Nội bộ </Label>
          <Input type="text" id="username"  onChange={ (e)=>{ modal.onChange('username', e);  } } defaultValue={ data.username }  placeholder="nhập mã" />

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> Chức vụ <span className="text-danger">*</span></Label>
          <Input type="text" id="position" onChange={ (e)=>{ modal.onChange('position', e);  } } defaultValue={ data.position }  placeholder="nhập chức vụ" />
        </FormGroup>
      </Col>

    </Row>
  )
}




class UserForm extends Component{

  constructor(props){
    super(props);

    this.state = {
      typeAction:'',
      onAction:'',

      departments:[],
      offices:[]
    }

  }

  componentWillReceiveProps(newProps){
    this.setState(newProps);
  }

  render(){


    return (

      <BenModal name={ this.props.name } typeAction={ this.state.typeAction } modal={ this.props.modal }  >

        <FrmR1 modal={ this.props.modal }  />
        <FrmR2 modal={ this.props.modal }  />
        <FrmR3 modal={ this.props.modal } offices={ this.state.offices }   />
        <FrmR4 modal={ this.props.modal } departments={ this.state.departments } />
        <FrmR5 modal={ this.props.modal }  />

      </BenModal>


    )
  }
}

export default UserForm
