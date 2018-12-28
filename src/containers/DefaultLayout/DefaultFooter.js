import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>

        <span>
          <div className="avatars-stack mt-2">
            <div className="avatar avatar-xs">
              <img src={'assets/img/avatars/2.jpg'} className="img-avatar" id="user-avatar" />
            </div>
          </div>
         </span>

         <span className="ml-20" id="users-activities">  </span>


        <span className="ml-auto"> &copy; 2018   Code with <i className='fa fa-heart'> </i> </span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
