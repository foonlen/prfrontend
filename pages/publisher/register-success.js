import React from 'react'
import Link from 'next/link'
import cookie from "cookie" 

export default function welcome_popup()
{
 
    return (
        <> 
            <div className="popup_row">
              <div className="col-lg-12">
                <div className='auth_navbar '>
                  <nav className="navbar navbar-expand-md navbar-white bg-transparent fixed-top">
                    <div className='container-fluid'>
                      <a className="navbar-brand" href="#"><img src="/assets/images/brands_need_logo_color.png" /></a>

                      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                      </button>

                      {/* <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav ml-auto">
                          <li className="nav-item">
                            <a className="nav-link" href="/">
                              <div className='nav_images'><img src="/assets/images/home.png"/> Home</div>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/advertiser/r"><div className='nav_images'><img src="/assets/images/advertiser.png" />Advertiser</div></a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/publisher/r"><div className='nav_images'><img src="/assets/images/publisher.png" />Publiser</div></a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="/login"><div className='nav_images'><img src="/assets/images/login.png" />Login</div></a>
                          </li>
                        </ul>
                      </div> */}
                    </div>
                  </nav>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row ">
                  <div className="col-lg-4"></div>
                  <div className="col-lg-4">
                      <div className='popup_main_block'>
                        <h4>Welcome to BrandsNeed Agency Publisher Tool</h4>
                        <p>Let's start with Updating your Platform and Services</p>
                        <div className="row">
                          <div className="col-lg-2"></div>
                          <div className="col-lg-8"><img src="/assets/images/popup.png" /></div>
                          <div className="col-lg-2"></div>
                        </div>
                        
                        <button className='btn cp-primary-btn text-center pub_create_platform'><Link href='/publisher/platform/create-new'><a>Create Platform</a></Link></button>
                        <p className="may_be_later"><Link href='/publisher/dashboard'><a className="may_be_later_link">May be later</a></Link></p>
                      </div>
                  </div>
                  <div className="col-lg-4"></div>
                </div>
              </div>
            </div>
        </>
    )
} 
export async function getServerSideProps({req}) 
{
    const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
    if(userAgent.publisher_token)
    {   
        if(parseInt(userAgent.login_user_email_status) === 1)
        {
            return {props: {userAgent:userAgent}}
        }
        else
        {
            return {redirect: { destination: '/verify-email', permanent: false }}
        }
    }
    else
    {
        return {redirect: { destination: '/login', permanent: false }} 
        
    }
}
