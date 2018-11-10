
import React, { Component} from 'react';
import {
  Row, Col,
  Button,ButtonGroup, InputGroup, Input, InputGroupAddon
} from 'reactstrap';

class CompanyToolBar extends Component{

  constructor(props){
    super(props);
    this.state = {}




  }



  render(){

    this.state = this.props;



    const officeTabe = this.state.tab === 'office' ? true : false;
    const storeTabe = this.state.tab === 'store' ? true : false;
    const userTabe = this.state.tab === 'user' ? true : false;
    const settingTabe = this.state.tab === 'setting' ? true : false;


    return(
      <div className="toolbar">
          <Row>
            <Col md="8">
                <ButtonGroup>

                    <Button active={officeTabe} color="success"><i className="fa fa-tags"></i> Văn phòng </Button>
                    <Button active={storeTabe}  color="success" > <i className="fa fa-tags"></i> Cửa hàng</Button>
                    <Button active={userTabe}  color="success" > <i className="fa fa-user"></i> Nhân viên </Button>
                    <Button active={settingTabe}  color="success" > <i className="fa fa-gear"></i> Cài đặt </Button>

                </ButtonGroup>
            </Col>

            <Col md="4" className="text-right">

                {/*<InputGroup>
                  <Input type="text" id="input1-group2" name="input1-group2" placeholder="Tìm kiếm" />
                  <InputGroupAddon addonType="append">
                    <Button type="button" color="primary"><i className="fa fa-search"></i></Button>
                  </InputGroupAddon>
                </InputGroup>
                */}

                <ButtonGroup>
                    <Input placeholder="Tìm kiếm" style={{borderRadius:0}} className="hidden" />
                    <Button style={{marginRight:10}} active color="success"> <i className="fa fa-search"></i> </Button>

                    <Button style={{borderRadius:0}} color="success" > <i className="fa fa-plus-circle"></i> Tạo Văn Phòng </Button>

                </ButtonGroup>

            </Col>
          </Row>
      </div>
    )
  }
}

export default CompanyToolBar;
