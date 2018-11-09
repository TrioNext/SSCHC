import React, { Component} from 'react';
import '../../../scss/filemanager.scss';
import '../../../scss/emailapp.scss';


import {
  Badge, Card, CardHeader, CardBody, CardFooter, Row, Col,
  Button,ButtonGroup, InputGroup, Input, InputGroupAddon
} from 'reactstrap';


import CompanyToolBar from './toolbar';
import CompanyBody from './body';


function BlockItem(props){

  const data = props.data;
  return(
    <Col md="3" className="file-box">
        <div className="file" >

              <div className="block">
                <i className="fa fa-map-pin " style={{marginRight:5}}></i> {data.name} <br/>
                Nhân viên : 12
              </div>
              <div className="file-name">
                <i className="fa fa-map-marker"></i> { data.address}
                <br/>
                <span>Added: Jan 11, 2016</span>
              </div>

        </div>
    </Col>
  )
}





class Company extends Component {

  constructor(props) {
    super(props)
  }

  render(){

    return(
      <div className="animated fadeIn">
          <div className="email-app mb-4">
              <nav style={{background:'#DEDEDE'}}>

                  <a href="#/apps/email/compose" className="btn btn-primary" style={{ width:'100%', color:'#fff',background:"#617B88", border:0 }}>Tạo bộ phận</a>

                  <div style={{marginTop:20}}>
                    <ul className="nav">

                        <li className="nav-item active">
                          <a href="#/company/all" className="nav-link">
                            <i className="fa fa-inbox"></i> Tất cả
                          </a>
                        </li>

                        <li className="nav-item">
                          <a href="#/company" className="nav-link">
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

                  <CompanyToolBar />

                  <CompanyBody>
                      <BlockItem  data={{
                         name:"Chi nhánh Hà Nội ",
                         address:"Quận 1, TP.HCM"
                      }}/>

                      <BlockItem  data={{
                         name:"Chi nhánh Hà Nội ",
                         address:"Quận Hồ Tây, Hà Nội"
                      }}/>

                      <BlockItem  data={{
                         name:"Chi nhánh Hà Nội ",
                         address:"Quận Hồ Tây, Hà Nội"
                      }}/>

                      <BlockItem  data={{
                         name:"Chi nhánh Hà Nội ",
                         address:"Quận Hồ Tây, Hà Nội"
                      }}/>

                      <BlockItem  data={{
                         name:"Chi nhánh Hà Nội ",
                         address:"Quận Hồ Tây, Hà Nội"
                      }}/>

                      <BlockItem  data={{
                         name:"Chi nhánh Hà Nội ",
                         address:"Quận Hồ Tây, Hà Nội"
                      }}/>

                      <BlockItem  data={{
                         name:"Chi nhánh Hà Nội ",
                         address:"Quận Hồ Tây, Hà Nội"
                      }}/>

                      <BlockItem  data={{
                         name:"Chi nhánh Hà Nội ",
                         address:"Quận Hồ Tây, Hà Nội"
                      }}/>
                  </CompanyBody>

              </main>
          </div>
      </div>
    )
  }
}

export default Company;
