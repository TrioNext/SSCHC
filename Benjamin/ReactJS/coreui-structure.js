/*
- Initial : index.js
    - servicewebworker : lưu lại bản html chứa app
    - load Main Object : APP.js
    -> dùng ReactDOM gắn App object vào html => chạy App.js

    App.js :
        - react-router-dom lib
        - load các css toàn bộ
        - load các trang ~ big components cấp 1 :

        -> Dùng HashRouter - Switch - Route của react-router-dom : để chứa các big component cấp 1
        -> Chạy 1 big components có path : '/' : DefaultLayout Object trong containers :


                DefaultLayout Object : nó là 1 khung của trang
                div className="app"
                  AppHeader
                    DefaultHeader : // write header object components

                  div className="app-body"
                    AppSidebar :// phần bên trái của site
                      AppSidebarHeader
                      AppSidebarForm
                      AppSidebarNav navConfig={navigation} {...this.props}
                      AppSidebarFooter
                      AppSidebarMinimizer

                    Main className="main"
                      AppBreadcrumb appRoutes={routes}
                      Container[fluid]
                        Switch : thật ra react client sẽ tất cả components: nó switch 1 cái để show ra


                    AppAside : phần bên phải
                      DefaultAside :// viết object component
                  AppFooter
                      DefaultFooter :// viết object component cho nó






*/
