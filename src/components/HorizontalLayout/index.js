import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { NProgress } from '@tanem/react-nprogress'
import {
  changeLayout,
  changeTopbarTheme,
  toggleRightSidebar,
  changeLayoutWidth,
} from "../../store/actions";

import Header from "./Header";
import Footer from "./Footer";
import Bar from '../ProgressBar/Bar';
import Container from '../ProgressBar/Container';

const callFakeAPI = (delay) =>
    new Promise((resolve) => {
        setTimeout(resolve, delay)
    });

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isMenuOpened: false,
        scrollPosition: 0,
        isLoading: true,
    };
    this.toggleRightSidebar = this.toggleRightSidebar.bind(this);
  }

  /**
  * Open/close right sidebar
  */
  toggleRightSidebar() {
    this.props.toggleRightSidebar();
  }

    async componentDidMount() {

        await callFakeAPI(2500);
        this.setState(() => ({
            isLoading: false,
        }));

    if (this.props.isPreloader === true) {
      document.getElementById('preloader').style.display = "block";
      document.getElementById('status').style.display = "block";

      setTimeout(function () {

        document.getElementById('preloader').style.display = "none";
        document.getElementById('status').style.display = "none";
      }, 3500);
    }
    else {
      document.getElementById('preloader').style.display = "none";
      document.getElementById('status').style.display = "none";
    }

    // Scrollto 0,0
    window.scrollTo(0, 0);

    const title = this.props.location.pathname;
    let currentage = title.charAt(1).toUpperCase() + title.slice(2);

    document.title =
      currentage + " | YaWard";

    this.props.changeLayout('horizontal');
    if (this.props.topbarTheme) {
      this.props.changeTopbarTheme(this.props.topbarTheme);
    }
    if (this.props.layoutWidth) {
      this.props.changeLayoutWidth(this.props.layoutWidth);
    }
    if (this.props.showRightSidebar) {
      this.toggleRightSidebar();
    }
  }

  /**
   * Opens the menu - mobile
   */
  openMenu = e => {
    this.setState({ isMenuOpened: !this.state.isMenuOpened });
  };
  render() {
    return (
      <React.Fragment>

        <div id="preloader">
          <div id="status">
              <NProgress isAnimating={this.state.isLoading}>
                  {({ isFinished, progress, animationDuration }) => (
                      <Container
                          isFinished={isFinished}
                          animationDuration={animationDuration}
                      >
                          <Bar progress={progress} animationDuration={animationDuration} />
                      </Container>
                  )}
              </NProgress>
            {/*<div className="spinner-chase">*/}
              {/*<div className="chase-dot"/>*/}
              {/*<div className="chase-dot"/>*/}
              {/*<div className="chase-dot"/>*/}
              {/*<div className="chase-dot"/>*/}
              {/*<div className="chase-dot"/>*/}
              {/*<div className="chase-dot"/>*/}
            {/*</div>*/}
          </div>
        </div>

        <div id="layout-wrapper">

            <Header theme={this.props.topbarTheme}
              isMenuOpened={this.state.isMenuOpened}
              toggleRightSidebar={this.toggleRightSidebar}
              openLeftMenuCallBack={this.openMenu} />
            <div className="main-content">
              {this.props.children}
            </div>
            <Footer />
        </div>

      </React.Fragment>
    );
  }
}
const mapStatetoProps = state => {
  return {
    ...state.Layout
  };
};
export default connect(mapStatetoProps, {
  changeTopbarTheme, toggleRightSidebar, changeLayout, changeLayoutWidth
})(withRouter(Layout));
