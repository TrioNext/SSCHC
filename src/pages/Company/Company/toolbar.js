
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
  }

  onChange(obj){

      this.setState({tab:obj.code})

      //alert(JSON.stringify(obj))
      this.props.onStateChange(JSON.stringify(obj.code));


  }



  render(){



    const listBtn = this.state.data ;

    return(
      <div className="toolbar" style={{padding: '1rem'}}>
          <Row>
            <Col md="8">
                <ButtonGroup>
                    {
                      Object.keys(listBtn).map((key)=>{

                        let active = key === this.state.tab ? true:false
                        return(
                            <Button active={active} onClick={ ()=>{ this.onChange(listBtn[key]) } } color="success"><i className={'fa '+listBtn[key].icon}></i> { listBtn[key].name} </Button>
                        )
                      })
                      /*
                      this.state.data.map((item)=>{

                        let active = item.code === this.state.tab ? true:false
                        return(
                            <Button active={active} onClick={ ()=>{ this.onChange(item) } } color="success"><i className={'fa '+item.code}></i> { item.name} </Button>
                        )
                      })
                    */}


                </ButtonGroup>
            </Col>

            <Col md="4" className="text-right">

                {

                  /*<InputGroup>
                  <Input type="text" id="input1-group2" name="input1-group2" placeholder="Tìm kiếm" />
                  <InputGroupAddon addonType="append">
                    <Button type="button" color="primary"><i className="fa fa-search"></i></Button>
                  </InputGroupAddon>
                </InputGroup>
                */}

                <ButtonGroup>
                    <Input placeholder="Tìm kiếm" style={{borderRadius:0}} className="hidden" />
                    <Button style={{marginRight:10}} active color="success"> <i className="fa fa-search"></i> </Button>

                    <Button style={{borderRadius:0}} color="success" > <i className="fa fa-plus-circle"></i> Tạo { listBtn[this.state.tab].name } </Button>

                </ButtonGroup>

            </Col>
          </Row>
      </div>
    )
  }
}

export default CompanyToolBar;
