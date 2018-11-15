import React, { Component} from 'react';
import '../../../scss/filemanager.scss';
import '../../../scss/ubuntu-style.scss';



import CompanyAside from './CompanyAside';

  import CompanyToolBar from './toolbar';
  import CompanyBody from './body';
  import CompanyFooter from './footer';





class Company extends Component {

  constructor(props) {
    super(props);

    this.name = "Công ty"
    this.info = {}

    this.data = {
      departments:[],
      offices:[],
      stores:[],
      users:[]
    }


    this.state = {

      onTab:'user',
      onAction:'',
      status:'',

      department:{},
      office:{},
      store:{},
      users:{},

    }

    this.onDepartmentChange = this.onDepartmentChange.bind(this);
    this.onDepartmentDataChange = this.onDepartmentDataChange.bind(this);

    this.onToolBarChange = this.onToolBarChange.bind(this);
  }

  onToolBarChange(obj){

    this.setState({
      onTab:obj.onTab,
      onAction:obj.onAction
    });



  }
  onDepartmentChange(obj){


      this.state.department = obj

      console.log('departments : action = '+this.state.department.onAction);
      console.log('departments : status = '+this.state.department.status);

      /* KHI HOAN THÀNH 1 TÁC VỤ : refesh render */
      if(obj.status==='done'){
        this.setState({status:'done'})
      }


      //alert(JSON.stringify(obj))
  }

  /* DO TRIGGER HERE */
  onDepartmentDataChange(data){
    this.data.departments = data;
    console.log(this.data.departments);
  }

  render(){

    const onTab = this.state.onTab;
    const onAction = this.state.onAction;



    return(
      <div className="animated fadeIn">
        <div className="ubuntu-app mb-4">

            <CompanyAside onDataChange={ (data)=>{ this.onDepartmentDataChange(data) } } onStateChange={ (val)=>{ this.onDepartmentChange(val) } } />

            <main>

                <CompanyToolBar onDataChange="" onStateChange={(val)=>{ this.onToolBarChange(val) }} tab={ onTab } />

                <CompanyBody onStateChange="" onDataChange="" onTab={onTab} onAction={ onAction } />

                <CompanyFooter onStateChange="" onDataChange="" />

            </main>

        </div>
      </div>
    )
  }

}

export default Company;
