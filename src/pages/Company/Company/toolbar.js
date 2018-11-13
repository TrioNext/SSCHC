
import React, { Component} from 'react';
import {
  Row, Col,
  Button,ButtonGroup, InputGroup, Input, InputGroupAddon
} from 'reactstrap';

class CompanyToolBar extends Component{

  constructor(props){
    super(props);

    this.state = {
      tab:props.tab,
      tabAction:'',

      currentItem:{},

      data:{
        office:{
          code:'office',
          icon:'fa-tags',
          name:'Văn phòng'
        },
        store:{
          code:'store',
          icon:'fa-tags',
          name:'Cửa hàng'
        },
        user:{
          code:'user',
          icon:'fa-user',
          name:'Nhân viên'
        }

      }
    }

    this.onChange = this.onChange.bind(this);
    this.onAction = this.onAction.bind(this);
  }


  onAction(val){
    this.setState({
      tabAction:val
    });

    this.props.onStateChange({
      tab:this.state.tab,
      tabAction:val
    })
  }
  onChange(obj){

      this.setState({tab:obj.code})

      this.props.onStateChange({
        tab:obj.code,
        tabAction:''

      })


  }

  render(){



    const listBtn = this.state.data ;

    return(
      <div className="toolbar">
          <Row>
            <Col md="6">
                <ButtonGroup>
                    {
                      Object.keys(listBtn).map((key)=>{

                        let active = key === this.state.tab ? 'active ':''
                        return(
                            <Button key={key}  onClick={ ()=>{ this.onChange(listBtn[key]) } } className={ 'btn-ubuntu btn-ubuntu-'+active} ><i className={'fa '+listBtn[key].icon}></i> { listBtn[key].name} </Button>
                        )
                      })
                    }


                </ButtonGroup>
            </Col>

            <Col md="6" className="text-right">


                <ButtonGroup>
                    <Button style={{ marginRight:10, borderRadius:0}} className="btn-ubuntu" onClick={()=>{ this.onAction('create') }} > <i className="fa fa-plus"></i> Tạo { listBtn[this.state.tab].name } </Button>


                    <Input  placeholder="Tìm kiếm" onChange={()=> this.onAction('search')}  style={{borderRadius:0}} className="hidden" />
                    <Button style={{marginRight:10}}  className="btn-ubuntu"> <i className="fa fa-search"></i> </Button>


                </ButtonGroup>

            </Col>
          </Row>
      </div>
    )
  }
}

export default CompanyToolBar;
