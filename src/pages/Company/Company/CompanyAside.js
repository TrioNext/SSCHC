/* QUẢN LÝ TABLE: DEPARTMENT*/

import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label } from 'reactstrap';


function ItemList(props){

  const isActive =  props.active ? 'active' : '';
  const num = props.num > 0 ? (<span className="badge badge-danger"> {props.num} </span>) : null
  return(
    <li className={'nav-item '+isActive}>
      <a  className="nav-link" onClick={ props.click }>
        <i className="fa fa-inbox"></i> {props.name} {num}


      </a>
    </li>
  )
}

/* QUẢN LÝ BỘ PHẬN*/
class CompanyAside extends Component{

  constructor(props){
    super(props);

    this.state = {
      modal:false,
      status:'',
      data:[

        {
          id:0,
          name:'Tất cả',
          num:0

        },
        {
          id:1,
          name:'Phòng Kinh Doanh',
          num:10

        },
        {
          id:2,
          name:'Phòng Kỹ thuật',
          num:2

        },
        {
          id:2,
          name:'Phòng Kinh Marketing',
          num:3
        },

      ]
    }
    this.create = this.create.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  create(){
    //this.props.onStateChange('pass data to parent ');
    /*
    xử lý model
    */
    this.setState({
      modal:true,
      status:'create'
    });


  }

  update(){
    this.setState({
      modal:true,
      status:'update'
    });


  }

  delete(){
    this.setState({
      modal:true,
      status:'delete'
    })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
      status:''
    });
  }

  onItem(e,name){
    console.log(name);
  }
  render(){

    const listItem = this.state.data;
    return(
      <div>
          <nav style={{background:'#DEDEDE'}}>

              <Button onClick={ this.create } color="primary" style={{ width:'100%', color:'#fff',background:"#617B88", border:0 }}> Tạo bộ phận </Button>

              <div style={{marginTop:20}}>
                <ul className="nav">

                    {
                      listItem.map((item,index)=>{
                        if(index===0){
                          return (<ItemList key={index}  name={ item.name}  num={item.num} active  />)
                        }
                        return(
                           <ItemList key={index}  name={ item.name}  num={item.num}  />
                        )
                      })
                    }


                </ul>
              </div>
          </nav>

          <Modal isOpen={this.state.modal} style={{width:'1200px'}}  toggle={this.toggle} >
             <ModalHeader toggle={this.toggle}> <i className="fa fa-plus"></i> Tạo bộ phận </ModalHeader>
             <ModalBody>
                <Row>
                    <Col md="12">
                      <div className="form-group">
                        <label>Tên</label>
                        <input className="form-control" id="name" type="text" placeholder="Enter your name"/>
                      </div>
                    </Col>
                </Row>
             </ModalBody>
             <ModalFooter>
                <div role="group" className="btn-group">
                    <Button className="btn-ubuntu"> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                    <Button className="btn-ubuntu-ok"> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
                </div>

             </ModalFooter>
           </Modal>
      </div>


    )
  }
}

export default CompanyAside;
