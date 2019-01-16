
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { AppSwitch } from '@coreui/react'

class Dashboard extends Component{

  render(){
    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, padding:10}}>
            <main className="form-general" >
                <Row>
                  <Col md="4">
                    <h5> Đặt hàng </h5>
                    Thiết lâp liên quan đến đặt hàng
                  </Col>
                  <Col md="4" style={{
                      verticalAlign:'middle'
                    }}>
                    <p>Tự động tạo hóa đơn XUẤT sản phẩm</p><br/>
                    <p> Cấm hủy PHIẾU đã hoàn thành </p>
                  </Col>
                  <Col md="4"
                    style={{
                        verticalAlign:'middle'
                      }}
                    >
                    <p> <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'}  checked={false} /> </p>
                    <p> <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'}  checked={false} /> </p>
                  </Col>

                </Row>

                <Row>
                  <Col md="4" className="align-middle">
                    <h5> Phương pháp tồn kho </h5>
                    Thiết lâp liên quan đến Phương pháp tồn kho
                  </Col>
                  <Col md="4" className="align-middle">
                    <p> Cho phép tồn kho theo Serial Number / IMEI </p>
                  </Col>
                  <Col md="4" className="align-middle">
                    <AppSwitch className={'mx-1'} variant={'pill'} color={'primary'} checked={false} />
                  </Col>

                </Row>
            </main>
        </div>
      </div>
    )
  }
}

export default Dashboard;
