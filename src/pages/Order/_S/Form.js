import React, { Component } from 'react';
import {  Row, Col, Label,  Form, FormGroup,FormText, Input, Table, Button, ButtonGroup  } from 'reactstrap';

import BenModal from '../../../components/BenModal';
import BenButtonSelect from '../../../components/BenButtonSelect';

function FrmLeft(props){

  return(
    <div>
        <h5 className="txt-green text-uppercase font-14 mb-20"><i className="fa fa-user mr-5"></i> Thông tin Khách hàng </h5>

        <FormGroup>
          <Label> Mã KH </Label>
          <Input type="text" id=""  />
        </FormGroup>

        <FormGroup>
          <Label> Công ty </Label>
          <Input type="text" id=""  />
        </FormGroup>

        <FormGroup>
          <Row>
            <Col md="6">
              <Label> MST </Label>
              <Input type="text" id=""  />
            </Col>
            <Col>
              <Label> Thuế VAT </Label>
              <Input type="text" id=""  />
            </Col>
          </Row>
        </FormGroup>

        <FormGroup>
          <Label>Hình thức thanh toán </Label>
          <Input type="select" id="" >
            <option> PT001 </option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label> Ghi chú  </Label>
          <Input type="textarea" style={{height:100}} />
        </FormGroup>


    </div>

  )

}


function FrmRight(props){

  return(
    <div>
      <h5 className="txt-green text-uppercase font-14 mb-20"> <i className="fa fa-file-text mr-5"></i> Báo giá cho : ABC </h5>
      <FormGroup>
        <Row>
          <Col md="4">
            <Label> Sản phẩm chính </Label>
            <Input type="text" id=""  />
          </Col>
          <Col md="2">
            <Label> Sản phẩm phụ </Label>
            <div>
              <a style={{width:'100%'}} className="btn btn-ubuntu bg-grey"> <i className="fa fa-plus"></i> Thêm</a>
            </div>
          </Col>

          <Col md="2">
            <Label> Dịch vụ </Label>
            <div>
              <a style={{width:'100%'}} className="btn btn-ubuntu bg-grey"> <i className="fa fa-plus"></i> Thêm</a>
            </div>
          </Col>

          <Col md="2">
            <Label> Phần mềm </Label>
            <div>
              <a style={{width:'100%'}} className="btn btn-ubuntu bg-grey"> <i className="fa fa-plus"></i> Thêm</a>
            </div>
          </Col>

          <Col md="2">
            <Label> Áp dụng khuyến mãi </Label>
            <Input type="select">
                <option> Không chọn </option>
            </Input>
          </Col>


        </Row>

        <Row className="mt-20" style={{height:'55vh',overflow:'auto'}}>
          <Col md={12}>

            <Table striped className="product-board">
              <thead style={{ border:0, background:'#222D32', color:'#fff' }} >
                <tr>
                  <th style={{width:60}}>STT</th>
                  <th style={{ width:150 }}> Mã </th>
                  <th style={{width:410}}> Sản phẩm </th>
                  <th style={{ width:150 }}> Ảnh </th>
                  <th tyle={{ width:90 }}> ĐVT </th>
                  <th style={{width:90}}> SL  </th>
                  <th style={{width:120}}> Đơn giá  </th>
                  <th style={{width:120}}> T.T  </th>
                  <th style={{width:120}}> +VAT  </th>
                  <th style={{width:90}}>   </th>

                </tr>
              </thead>

              <tbody>

                <tr>
                  <td style={{width:60}}>1</td>
                  <td style={{ width:150 }}> vt300 </td>
                  <td style={{width:410}}> Máy chấm công vân tay hiệu: Vigilance, Mã hàng : VT300+ID, hàng mới 100% </td>
                  <td style={{ width:150 }}>
                    <img style={{height:90,border:'1px solid #ddd'}} src="http://kpi.vikhang.com:9000/files/kpi.vikhang.com/takumi/photos/XPedPlnV5n.png"  />
                  </td>
                  <td tyle={{ width:90 }}> Cái </td>
                  <td style={{width:90}}>
                      <Input type="number" defaultValue="1" />
                  </td>
                  <td style={{width:120}}> <Input style={{width:'100%'}} type="text" defaultValue="200,000" />  </td>
                  <td style={{width:120}}> 200.000,000  </td>
                  <td style={{width:120}}> 230.000  </td>
                  <td style={{width:90}}>
                    <Button className="btn-trio"><i className="fa fa-trash"></i></Button>
                  </td>
                </tr>

                <tr>
                  <td style={{width:60}}>2</td>
                  <td style={{ width:150 }}> id-card </td>
                  <td style={{width:410}}> Thẻ cảm ứng loại dày mã hàng : ID card (thick), hàng mới 100% </td>
                  <td style={{ width:150 }}>
                    <img style={{height:90,border:'1px solid #ddd'}} src="http://kpi.vikhang.com:9000/files/kpi.vikhang.com/mruan/photos/EHMZkXre6n.png"  />
                  </td>
                  <td tyle={{ width:90 }}> Cái </td>
                  <td style={{width:90}}>
                      <Input type="number" defaultValue="1" />
                  </td>
                  <td style={{width:120}}> <Input style={{width:'100%'}} type="text" defaultValue="200,000" />  </td>
                  <td style={{width:120}}> 200.000,000  </td>
                  <td style={{width:120}}> 230.000  </td>
                  <td style={{width:90}}>
                    <Button className="btn-trio"><i className="fa fa-trash"></i></Button>
                  </td>
                </tr>



              </tbody>

              <tfoot>
                <tr>
                  <td style={{width:60}}></td>
                  <td style={{ width:150 }}>  </td>
                  <td style={{width:410}}>  </td>
                  <td style={{ width:150 }}>  </td>
                  <td tyle={{ width:90 }}>  </td>
                  <td style={{width:90}}>   </td>
                  <td style={{width:90}}>  Tổng tiền  </td>
                  <td style={{width:90}}> 200.000  </td>
                  <td style={{width:90}}>   </td>
                  <td style={{width:90}}>   </td>
                </tr>
              </tfoot>

            </Table>
          </Col>
        </Row>
      </FormGroup>
    </div>
  )
}
class OrderForm extends Component {

   render(){


     return(
       <BenModal width={ this.props.width } name={ this.props.name } typeAction={ this.props.typeAction } modal={ this.props.modal }  >
          <Row>
            <Col md={3}>
              <FrmLeft modal={ this.props.modal} />
            </Col>
            <Col md={9}>
                <FrmRight modal={this.props.modal}/>
            </Col>
          </Row>
       </BenModal>
     )
   }
 }

 export default OrderForm;
