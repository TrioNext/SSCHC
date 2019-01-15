
/*
npm install --save ag-grid-community ag-grid-react
npm install --save ag-grid-enterprise

*/

import React, {Component} from 'react';


import moment from 'moment';


import store from '../../../redux/store';
import Model from '../../../model/model';
import userConf from '../../../config/user.conf';

// HOOK
import { doLoadOffice } from '../../../hook/ultil';




import { USERS } from '../../../model/model-mode';
import { USERS_NAME } from '../../../model/model-name'
import { POST, SEARCH } from '../../../model/action-mode';



import userModalCtrl from './userModalCtrl';
import UserModalComp from './userModalComp';


import { BenGrid } from '../../../components/BenGrid2';



import Department from '../Department/Department';


class User extends Component{

    constructor(props){
      super(props);



      this.state = {
        tab: USERS.substring(0, USERS.length - 1),
        typeAction:'',
        onAction:'',
        status:'',

        onTab:props.onTab,
        isIniData:false
      }

      this.data = {

        users:[],
        offices:[],
        departments:[]

      }

      this.grid = {
        colums:[
          {headerName: "Họ & Tên", field: "name"},
          {headerName: "Văn phòng", field: "offices.name"},
          {headerName: "Cấp bậc", field: "str_job_level"},
          {headerName: "Loại hình công việc", field: "str_job_type"},
          {headerName: "Số Phone ", field: "str_phone"},
          {headerName: "E-mail ", field: "email"},
          {headerName: "Ngày ", field: "str_date_created"}
        ],
        rowData: []
      }

      this._setup();
    }

    _setup(){
      this.model = new Model(USERS);
      this.model.set('paginate',{
        offset:0,
        p:0,
        max:20,
        is_deleted:0,
        key:''
      });

      this.modal = new userModalCtrl(this.model);

      this._listenStore();
    }


    resetGrid(){
        let list = this.data.users || []  ;

        list.filter((item)=>{
          item['str_job_level'] = userConf.job_level[item['job_level']];
          item['str_job_type'] = userConf.job_type[item['job_type']];
          item['str_phone'] = item['phone'] === null ? 'n/a' : item['phone'];
          item['str_date_created'] = moment(item['date_created']).format('YYYY-MM-DD');
        });


        //alert('resetGrid');
        this.grid.rowData = list ;

    }

    _listenStore(){

      this.unsubscribe =  store.subscribe(()=>{
        this.data.users = store.getState().user.list || []  ;
        this.data.departments = store.getState().department.list || [] ;
        this.data.offices = store.getState().office.list || [] ;


        this.resetGrid();

        this._whereStateChange({
          onAction:'_listenStore'
        });

      })
    }


    componentDidMount(){

      //load user here
      this.model.get((res)=>{})
      doLoadOffice();
      //this.model.load();

    }

    componentWillUnmount(){
      this.unsubscribe();
    }

    componentWillReceiveProps(newProps){

      /* nhận lện có liên quan đến tab : office */
      if(newProps.onTab===this.state.tab){

        switch(newProps.onAction){
          case POST:
            this._doOpenModalPost();
          break ;
          case SEARCH:
            this._doSearch(newProps.value);
          break ;
        }

      }

    }

    /*componentDidUpdate(prevProps, prevState){}*/

    /* HOW */
    _doSearch(value){

      const { paginate } =  this.model.localData.db;
      paginate.key = value ;

      console.log(this.model.localData.db);

      this.model.get((res)=>{})

      this._whereStateChange({
        onAction:'_doSearch',
        value:value
      })
    }

    _doOpenModalPost(){
      this.modal.open('post');
      this._whereStateChange({
        typeAction:'post',
        onAction:'open_modal'
      })

    }

    _doOpenModalUpdate(data){

      this.modal.open('put',data);
      this._whereStateChange({
        typeAction:'put',
        onAction:'open_modal'
      })
    }




    /* WHERE */
    _whereStateChange(newState){
      /* KEEP PRIVATE DATA*/
      this.setState(Object.assign(this.state,newState));
    }
    render(){

        /* list : users */
        const modalTitle = this.props.onAction === POST ? 'Tạo '+ USERS_NAME  : 'Cập nhật '+ USERS_NAME;


        return(
            <div hidden={  this.props.onTab === this.state.tab ? false : true } >


              <UserModalComp
                  offices={ this.data.offices }
                  departments={ this.data.departments }
                  name={ modalTitle }
                  typeAction={ this.state.typeAction }
                  modal={ this.modal }
              />

              <div className="ubuntu-app mb-4">

                  <Department   />

                  <main>

                    <BenGrid
                       onBtnEdit={(data)=>{ this._doOpenModalUpdate(data)  }}


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

/* GẮNG : redux data -> component props
function mapStateToProps(state){

   return {
     store:state
   }
}*/

export default User ;
