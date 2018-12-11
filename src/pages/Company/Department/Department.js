
import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label,
    Popover, PopoverHeader, PopoverBody

} from 'reactstrap';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/* lib*/
import Model from '../../../config/model';

/* Modal */
import DepModalComp from './DepModalComp';
import depModalCtrl from './depModalCtrl';




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


    this.state = {
      name:'',
      onAction:'',
      status:'',
    }

    this.setup();
  }

  setup(){

    this.model = new Model('departments');
    this.model.set('paginate',{
      offset:0,
      p:0,
      max:'all',
      is_deleted:0
    })


    this.modal = new depModalCtrl(this);

  }


  onStateChange(newState){
    /* KEEP PRIVATE DATA*/

    const list = this.model.getData('departments');

    /*this.props.dispatch({
      type:'SET',
      list:list
    })*/

    this.setState(Object.assign(this.state,newState));



  }




  loadDeparment(){
    const _this = this ;



    this.model.get((res)=>{

      if(typeof res.count !== 'undefined'){
        if(res.count > 0){

          this.onStateChange({status:'success'});
        }
      }
    });
  }
  componentDidMount(){
      const _this = this ;
      //this.loadDeparment();
      this.props.fetch(this.model)

  }

  render(){

    const modalTitle = this.state.onAction ==='post' ? 'Tạo '+this.name : 'Cập nhật '+this.name;

    let list = [];

    this.props.department.map((item,index)=>{

      let active = false ; //parseInt(item.id) === this.data.id ? true  : false;
      list.push(<ItemList onClick={()=>{ console.log(item);  }} active={ active} key={index} id={item.id} onOptionClick={ ()=>{ this.modal.open('put',{ id:item.id,code:item.code,name:item.name } ) } }   name={ item.name}    />)


    });




    return(

      <div>
          <DepModalComp onStateChange={(newState)=>{ this.onStateChange(newState) }} onAction={ this.state.onAction } name={ modalTitle  } modal={ this.modal } />

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


const selectItem = ()=>{

  return [];
}

const fetch = (model)=>{
  return {
    type:'FETCH',
    model:model

  }
}

function mapDispatchToPros(dispatch){
   return bindActionCreators({
     selectItem:selectItem,
     fetch:fetch
   },dispatch)
}

function mapStateToProps(state){

   return {
     department:state.department
   }
}


export default connect(mapStateToProps,mapDispatchToPros)(Department);
