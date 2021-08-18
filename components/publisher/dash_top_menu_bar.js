import React, { useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import JsCookie from "js-cookie"
import Head from 'next/head';
import { useRouter } from 'next/router'

export default function TopMenuBar({ title, full_name }) {
    const router = useRouter()
    const [menu_toggle, setMenu_toggle] = useState(false)
    const [profile_links, setProfile_links] = useState(false)
    const [newSidebar, setNewSidebar] = useState(false)
    const [newSidebar1, setNewSidebar1] = useState(false)
    const [newSidebar2, setNewSidebar2] = useState(false)

    const Logout = () => {
        JsCookie.remove('publisher_token')
        JsCookie.remove('publisher_full_name')
        JsCookie.remove('publisher_register_type')
        JsCookie.remove('publisher_username')
        JsCookie.remove('login_user_type')
        JsCookie.remove('login_user_email_status')
        JsCookie.remove('login_user_email_id')
        router.push('/login')
    }

    function menutoggle() {
        setMenu_toggle(!menu_toggle);
    }

    return (
        <>
            
            <div className="mobile_top_menu">
                <nav className="navbar navbar-expand-md navbar-dark">
                    <Link href="/publisher/dashboard">
                        <a className="navbar-brand"><img className="nav_logo" src="/assets/images/brands_need_logo_white.png" alt="BrandsNeed" /></a>
                    </Link>
                    <button className="navbar-toggler" type="button" onClick={() => setMenu_toggle(!menu_toggle)}>
                        <span className="navbar-toggler-icon" />
                    </button>
                    {
                        menu_toggle 
                        ?
                        <div className="navbar-collapse" >
                            <div className="sidemenu_navbar">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link href="/publisher/dashboard">
                                        <a className="nav-link" href="#"><img src="/assets/images/menu-dashboard.png" /> Dashboard</a>
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link href="/publisher/orders">
                                        <a className="nav-link" href="#"><img src="/assets/images/menu-myorder.png" /> My Orders</a>
                                    </Link>
                                </li> */}

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                    <img src="/assets/images/menu-platform.png" /> Platform
                                    </a>
                                    <div className="dropdown-menu">
                                        <ul>
                                            <li>
                                                <Link href="/publisher/platform">
                                                    <a className="dropdown-item">Platform List</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/publisher/platform/create-new">
                                                    <a className="dropdown-item">Create Platform</a>
                                                </Link>
                                            </li>
                                        </ul> 
                                    </div>
                                </li>

                                {/* <li className="nav-item">
                                    <a className="nav-link" href="/publisher/wallet"><img src="/assets/images/menu-wallet.png" /> Wallet</a>
                                </li> */}

                                <li className="nav-item">
                                    <a className="nav-link" href="/publisher/profile"><img src="/assets/images/mobile_profile.png" /> Profile</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="/publisher/logout"><img src="/assets/images/logout.png" />Logout</a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        :
                        null
                    }
                </nav>
            </div>
            
                <div className="top_menubar dash_menu_bar"> 
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="dashboard_top_menu_right">
                                <li>
                                    <div className="new__items">
                                        <p className="pub_name">@Foomaclen</p>
                                    </div>
                                </li>
                                <li>
                                    {/* <div className="new__items list_platform">
                                        <p><img src="/assets/images/list_new_platform.png"/><Link href="/publisher/platform/create-new"><a>List New Platform</a></Link></p>
                                    </div> */}
                                </li>
                                {/* <li>
                                    <div className="new__items">
                                        <img src="/assets/images/menu_bar_notification.png" height='22px' />
                                    </div>
                                </li> */}
                                <li>
                                    <div className="new__items">
                                        <div className="new js-new">
                                            <div className="new__action action js-new-open custom_action_button" onClick={() => setProfile_links(!profile_links)}>
                                            
                                                <img className='user_dropdown_img' height="40px" width="40px" src='/assets/img/default_men.png' /> <img className='user_dropdown_img' height="15px" width="15px" src='/assets/images/top-menu.png' />
                                                
                                            </div>
                                            <div className="" style={profile_links == true ? { display: 'block' } : { display: 'none' }}>
                                                <ul className="dropdown-menu inner show topMenuBarDropDown" role="menu" x-placement="bottom-start">
                                                    <li key='1'>
                                                        <Link href="/publisher/profile"><a className="new__item" >
                                                            <div className="new__icon"><i className="la la-user"></i></div>
                                                            <div className="new__title">Profile</div>
                                                        </a></Link>
                                                    </li>
                                                    {/* <li key='2'>
                                                        <Link href="/publisher/wallet"><a className="new__item" >
                                                            <div className="new__icon"><i className="la la-wallet"></i></div>
                                                            <div className="new__title">Wallet</div>
                                                        </a></Link>
                                                    </li> */}
                                                    <li key='3'>
                                                        <a className="new__item" onClick={() => Logout()}>
                                                            <div className="new__icon"><i className="la la-arrow-right"></i></div>
                                                            <div className="new__title">Logout</div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="new__backdrop backdrop js-new-backdrop"></div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>




            {/* <div className="container__head top_menubar">
                <div className="container__new new js-new">
                    <div className="new__action action js-new-open custom_action_button" onClick={() => setProfile_links(!profile_links)}>
                        <img className='user_dropdown_img' height="40px" width="40px" src='/assets/img/default_men.png' /><img className='user_dropdown_img' height="15px" width="15px" src='/assets/images/top-menu.png' />
                    </div>
                    <div className="" style={profile_links == true ? { display: 'block' } : { display: 'none' }}>

                        <ul className="dropdown-menu inner show topMenuBarDropDown" role="menu" x-placement="bottom-start">
                            <li key='1'>
                                <Link href="/publisher/profile"><a className="new__item" >
                                    <div className="new__icon"><i className="la la-user"></i></div>
                                    <div className="new__title">Profile</div>
                                </a></Link>
                            </li>
                            <li key='2'>
                                <Link href="/publisher/wallet"><a className="new__item" >
                                    <div className="new__icon"><i className="la la-wallet"></i></div>
                                    <div className="new__title">Wallet</div>
                                </a></Link>
                            </li>
                            <li key='3'>
                                <a className="new__item" onClick={() => Logout()}>
                                    <div className="new__icon"><i className="la la-arrow-right"></i></div>
                                    <div className="new__title">Logout</div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="new__backdrop backdrop js-new-backdrop"></div>
                </div>

            </div> */}
        </>
    )
}