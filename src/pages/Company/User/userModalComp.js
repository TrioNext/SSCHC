import React, {Component} from 'react';

import {  Row, Col, Label,  Form, FormGroup,FormText, Input } from 'reactstrap';

import moment from 'moment';

import BenModal from '../../../components/BenModal';




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
          <Input onChange={(e)=>{ modal.onChange('gender',e)  }} type="select"  >
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

class FrmR3 extends Component{

  render(){

    const modal = this.props.modal;
    const data = modal.data ;
    let list = [];

    this.props.jobtype.map((item,index)=>{
      list.push(<option value={item} key={index} > { item } </option>)
    })


    let listOffice = [];

    listOffice.push(<option value={0} key={0}  > { ' Vui lòng chọn' } </option>)
    this.props.offices.map((item,index)=>{
      listOffice.push(<option value={item.id} key={item.id}  > { item.name } </option>)
    })


    return (
      <Row form>

        <Col md={6}>
          <FormGroup>
            <Label> Văn phòng làm việc </Label>
            <Input type="select" id="office_id" onChange={(e)=>{ modal.onChange('office_id',e)  }} type="select">
              { listOffice }
            </Input>

          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label> Loại hình công việc <span className="text-danger">*</span></Label>
            <Input type="select" id="job_type" onChange={(e)=>{ modal.onChange('job_type',e)  }}>
                { list }
            </Input>

          </FormGroup>
        </Col>

      </Row>
    )
  }
}



function FrmR4(props){

  const modal = props.modal;
  const { form } = props.modal ;

  let list = [];
  props.joblevel.map((item,index)=>{
    list.push(<option value={item} key={index} id={ index} > { item } </option>)
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
          <Input id="department_id" onChange={(e)=>{ modal.onChange('department_id',e)  }} type="select">
            {listDep}
          </Input>

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> Cấp bậc <span className="text-danger">*</span></Label>
          <Input id="job_level" type="select" onChange={(e)=>{ modal.onChange('job_level',e)  }} >
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
          <Input type="text" id="username"  onChange={ (e)=>{ modal.onChange('username', e);  } } defaultValue={ modal.form.code }  placeholder="nhập mã" />

        </FormGroup>
      </Col>
      <Col md={6}>
        <FormGroup>
          <Label> Chức vụ <span className="text-danger">*</span></Label>
          <Input type="text" id="position" onChange={ (e)=>{ modal.onChange('position', e);  } } defaultValue={ modal.form.position }  placeholder="nhập chức vụ" />
        </FormGroup>
      </Col>

    </Row>
  )
}




class UserForm extends Component{

  constructor(props){
    super(props);

    this.office = props.moOffice;

    this.state = {
      onAction:props.onAction,
      isLoadData:false,
    }

    this.data = {
      office:{
        list:[]
      }
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


  onStateChange(newState){
    this.data.office.list = this.office.getData();
    this.setState(Object.assign(this.state,newState));

  }
  componentDidMount(){

      if(!this.state.isLoadData){
        /*this.office.get((res)=>{
          if(typeof res.count !== 'undefined'){
             this.onStateChange({status:'success'});
             this.state.isLoadData = true ;
          }
        })*/
      }

  }



  render(){



    return (

      <BenModal name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >

        <FrmR1 modal={ this.props.modal }  />
        <FrmR2 modal={ this.props.modal }  />
        <FrmR3 modal={ this.props.modal } offices={ this.props.offices } jobtype={ this.job_type }  />
        <FrmR4 modal={ this.props.modal } departments={ this.props.departments }  joblevel={ this.job_level }  />
        <FrmR5 modal={ this.props.modal }  />

      </BenModal>


    )
  }
}

export default UserForm
