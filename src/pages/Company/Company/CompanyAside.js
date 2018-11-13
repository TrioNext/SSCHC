/* QUẢN LÝ TABLE: DEPARTMENT*/

import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label } from 'reactstrap';

import server from '../../../config/server';



function ItemList(props){

  const isActive =  props.active ? 'active' : '';
  const num = props.num > 0 ? (<span className="badge badge-danger"> {props.num} </span>) : null
  return(
    <li onClick={ props.onClick } className={'nav-item '+isActive}>
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
      name:'Bộ phận',
      modal:false,
      status:'',

      currentId:0,
      data:[

        {
          id:0,
          name:'Tất cả',
          num:0

        }


      ]
    }
    this.create = this.create.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onItem = this.onItem.bind(this);
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

  update(item){

    this.setState({
      modal:true,
      status:'update',
      currentId:item.id
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

  onItem(item){
      this.update(item)
  }

  render(){

    const listItem = this.state.data;

    const strModalTitle = this.state.status ==='create' ? 'Tạo ' : 'Cập nhật '

    return(
      <div>
          <nav style={{background:'#DEDEDE'}}>

              <Button onClick={ this.create } color="primary" style={{ width:'100%', color:'#fff',background:"#617B88", border:0 }}> Tạo bộ phận </Button>

              <div style={{marginTop:20}}>
                <ul className="nav">

                    {
                      listItem.map((item,index)=>{

                        let active = parseInt(item.id) === this.state.currentId ? true  : false;

                        return(
                           <ItemList active={ active} key={index} onClick={()=>{ this.onItem(item) }}  name={ item.name}  num={item.num}  />
                        )
                      })
                    }


                </ul>
              </div>
          </nav>

          <Modal isOpen={this.state.modal} fade={false}   toggle={this.toggle} >
             <ModalHeader toggle={this.toggle}> <i className="fa fa-plus"></i> { strModalTitle + this.state.name }  </ModalHeader>
             <ModalBody>
                <Row>
                    <Col md="12">
                      <div className="form-group">
                        <label>Tên</label>
                        <input className="form-control" id="name" onChange={ ()=>{ alert('asdasd') }} value={ listItem[this.state.currentId]['name'] }  type="text" placeholder="Nhập tên"/>
                      </div>
                    </Col>
                </Row>
             </ModalBody>
             <ModalFooter>
                <div role="group" className="btn-group">
                    <Button className="btn-ubuntu" onClick={ this.toggle }> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                    <Button className="btn-ubuntu-ok"> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
                </div>

             </ModalFooter>
           </Modal>
      </div>


    )
  }

  componentDidMount(){
      const _this = this ;
      server.get('/departments?p=0?max=30',function(data){

        let listData = _this.state.data;
        data.rows.map((item)=>{
          listData.push(item)
        })

        
        _this.setState({
          data:listData
        })

      },function(data){})
  }

}

export default CompanyAside;
