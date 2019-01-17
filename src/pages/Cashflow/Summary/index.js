
import React, { Component } from 'react';
import { Badge, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, Table } from 'reactstrap';
import classnames from 'classnames';

/*  tabs */
import TabObject from './TabObject';
import TabCoin from './TabCoin';
import TabNode from './TabNode';


class CashflowSummary extends Component{

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1',
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  render(){
    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, padding:10}}>
            <main className="form-general" >
                <Row style={{ borderBottom:0}}>
                  <Col md="12">
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }}
                        >
                          Xem theo đối tượng
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => { this.toggle('2'); }}
                        >
                          Xem theo tài khoản TM - NH
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '3' })}
                          onClick={() => { this.toggle('3'); }}
                        >
                          Xem theo Danh mục
                        </NavLink>
                      </NavItem>
                    </Nav>

                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                          <TabObject  />
                      </TabPane>
                      <TabPane tabId="2">
                          <TabCoin  />
                      </TabPane>
                      <TabPane tabId="3">
                        <TabNode  />
                      </TabPane>
                    </TabContent>
                  </Col>
                </Row>
            </main>
        </div>
      </div>
    )
  }
}

export default CashflowSummary;
