import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import cookie from "cookie"
import jsCookie from "js-cookie"
import * as constants from '../components/constants'
import Popupmodal from '../components/popUpModal'
import Authnavbar from '../components/authNavbar'
class login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      API_BASE_URL: constants.API_BASE_URL,
      headers: constants.headers,
      error_email_id: "",
      error_password: "",
      login_id: "",
      password: "",
      loader: false,

      modal_data: {
        title: "",
        image_name: "",
        description: ""
      }
    }
  }


  loginFun() {
    this.setState({
      modal_data: {
        title: "",
        image_name: "",
        description: ""
      }
    })

    let formIsValid = true;
    if (!this.state.password) {
      this.setState({
        error_password: "*Required."
      });
      formIsValid = false;
    }
    else if (this.state.password.length < 5) {
      this.setState({
        error_password: "Invalid password."
      });
      formIsValid = false;
    }
    else {
      this.setState({
        error_password: ""
      });
    }

    if (!this.state.login_id) {
      this.setState({
        error_login_id: "*Required."
      });
      formIsValid = false;
    }
    else {
      this.setState({
        error_login_id: ""
      });
    }

    if (!formIsValid) {
      return true;
    }

    this.setState({
      loader: true
    });

    var loginUserExpireTime = new Date();
    loginUserExpireTime.setMinutes(loginUserExpireTime.getMinutes() + (60 * 24));

    const login_data = {
      login_id: this.state.login_id,
      password: this.state.password,
    }

    fetch(this.state.API_BASE_URL + "login/login_user", {
      method: 'POST',
      headers: this.state.headers,
      body: JSON.stringify(login_data)
    }).then(res => res.json())
      .then(
        (result) => {
          console.log(result)
          this.setState({ loader: false });
          if (result.status === true) {
            //1:publisher, 2:advertiser
            jsCookie.set('login_user_type', parseInt(result.message.user_type))
            jsCookie.set('login_user_email_status', parseInt(result.message.email_verify_status))
            jsCookie.set('login_user_email_id', result.message.email_id)
            
            if(result.message.user_type === 1) 
            {
              jsCookie.set('publisher_token', result.message.token)
              jsCookie.set('publisher_full_name', result.message.full_name)
              jsCookie.set('publisher_username', result.message.username)
            }
            else if(result.message.user_type === 2) 
            {
              jsCookie.set('advertiser_token', result.message.token)
              jsCookie.set('advertiser_full_name', result.message.full_name)
              jsCookie.set('advertiser_username', result.message.username)
            }
            
            if(parseInt(result.message.email_verify_status) === 1)
            {
              if(result.message.user_type === 1) 
              {
                Router.push('publisher/dashboard')
              }
              else if(result.message.user_type === 2) 
              {
                Router.push('user/dashboard')
              }
            }
            else
            {
              Router.push('/verify-email')
            }
          }
          else 
          {
            this.setState({ modal_data: { title: 'Login Failed', image_name: "reject.svg", description: result.message.alert_message } })

            this.setState({
              error_login_id: "",
              error_password: "",
              login_id: "",
              password: ""
            })
          }

        });
  }


  getParamFun() {
    // if(typeof this.state.url_param.ref !== 'undefined' && this.state.url_param.ref === 'submit-bounty')
    //  {  
    //   this.setState({
    //     alert_message: "Please login to submit your bounty details"
    //   });
    //  }
  }


  componentDidMount() {
    // if(localStorage.getItem('token'))
    // {
    //     this.props.history.push('/user/dashboard');
    // }

    this.getParamFun();
  }

  render() {

    const { modal_data, error_login_id, error_password, login_id, password } = this.state

    return (
      <>
        <Head>
          <meta charset="utf-8" />
          <title>Login - Advertiser | Publisher</title>
          <meta charSet="utf-8" />
          <title>Login to  Publisher Panel</title>
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <meta name="theme-color" content="#fff" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="description" content="CoinPedia Publisher Panel is a work management tool for Crypto , Fintech and Social media by Coinpeda.org . The tool helps publishers and influencers to find business opportunities for sponsored posts and freelancing work and also manage wallet and orders." />{/* Twitter Card data*/}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@publisher_handle" />
          <meta name="twitter:title" content="Login to  Publisher Panel" />
          <meta name="twitter:description" content="CoinPedia Publisher Panel is a work management tool for Crypto , Fintech and Social media by Coinpeda.org . The tool helps publishers and influencers to find business opportunities for sponsored posts and freelancing work and also manage wallet and orders." />
          <meta name="twitter:creator" content="@author_handle" />
          <meta name="twitter:image" content="http://www.example.com/image.jpg" />{/* Open Graph data*/}
          <meta property="og:title" content="Login to Publisher Panel" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="http://www.example.com/" />
          <meta property="og:image" content="http://example.com/image.jpg" />
          <meta property="og:description" content="CoinPedia Publisher Panel is a work management tool for Crypto , Fintech and Social media by Coinpeda.org . The tool helps publishers and influencers to find business opportunities for sponsored posts and freelancing work and also manage wallet and orders." />
          <meta property="og:site_name" content="Site Name, i.e. Moz" />
          <meta property="fb:admins" content="Facebook numeric ID" />
          <meta name="keywords" content="Coinpedia Publisher Login, Coinpedia, coinpedia PR Agency, list as influencers, Influencer marketing, " />
          {/* favicon*/}
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16x16.png" />
          <link rel="manifest" href="/assets/img/site.webmanifest" />
          <link rel="mask-icon" href="/assets/img/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
        </Head>
        
          <div className="auth_page">
            <Authnavbar/>
                <div className="row auth_page_form">
                  <div className="col-md-6 auth_left">
                    <div className="bg_auth_left"></div>
                    <div className="row">
                      <div className="col-md-1 col-lg-2"></div>
                      <div className="col-md-10 col-lg-8">
                        <div className="plan_details">
                          <h4>Your plan includes</h4>
                          <ul>
                            <li><img src="/assets/images/plan-points.png" /> Run multiple campaigns.</li>
                            <li><img src="/assets/images/plan-points.png" /> Verified and suitable publishers - influencers.</li>
                            <li><img src="/assets/images/plan-points.png" /> Publish on news sites, social media and youtube.</li>
                            <li><img src="/assets/images/plan-points.png" /> Get agent support.</li>
                            <li><img src="/assets/images/plan-points.png" /> Secure and fair payment systems.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                  </div>  
                  <div className="col-md-6 auth_right">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="auth__inner">
                          <div className="auth__head">
                            <div className="auth__title title ">
                              <h1 className="title_xl">Login into your account</h1>
                              <p>Access your tool hassle free.</p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-10">
                              <div className="field auth__field">
                                <div className="field__label">Login ID</div>
                                <div className="field__wrap">
                                <div className="field__icon"><img src="/assets/images/username.png" /></div>
                                  <input className="field__input" type="text" placeholder="Username OR Email ID" useref="login_id" value={login_id} onChange={(e) => { this.setState({ login_id: e.target.value }) }} name="login_id" autoComplete='off' />
                                </div>
                                <div className="error_class">
                                  {error_login_id}
                                </div>
                              </div>
                              <div className="field auth__field">
                                <div className="field__label">Password</div>
                                <div className="field__wrap">
                                <div className="field__icon"><img src="/assets/images/lock.png" /></div>
                                  <input className="field__input" type="password" placeholder="**********" useref="password" value={password} onChange={(e) => { this.setState({ password: e.target.value }) }} type="password" name="password" autoComplete='off' />
                                </div>
                                <div className="error_class">
                                  {error_password}
                                </div>
                                <p className="auth_forgot"><Link href="/forgot-password"><a>Forgot password ?</a></Link></p>
                              </div>
                              <button className="btn cp-primary-btn" type="button" onClick={() => { this.loginFun() }} >
                                {this.state.loader ? (
                                  <div className="loader"><span class="spinner-border spinner-border-md"></span></div>
                                ) : (
                                  <>Take me in <i className="la la-arrow-right"></i></>
                                )}
                              </button>



                           

                              <div className="row">
                                <div className="col-md-12">
                                  <p className="reg_auth_link">
                                    Don't have an Account ?
                                    <Link href="/user/r">
                                      <a className="auth__link">Advertiser</a>
                                    </Link>
                                    &nbsp;
                                    |
                                    &nbsp;
                                    <Link href="/publisher/r">
                                      <a className="auth__link">Publisher</a>
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  
                       
          </div>
        {
          modal_data.title
            ?
            <Popupmodal message={modal_data} />
            :
            null
        }
      </>
    )
  }

}

export async function getServerSideProps({ query, req }) {
  const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)

  if (userAgent.publisher_token) {
    return {
      redirect: {
        destination: '/publisher/dashboard',
        permanent: false,
      }
    }
  }
  else if (userAgent.advertiser_token) {
    return {
      redirect: {
        destination: '/user/dashboard',
        permanent: false,
      }
    }
  }
  else {
    return { props: { userAgent: '' } }

  }
}

export default login