import React from 'react';


const Home = React.lazy(() => import('./pages/Home'));

const About = React.lazy(() => import('./pages/About'));

const Article = React.lazy(() => import('./containers/Article'));

const Notice = React.lazy(() => import('./pages/Notice'));
const WriteNotice = React.lazy(() => import('./containers/WriteNotice'));

const FreeBoard = React.lazy(() => import('./pages/FreeBoard'));
const WriteFreeBoard = React.lazy(() => import('./containers/WriteFreeBoard'));

const Info = React.lazy(() => import('./pages/Info'));
const WriteInfo = React.lazy(() => import('./containers/WriteInfo'));

const Library = React.lazy(() => import('./pages/Library'));

const SourceCode = React.lazy(() => import('./pages/SourceCode'));

const Gallery = React.lazy(() => import('./pages/Gallery'));

const routes = [
    {path: '/', exact: true, name: 'Home', component: Home},
    {path: '/home', exact: true, name: 'Home', component: Home},
    {path: '/about', name: 'About Page', component: About},
    {path: '/notice', exact: true, name: 'Notice Page', component: Notice},
    {path: '/notice/write', exact: true, name: 'Notice Write Page', component: WriteNotice},
    {path: '/notice/:id', exact: true, name: 'Notice Content Page', component: Article},
    {path: '/freeboard', exact: true, name: 'FreeBoard Page', component: FreeBoard},
    {path: '/freeboard/write', exact: true, name: 'FreeBoard Write Page', component: WriteFreeBoard},
    {path: '/freeboard/:id', exact: true, name: 'FreeBoard Content Page', component: Article},
    {path: '/info', exact: true, name: 'Info Page', component: Info},
    {path: '/info/write', name: 'Info Write Page', component: WriteInfo},
    {path: '/info/:id', exact: true, name: 'Info Content Page', component: Article},
    {path: '/library/ppt', exact: true, name: 'PPT Download Page', component: Library}, // ppt용
    {path: '/library/code', exact: true, name: 'Source Code Download Page', component: SourceCode},
    //writePPT
    //writeCode
    //PPT => Article
    //Code => Article
    {path: '/gallery', name: 'Gallery Page', component: Gallery}
]

export default routes;
