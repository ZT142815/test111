import React from 'react'
import Login from "../components/login";
import Home from "../components/home";
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