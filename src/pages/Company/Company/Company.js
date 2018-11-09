import React, { Component} from 'react';
import '../../../scss/filemanager.scss';
import '../../../scss/emailapp.scss';


import {
  Badge, Card, CardHeader, CardBody, CardFooter, Row, Col,
  Button,ButtonGroup, InputGroup, Input, InputGroupAddon
} from 'reactstrap';



class Company extends Component {

  constructor(props) {
    super(props)
  }

  render(){

    return(
      <div className="animated fadeIn">
          <div className="email-app mb-4">
              <nav>
                  <a href="#/apps/email/compose" className="btn btn-primary" style={{ width:'100%','border-radius':0, color:'#fff' }}>Tạo bộ phận</a>
                  <div style={{marginTop:20}}>
                    <ul className="nav">

                        <li className="nav-item active">
                          <a href="#/apps/email/inbox" className="nav-link">
                            <i className="fa fa-inbox"></i> Tất cả
                          </a>
                        </li>

                        <li className="nav-item">
                          <a href="#/apps/email/inbox" className="nav-link">
                            <i className="fa fa-inbox"></i> Bộ phận giám đốc <span className="badge badge-danger">4</span>
                          </a>
                        </li>

                        <li className="nav-item">
                          <a href="#/apps/email/inbox" className="nav-link">
                            <i className="fa fa-inbox"></i> Bộ phận kỹ thuật
                          </a>
                        </li>

                        <li className="nav-item">
                          <a href="#/apps/email/inbox" className="nav-link">
                            <i className="fa fa-inbox"></i> Bộ phận Kinh Doanh
                          </a>
                        </li>

                        <li className="nav-item">
                          <a href="#/apps/email/inbox" className="nav-link">
                            <i className="fa fa-inbox"></i> Bộ phận marketing
                          </a>
                        </li>

                    </ul>
                  </div>
              </nav>
              <main className="message">
                  <div className="toolbar">
                      <Row>
                        <Col md="8">
                            <ButtonGroup>
                                <Button color="success" className="btn-light" active> <i className="fa fa-star"></i> Tất cả </Button>
                                <Button color="success"><i className="fa fa-tags"></i> Văn phòng </Button>
                                <Button color="success" > <i className="fa fa-tags"></i> Cửa hàng</Button>
                            </ButtonGroup>
                        </Col>

                        <Col md="4">
                            <InputGroup>

                              <Input type="text" id="input1-group2" name="input1-group2" placeholder="Tìm kiếm" />
                              <InputGroupAddon addonType="append">
                                <Button type="button" color="primary"><i className="fa fa-search"></i></Button>
                              </InputGroupAddon>
                            </InputGroup>
                        </Col>
                      </Row>
                  </div>

                  <div className="detail" style={{ padding:15,paddingTop:30,}}>

                    
                      <Row>
                        <Col md="3" className="file-box">
                            <Card>
                              <CardBody>

                              </CardBody>
                              <CardFooter>asdasd</CardFooter>
                            </Card>
                        </Col>
                        <Col md="3" className="file-box">
                            <div className="file">
                                <a href="#">
                                  <div className="icon">
                                    <i className="zmdi zmdi-file-text"></i>
                                  </div>
                                  <div className="file-name">
                                    Document_2016.doc
                                    <br/>
                                    <span>Added: Jan 11, 2016</span>
                                  </div>
                                </a>
                            </div>
                        </Col>
                        <Col md="3" className="file-box">
                            <div className="file">
                                <a href="#">
                                  <div className="icon">
                                    <i className="zmdi zmdi-file-text"></i>
                                  </div>
                                  <div className="file-name">
                                    Document_2016.doc
                                    <br/>
                                    <span>Added: Jan 11, 2016</span>
                                  </div>
                                </a>
                            </div>
                        </Col>
                        <Col md="3" className="file-box">
                            <div className="file">
                                <a href="#">
                                  <div className="icon">
                                    <i className="zmdi zmdi-file-text"></i>
                                  </div>
                                  <div className="file-name">
                                    Document_2016.doc
                                    <br/>
                                    <span>Added: Jan 11, 2016</span>
                                  </div>
                                </a>
                            </div>
                        </Col>
                      </Row>
                  </div>
              </main>
          </div>
      </div>
    )
  }
}

export default Company;
