
import React, { Component } from 'react';

import {  Row, Col

} from 'reactstrap';



import BenModal from '../../../components/BenModal';

function FrmR1(props){

  const modal = props.modal ;
  return(
    <Row>
        <Col md="12">

          <div className="form-group">
            <label>Mã </label>
            <input  className="form-control" id="code" onChange={(e)=>{ modal.form.code = e.target.value.trim() }} defaultValue={ modal.form.code }   type="text" placeholder="Nhập mã"/>
          </div>
          <div className="form-group">
            <label>Tên  </label>
            <input onChange={(e)=>{ modal.form.name = e.target.value.trim() }}  className="form-control" id="name" defaultValue={ modal.form.name }   type="text" placeholder="Nhập tên"/>
          </div>
        </Col>
    </Row>
  )
}

class DepartmentForm extends Component{

  constructor(props){
    super(props);

  }
  render(){
    return(

      <BenModal name={ this.props.name } onAction={ this.props.onAction } modal={ this.props.modal }  >

        <FrmR1 modal={ this.props.modal }  />

      </BenModal>
    )
  }
}

export default DepartmentForm;
