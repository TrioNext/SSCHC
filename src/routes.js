import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}


const Dashboard = Loadable({
  loader:()=> import('./pages/Dashboard'),
  loading:Loading
})

const Company = Loadable({
  loader:()=> import('./pages/Company/Company'),
  loading:Loading
});

/* NHÀ KHO*/
const Warehouse = Loadable({
  loader:()=> import('./pages/Inventory/Warehouse'),
  loading:Loading
});

const Receipt = Loadable({
  loader:()=> import('./pages/Inventory/Receipt'),
  loading:Loading
});

const Productnew = Loadable({
  loader:()=> import('./pages/Inventory/Productnew'),
  loading:Loading
});

const Po = Loadable({
  loader:()=> import('./pages/Inventory/Po'),
  loading:Loading
});

const InventorySetting = Loadable({
  loader:()=> import('./pages/Inventory/Setting'),
  loading:Loading
});

/* END NHÀ KHO*/

/* SỔ TIỀN*/
const CashflowView = Loadable({
  loader:()=> import('./pages/Cashflow/View'),
  loading:Loading
});

const CashflowSummary = Loadable({
  loader:()=> import('./pages/Cashflow/Summary'),
  loading:Loading
});

const CashflowSetting = Loadable({
  loader:()=> import('./pages/Cashflow/Setting'),
  loading:Loading
})
/* END SỔ TIỀN*/

/* CUSTOMER */
const Customer = Loadable({
  loader:()=> import('./pages/Customer/_S'),
  loading:Loading
});

const CustomerPoint = Loadable({
  loader:()=> import('./pages/Customer/Point'),
  loading:Loading
});

const CustomerSetting = Loadable({
  loader:()=> import('./pages/Customer/Setting'),
  loading:Loading
});

const CustomerCrmemail = Loadable({
  loader:()=> import('./pages/Customer/Crmemail'),
  loading:Loading
});

const CustomerCrmsms = Loadable({
  loader:()=> import('./pages/Customer/Crmsms'),
  loading:Loading
});
/* END CUSTOMER */

/* ORDER*/
const OrderView = Loadable({
  loader:()=> import('./pages/Order/_S'),
  loading:Loading
});

const OrderPromotion = Loadable({
  loader:()=> import('./pages/Order/Promotion'),
  loading:Loading
});

const OrderShippingMethod = Loadable({
  loader:()=> import('./pages/Order/Shippingmethod'),
  loading:Loading
});

const OrderSummary = Loadable({
  loader:()=> import('./pages/Order/Summary'),
  loading:Loading
});

const OrderSetting = Loadable({
  loader:()=> import('./pages/Order/Setting'),
  loading:Loading
});


/* END ORDER*/



// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/Dashboard', name:'Dashboard', component:Dashboard },
  { path: '/company', exact:true , name:'Công ty', component:Company},
  { path: '/inventory/warehouse', exact:true , name:'DS Kho', component:Warehouse},
  { path: '/inventory/receipt', exact:true , name:'Nhập - Xuất Kho', component:Receipt},
  { path: '/inventory/productnew', exact:true , name:'Xem Tồn Kho', component:Productnew},
  { path: '/inventory/po', exact:true , name:'Mua Hàng PO', component:Po},
  { path: '/inventory/setting', exact:true , name:'Thiết Lập Kho', component:InventorySetting},

  { path: '/cashflow/view', exact:true , name:'Phiều thu - Phiếu chi', component:CashflowView},
  { path: '/cashflow/summary', exact:true , name:'Tổng Quan Thu - Chi ', component:CashflowSummary},
  { path: '/cashflow/setting', exact:true , name:'Thiết Lập Sổ Tiền', component:CashflowSetting},

  { path: '/customer/_S', exact:true , name:'Danh sách khách hàng', component:Customer},
  { path: '/customer/point', exact:true , name:'Điểm tích luỹ', component:CustomerPoint},
  { path: '/customer/setting', exact:true , name:'Thiết lập khách hàng', component:CustomerSetting},
  { path: '/customer/crmemail', exact:true , name:'Lịch sử gủi e-mail', component:CustomerCrmemail},
  { path: '/customer/crmsms', exact:true , name:'Lịch sử gủi SMS', component:CustomerCrmsms},

  { path: '/order/_s', exact:true , name:'DS Đơn hàng', component:OrderView},
  { path: '/order/promotion', exact:true , name:'Chương trình khuyến mãi', component:OrderPromotion},
  { path: '/order/shippingmethod', exact:true , name:'Nhà Vận Chuyển', component:OrderShippingMethod},
  { path: '/order/summary', exact:true , name:'Báo cáo', component:OrderSummary},
  { path: '/order/setting', exact:true , name:'Thiết lập bán hàng', component:OrderSetting},



];

export default routes;
