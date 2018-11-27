import React, { Component} from 'react';
import '../../../scss/filemanager.scss';
import '../../../scss/ubuntu-style.scss';


import CompanyToolBar from './toolbar';
import CompanyBody from './body';



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

    }


  }

  onStateChange(newState){


    //alert(JSON.stringify(newState))



    this.setState(Object.assign(this.state,newState));




  }

  onDataChange(newData){

    //alert(JSON.stringify(newData));


  }

  render(){

    const onTab = this.state.onTab;
    const onAction = this.state.onAction;




    return(
      <div className="animated fadeIn">
        <div className="ubuntu-app" style={{ border:0}}>

            <main>

                <CompanyToolBar  onStateChange={ (newState)=>{ this.onStateChange(newState) } } onTab={ onTab } />


                <CompanyBody onDataChange={ (data)=>{ this.onDataChange(data) } } onStateChange={ (newState)=>{ this.onStateChange(newState) } }  onTab={onTab} onAction={ onAction } />

            </main>

        </div>
      </div>
    )
  }

}

export default Company;
