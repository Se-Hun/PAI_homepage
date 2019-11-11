import React from 'react';

const Home = React.lazy(() => import('./pages/Home'));

// About
const About = React.lazy(() => import('./pages/About'));

// Notice
const Notice = React.lazy(() => import('./pages/Notice'));

// Article Template
// const BasicArticle = React.lazy(() => import('./components/BasicArticle'));
// const AdvancedArticle = React.lazy(() => import('./components/AdvancedArticle'));
const Article = React.lazy(() => import('./pages/Article'));

// Free Board
const FreeBoard = React.lazy(() => import('./pages/FreeBoard'));

// Tutorial
const Tutorial = React.lazy(() => import('./pages/Tutorial'));

// Editor
const Editor = React.lazy(() => import('./components/editor/editor'));

//Restrict Admin role (not access general User)
const RestrictAdmin = React.lazy(() => import('./components/RestrictAdmin'))

const routes = [
    {path: '/', exact: true, name: 'Home', component: Home},
    {path: '/home', exact: true, name: 'Home', component: Home},
    {path: '/about', name: 'About Page', component: About},
    {path: '/notice', exact: true, name: 'Notice Page', component: Notice},
    {path: '/notice/write', exact: true, name: 'Notice Write Page', component: RestrictAdmin, page: "NoticeWrite"},
    {path: '/notice/:id', exact: true, name: 'Noticle Article Page', component: Article},
    // {path: '/notice/:id', exact: true, name: 'Notice Content Page', component: BasicArticle},
    {path: '/tutorial', exact: true, name: 'Machine Learning Tutorial Page', component: Tutorial},
    {path: '/tutorial/write', exact: true, name: 'Tutorial Write Page', component: RestrictAdmin, page: "TutorialWrite"},
    {path: '/tutorial/:id', exact: true, name: 'Tutorial Article Page', component: Article},
    // {path: '/tutorial/:id', exact: true, name: 'Tutorial Articla Page', component: AdvancedArticle},
    {path: '/freeboard', exact: true, name: 'Free Board Page', component: FreeBoard},
    {path: '/freeboard/write', exact: true, name: 'Free Board Write Page', component: RestrictAdmin, page: "FreeBoardWrite"},
    {path: '/freeboard/:id', exact: true, name: 'Free Board Article Page', component: Article}
]

export default routes;
