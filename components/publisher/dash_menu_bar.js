import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import JsCookie from "js-cookie"

function sideMenuBar() {
    const [one, setOne] = useState(false);
    const [sidebarMenu, setSidebarMenu] = useState(""); 
    const [profile_links,setProfile_links]=useState(false)
    const [publisher_full_name]= useState(JsCookie.get('publisher_full_name'))
    const [publisher_username]= useState(JsCookie.get('publisher_username'))
    
    useEffect(()=>{ 
            onchangePage((window.location.pathname).substring(11))
    },[sidebarMenu])

    const onchangePage =(id)=>{

        // console.log(id.substring(0,8));

        if(id.slice(0,8) === "platform"){
            setSidebarMenu("platform")
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
 
    return (
        <div>
            <div className="sidebar js-sidebar">
                <div className="sidebar__nav">
                    <nav className="nav js-nav extended custom_nav pr_custom_nav">
                        <Link href='/'>
                            <a className="nav__link nav__link_head custom_nav_logo">
                                {/* <div className="nav__preview"><Image className="nav__pic" width='30px' height='30px' src="/assets/img/logo.svg" alt="Logo" /></div> */}
                                <div className="nav__title  nav_logo_title"><img className='nav_logo' src="/assets/images/logo-white.png" alt="CoinPedia" /></div>
                                
                            </a></Link>

                        {/* .... */}
                        <div className="nav__list">
                            <div className="nav__primary js-nav-primary">
                                <div className="media user_media" onClick={() => setProfile_links(!profile_links)}>
                                    <img src="/assets/img/default_men.png" alt="John Doe" className="mr-2 rounded-circle" />
                                    <div className="media-body">
                                        <h4 className="text-capitalize">{publisher_full_name}</h4>
                                        <p>@{publisher_username}</p>
                                    </div>
                                </div>
                                <div className="nav__group sidemenu_navbar">
                                    <ul>
                                        <li className={sidebarMenu === "dashboard" ? "nav__link active first-side-menu" : "nav__link"}>
                                            <Link href="/publisher/dashboard">
                                                <a  title="Dashboard">
                                                    <div className="nav__preview"><img src="/assets/images/menu-dashboard.png" /></div>
                                                    <div className="nav__title">Dashboard</div>
                                                </a>
                                            </Link>
                                        </li>

                                        {/* <li className={sidebarMenu === "orders" ? "nav__link active " : "nav__link"}>
                                            <Link href="/publisher/orders">
                                                <a  title="Projects">
                                                    <div className="nav__preview"><img src="/assets/images/menu-myorder.png" /></div>
                                                    <div className="nav__title">My Orders</div>
                                                </a>
                                            </Link>
                                        </li> */}

                                        <li className={sidebarMenu === "platform" ? "nav__link active " : "nav__link"} >
                                            <Link href="#">
                                                <a title="Projects">
                                                    <div className="nav__preview"><img src="/assets/images/menu-platform.png" /></div>
                                                    <div className="nav__title" onClick={() => setOne(!one)}>Platforms <span className="side-menu-dropdown-icon"> <i className="la la-angle-down"></i> </span></div>
                                                </a>
                                            </Link>

                                            <div className="dropdown_list" style={one == true ? { display: 'block' } : { display: 'none' }}>
                                                <div className="sidebar_dropdown" id="myLinks">
                                                    <ul>
                                                        <li>
                                                            <Link href="/publisher/platform">
                                                                <a className="hrefLinks"><span>Platform list</span></a>
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link href="/publisher/platform/create-new">
                                                                <a className="hrefLinks">Create&nbsp;Platform</a>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </li>

                                        {/* <li className={sidebarMenu === "wallet" || sidebarMenu === "withdraw" ? "nav__link active " : "nav__link pr_nav_links"}>
                                            <Link href="/publisher/wallet">
                                                <a  title="Wallet">
                                                    <div className="nav__preview"><img src="/assets/images/menu-wallet.png" /></div>
                                                    <div className="nav__title">Wallet</div>
                                                </a>
                                            </Link>
                                        </li> */}
                                    </ul>
                                </div>

                                {/* earnings nav group */}
                                {/* <div className="nav__group grow_earnings_menu">
                                    <p className='earnings_block'>Grow Your Earnings</p>
                                    <div className="main_block_menu">
                                        <Link href="/publisher/dashboard"><a className={sidebarMenu === "dashboard" ? "nav__link first-side-menu pr_nav_links" : "nav__link first-side-menu pr_nav_links"} title="Dashboard">
                                            <div className="nav__preview"><img src="/assets/images/setup-account.png" /></div>
                                            <div className="nav__title">Set Up your account</div>
                                        </a></Link>

                                        <Link href="/publisher/orders"><a className={sidebarMenu === "orders" ? "nav__link active " : "nav__link pr_nav_links"} title="Projects">
                                            <div className="nav__preview"><img src="/assets/images/read-instruction.png" /></div>
                                            <div className="nav__title">Read Instructions</div>
                                        </a></Link>
                                        <Link href="/publisher/wallet"><a className={sidebarMenu === "wallet" || sidebarMenu === "withdraw" ? "nav__link active " : "nav__link pr_nav_links"} title="Wallet">
                                            <div className="nav__preview"><img src="/assets/images/list-profile.png" /></div>
                                            <div className="nav__title">List Your Profile</div>
                                        </a></Link>
                                        <Link href="/publisher/wallet"><a className={sidebarMenu === "wallet" || sidebarMenu === "withdraw" ? "nav__link active " : "nav__link pr_nav_links"} title="Wallet">
                                            <div className="nav__preview"><img src="/assets/images/invite-earn.png" /></div>
                                            <div className="nav__title">Invite and Earn</div>
                                        </a></Link>
                                    </div>
                                </div> */}
                                <div className="nav__group grow_earnings_menu">
                                    <p className='earnings_block'>Grow Your Earnings</p>
                                    <div className="main_block_menu">
                                        <Link href="#"><a className={sidebarMenu === "dashboard" ? "nav__link first-side-menu pr_nav_links" : "nav__link first-side-menu pr_nav_links"} title="Dashboard">
                                            <div className="nav__preview"><img src="/assets/images/setup-account.png" /></div>
                                            <div className="nav__title">Set Up your account</div>
                                        </a></Link>

                                        <Link href="#"><a className={sidebarMenu === "orders" ? "nav__link active " : "nav__link pr_nav_links"} title="Projects">
                                            <div className="nav__preview"><img src="/assets/images/read-instruction.png" /></div>
                                            <div className="nav__title">Read Instructions</div>
                                        </a></Link>
                                        <Link href="#"><a className={sidebarMenu === "wallet" || sidebarMenu === "withdraw" ? "nav__link active " : "nav__link pr_nav_links"} title="Wallet">
                                            <div className="nav__preview"><img src="/assets/images/list-profile.png" /></div>
                                            <div className="nav__title">List Your Profile</div>
                                        </a></Link>
                                        <Link href="#"><a className={sidebarMenu === "wallet" || sidebarMenu === "withdraw" ? "nav__link active " : "nav__link pr_nav_links"} title="Wallet">
                                            <div className="nav__preview"><img src="/assets/images/invite-earn.png" /></div>
                                            <div className="nav__title">Invite and Earn</div>
                                        </a></Link>
                                    </div>
                                </div>

                                {/* invite and earn block */}
                                <div className='invite_block'>
                                    <img src="/assets/images/sidemenu-invite.png" />
                                    <h3 className='invite_link'>Invite and Earn</h3>
                                    <h4 className='ten_off'>Up to 10% on every earning</h4>
                                    {/* <button className='invite_link_btn'>Get Invite Link</button> */}
                                    <Link href="#"><a className="invite_link_btn">Get Invite Link</a></Link>
                                </div>

                            </div>
                        </div>
                        {/* .... */}
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default sideMenuBar


