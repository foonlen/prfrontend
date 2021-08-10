import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import JsCookie from "js-cookie"
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function TopMenuBar({ title, full_name }) {
    const router = useRouter()
    const [profile_links, setProfile_links] = useState(false)
    const [menu_toggle, setMenu_toggle] = useState(false)
    const [headerDropdown, setHeaderDropdown] = useState(false);
    const [newSidebar, setNewSidebar] = useState(false);
    const [newSidebar1, setNewSidebar1] = useState(false);
    const [sidebarMenu, setSidebarMenu] = useState(""); 
    const [one, setOne] = useState(false);

    useEffect(()=>{
        console.log((window.location.pathname).substring(12))
        onchangePage((window.location.pathname).substring(12))
    },[])

    const onchangePage =(id)=>{
        if(id.slice(0,6) === "orders"){
            setSidebarMenu("orders")
        } 
        else if(id.slice(0,6) === "wallet"){
            setSidebarMenu("wallet")
        }
        else if(id.slice(0,8) === "withdraw"){
            setSidebarMenu("withdraw")
        }
        else{
            setSidebarMenu(id)
        }
    } 
   
    const Logout = () => {
        JsCookie.remove('advertiser_token')
        JsCookie.remove('advertiser_full_name')
        JsCookie.remove('advertiser_register_type')
        JsCookie.remove('advertiser_username')
        JsCookie.remove('login_user_type')
        JsCookie.remove('login_user_email_status')
        JsCookie.remove('login_user_email_id')
        router.push('/login')
    }

    function menutoggle() {
        setMenu_toggle(!menu_toggle);
    }

    return (
        <div>

            <div className="mobile_top_menu">
                <nav className="navbar navbar-expand-md navbar-dark">
                    <Link href="/user/dashboard">
                        <a className="navbar-brand"><img className="nav_logo" src="/assets/images/logo-white.png" alt="CoinPedia" /></a>
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
                                    <Link href="/user/dashboard">
                                        <a className="nav-link" href="#"><img src="/assets/images/menu-dashboard.png" /> Dashboard</a>
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link href="/user/wallet">
                                        <a className="nav-link" href="#"><img src="/assets/images/menu-myorder.png" /> Wallet</a>
                                    </Link>
                                </li> */}

                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                    <img src="/assets/images/menu-platform.png" /> My&nbsp;Orders
                                    </a>
                                    <div className="dropdown-menu">
                                        <ul>
                                            <li>
                                                <Link href="/user/orders/create-new">
                                                    <a className="dropdown-item">Create Campagin</a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/user/orders">
                                                    <a className="dropdown-item">Campagins List</a>
                                                </Link>
                                            </li>
                                        </ul> 
                                    </div>
                                </li>

                                

                                <li className="nav-item">
                                    <a className="nav-link" href="/user/profile"><img src="/assets/images/mobile_profile.png" /> Profile</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="/user/logout"><img src="/assets/images/logout.png" />Logout</a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        :
                        null
                    }
                </nav>
            </div>


            {/* code from publisher panel starts here */}
                <div className="top_menubar dash_menu_bar">
                    <div className="row">
                        <div className="col-md-12">
                            <ul className="dashboard_top_menu_right">
                                <li>
                                    <div className="new__items list_platform">
                                        <img src="/assets/images/create_campaign.png"/>
                                        <p><Link href="/user/orders/create-new"><a>Create New Order</a></Link></p>
                                    </div>
                                </li>

                                <li>
                                    <div className="new__items">
                                        <img src="/assets/images/menu_bar_notification.png" height='22px' />
                                    </div>
                                </li>

                                <li>
                                    <div className="new__items">
                                        <div className="container__new new js-new">
                                            <div className="new__action action js-new-open custom_action_button" onClick={() => setProfile_links(!profile_links)}>
                                                <img className='user_dropdown_img' height="40px" width="40px" src='/assets/img/default_men.png' /><img className='user_dropdown_img' height="15px" width="15px" src='/assets/images/top-menu.png' />
                                            </div>
                                            <div className="" style={profile_links == true ? { display: 'block' } : { display: 'none' }}>
                                                <ul className="dropdown-menu inner show topMenuBarDropDown" role="menu" x-placement="bottom-start">
                                                    <li key='1'>
                                                        <Link href="/user/profile"><a className="new__item" >
                                                            <div className="new__icon"><i className="la la-user"></i></div>
                                                            <div className="new__title">Profile</div>
                                                        </a></Link>
                                                    </li>
                                                    <li key='2'>
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

                    {/* <div className="row">
                        <div className="col-lg-6"></div>
                        <div className="col-lg-6">
                            <div className="row ">
                                    <div className="col-lg-3 col-md-4"></div>
                                    <div className="col-lg-5 col-md-4">
                                        <div className="new__items list_platform">
                                            <img src="/assets/images/list_new_platform.png"/>
                                            <p><Link href="#"><a>List New Platform</a></Link></p>
                                        </div>
                                    </div>
                                    <div className="col-lg-1 col-md-1">
                                        <div className="new__items">
                                            <img src="/assets/images/menu_bar_notification.png" height='22px' />
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-md-3">
                                        <div className="new__items">
                                            <div className="container__new new js-new">
                                                <div className="new__action action js-new-open custom_action_button" onClick={() => setProfile_links(!profile_links)}>
                                                    <img className='user_dropdown_img' height="40px" width="40px" src='/assets/img/default_men.png' /><img className='user_dropdown_img' height="15px" width="15px" src='/assets/images/top-menu.png' />
                                                </div>
                                                <div className="" style={profile_links == true ? { display: 'block' } : { display: 'none' }}>
                                                    <ul className="dropdown-menu inner show topMenuBarDropDown" role="menu" x-placement="bottom-start">
                                                        <li key='1'>
                                                            <Link href="/advertiser/profile"><a className="new__item" >
                                                                <div className="new__icon"><i className="la la-user"></i></div>
                                                                <div className="new__title">Profile</div>
                                                            </a></Link>
                                                        </li>
                                                        <li key='2'>
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
                                    </div>
                                    
                                
                            </div>
                        
                        </div>
                    </div> */}
                </div>
            {/* code from pblisher ends here */}




            {/* <div className="demo_container_head container__head">
                <div className="container__title title title_lg">{title}</div>
                <div className="container__search search js-search">
                    <button className="search__action action js-search-open custom_action_button"><i className="la la-bell "></i></button>
                </div>


                <div style={{ display: 'block' }} className="container__new new js-new">
                    <div className="new__action action js-new-open custom_action_button" onClick={() => setHeaderDropdown(!headerDropdown)} >
                        <Image className='user_dropdown_img' height='20px' width='20px' src='/assets/img/default_men.png' />
                        <span className='evan_yates'>{full_name} </span>
                        <i className="la la-angle-down" style={{ marginLeft: '10px' }} onClick={() => setHeaderDropdown(!headerDropdown)}></i>
                    </div>

                    <div className="" style={headerDropdown == true ? { display: 'block' } : { display: 'none' }}>
                        <ul className="dropdown-menu inner register-select-country show topMenuBarDropDown" role="menu" x-placement="bottom-start">
                            <li key='1'>
                                <Link href="/advertiser/profile"><a className="new__item" >
                                    <div className="new__icon"><i className="la la-user"></i></div>
                                    <div className="new__title">Profile</div>
                                </a></Link>
                            </li>
                            <li key='2'>
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
        </div>
    )
}



