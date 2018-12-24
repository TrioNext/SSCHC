import React, { Component } from 'react';
import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.scss';
// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login, Page404, Page500, Register } from './views/Pages';
// import { renderRoutes } from 'react-router-config';

import client from './feathers';

class App extends Component {

  constructor(props){
      super(props);
      this.state = {}
  }

  componentDidMount(){
    // Try to authenticate with the JWT stored in localStorage
    //const users = client.service('users');

    client.authenticate().catch((err)=>{
      this.setState({login:null})
      console.log(err);
    });

    client.on('authenticated',login=>{
      this.setState({login})
    });


    client.on('logout', ()=>{
      this.setState({login:null})
    });


  }



  render() {


      return (
        <HashRouter>


            {
               this.state.login ? (<Route path="/" name="Home" component={DefaultLayout} />) : <Route exact path="/" name="Login Page" component={Login} />
            }


        </HashRouter>
      );


    //return <Login/>

  }
}

export default App;
