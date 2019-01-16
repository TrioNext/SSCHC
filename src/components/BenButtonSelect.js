import React, { Component } from 'react';
import {
  Row, Col,
  Button,ButtonGroup, InputGroup, Input, InputGroupAddon
} from 'reactstrap';


class BenButtonSelect extends Component{

  constructor(props){
    super(props);

    this.state = {
      onTab:'',
      onAction:'',
      status:'',
      data:props.data
    }
  }
  render(){

    const listBtn = this.state.data;
    
    return(
      <div className="clearfix">
        <ButtonGroup >
            {
              Object.keys(listBtn).map((item,key)=>{


                let active =  listBtn[key].active === true ? 'active' :'';

                return(
                    <Button key={key}  className={ 'btn-ubuntu-select btn-ubuntu-select-'+active} ><i className={'fa '+listBtn[key].icon}></i> { listBtn[key].name} </Button>
                )
              })
            }


        </ButtonGroup>
      </div>
    )
  }

}

export default BenButtonSelect;
