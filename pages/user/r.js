import React, { Component } from 'react'

import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import cookie from "cookie"
import jsCookie from "js-cookie"
import * as constants from '../../components/constants';
import Authnavbar from '../../components/authNavbar'

class register extends Component {

  constructor() {
    super();
    this.state = {
      API_BASE_URL: constants.API_BASE_URL,
      headers: constants.headers,
      countryList: constants.countryList,
      alert_message: null,
      username: "",
      country_row_id: "1",
      full_name: "",
      email_id: "",
      loader: false,
      mobile_number: "",
      website_name: "",
      company_name: "",
      error_company_name: "",
      password: "",
      error_password: "",
      error_username: "",
      error_full_name: "",
      error_email_id: "",
      error_mobile_number: "",
      error_website_name: "",
      error_country_row_id: "",
      step : true

    }
  }
  
  errClear()
  {
    this.setState({
      error_company_name: "", error_password:"", error_username: "", error_email_id:"", error_mobile_number: ""
    })
  }

  saveRegisteredUser() 
  {
    let formIsValid = true
    this.errClear()

    if(this.state.company_name === '') 
    {
      this.setState({
        error_company_name: "The Company Name field is required."
      })
      formIsValid = false
    }
    else if(this.state.company_name.length < 4) 
    {
      this.setState({
        error_company_name: "The Company Name field must be at least 4 characters in length."
      })
      formIsValid = false
    }

    if(this.state.username === '') 
    {
      this.setState({
        error_username: "The Username field is required."
      });
      formIsValid = false;
    }
    else if(this.state.username.length < 4) 
    {
      this.setState({
        error_username: "The Username field must be at least 4 characters in length."
      });
      formIsValid = false;
    }
    else  if (!(/^[a-z0-9\b]+$/).test(this.state.username)) 
    {
      this.setState({
        error_username: "The Username field contains only alphabets and numbers."
      })
      formIsValid = false;
    }


    if(this.state.email_id === '') 
    {
      this.setState({
        error_email_id: "The Email ID field is required."
      })
      formIsValid = false
    }
    else if (!this.state.email_id.includes('@')) {
      formIsValid = false
      this.setState({
        error_email_id: "The Email ID field must be contain valid email."
      });
      
    }


    if(this.state.mobile_number === '') 
    {
      this.setState({
        error_mobile_number: "The Mobile Number field is required."
      });
      formIsValid = false;
    }
    else if (this.state.mobile_number.length < 5) 
    {
      this.setState({
        error_mobile_number: "The Mobile Number field must be at least 5 characters in length."
      });
      formIsValid = false;
    }

    
    

    if(this.state.password === '') 
    {
      this.setState({
        error_password: "The Password field is required."
      })
      formIsValid = false
    }
    else if (this.state.password.length < 6) 
    {
      this.setState({
        error_password: "The Password field must be at least 6 characters in length."
      })
      formIsValid = false
    }

    if (!formIsValid) 
    {
      return true;
    }
    this.setState({ loader: true })
    console.warn("state ", this.state);
    
    var reqObj = {
      company_name:this.state.company_name,
      email_id:this.state.email_id,
      country_row_id:this.state.country_row_id,
      mobile_number:this.state.mobile_number,
      password:this.state.password,
      username:this.state.username
    }

    fetch(this.state.API_BASE_URL + "register/advertiser", {
      method: 'POST',
      headers: this.state.headers,
      body: JSON.stringify(reqObj)
    }).then(res => res.json())
      .then(
        (result) => {
          console.warn(result);
          this.setState({ loader: false })
          if (result.status === true) {
            console.log(result.message);
            jsCookie.set('advertiser_token', result.message.token)
            jsCookie.set('advertiser_full_name', result.message.full_name) 
            jsCookie.set('advertiser_username', result.message.username)
            jsCookie.set('advertiser_alert_message', result.message.alert_message)
            jsCookie.set('login_user_type', 2)
            jsCookie.set('login_user_email_status', 0)
            jsCookie.set('login_user_email_id', result.message.email_id)
            Router.push('/verify-email')
          }
          else 
		  {
			//error_full_name
            if (result.message.full_name) { 
              this.setState({step: true}) 
              var error_full_name = result.message.full_name;
            }
            else {
              var error_full_name = "";
            }
			
            //error_username
            if (result.message.username) {
              var error_username = result.message.username;
            }
            else {
              var error_username = "";
            }

            //error_email_id
            if (result.message.email_id) {
              this.setState({step: true}) 
              var error_email_id = result.message.email_id;
            }
            else {
              var error_email_id = "";
            }

            //error_mobile_number
            if (result.message.mobile_number) {
              var error_mobile_number = result.message.mobile_number;
            }
            else {
              var error_mobile_number = "";
            }

            this.setState({
              error_full_name: error_full_name,
              error_email_id: error_email_id,
              error_mobile_number: error_mobile_number,
              error_username: error_username
            });
          } 
        }) 
  }
 


