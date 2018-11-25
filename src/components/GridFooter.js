import React, {Component} from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,  Row, Col, ButtonGroup, Button, Input } from 'reactstrap';


class GridFooter extends Component{

  constructor(props){

    super(props);
    this.model = props.model ;

    this.state = {
      onAction:'',
      status:''
    }

    this.data = {
      id:0,
      list:[]
    }

  }

  onStateChange(newState){
    /* KEEP PRIVATE DATA : refesh inside compoents */
    this.setState(Object.assign(this.state,newState));
  /* trả giá tri về cho parent component sử dụng */
    this.props.onStateChange(this.state);
  }

  onDataChange(list){

    /* TRẢ GIÁ TRỊ VỀ CHO PARENT COMPONENT SỬ DỤNG*/

    this.data.list = list ;
    this.props.onDataChange(list);


  }

  componentWillReceiveProps(newProps){

      this.model = newProps.model ;
      this.setState({
        status:'done'
      });
  }

  onChange(e){
    const p = e.target.value ;
    this.model.goto(p,(res)=>{

        const list = res.rows ;
        this.onDataChange(list);

    },(err)=>{

    })
  }

  render(){

    const { paginate, total } =  this.model.setting;
    const count =  Math.ceil(total /  paginate.max);


    let list = [] ;
    for(let a = 0; a < count ; a++){

      const stt = a + 1 ;
      list.push(<option value={a} key={a} > { stt } </option>)
    }


    return(
      <div className="ag-footer">
         <div className="text-center">
             <ButtonGroup>
               <Button size="xs" className="btn-datagrid" > <i className="fa fa-step-backward"></i> </Button>
               <Button size="xs" className="btn-datagrid" > <i className="fa fa-chevron-left"></i> </Button>
               <Input className="btn-datagrid" onChange={ (e)=>{ this.onChange(e) } } type="select" style={{
                 borderRadius:0,
                 borderLeft:0,
                 borderRight:0,
                 fontWeight:500

               }} name="select" id="exampleSelect">
                { list }
               </Input>
               <Button className="btn-datagrid"  size="xs" > <i className="fa fa-chevron-right"></i> </Button>
               <Button size="xs" className="btn-datagrid" > <i className="fa fa-step-forward"></i> </Button>

             </ButtonGroup>
             <span className="info">
                { paginate.max} dòng / trang
                { ' của '+ total }
             </span>

         </div>

      </div>
    )
  }
}

export default GridFooter;
