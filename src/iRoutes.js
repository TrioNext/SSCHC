/* LOAD TẤT CÁC CÁC TRANG VÀO OBJECT NÀY */
import React from 'react';
import Loadable from 'react-loadable';

function Loading(){
  return (
    <div> Đang tải.. </div>
  )
}

const Company = Loadable({
  loader:()=> import('./pages/Company/Company') ,
  loading:Loading,

});


const routes = [
  { path:'/',exact:true,name:'Công ty', component:Company }
];

export default routes;
