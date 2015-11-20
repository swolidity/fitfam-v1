import React from 'react';

require('./MySupplementsSidebar.scss');

class MySupplementsSidebar extends React.Component {
  render() {
    return (
      <div className="my-supplements-sidebar row">
        <div className="col-xs-12">
          <div className="title">My Supplements</div>
        </div>

        <div className="supplement col-xs-3 center">
          <div className="supplement-photo">
            <img width="60" src="http://ecx.images-amazon.com/images/I/71nyzPnIGoL._SY679_.jpg" alt="N.O. Xplode" />
          </div>
          <div className="supplement-name">
            <a href="#">BSN N.O.-XPLODE - Blue Raz, 2.45 lb (60 servings)</a>
          </div>
        </div>

        <div className="col-xs-3 center">
          <div className="supplement-photo">
            <img width="60" src="http://ecx.images-amazon.com/images/I/81IWh24G%2BML._SY679SX432_SY679_CR,0,0,432,679_PIbundle-44,TopRight,0,0_SX432_SY679_CR,0,0,432,679_SH20_.jpg" />
          </div>
          <div className="supplement-name">
            <a href="#">Universal Nutrition Animal Pak</a>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = MySupplementsSidebar;
