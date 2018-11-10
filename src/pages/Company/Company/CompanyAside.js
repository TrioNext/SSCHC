/* QUẢN LÝ TABLE: DEPARTMENT*/

import React, {Component} from 'react';
import { Button } from 'reactstrap';

function ItemList(props){

  const isActive =  props.active ? 'active' : '';
  const num = props.num > 0 ? (<span className="badge badge-danger"> {props.num} </span>) : null
  return(
    <li className={'nav-item '+isActive}>
      <a  className="nav-link" onClick={ props.click }>
        <i className="fa fa-inbox"></i> {props.name}
        {num}

      </a>
    </li>
  )
}

/* QUẢN LÝ BỘ PHẬN*/
class CompanyAside extends Component{

  constructor(props){
    super(props);

    this.create = this.create.bind(this);

  }

  create(){
    alert('tạo bộ phận')
  }

  onItem(e,name){
    console.log(name);
  }
  render(){
    return(
      <nav style={{background:'#DEDEDE'}}>

          <Button onClick={ this.create} color="primary" style={{ width:'100%', color:'#fff',background:"#617B88", border:0 }}> Tạo bộ phận </Button>

          <div style={{marginTop:20}}>
            <ul className="nav">

                <ItemList name="Tất cả" num="0" active />
                <ItemList name="Bộ phận kinh doanh"  num="2"  />
                <ItemList name="Bộ phận kỹ thuật" num="0"  />
                <ItemList name="Bộ phận marketing" num="0"  />

            </ul>
          </div>
      </nav>
    )
  }
}

export default CompanyAside;
