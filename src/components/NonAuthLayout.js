import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

import Progress from './Progress';
import Header from "./HorizontalLayout/Header";
import Footer1 from "./HorizontalLayout/Footer1";

class NonAuthLayout extends Component {
    constructor(props) {
        super(props);
        this.state={};
        this.capitalizeFirstLetter.bind(this);
    }
    
    capitalizeFirstLetter = string => {
        return string.charAt(1).toUpperCase() + string.slice(2);
      };

    componentDidMount(){
        let currentage = this.capitalizeFirstLetter(this.props.location.pathname);

        document.title =
          currentage + " | YaWard";
    }
    render() {
        let height = {
            'height': '80vh',
            'overflow': 'hidden'
        };
        return (
            <React.Fragment>

                <div id="layout-wrapper">
                    <Header theme={this.props.topbarTheme}
                            isMenuOpened={this.state.isMenuOpened}
                            toggleRightSidebar={this.toggleRightSidebar}
                            openLeftMenuCallBack={this.openMenu} />
                    <div style={height} className='page-content'>
                        {this.props.children}
                    </div>
                    <Footer1 />
                </div>

            </React.Fragment>
        )
    }
}

export default (withRouter(NonAuthLayout));