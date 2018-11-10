import React, { Component} from 'react';
import '../../../scss/filemanager.scss';
import '../../../scss/emailapp.scss';


import {
  Badge, Card, CardHeader, CardBody, CardFooter, Row, Col,
  Button,ButtonGroup, InputGroup, Input, InputGroupAddon
} from 'reactstrap';


import CompanyApp from './CompanyApp';
import CompanyAside from './CompanyAside';
import CompanyMain from './CompanyMain';

  import CompanyToolBar from './toolbar';
  import CompanyBody from './body';
  import CompanyFooter from './footer';



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
    super(props);

    this.state = {
      tab:'office'
    }
  }

  render(){

    const tab = this.state.tab;
    return(
      <div className="animated fadeIn">

          <CompanyApp>

              {/* quan lý : departments */}
              <CompanyAside/>

              {/* workplace for : offices - stores - users  */}
              <CompanyMain>

                  <CompanyToolBar tab={ tab } />

                  <CompanyBody>
                      asdasd
                  </CompanyBody>


              </CompanyMain>
          </CompanyApp>

      </div>
    )
  }
}

export default Company;
