import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label,  Form, FormGroup,FormText, Input,
  Popover, PopoverHeader, PopoverBody
} from 'reactstrap';

import moment from 'moment';

import BenModal from '../../../components/BenModal';


class OfficeForm extends Component{

  constructor(props){
    super(props);

    this.state = {
      onAction:this.props.onAction
    }

    this.modal = props.modal;
    this.name = props.name;
    this.refErr = props.refErr;
  }

  SelectDist(props){

    let list = [];
    this.modal.listDistrict.map((item)=>{
      list.push(<option id={item.id} key={item.id} value={ item.code } > { item.name_with_type } </option>)
    })

    return(
      <Input onChange={ (e)=>{  this.modal.onChangeDist(e)  } }  type="select" defaultValue={ props.selected }>
        {list}
      </Input>
    )
  }

  SelectCity(props){

    let list = [] ;


    this.modal.listCity.map((item)=>{
      list.push(<option id={item.id} value={item.code} key={item.id} > { item.name } </option>)
    })

    return(
      <Input onChange={ (e)=>{  this.modal.onChangeCity(e)  } }  type="select" defaultValue={ props.selected }>
        {list}
      </Input>
    )
  }

  /* build item component*/
  SelectHour(props){

    let list = [] ;
    for(let i=0 ; i < 24 ; i++){
     const num = i < 10 ? '0'+i : i
     list.push(<option key={i} value={ i }  > {  num +' giờ' } </option>)
    }

    return(
      <Input onChange={(e)=>{ this.modal.onHourChange(props.type, e) }}  type="select" defaultValue={ props.selected }>
        {list}
      </Input>
    )
  }

  SelectMinute(props){



    let list = [] ;
    for(let i=0 ; i < 60 ; i++){
      const num = i < 10 ? '0'+i : i

      list.push(<option key={i} value={ i } > {  num +' phút' } </option>)
    }

    return(
      <Input onChange={(e)=>{  this.modal.onMinuteChange(props.type, e)  }}  type="select" defaultValue={ props.selected }>
        {list}
      </Input>
    )

  }


  componentWillReceiveProps(newProps){

      this.modal = newProps.modal;
      this.state.onAction = newProps.onAction;



  }

  render(){

    const modalTitle = this.state.onAction ==='post' ? 'Tạo ': 'Cập nhật ';

    const { form } =  this.modal;

    const begin = moment('2018-11-20 '+form.working_begin).format('HH:mm').split(':');
    const end = moment('2018-11-20 '+form.working_end).format('HH:mm').split(':');


    return (

      <BenModal name={modalTitle} onAction={ this.state.onAction} modal={ this.modal } refErr={ this.refErr} >
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label> Mã văn phòng <span className="text-danger">*</span></Label>
                <Input type="text" onChange={ (e)=>{ this.modal.onChange('code', e);  } } defaultValue={ this.modal.form.code }  placeholder="Tạo mã" />
              </FormGroup>
            </Col>
            <Col md={8}>
              <FormGroup>
                <Label> Tên văn phòng <span className="text-danger">*</span></Label>
                <Input type="text" onChange={ (e)=>{ this.modal.onChange('name', e);  } } defaultValue={ this.modal.form.name }  placeholder="Nhập tên" />
              </FormGroup>
            </Col>
          </Row>
          <Row form>
            <Col md={4}>
              <FormGroup>
                <Label> Số ĐT <span className="text-danger">*</span></Label>
                <Input type="text" onChange={ (e)=>{ this.modal.onChange('phone', e);  } } defaultValue={ this.modal.form.phone }  placeholder="nhập số ĐT" />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label> Tỉnh / Thành </Label>
                  { this.SelectCity({selected:form.region_code})}
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label> Quận/Huyện </Label>
                  { this.SelectDist({parent:form.region_code, selected:form.subregion_code}) }
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label>Địa chỉ <span className="text-danger">*</span></Label>
              <Input type="text" onChange={ (e)=>{ this.modal.onChange('address', e);  } } defaultValue = { form.address } placeholder="Nhập địa chỉ"/>
          </FormGroup>

          <FormGroup>
            <Label>IP được chấm công</Label>
              <Input type="text" onChange={ (e)=>{ this.modal.onChange('ip_chamcong', e);  } } defaultValue = { form.ip_chamcong }  placeholder="Nhập địa chỉ IP"/>
          </FormGroup>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label> Giờ làm việc </Label>
                  { this.SelectHour({selected:Number(begin[0]), type:'working_begin'}) }
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label> . </Label>
                  { this.SelectMinute({selected:Number(begin[1]), type:'working_begin'}) }
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label> Giờ tan ca </Label>

                    { this.SelectHour({selected:Number(end[0]), type:'working_end'}) }

              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label> . </Label>
                  { this.SelectMinute({selected:Number(end[1]), type:'working_end'}) }
              </FormGroup>
            </Col>
          </Row>
      </BenModal>


    )
  }
}

export default OfficeForm
