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


    this.name = 'Bộ phận';


    this.data = {
      id:0,
      list:[
        {
          id:0,
          code:'',
          name:'Tất cả',
          num:0

        }
      ]
    };

    this.state = {
      onAction:'', /* HOLD ACTION ON THIS GUY*/
      status:'',
    }

    this.onItem = this.onItem.bind(this);
    this.refErr = React.createRef();


  }

  /* CONNECT WITH PARENT OBEJECT HERE */
  onStateChange(obj){
    /**/

    this.setState(Object.assign(this.state,obj))
    //this.props.onStateChange(obj)




  }
  onDataChange(){
    //this.props.onDataChange(this.data);
    this.onStateChange({
      onAction:'read',
      status:'done'
    })
  }

  /* END CONNECT*/


  hook = {

    parent:this,
    success(onAction,idata){

        switch(onAction){
          case 'post':

              if(idata.name==='success'){
                this.parent.data.list.push(idata.data);
                this.parent.onDataChange();
                this.parent.modal.toggle();
              }else{  this.parent.refErr.current.textContent = idata.mesage }

          break;
          case 'put':

              /* UPDATE LOCAL DATA*/
              this.parent.data.list.filter((item)=>{
                if(item.id===this.parent.modal.data.id){
                  item.name = this.parent.modal.data.name
                }
              });

              this.parent.onDataChange();
              this.parent.modal.toggle();
          break;

          case 'delete':


              //alert(JSON.stringify(this.parent.data.list));
              const newList = this.parent.data.list.filter(item => parseInt(item.id) !== parseInt(idata.id));

              this.parent.data.list = newList;

              this.parent.onDataChange();


              this.parent.modal.toggle();



          break;

        }


    },


    error(err){



        const data = err.response.data ;
        const msg = data.errors[0];

        this.showErr(msg);

    },
    showErr(msg){

        const _this = this ;

        msg = msg.message.indexOf('must be unique') >-1 ? 'Mã này đã được dùng' : msg.message ;
        this.parent.refErr.current.textContent = msg;

        setTimeout(()=>{
          this.parent.refErr.current.textContent = 'status';
        },1000);


    },
  }


  /* INTERACT INSIDE*/
  modal= {
    active:false,
    me:this,

    data:{
      id:0,
      code:'',
      name:''
    },

    open(type,info){

      this.data = info || this.data;


      this.active = true ;
      this.me.onStateChange({
        onAction:type,
        status:'modal opening'
      });





    },

    toggle(){
      this.active = !this.active;
      this.data = {
        code:'',
        name:''
      }
      this.me.onStateChange({
        onAction:'',
        status:'close modal'
      });

      this.popover.active = false;

    },

    popover:{
      active:false,

      me:this,
      btnYes(){

        const _this = this ;
        const id = this.me.modal.data.id;

        server.delete('/departments/'+id,(res)=>{
           _this.me.hook.success('delete',res);
        },(err)=>{
           _this.me.hook.error(err);
        })


      },

      toggle(parent){

         this.active = !this.active;

         parent.onStateChange({
           status:'open popover'
         });


      }
    },
    submit(){

       const _this = this ;

       const METHOD = this.me.state.onAction;
       const URI = METHOD === 'post' ? '/departments' : '/departments?id='+this.data.id

       server.axios(METHOD,URI,this.data,(idata)=>{
         _this.me.hook.success(_this.me.state.onAction,idata);
       },(err)=>{

           _this.me.hook.error(err);
       })

    }

  }


  getInfo(id){

    return this.data.list.find(item=> item.id == id);
  }


  onItem(item){
      //this.update(item);
      /* */
      alert(JSON.stringify(item))
  }

  render(){

    const listItem = this.data.list;
    const strModalTitle = this.state.onAction ==='post' ? 'Tạo ' : 'Cập nhật ';


    return(
      <div>
          <nav style={{background:'#DEDEDE'}}>

              <Button onClick={ ()=>{  this.modal.open('post') } } color="primary" style={{ width:'100%', color:'#fff',background:"#617B88", border:0 }}> Tạo bộ phận </Button>

              <div style={{marginTop:20}}>
                <ul className="nav">

                    {
                      listItem.map((item,index)=>{

                        let active = parseInt(item.id) === this.data.id ? true  : false;

                        return(
                           <ItemList active={ active} key={index} id={item.id} onOptionClick={ ()=>{ this.modal.open('put',{ id:item.id,code:item.code,name:item.name } ) } }  onClick={()=>{ this.onItem(item) }}  name={ item.name}  num={item.num}  />
                        )
                      })
                    }


                </ul>
              </div>
          </nav>

          <Modal isOpen={this.modal.active} fade={false}   toggle={()=>{ this.modal.toggle() }} >
             <ModalHeader toggle={()=>{ this.modal.toggle() }} > <i className="fa fa-plus"></i> { strModalTitle + this.name }  </ModalHeader>
             <ModalBody>
                <Row>
                    <Col md="12">

                      <div className="form-group">
                        <label>Mã { this.name }</label>
                        <input  className="form-control" id="code" onChange={(e)=>{ this.modal.data.code = e.target.value.trim() }} defaultValue={ this.state.onAction ==='post' ? '' : this.modal.data.code }   type="text" placeholder="Nhập mã"/>
                      </div>
                      <div className="form-group">
                        <label>Tên { this.name } </label>
                        <input onChange={(e)=>{ this.modal.data.name = e.target.value.trim() }}  className="form-control" id="name" defaultValue={ this.state.onAction ==='post' ? '' : this.modal.data.name }   type="text" placeholder="Nhập tên"/>
                      </div>
                    </Col>
                </Row>
             </ModalBody>

             <div className="my-modal-footer">
                <div className="float-right">
                    <div role="group" className="btn-group">
                          <Button className="btn-ubuntu" onClick={ ()=>{ this.modal.toggle() } }> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                          <Button className="btn-ubuntu-ok" onClick={ ()=>{ this.modal.submit() } }> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
                    </div>

                </div>

             </div>

             <div className="modal-err " >
                <div className="float-left form-err text-muted" ref={ this.refErr }>
                    status
                </div>
                <div className="float-right">
                  <a id="btnDel" hidden={ this.state.onAction === 'post' ? true : false  } className={'text-muted btn-delete ' } onClick={ ()=>{ this.modal.popover.toggle(this) } }>
                    <i className="fa fa-trash"></i> Xoá
                  </a>
                  <Popover placement="bottom" isOpen={this.modal.popover.active } target="btnDel"  toggle={ ()=>{ this.modal.popover.toggle(this) } }>
                    <PopoverHeader>Bạn có chắc chắn không?</PopoverHeader>
                    <PopoverBody className="text-center pa-15">
                      <button onClick={ ()=>{  this.modal.popover.btnYes(this) } } className="btn btn-sm btn-success mr-20">Có</button>

                      <button onClick={ ()=>{  this.modal.popover.toggle(this) } } className="btn btn-sm btn-secondary">Không</button>
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


      this.onStateChange({
        onAction:'read',
        status:'loading'
      })

      server.get('/departments',function(data){

        let listData = _this.data.list;

        data.rows.map((item)=>{
          _this.data.list.push(item)
        });

        _this.onDataChange()

      },function(data){

      })
  }

  componentWillReceiveProps(){
    //alert('componentWillReceiveProps');
  }

  componentDidUpdate(){
    //alert('componentDidUpdate');

  }

}

export default CompanyAside;
