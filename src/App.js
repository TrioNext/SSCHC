import React, { Component } from 'react';
/*import { HashRouter, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'; */
import { HashRouter, Route } from 'react-router-dom';
import './App.scss';
// Containers
import { DefaultLayout } from './containers';
// Pages
import { Login } from './pages/pages';
import socket from './model/socket';


class App extends Component {

  constructor(props){
      super(props);

      this.state = {
        login:false
      }


  }

  componentDidMount(){
    // Try to authenticate with the JWT stored in localStorage
    //const users = client.service('users');

    /* listening error */
    
    socket.client.authenticate().catch((err)=>{
      this.setState({login:false})
      console.log(err);
    });


    socket.client.on('authenticated',login=>{
      this.setState({login})
    });


    socket.client.on('logout', ()=>{
      this.setState({login:null})
    });

  }


  render() {


      return (
        <HashRouter>


            {
               this.state.login ? (<Route path="/" name="Home" component={DefaultLayout} />) : (<Route exact path="/" name="Login Page" component={Login} />)
            }


        </HashRouter>
      );


    //return <Login/>

  }
}

export default App;
