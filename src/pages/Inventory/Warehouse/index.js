
import React, { Component } from 'react';
import { Button } from 'reactstrap';

/* OBJECT - PLUGIN*/
import Store from '../../../redux/store';
import Model from '../../../model/model';

/* HOOKED*/
/*............*/

/* NAMED*/
import { INVENTORIES } from '../../../model/model-mode';
import { INVENTORIES_NAME } from '../../../model/model-name';
import { POST, SEARCH } from '../../../model/action-mode';
/*------------*/

/* MODAL FORM & CTRL*/
import WarehouseForm from './Form';
import formController from './formCtrl';


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';





class Warehouse extends Component{


  constructor(props){
    super(props);

    this.state = {

      typeAction:'',
      onAction:'',
      status:''
    }

    this.data = {
      inventories:[]
    }

    this.grid = {
      colums:[
        {headerName: "Mã Kho", field: "code"},
        {headerName: "Kho", field: "name", width:320},
        {headerName: "Địa chỉ", field: "address", width:410},
        {headerName: "Người tạo", field: "creator_id"},
        {headerName: "Ngày tạo", field: "date_created"}
      ],
      rowData: []
    }

    this._setup();

    this.onBtnNew = this.onBtnNew.bind(this)

  }

  _setup(){
    this.model = new Model(INVENTORIES);
    this.model.set('paginate',{
      offset:0,
      p:0,
      max:20,
      is_deleted:0,
      key:''
    });

    this.modal = new formController(this.model);


    this._listenStore();
  }

  /* HOW */
  resetGrid(){
      /*let list = this.data.users || []  ;

      list.filter((item)=>{
        item['str_job_level'] = userConf.job_level[item['job_level']];
        item['str_job_type'] = userConf.job_type[item['job_type']];
        item['str_phone'] = item['phone'] === null ? 'n/a' : item['phone'];
        item['str_date_created'] = moment(item['date_created']).format('YYYY-MM-DD');
      });

      //alert('resetGrid');
      this.grid.rowData = list ;*/

  }


  _doOpenModalPost(){

    this.modal.open('post');
    this._whereStateChange({
      typeAction:'post',
      onAction:'open_modal'
    })

  }
  _doOpenModalUpdate(data){

  }

  /* END HOW*/


  /* WHEN*/

  onBtnNew(){
    this._doOpenModalPost();
  }

  componentDidMount(){
    //this._isMounted = true;
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  _listenStore(){

    this.unsubscribe = Store.subscribe(()=>{
      this.data.inventories = Store.getState().inventory.list || []  ;

      this._whereStateChange({
        onAction:'_listenStore'
      });

    })
  }

  /*WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }
  render(){

    const formTitle = "Tạo "+ INVENTORIES_NAME;

    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, padding:10}}>
            <main>
              <WarehouseForm
                name={ formTitle }
                typeAction={ this.state.typeAction }
                modal={this.modal}

              />
              <BenGrid

                 onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}
                 isRightTool={ true }

                 nextColums={ this.grid.colums }
                 rowData={this.grid.rowData}
                 model={ this.model }

                 customButton={
                   <Button onClick={this.onBtnNew}  style={{ marginRight:10, borderRadius:0}}  className="btn-ubuntu"  > <i className="fa fa-plus"></i> Tạo nhà kho  </Button>

                 }
              />
            </main>
        </div>
      </div>
    )
  }
}

export default Warehouse;
