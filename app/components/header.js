/**
 * Created by Administrator on 2017/12/7.
 */
import React, {Component} from 'react';
import '../../static/less/common.css'
import '../../static/less/header.less'

class Header extends Component {
    render(){
        return(
                <div className="componentHeader">
            <img src="/static/images/logo.png" alt="" className="picLogo"/>
            <h2 className="headerTitle">This is React Music Player </h2>
                </div>
    );
    }
}

export default Header;