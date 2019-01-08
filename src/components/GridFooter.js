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

    this.first = this.first.bind(this);
    this.next = this.next.bind(this);
    this.last = this.last.bind(this);
    this.pre = this.pre.bind(this);


  }



  onStateChange(){

    /* TRẢ GIÁ TRỊ VỀ CHO PARENT COMPONENT SỬ DỤNG*/
    this.props.onStateChange({status:'success'});

  }


  onChange(e){
    const p = e.target.value ;
    this.model.goto(p,(res)=>{

        if(typeof res.count !== 'undefined'){
          this.props.onStateChange({status:'success'});
        }

    },(err)=>{

    })
  }

  first(){
    this.model.goto(0,(res)=>{

      if(typeof res.count !== 'undefined'){
        this.props.onStateChange({status:'success'});
      }

    },(err)=>{

    })
  }
  last(){
    const { paginate, total } =  this.model.setting;
    const count =  Math.ceil(total /  paginate.max);

    const p = count - 1;

    this.model.goto(p,(res)=>{
      if(typeof res.count !== 'undefined'){
        this.props.onStateChange({status:'success'});
      }
    },(err)=>{

    })


  }

  next(){
    this.model.next((res)=>{

      if(typeof res.count !== 'undefined'){
        this.props.onStateChange({status:'success'});
      }

    },(err)=>{

    })
  }
  pre(){
    this.model.pre((res)=>{

      if(typeof res.count !== 'undefined'){
        this.props.onStateChange({status:'success'});
      }

    },(err)=>{

    })
  }


  render(){

    const { paginate, total } =  this.model.localData.db;
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
               <Button size="xs" onClick={ this.first } className="btn-datagrid" > <i className="fa fa-step-backward"></i> </Button>
               <Button size="xs" onClick={ this.pre } className="btn-datagrid" > <i className="fa fa-chevron-left"></i> </Button>
               <Input className="btn-datagrid"  onChange={ (e)=>{ this.onChange(e) } } type="select" style={{
                 borderRadius:0,
                 borderLeft:0,
                 borderRight:0,
                 fontWeight:500

               }} value={ this.props.p } >
                { list }
               </Input>
               <Button className="btn-datagrid" onClick={ ()=>{ this.next() } } size="xs" > <i className="fa fa-chevron-right"></i> </Button>
               <Button size="xs" onClick={ ()=>{ this.last() } } className="btn-datagrid" > <i className="fa fa-step-forward"></i> </Button>

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
