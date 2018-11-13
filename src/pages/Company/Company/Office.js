
import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label } from 'reactstrap';





function BlockItem(props){

  const data = props.data;
  return(
    <Col md="3" className="file-box">
        <div className="file" >

              <div className="block">
                <i className="fa fa-map-pin " style={{marginRight:5}}></i> {data.name} <br/>
                Nhân viên : {data.num}
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

class Office extends Component{

    constructor(props){
      super(props);

      this.state = {
        tab:props.tab,
        action:'',
        name:'Văn phòng',
        modal:{
          status:false
        },

        data:[
          {
            id:1,
            code:'code',
            name:'asdasd',
            address:'asdasdasd',
            num:2
          },
          {
            id:2,
            code:'code2',
            name:'Chi nhánh ABC',
            address:'12 Trần hưng đạo, HCM',
            num:5
          },
          {
            id:3,
            code:'code3',
            name:'Chi nhánh ABC',
            address:'12 Nguyễn Chí Thanh, HCM',
            num:2
          },
          {
            id:4,
            code:'code3',
            name:'Chi nhánh BCD',
            address:'12 Nguyễn Chí Thanh, HCM',
            num:2
          },
        ]
      }

      this.toggleModal = this.toggleModal.bind(this)
    }

    toggleModal(){
      this.setState({
        modal:{
          status:!this.state.modal.status
        },
        action:''

      });


    }
    onAction(newProps){

      let active = newProps.tab ==='office' ? newProps.tabAction ==='create' ? true: false : false ;

      this.setState({
        tab:newProps.tab,
        action:newProps.tabAction,
        modal:{
          status:active
        }

      })



    }
    render(){

        const list = this.state.data ;

        const modalTitle = this.state.action ==='create' ? 'Tạo ': 'Cập nhật ';



        return(
            <div hidden={  this.state.tab === 'office' ? false : true } >
                <Modal isOpen={this.state.modal.status} fade={false}   toggle={this.toggleModal} >
                   <ModalHeader toggle={this.toggle}> <i className="fa fa-plus"></i> { modalTitle+ this.state.name }  </ModalHeader>
                   <ModalBody>
                      <Row>
                          <Col md="12">
                            <div className="form-group">
                              <label>Tên</label>
                              <input className="form-control" id="name" onChange={ ()=>{ alert('asdasd') }} value="adasd"  type="text" placeholder="Nhập tên"/>
                            </div>
                          </Col>
                      </Row>
                   </ModalBody>
                   <ModalFooter>
                      <div role="group" className="btn-group">
                          <Button className="btn-ubuntu" onClick={ this.toggleModal }> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                          <Button className="btn-ubuntu-ok"> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
                      </div>

                   </ModalFooter>
                 </Modal>

                <Row>


              {
                list.map((item)=>{
                  return(
                    <BlockItem key={item.id} data={item} />
                  )
                })
              }

              </Row>  
            </div>
        )
    }

    componentWillReceiveProps(newProps){

        this.onAction(newProps)
    }




    componentDidUpdate(prevProps, prevState){
      /*alert('ok man : componentDidUpdate');
      alert(JSON.stringify(prevProps));
      alert(JSON.stringify(prevState));*/

    }

}

export default Office;
