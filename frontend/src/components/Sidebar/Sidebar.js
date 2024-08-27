import React from 'react'
import SidebarCard from './SidebarCard'
import { Link } from 'react-router-dom'
import { all } from 'axios';

const Sidebar = ({ dashboardToggle, toggleHandle, allnews }) => {

    const user = JSON.parse(localStorage.getItem('userToken'));

    let sideBarList = [
        {
            title: 'All News',
            to:"/",
            svg: (
                <svg width='12px' height='12px' viewBox='0 0 42 42' version='1.1' >
                    <title>All News</title>
                    <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                        <g transform='translate(-1869.000000, -293.000000)' fill='#FFFFFF' fill-rule='nonzero'>
                            <g transform='translate(1716.000000, 291.000000)'>
                                <g id='office' transform='translate(153.000000, 2.000000)'>
                                    <path className='color-background opacity-6' d='M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z'></path>
                                    <path className='color-background' d='M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z'></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            )
        },
        {
            title: 'Publish News',
            to:"/uploads",
            svg: (
                <svg width='12px' height='12px' viewBox='0 0 42 42' version='1.1' >
                    <title>Publish News</title>
                    <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                        <g transform='translate(-1869.000000, -293.000000)' fill='#FFFFFF' fill-rule='nonzero'>
                            <g transform='translate(1716.000000, 291.000000)'>
                                <g id='office' transform='translate(153.000000, 2.000000)'>
                                    <path className='color-background opacity-6' d='M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z'></path>
                                    <path className='color-background' d='M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z'></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            )
        },
        {
            title: 'Edit or Delete News',
            to:"/news-editor",
            svg: (
                <svg width='12px' height='12px' viewBox='0 0 42 42' version='1.1' >
                    <title>Edit or Delete News</title>
                    <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                        <g transform='translate(-1869.000000, -293.000000)' fill='#FFFFFF' fill-rule='nonzero'>
                            <g transform='translate(1716.000000, 291.000000)'>
                                <g id='office' transform='translate(153.000000, 2.000000)'>
                                    <path className='color-background opacity-6' d='M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z'></path>
                                    <path className='color-background' d='M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z'></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            )
        },
       
    ]



    let sideBarListForAllnews = [
        {
            title: 'All News',
            to:"/",
            svg: (
                <svg width='12px' height='12px' viewBox='0 0 42 42' version='1.1' >
                    <title>All News</title>
                    <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                        <g transform='translate(-1869.000000, -293.000000)' fill='#FFFFFF' fill-rule='nonzero'>
                            <g transform='translate(1716.000000, 291.000000)'>
                                <g id='office' transform='translate(153.000000, 2.000000)'>
                                    <path className='color-background opacity-6' d='M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z'></path>
                                    <path className='color-background' d='M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z'></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            )
        },
        {
            title: 'News By Title',
            to:"/news-by-title",
            svg: (
                <svg width='12px' height='12px' viewBox='0 0 42 42' version='1.1' >
                    <title>News By Title</title>
                    <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                        <g transform='translate(-1869.000000, -293.000000)' fill='#FFFFFF' fill-rule='nonzero'>
                            <g transform='translate(1716.000000, 291.000000)'>
                                <g id='office' transform='translate(153.000000, 2.000000)'>
                                    <path className='color-background opacity-6' d='M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z'></path>
                                    <path className='color-background' d='M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z'></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            )
        },
        {
            title: 'News By Tags',
            to:"/news-by-tags",
            svg: (
                <svg width='12px' height='12px' viewBox='0 0 42 42' version='1.1' >
                    <title>News By Title</title>
                    <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                        <g transform='translate(-1869.000000, -293.000000)' fill='#FFFFFF' fill-rule='nonzero'>
                            <g transform='translate(1716.000000, 291.000000)'>
                                <g id='office' transform='translate(153.000000, 2.000000)'>
                                    <path className='color-background opacity-6' d='M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z'></path>
                                    <path className='color-background' d='M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z'></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            )
        },
        {
            title: 'Login as Administrator',
            to:"/signin",
            svg: (
                <svg width='12px' height='12px' viewBox='0 0 42 42' version='1.1' >
                    <title>Publish News</title>
                    <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                        <g transform='translate(-1869.000000, -293.000000)' fill='#FFFFFF' fill-rule='nonzero'>
                            <g transform='translate(1716.000000, 291.000000)'>
                                <g id='office' transform='translate(153.000000, 2.000000)'>
                                    <path className='color-background opacity-6' d='M12.25,17.5 L8.75,17.5 L8.75,1.75 C8.75,0.78225 9.53225,0 10.5,0 L31.5,0 C32.46775,0 33.25,0.78225 33.25,1.75 L33.25,12.25 L29.75,12.25 L29.75,3.5 L12.25,3.5 L12.25,17.5 Z'></path>
                                    <path className='color-background' d='M40.25,14 L24.5,14 C23.53225,14 22.75,14.78225 22.75,15.75 L22.75,38.5 L19.25,38.5 L19.25,22.75 C19.25,21.78225 18.46775,21 17.5,21 L1.75,21 C0.78225,21 0,21.78225 0,22.75 L0,40.25 C0,41.21775 0.78225,42 1.75,42 L40.25,42 C41.21775,42 42,41.21775 42,40.25 L42,15.75 C42,14.78225 41.21775,14 40.25,14 Z M12.25,36.75 L7,36.75 L7,33.25 L12.25,33.25 L12.25,36.75 Z M12.25,29.75 L7,29.75 L7,26.25 L12.25,26.25 L12.25,29.75 Z M35,36.75 L29.75,36.75 L29.75,33.25 L35,33.25 L35,36.75 Z M35,29.75 L29.75,29.75 L29.75,26.25 L35,26.25 L35,29.75 Z M35,22.75 L29.75,22.75 L29.75,19.25 L35,19.25 L35,22.75 Z'></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </svg>
            )
        }
    ]


    return (
        <aside className={`sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3" ${dashboardToggle ?'bg-white' : ''} `} id="sidenav-main">
            <div className="sidenav-header">
                <i className="fas fa-times p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-xl-none" onClick={(e)=> toggleHandle()} aria-hidden="true" id="iconSidenav"></i>
                
            </div>
            <hr className="horizontal dark mt-0" />
            <div className="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    {
                        allnews === "allnews"
                        ? sideBarListForAllnews.map(card => (
                            <SidebarCard title={card.title} svg={card.svg} to={card.to} key={card.title} />
                            
                            ))
                        : sideBarList.map(card => (
                            <SidebarCard title={card.title} svg={card.svg} to={card.to} key={card.title} />
                            ))
                    }
                    </li>
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar