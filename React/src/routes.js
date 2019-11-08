import React from 'react';

const Home = React.lazy(() => import('./pages/Home'));

// About
const About = React.lazy(() => import('./pages/About'));

// Notice Related
const Notice = React.lazy(() => import('./pages/Notice'));

//Basic Article Template
const Article = React.lazy(() => import('./components/Article'));


const routes = [
    {path: '/', exact: true, name: 'Home', component: Home},
    {path: '/home', exact: true, name: 'Home', component: Home},
    {path: '/about', name: 'About Page', component: About},
    {path: '/notice', exact: true, name: 'Notice Page', component: Notice},
    {path: '/notice/:id', exact: true, name: 'Notice Content Page', component: Article},

]

export default routes;
