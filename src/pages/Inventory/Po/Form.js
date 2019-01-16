import React, { Component } from 'react';
import {  Row, Col, Label,  Form, FormGroup,FormText, Input, Table, Button, ButtonGroup  } from 'reactstrap';

import BenModal from '../../../components/BenModal';
import BenButtonSelect from '../../../components/BenButtonSelect';

function FrmRight(props){

  return(
    <div>
        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input">Mã NCC</Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="text" id=""  />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input"> Nguồn </Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="select">
              <option value='local' key={0} > Trong nước  </option>
              <option value='ovs' key={1} > Quốc tế  </option>

            </Input>
          </Col>
        </FormGroup>

        <FormGroup row>
          <Col md="3">
            <Label htmlFor="email-input"> Ghi Chú </Label>
          </Col>
          <Col xs="12" md="9">
            <Input type="textarea" style={{ height:100 }} name="text" id="exampleText" />
          </Col>
        </FormGroup>
    </div>

  )
}

function FrmLeft(props){


  return(

    <div>
      <Row>
        <Col md={12}>
            <Input style={{ border:'6px solid #ddd',padding:18 }}  placeholder="Tìm kiếm"  />
        </Col>
      </Row>

      <Row className="pt-20" style={{height:'55vh',overflow:'auto'}}>
        <Col md={12}>

          <Table striped className="product-board">
            <thead style={{ border:0 }} >
              <tr>
                <th style={{width:60}}>STT</th>
                <th style={{ width:150 }}> Mã </th>
                <th style={{width:410}}> Tên </th>
                <th style={{ width:150 }}> Giá </th>
                <th tyle={{ width:90 }}> SL </th>

                <th style={{width:90}}>  </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={{width:60}}> 1 </td>
                <td style={{width:150}}> ATT2018001 </td>
                <td style={{width:410}}> Áo Thun T Kiểu mẫu đẹp và là hàng độc lạ nhất, Áo Thun T Kiểu mẫu đẹp và là hàng độc lạ nhất,Áo Thun T Kiểu mẫu đẹp và là hàng độc lạ nhất  </td>
                <td style={{width:150}}> ATTWT2018001 </td>
                <td style={{width:90}}>
                    <Input
                      type="number"
                      name="number"
                      defaultValue="1"
                      id="exampleNumber"
                    />
                </td>
                <td style={{width:90}}>
                  <Button className="btn-trio"><i className="fa fa-trash"></i></Button>
                </td>
              </tr>

              <tr>
                <td style={{width:60}}> 2 </td>
                <td style={{width:150}}> ATT2018001 </td>
                <td style={{width:410}}> Áo Thun T Kiểu mẫu đẹp và là hàng độc lạ nhất, Áo Thun T Kiểu mẫu đẹp và là hàng độc lạ nhất,Áo Thun T Kiểu mẫu đẹp và là hàng độc lạ nhất  </td>
                <td style={{width:150}}> ATTWT2018001 </td>
                <td style={{width:90}}>
                    <Input
                      type="number"
                      name="number"
                      defaultValue="1"
                      id="exampleNumber"
                    />
                </td>

                <td style={{width:90}}>
                  <Button className="btn-trio"><i className="fa fa-trash"></i></Button>
                </td>
              </tr>


            </tbody>

            <tfoot>
              <tr>
                <td style={{width:60}}>  </td>
                <td style={{width:150}}>  </td>
                <td style={{width:410}}></td>
                <td style={{width:150}} className="text-right font-weight-bold"> Tổng số  </td>
                <td style={{width:90}} className="font-weight-bold font-14"> 100 </td>
                <td style={{width:90}}></td>
              </tr>
            </tfoot>

          </Table>
        </Col>
      </Row>

    </div>

  )
}

class FormPo extends Component {

   render(){


     return(
       <BenModal width={ this.props.width } name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
           <Row>
             <Col md={8}>
                 <FrmLeft modal={ this.props.modal } />
             </Col>

             <Col md={4}>
                <FrmRight modal={ this.props.modal } />
             </Col>
           </Row>
       </BenModal>
     )
   }
 }

 export default FormPo;
