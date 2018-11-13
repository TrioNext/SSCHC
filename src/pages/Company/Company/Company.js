import React, { Component} from 'react';
import '../../../scss/filemanager.scss';
import '../../../scss/ubuntu-style.scss';



import CompanyApp from './CompanyApp';
import CompanyAside from './CompanyAside';
import CompanyMain from './CompanyMain';

  import CompanyToolBar from './toolbar';
  import CompanyBody from './body';
  import CompanyFooter from './footer';

import Office from './Office';
import Store from './Store';
import User from './User';








class Company extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tab:'user',
      tabAction:'',

      department:{},
      offices:{},
      stores:{},
      users:{}

    }

    this.onDepartmentChange = this.onDepartmentChange.bind(this);
    this.onToolBarChange = this.onToolBarChange.bind(this);
  }

  onToolBarChange(obj){

    this.setState({
      tab:obj.tab,
      tabAction:obj.tabAction
    })

  }
  onDepartmentChange(val){
     alert(val)

  }

  render(){

    const tab = this.state.tab;



    const tabAction = this.state.tabAction;



    return(
      <div className="animated fadeIn">

        <CompanyApp>

            <CompanyAside onStateChange={ (val)=>{ this.onDepartmentChange(val) } } />
            
            <CompanyMain>

                <CompanyToolBar onStateChange={(val)=>{ this.onToolBarChange(val) }} tab={ tab } />

                <CompanyBody>


                    <Office tab={tab} tabAction={ tabAction } />
                    <Store tab={tab} tabAction={tabAction} />
                    <User tab={tab} tabAction={tabAction} />


                </CompanyBody>

                <CompanyFooter/>

            </CompanyMain>

        </CompanyApp>


      </div>
    )
  }

}

export default Company;
