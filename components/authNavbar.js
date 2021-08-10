import React, { useState } from 'react'
import JsCookie from "js-cookie"
import { useRouter } from 'next/router'

function authNavbar() 
{
  const router = useRouter()
  const [login_user_type] = useState(JsCookie.get('login_user_type'))
  const [menu_toggle, setMenu_toggle] = useState(false)

  const adLogout = () => {
    JsCookie.remove('advertiser_token')
    JsCookie.remove('advertiser_full_name')
    JsCookie.remove('advertiser_register_type')
    JsCookie.remove('advertiser_username')
    JsCookie.remove('login_user_type')
    JsCookie.remove('login_user_email_status')
    JsCookie.remove('login_user_email_id')
    router.push('/login')
}
  
const pbLogout = () => {
  JsCookie.remove('publisher_token')
  JsCookie.remove('publisher_full_name')
  JsCookie.remove('publisher_register_type')
  JsCookie.remove('publisher_username')
  JsCookie.remove('login_user_type')
  JsCookie.remove('login_user_email_status')
  JsCookie.remove('login_user_email_id')
  router.push('/login')
}

      return (
      <>  
        <div className='auth_navbar'>
          <nav className="navbar navbar-expand-md navbar-dark bg-transparent fixed-top">
            <div className='container-fluid'>
              <a className="navbar-brand" href="#"><img src="/assets/images/logo-white.png" width='170px' /></a>
              <button className="navbar-toggler" type="button" onClick={() => setMenu_toggle(!menu_toggle)}>
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse desktop_menu">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      <div className='nav_images'><img src="/assets/images/Home.png"/> Home</div>
                    </a>
                  </li>
                  {
                    login_user_type == 1 ?
                      <li className="nav-item">
                        <a className="nav-link" onClick={() => {pbLogout()}}>
                          <div className='nav_images text-capitalize' ><img src="/assets/images/Login.png" />Logout</div>
                        </a>
                      </li>
                    :
                    login_user_type == 2 ?
                      <li className="nav-item">
                        <a className="nav-link" onClick={() => {adLogout()}} >
                          <div className='nav_images text-capitalize'><img src="/assets/images/Login.png" />Logout</div>
                        </a>
                      </li>
                    :
                    <>
                      <li className="nav-item">
                        <a className="nav-link" href="/user/r"><div className='nav_images'><img src="/assets/images/Advertiser.png" />Advertiser</div></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/publisher/r"><div className='nav_images'><img src="/assets/images/Publisher.png" />Publiser</div></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/login"><div className='nav_images'><img src="/assets/images/Login.png" />Login</div></a>
                      </li>
                    </>
                  }
                
                </ul>
              </div>
              {
                menu_toggle 
                ?
                  <div className="navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <a className="nav-link" href="/">
                          <div className='nav_images'><img src="/assets/images/Home.png"/> Home</div>
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/advertiser/r"><div className='nav_images'><img src="/assets/images/Advertiser.png" />Advertiser</div></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/publisher/r"><div className='nav_images'><img src="/assets/images/Publisher.png" />Publiser</div></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/login"><div className='nav_images'><img src="/assets/images/Login.png" />Login</div></a>
                      </li>
                    </ul>
                  </div>
                :
                null
              }
            </div>
          </nav>
        </div>
      </>
    )
}

export default authNavbar

