import React from "react";
import { Redirect } from "react-router-dom";

import Login from "../pages/Authentication/Login";

import Dashboard from "../pages/Dashboard/index";
import Shops from "../pages/Main/Shops";
import ProductsList from "../pages/Shops/ProductsList";
import Profile from '../pages/Profile/Profile';
import Verify from "../pages/Authentication/Verify";
import Checkout from "../pages/Checkout/Checkout";

const authProtectedRoutes = [
    { path: "/profile", component: Profile},
    { path : "/checkout", component: Checkout}
];

const publicRoutes = [
    { path: "/verify", component: Verify },
    { path: "/login", component: Login },
    // { path: "/register", component: Login },
    { path: "/dashboard", component: Dashboard },
    { path: "/shop", component: Shops },
    { path: "/shop-list", component: ProductsList},
    { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];

export { authProtectedRoutes, publicRoutes };
