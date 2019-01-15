
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
    this.state = {
      tab:DEPARTMENTS.substring(0, DEPARTMENTS.length - 1),
      typeAction:'',
      onAction:'',
      status:'',
    }

    this.data = {
      departments:[]
    }

    // --> initial WHO
    this._setup();

  }


  /* START WHO */
  _setup(){

    this.Model = new Model(DEPARTMENTS);
    this.Model.set('paginate',{
      offset:0,
      p:0,
      max:'all',
      is_deleted:0
    });

    this.Modal = new depModalCtrl(this.Model);

    /* AUTO DATA CONNECT : WHEN STORE DATA CHANGE */
    this._listenStore();



  }
  /* END WHO  */

  /* START WHEN */
  componentDidMount(){
      this.Model.load();

      this._whereStateChange({
        onAction:'componentDidMount'
      })
  }

  componentWillUnmount(){
    this.unsubscribe();
  }
  _listenStore(){


    this.unsubscribe =  store.subscribe(()=>{
      this.data.departments = store.getState().department.list || []  ;

      this._whereStateChange({
        onAction:'_listenStore'
      })

    })
  }
  /* END WHEN */

  /*  START HOW METHOD FUNCTION */

  /* END HOW METHOD  */
  _doOpenModalPost(){
    this.Modal.open('post');
    this._whereStateChange({
      typeAction:'post',
      onAction:'_doOpenModalPost',
    })
  }
  _doOpenModalUpdate(data){

      this.Modal.open('put',data);
      this._whereStateChange({
        typeAction:'put',
        onAction:'_doOpenModalUpdate',

      })
  }

  /* END HOW*/

  /* WHERE */
  _whereStateChange(newState){
    /* KEEP PRIVATE DATA*/
    this.setState(Object.assign(this.state,newState));
  }


  render(){

    const modalTitle = this.state.onAction ==='post' ? 'Tạo '+DEPARTMENTS_NAME : 'Cập nhật '+DEPARTMENTS_NAME;

    let list = [];


    this.data.departments.map((item,index)=>{

      let active = false ; //parseInt(item.id) === this.data.id ? true  : false;
      list.push(<ItemList onClick={()=>{ console.log(item);  }} active={ active} key={index} id={item.id} onOptionClick={ ()=>{ this._doOpenModalUpdate(item) } }   name={ item.name}    />)


    });

    return(

      <div>
          <DepModalComp

              typeAction={ this.state.typeAction }

              name={ modalTitle  }
              modal={ this.Modal }
          />

          <nav style={{background:'#DEDEDE'}}>

              <Button onClick={ ()=>{  this.Modal.open('post') } } color="primary" style={{ width:'100%', color:'#fff',background:"#617B88", border:0 }}> Tạo bộ phận </Button>

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
