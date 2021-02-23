import React, { Component } from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";

import HorizontalLayout from "./components/HorizontalLayout/";

import "./assets/scss/theme.scss";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {

		};
		this.getLayout = this.getLayout.bind(this);
	}

    getLayout = () => {
        const layoutCls = HorizontalLayout;

        return layoutCls;
    };

	render() {
		const Layout = this.getLayout();

		return (
			<React.Fragment>
				<Router>
					<Switch>
                        {authProtectedRoutes.map((route, idx) => (
                            <AppRoute
                                path={route.path}
                                layout={Layout}
                                component={route.component}
                                key={idx}
                                isAuthProtected={true}
                            />
                        ))}

						{publicRoutes.map((route, idx) => (
							<AppRoute
								path={route.path}
								layout={Layout}
								component={route.component}
								key={idx + authProtectedRoutes.length}
								isAuthProtected={false}
							/>
						))}


					</Switch>
				</Router>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	return {
		layout: state.Layout
	};
};

export default connect(mapStateToProps, null)(App);
