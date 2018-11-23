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

      body:{
        office:{},
        store:{},
        users:{},
      }


    }


  }

  onStateChange(type,newState){




      switch (type) {
        case 'toolbar':

          this.setState({
            onTab:newState.onTab,
            onAction:newState.onAction
          });
        break;
        case 'body':

            this.state.body[newState.onTab] = newState;


            console.log(type);
            console.log(this.state.body[newState.onTab]);


            //console.log(newState);
            //this.state['body'] =
            //console.log(newState);

            //console.log(this.state[type]);

        break;

        case 'footer':

        break ;
        default:
          this.state[type] = newState;



          console.log(type);
          console.log(this.state[type]);

          /* KHI HOAN THÀNH 1 TÁC VỤ : refesh render : */
          if(newState.status==='done'){
            this.setState({status:'done'})
          }
        break;

      }

  }

  onDataChange(type,newData){

      switch (type) {
        case 'toolbar':
          this.data[type] = newData;
          console.log(this.data[type]);
        break;

        case 'body':
          //alert(JSON.stringify(newData));

        break;

        case 'footer':

        break;

        default:

        break;
      }

  }

  render(){

    const onTab = this.state.onTab;
    const onAction = this.state.onAction;



    return(
      <div className="animated fadeIn">
        <div className="ubuntu-app mb-4">

            <CompanyAside onDataChange={ (data)=>{ this.onDataChange('departments',data) } } onStateChange={ (newState)=>{ this.onStateChange('department',newState) } } />

            <main>

                <CompanyToolBar onDataChange={ (data)=>{ this.onDataChange('toolbar',data) } }  onStateChange={ (newState)=>{ this.onStateChange('toolbar',newState) } } onTab={ onTab } />

                <CompanyBody onDataChange={ (data)=>{ this.onDataChange('body',data) } } onStateChange={ (newState)=>{ this.onStateChange('body',newState) } }  onTab={onTab} onAction={ onAction } />

                <CompanyFooter onDataChange={ (data)=>{ this.onDataChange('footer',data) } } onStateChange={ (newState)=>{ this.onStateChange('footer',newState) } } />

            </main>

        </div>
      </div>
    )
  }

}

export default Company;
