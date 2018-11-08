import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import client from '../../../feathers';

class Login extends Component {

  constructor(){
    super();

    this.state = {};


    this.updateField = this.updateField.bind(this);

    this.login = this.login.bind(this);
  }

  updateField(name,ev){
     //this.setState({[name]:ev.target.velue});
     //this.setState({[name]:ev.target.value});

     this.setState({[name]: ev.target.value})

  }

  login(e){

    e.preventDefault();

    const {email, password} = this.state;

    alert(JSON.stringify(this.state))
    return client.authenticate({
      "strategy":"local",
    	"email":email,
    	"password":password
    }).then((res)=>{

    }).catch((error)=>{
      console.log(error);
    })


  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="5">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>

                    <div style={{ textAlign:'center',marginBottom:20  }}>
                      <img style={{marginLeft:-20}} src="/assets/img/ssc.png"/>
                    </div>
                    <Form name="form-login" onSubmit={ this.login } >

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" onChange={ (ev) =>{ this.updateField('email',ev) }  } placeholder="Tên truy cập" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Mật khẩu" onChange={ (ev) =>{ this.updateField('password',ev) }  } autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button  type="submit" className="px-4 btn-trio">Đăng nhập</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <a  color="link"  className="px-0">Quên mật khẩu?</a>
                        </Col>
                      </Row>
                      <Row style={{marginTop:20}}>
                        <Col xs="12">
                          { this.state.err }
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>

              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
