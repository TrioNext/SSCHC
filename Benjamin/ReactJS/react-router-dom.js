/*
REACT TOUTER DOM : React Router v4
npm install --save react-router-dom

- ReactJS là trình ứng dụng client : SPA : cho nên khi load lần đầu tiên cho page : nó sẽ load
  - index.html : nơi chứa App
  - Mỗi lần điều hướng : sang trang mới : nó chỉ load component mới : ko reload lại trang
  - nên việc điều hướng là cực kì quan trọng => giúp ứng dụng nhanh hơn

  BrowserRouter : ~ history object : holding all page loaded before :
  Switch : load 1 component trong 1 thời điểm
  Route : đường dẩn => respone nội dung render : có thể dùng để trả về
      - render :
      - component :

  Link

  Redirect

*/

import React, { Component } from 'react';
import { HashRouter, BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom';

<BrowserRouter>
  <switch>
    <Route exact path="/" render={ ( ) => (<h2> HomePage </h2>) } />
    <Route path="/about" component={About}/>
    <Route path="/topics" component={Topics}/>
    <route path=’/users/:id’ component={User }/>
  </switch>
</BrowserRouter>

const App= () => (
  <BrowserRouter>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>
      <Route exact path="/" render={ ( ) => (<h2> HomePage </h2>) } />
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </BrowserRouter>
)
