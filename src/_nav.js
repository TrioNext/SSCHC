export default {
  items: [
    {
      name: 'Tổng quan',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW',
      },
    },
    {
      title: true,
      name: 'CUIR Co.,ltd', // TÊN ĐƠN VỊ SỬ DỤNG
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Công Ty',
      url: '/company',
      icon: 'icon-compass'

    },
    {
      name: 'Nhà Kho',
      url: '/inventory',
      icon: 'icon-drawer',
      children:[
        {
          name: 'Nhập - Xuất Kho',
          url: '/inventory/receipt',
          icon: '',
        },
        {
          name: 'Điều chuyển kho',
          url: '/inventory/producttranf',
          icon: '',
        },
        {
          name: 'Mua Hàng',
          url: '/inventory/po',
          icon: '',
        },
        {
          name: 'Cài đặt kho',
          url: '/setting/inventory',
          icon: '',
        },
      ]
    },
    {
      name: 'Sổ Tiền',
      url: '/cashflow',
      icon: 'icon-briefcase',
      children:[
        {
          name:'Phiếu thu - Phiếu chi',
          url:'/cashflow/view',
          icon:''
        },
        {
          name:'Tổng quan Thu - Chi',
          url:'/cashflow/status',
          icon:''
        },
        {
          name:'Cài đặt Sổ Tiền',
          url:'/setting/cashflow',
          icon:''
        },
      ]
    },
    {
      name: 'Khách Hàng',
      url: '/customer',
      icon: 'icon-people',
      children:[
        {
          name:'Danh sách khách hàng',
          url:'/customer/view',
          icon:''
        },
        {
          name:'Cài đặt khách hàng',
          url:'/customer/setting',
          icon:''
        }

      ]
    },
    {
      name: 'Bán Hàng',
      url: '/order',
      icon: 'icon-screen-desktop',
      children:[
        {
          name:'Danh sách đơn hàng',
          url:'/order/view',
          icon:''
        },
        {
          name:'Báo cáo',
          url:'/order/status',
          icon:''
        },
        {
          name:'Cài đặt bán hàng',
          url:'/setting/order',
          icon:''
        }

      ]
    },
    {
      name: 'Chiến Dịch',
      url: '/campaign',
      icon: 'icon-magnet',
      children:[
        {
          name:'Danh sách chiến dịch',
          url:'/campaign/view',
          icon:''
        },
        {
          name:'Cài đặt chiến dịch',
          url:'/seting/campaign',
          icon:''
        },
      ]
    },

    {
      title: true,
      name: 'Webstore',
      wrapper: {
        element: '',
        attributes: {},
      },
    },

    {
      name: 'Cpanel',
      url: '/cpanel',
      icon: 'icon-cursor',
    },

    {
      divider: true,
    },
    {
      title: true,
      name: 'Cài đặt - Cấu hình',
    },
    {
      name: 'Thiết lập ứng dụng',
      url: '/setting/general',
      icon: 'icon-puzzle'
    },
    {
      name: 'Thiết lập thiết bị',
      url: '/setting/devices',
      icon: 'icon-wrench'
    }

  ],
};
