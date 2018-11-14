/* QUẢN LÝ TABLE: DEPARTMENT*/

import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label,
    Popover, PopoverHeader, PopoverBody

} from 'reactstrap';

import server from '../../../config/server';



function ItemList(props){

  const isActive =  props.active ? 'active' : '';
  const btnOption = props.id === 0 ? null : (<span  className="option" onClick={ props.onOptionClick }> <i className="fa fa-pencil"></i></span>)

  return(
    <li  className={'nav-item '+isActive}>
      <span  className="nav-link" >
        <a onClick={ props.onClick } ><i className="fa fa-inbox mr-5"></i> {props.name} </a>
        {btnOption}
      </span>
    </li>
  )
}

/* QUẢN LÝ BỘ PHẬN*/
class CompanyAside extends Component{

  constructor(props){
    super(props);

    this.form = {
      name:'Bộ phận',
      status:'',
      curInfo:{},

    }

    this.state = {
      modal:false,
      popoverOpen:false,

      currentId:0,
      data:[
        {
          id:0,
          code:'',
          name:'Tất cả',
          num:0

        }
      ]
    }

    this.create = this.create.bind(this);
    this.toggle = this.toggle.bind(this);
    this.togglePopoverDelete = this.togglePopoverDelete.bind(this);
    this.onItem = this.onItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);


    this.refTxtCode = React.createRef();
    this.refTxtName = React.createRef();
    this.refErr = React.createRef();


  }

  getInfo(id){

    let ret = null
    this.state.data.map((item)=>{
      if(parseInt(item.id)===parseInt(id)){
         ret = item
      }
    })

    return ret;
  }

  /*
  AFFTER : PLACE after save data done

  */
  after(idata){
      let err = ''
      if(idata.name==='success'){

          switch(this.form.status){
            case 'create':
                const data = this.state.data ;
                data.unshift(idata.data);
                this.setState({
                  data:data
                });

            break;
          }
      }else{
        err = idata.message.replace('Validation error','') === '' ? 'Mã này đã được sử dụng' : idata.message.replace('Validation error','');
        this.refErr.current.textContent = err;

        setTimeout(()=>{
          this.refErr.current.textContent = 'status';
        },4000);
      }


  }
  onError(err){
    const data = err.response.data;
    this.refErr.current.textContent = data.errors[0]['message'];

    setTimeout(()=>{
      this.refErr.current.textContent = 'status';
    },4000);

  }

  onSubmit(e){

    const _this = this ;



    switch(this.form.status){
        case 'create':



            server.post('/departments',{
              code:_this.refTxtCode.current.value.trim(),
              name:_this.refTxtName.current.value.trim()
            },function(idata){

                _this.after(idata);


            },function(err){

                _this.onError(err);

            })

        break;
        case 'update':

          const id = this.state.currentId;

          server.put('/departments?id='+id,{
            name: _this.refTxtName.current.value
          },function(idata){

              /* UPDATE LOCAL DATA*/
              _this.state.data.filter((item)=>{
                if(item.id===id){
                  item.name = _this.refTxtName.current.value;
                }
              });

              _this.toggle()

          },function(err){
            alert(JSON.stringify(err));
          })
        break;
    }
  }

  setStatus(status){
    this.form.status = status;
  }
  create(){
    //this.props.onStateChange('pass data to parent ');
    /*
    xử lý model
    */

    this.setStatus('create');
    this.setState({
      modal:true
    });




  }

  update(item){

    this.setStatus('update');
    this.setState({
      modal:true,
      currentId:item.id
    });


  }

  delete(){

    this.setStatus('delete');
    this.setState({
      modal:true
    })
  }

  toggle() {
    this.setStatus('')
    this.setState({
      modal: !this.state.modal,

    });
  }
  togglePopoverDelete(){
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  onItem(item){
      //this.update(item);
      /* */
      alert(JSON.stringify(item))
  }

  render(){

    const listItem = this.state.data;
    const strModalTitle = this.form.status ==='create' ? 'Tạo ' : 'Cập nhật ';


    this.form.curInfo = this.getInfo(this.state.currentId);







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
                           <ItemList active={ active} key={index} id={item.id} onOptionClick={ ()=>{ this.update(item) } }  onClick={()=>{ this.onItem(item) }}  name={ item.name}  num={item.num}  />
                        )
                      })
                    }


                </ul>
              </div>
          </nav>

          <Modal isOpen={this.state.modal} fade={false}   toggle={this.toggle} >
             <ModalHeader toggle={this.toggle}> <i className="fa fa-plus"></i> { strModalTitle + this.form.name }  </ModalHeader>
             <ModalBody>
                <Row>
                    <Col md="12">

                      <div className="form-group">
                        <label>Mã { this.form.name }</label>
                        <input ref={this.refTxtCode}  className="form-control" id="code" defaultValue={ this.form.status ==='create' ? '' : this.form.curInfo['code'] }   type="text" placeholder="Nhập mã"/>
                      </div>
                      <div className="form-group">
                        <label>Tên { this.form.name } </label>
                        <input ref={ this.refTxtName}  className="form-control" id="name" defaultValue={ this.form.status ==='create' ? '' : this.form.curInfo['name'] }   type="text" placeholder="Nhập tên"/>
                      </div>
                    </Col>
                </Row>
             </ModalBody>

             <div className="my-modal-footer">
                <div className="float-right">
                    <div role="group" className="btn-group">
                          <Button className="btn-ubuntu" onClick={ this.toggle }> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                          <Button className="btn-ubuntu-ok" onClick={  this.onSubmit }> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
                    </div>

                </div>

             </div>
             <div className="modal-err " >
                <div className="float-left form-err text-muted" ref={ this.refErr }>
                    status
                </div>
                <div className="float-right">
                  <a id="btn-del-department" hidden={ this.form.status === 'create' ? true : false  } className={'text-muted btn-delete ' } onClick={this.togglePopoverDelete}>
                    <i className="fa fa-trash"></i> Xoá
                  </a>
                  <Popover placement="bottom" isOpen={this.state.popoverOpen} target="btn-del-department"  toggle={this.togglePopoverDelete}>
                    <PopoverHeader>Bạn có chắc chắn không?</PopoverHeader>
                    <PopoverBody className="text-center pa-15">
                      <button className="btn btn-sm btn-success mr-20">Có</button>

                      <button className="btn btn-sm btn-secondary">Không</button>
                    </PopoverBody>
                  </Popover>
                </div>
             </div>



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
