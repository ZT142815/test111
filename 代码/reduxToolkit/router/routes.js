import React from 'react'
import Login from "../src/login";
import Home from "../src/home";
const route = [
    {
        path:'/',
        exact: true,
        component: <Login/>
    },
    {
        path:'/home',
        exact: true,
        component: <Home/>
    }, 

]

export default route;