  render() {

    return (
      <div>
        <Head>
          <meta charset="utf-8" />
          <title>Register - Advertiser</title>
          <meta charset="utf-8" />
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

        
        
        {/* ..........login page code starts here........... */}
        <div className="auth_page ad_reg">
            <Authnavbar/>
                <div className="row auth_page_form ">
                  <div className="col-md-6 auth_left">
                    <div className="bg_auth_left"></div>
                    <div className="row">
                      <div className="col-md-2 col-lg-2"></div>
                      <div className="col-md-8 col-lg-9">
                        <div className="plan_details">
                          <h2>Get the Job Done !</h2>
                          <ul>
                            <li><img src="/assets/images/plan-points.png" /> Run Multiple Campaigns</li>
                            <li><img src="/assets/images/plan-points.png" /> Find Suitable Publishers & Influencers</li>
                            <li><img src="/assets/images/plan-points.png" /> Publish on Sites, Social Media and youtube.</li>
                            <li><img src="/assets/images/plan-points.png" /> Get Agent Support</li>
                            <li><img src="/assets/images/plan-points.png" /> Secure and Fair Payment terms.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                  </div>  
                  <div className="col-md-6 auth_right reg_auth_right">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="auth__inner">
                          {
                            this.state.step 
                            ?
                            <div className="auth__head">
                              <div className="auth__title title ">
                                <h1 className="title_xl">Create Your Advertiser Account</h1>
                                <p>Find the best Publishers and influencers for your promotional needs.</p>
                              </div>
                            </div>
                            :
                            null
                          }




    {/* new advertiser panel image design starts here */}
              <div className="row">
              <div className="col-md-9">

              <div className="field auth__field">
                <div className="field__wrap">
                  <div className="field__icon"><img src="/assets/images/city.png" /></div>
                  {/* <div className="field__icon custom_dropdown_icon"><img src="/assets/images/ok_green.png" /></div> */}
                  <input className="field__input" type="text  " placeholder="Company Name" ref="company_name" value={this.state.company_name} onChange={(e) => { this.setState({ company_name: e.target.value }) }} name="company_name" autoComplete="off" />
                </div>
                <div className="error_reg">
                {this.state.error_company_name}
                </div>
              </div>


              <div className="field auth__field">
                <div className="field__wrap">
                <div className="field__icon"><img src="/assets/images/username.png" /></div>
                  <input className="field__input" type="text" placeholder="Enter your username" ref="username" value={this.state.username} onChange={(e) => { this.setState({ username: (e.target.value).toLowerCase() }) }} name="username" autoComplete="off" />
                </div>
                <div className="error_reg">
                  {this.state.error_username}
                </div>
              </div>



              <div className="field auth__field">
                <div className="field__wrap">
                <div className="field__icon"><img src="/assets/images/email.png" width="22px" /></div>
                  <input className="field__input" type="text" placeholder="Email" ref="email_id" value={this.state.email_id} onChange={(e) => { this.setState({ email_id: e.target.value }) }} name="email_id" autoComplete="off" />
                </div>
                <div className="error_reg">
                  {this.state.error_email_id}
                </div>
              </div>
              <div className="field auth__field">
                <div className="input-group field__wrap">
                  <div className="input-group-prepend">
                    <span className="input-group-text select_option_span"> 
                    <select className="my_custom_select" name="country_row_id" onChange={(e)=>{ this.setState({ country_row_id: e.target.value })}} useref="country_row_id" >
                      {
                        this.state.countryList ?
                          this.state.countryList.map((item, i) =>
                            <option value={item.country_id} key={item.country_id}>{item.country_code}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.country_name}</option>
                          )
                          : null
                        }
                    </select>
                    </span>
                  </div>
                  <input className="form-control field__input country_input_field" type="number" placeholder="Enter your mobile number" ref="mobile_number" value={this.state.mobile_number} onChange={(e) => { this.setState({ mobile_number: e.target.value }) }} name="mobile_number" autoComplete="off" />
                </div>
                <div className="error_reg">{this.state.error_mobile_number} </div>
              </div>
                  <div className="field auth__field">
                    <div className="field__wrap">
                    <div className="field__icon"><img src="/assets/images/lock.png" /></div>
                      <input className="field__input" type="password" placeholder="Enter your password" ref="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} name="password" autoComplete="off" />
                    </div>
                    <div className="error_reg">
                      {this.state.error_password}
                    </div>
                  </div>

                  <p className="reg_auth_link">
                    Have an Account ? <Link href="/login"><a className="auth__link">Login Here</a></Link>
                  </p>

                  {this.state.loader ? (
                      <button className="btn btn-primary empty__btn btn-loader cp-primary-btn" type="button" onClick={() => { this.saveRegisteredUser() }} ><div className="loader"><span class="spinner-border spinner-border-md"></span></div></button>
                    ) : (
                      <button className="btn btn-primary cp-primary-btn" type="button" onClick={() => { this.saveRegisteredUser() }} > Sign Up <i className="la la-arrow-right"></i></button>
                    )
                  }

                </div>
                </div>
                            
                          {/* new advertiser panel image design ends here */}
                          





                          {/* <div className="row">
                            <div className="col-md-9">
                              {
                                this.state.step
                                ?
                                <div className="reg_first_three_blocks">
                                  <div className="field auth__field">
                                    <div className="field__label">Name</div>
                                    <div className="field__wrap">
                                    <div className="field__icon"><img src="/assets/images/username.png" /></div>
                                      <input className="field__input" type="text" placeholder="Enter your name" ref="full_name" value={this.state.full_name} onChange={(e) => { this.setState({ full_name: e.target.value }) }} name="full_name" autoComplete="off" />
                                    </div>
                                    <div className="error_class">
                                      {this.state.error_full_name}
                                    </div>
                                  </div>
                                  <div className="field auth__field">
                                    <div className="field__label">Email</div>
                                    <div className="field__wrap">
                                    <div className="field__icon"><img src="/assets/images/email.png" width="22px" /></div>
                                      <input className="field__input" type="text" placeholder="Enter your email Id" ref="email_id" value={this.state.email_id} onChange={(e) => { this.setState({ email_id: e.target.value }) }} name="email_id" autoComplete="off" />
                                    </div>
                                    <div className="error_class">
                                      {this.state.error_email_id}
                                    </div>
                                  </div>
                                  <div className="field auth__field">
                                    <div className="field__label">Password</div>
                                    <div className="field__wrap">
                                    <div className="field__icon"><img src="/assets/images/lock.png" /></div>
                                      <input className="field__input" type="password" placeholder="Enter your password" ref="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} name="password" autoComplete="off" />
                                    </div>
                                    <div className="error_class">
                                      {this.state.error_password}
                                    </div>
                                  </div>
                                  <button className="btn btn-primary cp-primary-btn" type="button" onClick={() => { this.nextStep() }} > Sign Up <i className="la la-arrow-right"></i></button>
  
                                </div>
                                :
                                <div className="reg_second_three_blocks">
                                    <div className="reg_go_back"><i className='la la-arrow-left'></i></div>
                                    <div className="greet_user"><h1>Hello {this.state.full_name}</h1></div>
                                    <div className="greet_user_sub">Lets setup your Publisher account.</div>
                                  
                                  <div className="field auth__field">
                                    <div className="field__label">Username</div>
                                    <div className="field__wrap">
                                    <div className="field__icon"><img src="/assets/images/username.png" /></div>
                                      <input className="field__input" type="text" placeholder="Enter your username" ref="username" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} name="username" autoComplete="off" />
                                    </div>
                                    <div className="error_class">
                                      {this.state.error_username}
                                    </div>
                                  </div>
  
  
                                  <div className="field auth__field">
                                    <div className="field__label">Mobile Number</div>
                                    <div className="field__wrap">
                                    <div className="field__icon"><img src="/assets/images/mobile.png" /></div>
                                    <input className="field__input" type="number" placeholder="Enter your mobile number" ref="mobile_number" value={this.state.mobile_number} onChange={(e) => { this.setState({ mobile_number: e.target.value }) }} name="mobile_number" autoComplete="off" />
                                    </div>
                                    <div className="error_class">
                                      {this.state.error_mobile_number}
                                    </div>
                                  </div>


                                  <div className="field auth__field">
                                    <div className="field__label">Select Country</div>
                                    <div className="field__wrap">
                                      <div className="field__icon"><img src="/assets/images/followers.png" /></div>
                                      <div className="field__icon custom_dropdown_icon"><i className="la la-angle-down"></i></div>
                                      <select className="field__select" name="country_row_id" onChange={(e) => { this.setState({ country_row_id: e.target.value }) }} useref="country_row_id" >
                                        <option value="">Select Country</option>
                                        {
                                          this.state.countryList ?
                                            this.state.countryList.map((item, i) =>
                                              <option value={item.country_id} key={item.country_id} > {item.country_name} ({item.country_code} )</option>
                                            )
                                            : null
                                        }
                                      </select>
                                    </div>
                                    <div className="error_class">
                                      {this.state.error_mobile_number}
                                    </div>
                                  </div>
                                  <div className="field auth__field">
                                    <div className="field__label">Business or Website Name</div>
                                    <div className="field__wrap">
                                    <div className="field__icon"><i className="la la-institution"></i></div>
                                      <input className="field__input" type="text" placeholder="Enter your business or website name" ref="website_name" value={this.state.website_name} onChange={(e) => { this.setState({ website_name: e.target.value }) }} name="website_name" autoComplete="off" />
                                    </div>
                                    <div className="error_class">
                                      {this.state.error_website_name}
                                    </div>
                                  </div>
  
                                  {this.state.loader ? (
                                    <button className="btn btn-primary empty__btn btn-loader cp-primary-btn" type="button" onClick={() => { this.saveRegisteredUser() }} ><div className="loader"></div></button>
                                  ) : (
                                    <button className="btn btn-primary cp-primary-btn" type="button" onClick={() => { this.saveRegisteredUser() }} > Verify Account <i className="la la-arrow-right"></i></button>
                                  )}
                                </div>

                              }
                               
                                <p className="reg_auth_link">
                                  Have an Account ? <Link href="/login"><a className="auth__link">Login Here</a></Link>
                                </p>
                                
                              </div>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>  
                       
          </div>
          {/* ..........login page code ends here........... */}
        
        {/* <div className="authform-nav">
          <header className="main-header main-header-overlay">
            <div className="custom_auth_container container">
              <nav className="navbar navbar-expand-md bg-white navbar-light">
                <a className="navbar-brand" href="#"><img className="logo-dark" src="/assets/img/coinpedia1.png" alt="Pr Coinpedia" /></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse custom_navbar_collapse" id="collapsibleNavbar">
                  <ul className="navbar-nav">
                    <li className="nav-item custom_nav_items">
                      <a className="nav-link nav_header_links" href="/">Home</a>
                    </li>
                    <li className="nav-item custom_nav_items">
                      <a className="nav-link nav_header_links" href="/advertiser/r">Advertiser Register</a>
                    </li>
                    <li className="nav-item custom_nav_items">
                      <a className="nav-link nav_header_links" href="/publisher/r">Publisher Register</a>
                    </li>
                    <li className="nav-item custom_login_btn">
                      <a className="btn btn-primary" href="/login">Login</a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </header>
        </div> */}
        {/* <div className="auth">
          <div className="auth__main" style={{ backgroundImage: "url('../assets/img/bg-login-mobile.jpg')" }}>
            <div className="auth__wrap">
              <div className="auth__preview"><Image className="auth__pic" src="/assets/img/logo-white.svg" height='30' width="30" alt="Logo" /></div>
              <div className="auth__title title">Create Your Advertiser Account</div>

            </div>
          </div>
          <div className="auth__bg" style={{ backgroundImage: "url('../assets/img/bg-login-sign-up.jpg')" }}></div>
          <div className="auth__container register_form">
            <div className="auth__inner">
              <div className="auth__head">
                <div className="auth__title title title_xl">
                  <p>Create Your Advertiser Account</p>
                </div>
              </div>
              <div className="form form_create">

                <div className="form__row">
                  <div className="form__col">
                    <div className="field form__field">
                      <div className="field__label">Full Name</div>
                      <div className="field__wrap">
                        <input className="field__input" type="text" placeholder="Enter your name" ref="full_name" value={this.state.full_name} onChange={(e) => { this.setState({ full_name: e.target.value }) }} name="full_name" autoComplete="off" />
                        <div className="field__icon"><i className="la la-user-alt "></i></div>
                      </div>
                      <div style={{ color: "red" }}>
                        {this.state.error_full_name}
                      </div>
                    </div>
                  </div>
                  <div className="form__col">
                    <div className="field form__field">
                      <div className="field__label">User Name</div>
                      <div className="field__wrap">
                        <input className="field__input" type="text" placeholder="Enter your username" ref="username" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} name="username" autoComplete="off" />
                        <div className="field__icon"><i className="la la-user-alt"></i></div>
                      </div>
                      <div style={{ color: "red" }}>
                        {this.state.error_username}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form__row">
                  <div className="form__col">
                    <div className="field form__field">
                      <div className="field__label">Email ID</div>
                      <div className="field__wrap">
                        <input className="field__input" type="text" placeholder="Enter your email Id" ref="email_id" value={this.state.email_id} onChange={(e) => { this.setState({ email_id: e.target.value }) }} name="email_id" autoComplete="off" />
                        <div className="field__icon"><i className="la la la-envelope"></i></div>
                      </div>
                      <div style={{ color: "red" }}>
                        {this.state.error_email_id}
                      </div>
                    </div>
                  </div>

                  <div className="form__col">
                    <div className="field form__field">
                      <div className="field__label">Password</div>
                      <div className="field__wrap">
                        <input className="field__input" type="password" placeholder="Enter your password" ref="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} name="password" autoComplete="off" />
                        <div className="field__icon"><i className="la la-lock"></i></div>
                      </div>
                      <div style={{ color: "red" }}>
                        {this.state.error_password}
                      </div>
                    </div>
                  </div>

                </div>


                <div className="form__row">
                  <div className="form__col">
                    <div className="field form__field">
                      <div className="field__label">Select Country</div>
                      <div className="field__wrap">
                        <select className="field__select" name="country_row_id" onChange={(e) => { this.setState({ country_row_id: e.target.value }) }} useref="country_row_id" >
                          <option value="">Select Country</option>
                          {
                            this.state.countryList ?
                              this.state.countryList.map((item, i) =>
                                <option value={item.country_id} key={item.country_id} > {item.country_name} ({item.country_code} )</option>
                              )
                              : null
                          }
                        </select>
                        <div className="field__icon"><i className="la la-angle-down "></i></div>
                      </div>
                      <div style={{ color: "red" }}>
                        {this.state.error_country_row_id}
                      </div>
                    </div>
                  </div>

                  <div className="form__col">
                    <div className="field form__field">
                      <div className="field__label">Mobile Number</div>
                      <div className="field__wrap">
                        <input className="field__input" type="number" placeholder="Enter your mobile number" ref="mobile_number" value={this.state.mobile_number} onChange={(e) => { this.setState({ mobile_number: e.target.value }) }} name="mobile_number" autoComplete="off" />
                        <div className="field__icon"><i className="la la-phone-volume "></i></div>
                      </div>
                      <div style={{ color: "red" }}>
                        {this.state.error_mobile_number}
                      </div>
                    </div>
                  </div>


                </div>



                <div className="form__row">
                  <div className="form__col">
                    <div className="field form__field">
                      <div className="field__label">Business or Website Name</div>
                      <div className="field__wrap">
                        <input className="field__input" type="text" placeholder="Enter your business or website name" ref="website_name" value={this.state.website_name} onChange={(e) => { this.setState({ website_name: e.target.value }) }} name="website_name" autoComplete="off" />
                        <div className="field__icon"><i className="la la-institution"></i></div>
                      </div>
                      <div style={{ color: "red" }}>
                        {this.state.error_website_name}
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="auth__btns">
                    {this.state.loader ? (
                      <button className="btn btn-primary empty__btn btn-loader" type="button" onClick={() => { this.saveRegisteredUser() }} ><div className="loader"></div></button>
                    ) : (
                      <button className="btn btn-primary empty__btn" type="button" onClick={() => { this.saveRegisteredUser() }} > Register <i className="la la-arrow-right"></i></button>
                    )}
                  
                
                <p className="reg_auth_link">
                  Have an Account? <Link href="/login"><a className="auth__link">Login Here</a></Link>
                </p>
              </div>
            </div>
          </div>

        </div> */}
      </div>
    )

  }
}
export default register
