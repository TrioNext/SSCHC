
import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label,
    Popover, PopoverHeader, PopoverBody

} from 'reactstrap';

import Model from '../../../config/model';
import Hook from '../../../config/hook.class';

import DepartmentFormCtrl from './department.class';
import DepartmentForm from './department.form';


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

class Department extends Component{

  constructor(props){
    super(props);

    this.name = 'Bộ phận';
    this.data = {
      id:0,
      name:'department',
      list:[]
    }

    this.state = {
      name:'',
      onAction:'',
      status:'',
    }

    this.setup();
  }

  setup(){

    this.model = new Model('departments');
    this.hook = new Hook(this);
    this.modal = new DepartmentFormCtrl(this);

  }

  onStateChange(newState){
    /* KEEP PRIVATE DATA*/
    Object.assign(this.state,newState)

    /* trả giá tri về cho parent component sử dụng */
    this.props.onStateChange(this.state);
  }

  onDataChange(list){
    this.data.list = list ;

    this.props.onDataChange(this.data);

    /* RE RENDER : ON DATA CHANGE THÀNH CÔNG */
    this.onStateChange({
      status:'done'
    })
  }


  loadDeparment(){
    const _this = this ;


    this.model.get((res)=>{

      const list = res.rows;

      _this.onDataChange(list);

    },(err)=>{
      _this.hook.err(err)
    });
  }
  componentDidMount(){
      const _this = this ;


      this.loadDeparment();


  }

  render(){

    const modalTitle = 'test name';

    let list = [];
    this.data.list.map((item,index)=>{

      let active = parseInt(item.id) === this.data.id ? true  : false;
      list.push(<ItemList active={ active} key={index} id={item.id} onOptionClick={ ()=>{ this.modal.open('put',{ id:item.id,code:item.code,name:item.name } ) } }  onClick={()=>{ this.onItem(item) }}  name={ item.name}  num={item.num}  />)


    })

    return(

      <div>
          <DepartmentForm onStateChange={(newState)=>{ this.onStateChange(newState) }} name={ modalTitle  } modal={ this.modal } />

          <nav style={{background:'#DEDEDE'}}>

              <Button onClick={ ()=>{  this.modal.open('post') } } color="primary" style={{ width:'100%', color:'#fff',background:"#617B88", border:0 }}> Tạo bộ phận </Button>

              <div style={{marginTop:20}}>
                <ul className="nav">

                    { list }


                </ul>
              </div>
          </nav>
      </div>
    )
  }
}

export default Department;