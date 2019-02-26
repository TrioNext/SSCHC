import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.png'
import sygnet from '../../assets/img/brand/sygnet.svg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>

        <AppSidebarToggler className="d-lg-none" display="md" mobile />

        <AppNavbarBrand
          full={{ src: logo,  height: 45, alt: 'CoreUI Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'CoreUI Logo' }}
        />

        <AppSidebarToggler className="d-md-down-none" display="lg" />

        {/* LEFT  */}
        <Nav navbar>
          <NavItem className="px-3">
              Tháng 02
          </NavItem>
        </Nav>


        {/* RIGHT */}
        <Nav className="ml-auto" navbar>

          <NavItem className="d-md-down-none">
            <NavLink href="#"><i className="icon-bell"></i><Badge pill color="danger"></Badge></NavLink>
          </NavItem>


          <AppHeaderDropdown className="px-3  " direction="down">

            <DropdownToggle nav>
              <img src={'assets/img/avatars/6.jpg'} className="img-avatar" />
            </DropdownToggle>

            <DropdownMenu right style={{ right: 'auto' }}>

              <DropdownItem><i className="fa fa-user"></i> Tài khoản</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Thiết lập </DropdownItem>

              <DropdownItem><i className="fa fa-lock"></i> Đăng xuất </DropdownItem>
            </DropdownMenu>

          </AppHeaderDropdown>
        </Nav>

        <AppAsideToggler className="d-md-down-none" />

        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
