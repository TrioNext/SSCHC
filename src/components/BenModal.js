import React, {Component} from 'react';

import { Button, Modal, ModalHeader, ModalBody, Form,
  Popover, PopoverHeader, PopoverBody
} from 'reactstrap';


/*
BenModal : props
  - onAction :  rule state : { onAction, status}
  - modal : it is a controller class
  - name : string

  refErr : React.createRef  object
*/

class BenModal extends Component{


  constructor(props){

    super(props);

    this.state = {

    }

  }

  componentWillReceiveProps(newState){

      console.log('BEN MODAL');
      console.log(newState);

      this.setState(newState);
  }

  render(){



    return(
      <Modal  size="lg" isOpen={ this.props.modal.active } fade={false}   toggle={ ()=>{  this.props.modal.toggle() } } >
        <ModalHeader toggle={ ()=>{ this.props.modal.toggle() } }> <i className="fa fa-plus"></i> { this.props.name }  </ModalHeader>

        <ModalBody style={{
            padding:30
          }}>
          <Form>
            { this.props.children }
          </Form>
        </ModalBody>

        <div className="my-modal-footer">
           <div className="float-right">
               <div role="group" className="btn-group">
                     <Button className="btn-ubuntu" onClick={ ()=>{ this.props.modal.toggle() } }> <i className="fa fa fa-reply"></i> Từ Chối  </Button>
                     <Button className="btn-ubuntu-ok" onClick={ ()=>{ this.props.modal.onSubmit() } }> <i className="fa fa-chevron-circle-right"></i> Đồng Ý </Button>
               </div>

           </div>

        </div>

        <div className="modal-err " >
           <div className="float-left form-err text-muted" id="form-err">
               status
           </div>
           <div className="float-right">
             <a id="btnDel" hidden={ this.props.onAction === 'post' ? true : false  } className={'text-muted btn-delete ' } onClick={ ()=>{ this.props.modal.popover.toggle() } }>
               <i className="fa fa-trash"></i> Xoá
             </a>
             <Popover placement="bottom" isOpen={this.props.modal.popover.active } target="btnDel"  toggle={ ()=>{ this.props.modal.popover.toggle() } }>
               <PopoverHeader>Bạn có chắc chắn không?</PopoverHeader>
               <PopoverBody className="text-center pa-15">
                 <button onClick={ ()=>{  this.props.modal.popover.btnYes() } } className="btn btn-sm btn-success mr-20">Có</button>

                 <button onClick={ ()=>{  this.props.modal.popover.toggle() } } className="btn btn-sm btn-secondary">Không</button>
               </PopoverBody>
             </Popover>
           </div>
        </div>


      </Modal>
    )
  }
}

export default BenModal;
