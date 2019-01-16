
import React, { Component } from 'react';

/* OBJECT - PLUGIN*/
import Store from '../../../redux/store';
import Model from '../../../model/model';


/* HOOKED*/
/*............*/

/* NAMED*/
import { INVENTORY_TRACKS } from '../../../model/model-mode';
import { INVENTORY_TRACK_NAME } from '../../../model/model-name';
import { POST, SEARCH } from '../../../model/action-mode';
/*------------*/

/* MODAL FORM & CTRL */


/*INCLUDE OTHER COMPONENT*/
import { BenGrid } from '../../../components/BenGrid2';


class ProductNew extends Component{

  constructor(props){
    super(props);

    this.state = {
      typeAction:'',
      onAction:'',
      status:''
    }

    this.data = {}

    this.grid = {
      colums:[
        {headerName: "Mã", field: "code"},
        {headerName: "Tên SP", field: "type"},
        {headerName: "Phiên bản", field: "inventory_id"},
        {headerName: "Tất cả kho", field: "action_type"},
        {headerName: "Công cụ", field: "action_type"},


      ],
      rowData: []
    }

    this._setup();

  }

  _setup(){
    this.model = new Model(INVENTORY_TRACKS);
    this.model.set('paginate',{
      offset:0,
      p:0,
      max:20,
      is_deleted:0,
      key:''
    });

    //this.formCtrl = new formCtrl(this.model);
    //this.modal = new formController(this.model);

    //this._listenStore();
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

  /* WHERE*/
  _whereStateChange(newState){
    this.setState(Object.assign(this.state,newState));
  }

  render(){
    return (
      <div className="animated fadeIn">
        <div className="ubuntu-app " style={{border:0, padding:10}}>
            <main>
              <BenGrid

                 isRightTool={ true }

                 nextColums={ this.grid.colums }
                 rowData={this.grid.rowData}
                 model={ this.model }

              />
            </main>
        </div>
      </div>
    )
  }
}

export default ProductNew;
