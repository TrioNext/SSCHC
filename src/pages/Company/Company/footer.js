import React from 'react';
import {Row, Col} from 'reactstrap'

export default (props)=>{
    return(
      <div className="footer">
          <Row>
              <Col md="1" style={{
                  lineHeight:'38px'
                }}>
                  Đang làm việc
              </Col>
              <Col md="6">
                <div className="avatars-stack mt-2">
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>
                  <div className="avatar avatar-xs">
                    <img src={'assets/img/avatars/2.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                  </div>

                </div>
              </Col>
              <Col md="5" className="text-right" style={{
                  lineHeight:'38px',
                  fontStyle:'italic',
                  color:'#666'
                }}>
                  ..
              </Col>
          </Row>
      </div>
    )
}
