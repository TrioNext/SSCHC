
import React, { Component} from 'react';
import {
  Row, Col,
  Button,ButtonGroup, InputGroup, Input, InputGroupAddon
} from 'reactstrap';

class CompanyToolBar extends Component{

  constructor(props){
    super(props);

    this.name = 'Toolbar';


    this.data = {
      user:{
        code:'user',
        icon:'fa-user',
        name:'Nhân viên'
      },
      office:{
        code:'office',
        icon:'fa-tags',
        name:'Văn phòng'
      },
      store:{
        code:'store',
        icon:'fa-tags',
        name:'Cửa hàng'
      }

    }

    this.state = {

      onAction:'',
      status:'',

      onTab:props.onTab

    }


  }

  onStateChange(newState){


    Object.assign(this.state,newState);
    this.props.onStateChange(this.state);

  }

  /* ON CLICK CHANGE TAB*/
  onChange(obj){

    this.onStateChange({
      onTab:obj.code,
      onAction:'change tab',
      status:'done'
    })
  }




  render(){



    const listBtn = this.data ;


    return(
      <div className="toolbar">
          <Row>
            <Col md="6">
                <ButtonGroup>
                    {
                      Object.keys(listBtn).map((key)=>{

                        let active = key === this.state.onTab ? 'active ':''
                        return(
                            <Button key={key}  onClick={ ()=>{ this.onChange(listBtn[key]) } } className={ 'btn-ubuntu btn-ubuntu-'+active} ><i className={'fa '+listBtn[key].icon}></i> { listBtn[key].name} </Button>
                        )
                      })
                    }


                </ButtonGroup>
            </Col>

            <Col md="6" className="text-right">


                <ButtonGroup>
                    <Button style={{ marginRight:10, borderRadius:0}} className="btn-ubuntu" onClick={()=>{ this.onStateChange({onAction:'post'}) }} > <i className="fa fa-plus"></i> Tạo { listBtn[this.state.onTab].name } </Button>


                    <Input  placeholder="Tìm kiếm" onChange={(e)=> this.onStateChange({onAction:'search',value:e.target.value}) }  style={{borderRadius:0}}  />
                    <Button style={{marginRight:10}}  className="btn-ubuntu"> <i className="fa fa-search"></i> </Button>


                </ButtonGroup>

            </Col>
          </Row>
      </div>
    )
  }
}

export default CompanyToolBar;
