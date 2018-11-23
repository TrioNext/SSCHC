import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, Form,
  Popover, PopoverHeader, PopoverBody
} from 'reactstrap';


/*
BenModal : props
  - state :  rule state : { onAction, status}
  - modal : it is a controller class
  - name : string
  refErr : React.createRef  object
*/

class BenModal extends Component{


  constructor(props){

    super(props)

    this.state = props.state;

    this.modal = props.modal;
    this.name = props.name;
    this.refErr = props.refErr;


  }
  render(){
    return(
      <Modal  size="lg" isOpen={ this.modal.active } fade={false}   toggle={ ()=>{  this.modal.toggle() } } >
        <ModalHeader toggle={ ()=>{ this.modal.toggle() } }> <i className="fa fa-plus"></i> { this.name }  </ModalHeader>

        <ModalBody>
          <Form>
            { this.props.children }
          </Form>
        </ModalBody>

        <div className="my-modal-footer">
           <div className="float-right">
               <div role="group" className="btn-group">
                     <Button className="btn-ubuntu" onClick={ ()=>{ this.modal.toggle() } }> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                     <Button className="btn-ubuntu-ok" onClick={ ()=>{ this.modal.onSubmit() } }> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
               </div>

           </div>

        </div>

        <div className="modal-err " >
           <div className="float-left form-err text-muted" id="form-err" ref={ this.refErr }>
               status
           </div>
           <div className="float-right">
             <a id="btnDel" hidden={ this.state.onAction === 'post' ? true : false  } className={'text-muted btn-delete ' } onClick={ ()=>{ this.modal.popover.toggle() } }>
               <i className="fa fa-trash"></i> Xoá
             </a>
             <Popover placement="bottom" isOpen={this.modal.popover.active } target="btnDel"  toggle={ ()=>{ this.modal.popover.toggle() } }>
               <PopoverHeader>Bạn có chắc chắn không?</PopoverHeader>
               <PopoverBody className="text-center pa-15">
                 <button onClick={ ()=>{  this.modal.popover.btnYes() } } className="btn btn-sm btn-success mr-20">Có</button>

                 <button onClick={ ()=>{  this.modal.popover.toggle() } } className="btn btn-sm btn-secondary">Không</button>
               </PopoverBody>
             </Popover>
           </div>
        </div>


      </Modal>
    )
  }
}

export default BenModal;
