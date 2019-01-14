export default {
  items: [

    {
      title: true,
      name: 'CUIR Co.,ltd ', // TÊN ĐƠN VỊ SỬ DỤNG
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
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
          name: 'DS Nhà Kho',
          url: '/inventory/warehouse',
          icon: '',
        },
        {
          name: 'Nhập - Xuất Kho',
          url: '/inventory/receipt',
          icon: '',
        },
        {
          name: 'Xem Tồn Kho',
          url: '/inventory/productnew',
          icon: '',
        },
        {
          name: 'Mua Hàng (PO)',
          url: '/inventory/po',
          icon: '',
        },

        {
          name: 'Cài Đặt Kho',
          url: '/inventory/setting',
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
          url:'/cashflow/summary',
          icon:''
        },
        {
          name:'Cài đặt Sổ Tiền',
          url:'/cashflow/setting',
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
          name:'DS Khách Hàng',
          url:'/customer/_s',
          icon:''
        },
        {
          name:'Điểm tích luỹ',
          url:'/customer/point',
          icon:''
        },
        {
          name:'Lịch sử gủi e-mail',
          url:'/customer/crmemail',
          icon:''
        },
        {
          name:'Lich sử gủi SMS',
          url:'/customer/crmsms',
          icon:''
        },

        {
          name:'Thiết Lập',
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
          name:'DS đơn hàng',
          url:'/order/_s',
          icon:''
        },
        {
          name:'QL Khuyến Mãi',
          url:'/order/promotion',
          icon:''
        },
        {
          name:'Nhà Vận Chuyển',
          url:'/order/shippingmethod',
          icon:''
        },
        {
          name:'Báo Cáo',
          url:'/order/summary',
          icon:''
        },
        {
          name:'Thiết Lập',
          url:'/order/setting',
          icon:''
        },

      ]
    },
    {
      name: 'Marketting',
      url: '/crm',
      icon: 'icon-magnet',
      children:[
        {
          name:'DS chiến dịch',
          url:'/crm/campaign',
          icon:''
        },
        {
          name:'E-mail Marketting',
          url:'/crm/email',
          icon:''
        },
        {
          name:'SMS Marketting',
          url:'/crm/sms',
          icon:''
        },

        {
          name:'Automation',
          url:'/crm/automation',
          icon:''
        },

        {
          name:'Thiết lập',
          url:'/crm/setting',
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
      name: 'Web Portal',
      url: '/portal',
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
