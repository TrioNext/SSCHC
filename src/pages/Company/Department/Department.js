
import React, {Component} from 'react';
import { Button } from 'reactstrap';

import store from '../../../redux/store';
import Model from '../../../model/model';
import { DEPARTMENTS } from '../../../model/model-mode';
import { DEPARTMENTS_NAME } from '../../../model/model-name';

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


    /* WHAT  */
    this.data = {
      department:[]
    }

    this.state = {
      name:'department',
      onAction:'',
      status:'',
    }

    // --> initial WHO
    this.setup();



  }


  /* START WHO */
  setup(){

    this.model = new Model(DEPARTMENTS);
    this.model.set('paginate',{
      offset:0,
      p:0,
      max:'all',
      is_deleted:0
    });

    this.modal = new depModalCtrl(this);

    /* AUTO DATA CONNECT : WHEN STORE DATA CHANGE */
    this.connectStore();

  }
  /* END WHO  */

  /* START WHEN */
  componentDidMount(){
      const _this = this ;

      this.model.load();

  }
  connectStore(){
    store.subscribe(()=>{
      this.data.department = store.getState().department.list || []  ;

      this.onStateChange({
        onAction:'reducer-change',
        status:'success'
      })

    })
  }
  /* END WHEN */

  /*  START HOW METHOD FUNCTION */

  /* END HOW METHOD  */


  /* WHERE */
  onStateChange(newState){
    /* KEEP PRIVATE DATA*/
    this.setState(Object.assign(this.state,newState));

  }

  render(){

    const modalTitle = this.state.onAction ==='post' ? 'Tạo '+DEPARTMENTS_NAME : 'Cập nhật '+DEPARTMENTS_NAME;

    let list = [];


    this.data.department.map((item,index)=>{

      let active = false ; //parseInt(item.id) === this.data.id ? true  : false;
      list.push(<ItemList onClick={()=>{ console.log(item);  }} active={ active} key={index} id={item.id} onOptionClick={ ()=>{ this.modal.open('put',item ) } }   name={ item.name}    />)


    });

    return(

      <div>
          <DepModalComp  onAction={ this.state.onAction } name={ modalTitle  } modal={ this.modal } />

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

  /* END WHERE */
}

/*function mapStateToProps(state){
   return {
     departments:state.department
   }
}

function mapDispatchToPros(dispatch){
   return bindActionCreators({
     selectItem:selectItem,
     fetch:fetch
   },dispatch)
}*/

export default Department ;  //connect(mapStateToProps)(Department) ;
