
import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label,  Form, FormGroup,FormText, Input,
  Popover, PopoverHeader, PopoverBody
 } from 'reactstrap';



import server from '../../../config/server';


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

      this.base = '/offices';
      this.code ='office';
      this.name = 'Văn phòng';
      this.info = {};

      this.data = {
        id:0,
        list:[]
      }


      this.state = {

        onAction:'',
        status:'',

        onTab:props.onTab,

      }

      this.refErr = React.createRef();


    }

    onStateChange(newState){

      /* KEEP PRIVATE DATA*/
      this.setState(Object.assign(this.state,newState));

      /* trả giá tri về cho parent component sử dụng */
      this.props.onStateChange(this.state);


    }

    onDataChange(){

      /* TRẢ GIÁ TRỊ VỀ CHO PARENT COMPONENT SỬ DỤNG*/
      this.props.onDataChange(this.data);

      /* RE RENDER : ON DATA CHANGE THÀNH CÔNG */
      this.onStateChange({
        status:'done'
      })
    }


    /* actions after done some thing */
    hook = {
        parent:this,

        success(){},
        err(){},
        showErr(){}
    }

    /* COMPONENT NÀY DÙNG MODAL : INTERAC INSIDE  */
    modal= {

      active:false,
      parent:this,

      /* KEEP CURRENT  DATA INFO FORM ON MODAL */
      data:{

      },

      /* type : post || put =>  open modal : info || null  */
      open(type,info={}){
        this.data = info || this.data;


        this.active = true ;
        this.parent.onStateChange({
          onAction:type,
          status:'modal opening'
        });
      },

      toggle(){


          this.active = !this.active;
          this.data = {}

          this.parent.onStateChange({
            onAction:'',
            status:'close modal'
          });

          this.popover.active = false;

      },

      popover:{
          active:false,

          me:this,

          btnYes(){

            alert('click yes')


          },

          toggle(parent){

             this.active = !this.active;

             parent.onStateChange({
               status:'toggle popover'
             });

          }
      },

      submit(){
        alert('on submit modal form')
      }
    }

    getInfo(id){

      let ret = null
      this.data.list.map((item)=>{
        if(parseInt(item.id)===parseInt(id)){
           ret = item
        }
      })

      return ret;
    }


    listWorkHour( hour ){

       hour = hour || 8 ;

       let list = [] ;
       for(let i=0 ; i < 24 ; i++){
         const num = i < 10 ? '0'+i : i

         const active = i === hour ? true : false
         list.push(<option selected={active} > {  num +' giờ' } </option>)
       }

       return list ;

    }

    listWorkMinute( minute ){

      minute = minute || 0 ;

      let list = [] ;
      for(let i=0 ; i < 60 ; i++){
        const num = i < 10 ? '0'+i : i

        const active = i === minute ? true : false

        list.push(<option selected={ active } > {  num +' phút' } </option>)
      }

      return list ;
    }



    render(){

        const list = this.data.list ;
        const modalTitle = this.state.onAction ==='post' ? 'Tạo ': 'Cập nhật ';




        return(
            <div hidden={  this.state.onTab === 'office' ? false : true } >

                <Modal  size="lg" isOpen={ this.modal.active } fade={false}   toggle={ ()=>{  this.modal.toggle() } } >
                   <ModalHeader toggle={ ()=>{ this.modal.toggle() } }> <i className="fa fa-plus"></i> { modalTitle+ this.name }  </ModalHeader>
                   <ModalBody>
                      <Form>
                          <Row form>
                            <Col md={4}>
                              <FormGroup>
                                <Label> Mã văn phòng </Label>
                                <Input type="text" onChange={ (e)=>{ this.modal.data.code = e.target.value  } } defaultValue={''}  placeholder="Tạo mã" />
                              </FormGroup>
                            </Col>
                            <Col md={8}>
                              <FormGroup>
                                <Label> Tên văn phòng </Label>
                                <Input type="text" onChange={ (e)=>{ this.modal.data.name = e.target.value  } } defaultValue={''}  placeholder="Nhập tên" />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row form>
                            <Col md={4}>
                              <FormGroup>
                                <Label> Số ĐT </Label>
                                <Input type="text" onChange={ (e)=>{ this.modal.data.code = e.target.value  } } defaultValue={''}  placeholder="Tạo mã" />
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <Label> Tỉnh / Thành </Label>
                                  <Input type="select" name="select" onChange={ (e)=>{  alert(e.target.value) } }>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                  </Input>
                              </FormGroup>
                            </Col>
                            <Col md={4}>
                              <FormGroup>
                                <Label> Quận/Huyện </Label>
                                  <Input type="select" name="select" id="exampleSelect">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                  </Input>
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label>Địa chỉ</Label>
                              <Input type="text"  placeholder="Nhập địa chỉ"/>
                          </FormGroup>

                          <FormGroup>
                            <Label>IP được chấm công</Label>
                              <Input type="text"  placeholder="Nhập địa chỉ"/>
                          </FormGroup>

                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label> Giờ làm việc </Label>
                                  <Input type="select" name="select" id="exampleSelect">
                                      { this.listWorkHour(8) }
                                  </Input>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label> . </Label>
                                  <Input type="select" name="select" id="exampleSelect">
                                  { this.listWorkMinute() }
                                  </Input>
                              </FormGroup>
                            </Col>
                          </Row>

                          <Row form>
                            <Col md={6}>
                              <FormGroup>
                                <Label> Giờ tan ca </Label>
                                  <Input type="select" name="select" id="exampleSelect">
                                      { this.listWorkHour(17) }
                                  </Input>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label> . </Label>
                                  <Input type="select" name="select" id="exampleSelect">
                                  { this.listWorkMinute(30) }
                                  </Input>
                              </FormGroup>
                            </Col>
                          </Row>


                       </Form>
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


    /* NHẬN LỆNH TỪ NEW PROPS : PHÂN TỪ DATA VÀ ACTION*/
    receiveAction(newProps){

      //alert(JSON.stringify(this.state))
      if(newProps.onTab===this.code){
        if(newProps.tabAction==='create'){
            this.modal.open('post');
        }
      }




      /*let active = newProps.tab ==='office' ? newProps.tabAction ==='create' ? true: false : false ;

      this.setState({
        tab:newProps.tab,
        action:newProps.tabAction,
        modal:{
          status:active
        }

      })*/



    }

    componentDidMount(){

      const _this = this ;
      this.onStateChange(Object.assign(this.state,{
        onAction:'read',
        status:'loading'
      }));


      server.get(this.base,(res)=>{

        res.rows.map((item)=>{
          _this.data.list.push(item)
        });

        _this.onDataChange();

      },(err)=>{
        _this.hook.err(err)
      })

    }

    /* NHẬN lệnh : từ NEW PROPS TỪ BODY OBJECT*/
    componentWillReceiveProps(newProps){



        Object.assign(this.state,newProps);
        this.receiveAction(newProps);


        //alert('componentWillReceiveProps: '+JSON.stringify(newProps));
        //this.onAction(newProps);

        //this.modal.open('post');


    }


    shouldComponentUpdate(newProps,newState){

      return newProps.onTab===this.code ? true : false;



    }


    componentDidUpdate(prevProps, prevState){

      //alert('componentDidUpdate');
      /*alert('ok man : componentDidUpdate');
      alert(JSON.stringify(prevProps));
      alert(JSON.stringify(prevState));*/

    }

}

export default Office;
