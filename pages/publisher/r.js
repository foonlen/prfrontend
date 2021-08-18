import React, { Component } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import Autocomplete from "react-google-autocomplete"
import cookie from "cookie"
import jsCookie from "js-cookie"
import Axios from 'axios';
import * as constants from '../../components/constants'
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
      full_name: "",
      email_id: "",
      mobile_number: "",
      location: "",
      loader: false,
      password: "",
      country_row_id: "1",
      regStep: false,
      firstStepLoader: false,
      error_country_row_id: "",
      error_password: "",
      error_username: "",
      error_full_name: "",
      error_email_id: "",
      error_mobile_number: "",
      error_location: ""
    }
  }
  
  

  errClear1()
  {
    this.setState({error_full_name: "", error_password: "", error_email_id: ""})
  }

  stepStepOneReg()
  {  
    let flag = true
    this.errClear1()

    if(this.state.full_name === '') 
    {
      flag = false
      this.setState({
        error_full_name: "Required."
      });
      
    }
    else if(this.state.full_name.length < 4) 
    {
      flag = false
      this.setState({
        error_full_name: "Use atleast 4 characters."
      })
    }
    
    if(this.state.email_id === '') 
    {
      flag = false
      this.setState({
        error_email_id: "Required."
      })
    }
    else if (!this.state.email_id.includes('@')) 
    {
      flag = false
      this.setState({
        error_email_id: "Invalid email format"
      })
    }
    
    
    if(this.state.password === '')
    {
      flag = false
      this.setState({
        error_password: "Required."
      })
    }
    else if (this.state.password.length < 6) 
    {
      flag = false
      this.setState({
        error_password: "Use atleast 6 characters."
      }); 
    }

    if(!flag) {
      return true
    } 
     
    const config = {
      headers : {
        "X-API-KEY": "123123"
      }
    }
    this.setState({ firstStepLoader: true })
    Axios.get(this.state.API_BASE_URL + "register/check_email_id?email_id="+this.state.email_id, config )
    .then(res=> {
      console.log(res)
      this.setState({firstStepLoader: false})
      if(res.data.status === true) 
      {
        this.setState({regStep: true})
      }
      else 
      {
        
        this.setState({error_email_id: res.data.message.email_id})
      }
    })
  }



  errClear2()
  {
    this.setState({error_username: "", error_mobile_number: "", error_country_row_id: ""})
  }

  stepStepTwoRegSave() 
  {
    this.errClear2()
    let formIsValid = true

    if (this.state.username === '') {
      this.setState({
        error_username: "Required."
      });
      formIsValid = false;
    }
    else if (this.state.username.length < 4) {
      this.setState({
        error_username: "Atleast 4 characters."
      });
      formIsValid = false;
    }
    

    if (this.state.mobile_number === '') {
      this.setState({
        error_mobile_number: "Required."
      });
      formIsValid = false;
    }
    else if (this.state.mobile_number.length < 5) {
      this.setState({
        error_mobile_number: "Invalid Phone number format"
      });
      formIsValid = false;
    }
    

    if(this.state.country_row_id === '') 
    {
      this.setState({
        error_country_row_id: "Required."
      })
      formIsValid = false;
    }
    console.log(this.state);

    if (!formIsValid) 
    {
      return
    }

    this.setState({ loader: true })
    fetch(this.state.API_BASE_URL + "register/publisher", {
      method: 'POST',
      headers: this.state.headers,
      body: JSON.stringify(this.state)
    }).then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({ loader: false })
          if (result.status === true) {
            console.warn(result.message);
            jsCookie.set('publisher_token', result.message.token)
            jsCookie.set('publisher_full_name', result.message.full_name) 
            jsCookie.set('publisher_username', result.message.username)
            jsCookie.set('alert_message', result.message.alert_message)
            jsCookie.set('login_user_type', 1)
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
          <title>Register - Publisher</title>
          <meta charset="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <meta name="theme-color" content="#fff" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="description" content="BrandsNeed Publisher Panel is a work management tool for Crypto , Fintech and Social media by Coinpeda.org . The tool helps publishers and influencers to find business opportunities for sponsored posts and freelancing work and also manage wallet and orders." />{/* Twitter Card data*/}
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@publisher_handle" />
          <meta name="twitter:title" content="Login to  Publisher Panel" />
          <meta name="twitter:description" content="BrandsNeed Publisher Panel is a work management tool for Crypto , Fintech and Social media by Coinpeda.org . The tool helps publishers and influencers to find business opportunities for sponsored posts and freelancing work and also manage wallet and orders." />
          <meta name="twitter:creator" content="@author_handle" />
          <meta name="twitter:image" content="http://www.example.com/image.jpg" />{/* Open Graph data*/}
          <meta property="og:title" content="Login to Publisher Panel" />
          <meta property="og:type" content="article" />
          <meta property="og:url" content="http://www.example.com/" />
          <meta property="og:image" content="http://example.com/image.jpg" />
          <meta property="og:description" content="BrandsNeed Publisher Panel is a work management tool for Crypto , Fintech and Social media by Coinpeda.org . The tool helps publishers and influencers to find business opportunities for sponsored posts and freelancing work and also manage wallet and orders." />
          <meta property="og:site_name" content="Site Name, i.e. Moz" />
          <meta property="fb:admins" content="Facebook numeric ID" />
          <meta name="keywords" content="BrandsNeed Publisher Login, BrandsNeed, BrandsNeed PR Agency, list as influencers, Influencer marketing, " />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/img/apple-touch-icon.png" />
          {/* <link rel="icon" type="image/png" sizes="32x32" href="/assets/img/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/img/favicon-16x16.png" /> */}
          
          <link rel="manifest" href="/assets/img/site.webmanifest" />
          <link rel="mask-icon" href="/assets/img/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
        </Head>
 
          {/* ..........login page code starts here........... */}
          <div className="auth_page ad_reg login_page pub_reg">
            <Authnavbar/>
                <div className="row auth_page_form">
                  <div className="col-md-6 col-lg-6 order-md-1 order-sm-2 order-2 auth_left">
                    <div className="bg_auth_left"></div>
                    <div className="row">
                    <div className="col-md-1 col-lg-2"></div>
                      <div className="col-md-10 col-lg-8">
                        <div className="plan_details">
                          <h4>Your plan includes</h4>
                          <ul>
                            <li><img src="/assets/images/plan-points.png" /> 1 year of free subscription</li>
                            <li><img src="/assets/images/plan-points.png" /> List unlimited platforms</li>
                            <li><img src="/assets/images/plan-points.png" /> Continued business queries</li>
                            <li><img src="/assets/images/plan-points.png" /> Dedicated agent support</li>
                            <li><img src="/assets/images/plan-points.png" /> Fast payment system</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                  </div>  
                  <div className="col-md-6 col-lg-6 order-md-2 order-sm-1 order-1 auth_right reg_auth_right ">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="auth__inner">
                         
                          <div className="row">
                            <div className="col-md-12 col-lg-9"> 
                                <div className={"reg_first_three_blocks " + (this.state.regStep ? " hide_register":null)}>
                                <div className="auth__head">
                                  <div className="auth__title title custom_auth_title">
                                    <h1 className="title_xl">Create your publisher account</h1>
                                    <p>A free tool to find and manage business queries</p>
                                  </div>
                                </div>

                                 <div className="field auth__field">
                                    <div className="field__label">Full name<span className="validation_asteris">*</span></div>
                                    <div className="field__wrap">
                                    <div className="field__icon"><img src="/assets/images/username.png" /></div>
                                      <input className="field__input" type="text" placeholder="Enter your name" ref="full_name" value={this.state.full_name} onChange={(e) => { this.setState({ full_name: e.target.value }) }} name="full_name" autoComplete="off" />
                                    </div>
                                    <div className="error_class">
                                      {this.state.error_full_name}
                                    </div>
                                  </div>
                                  <div className="field auth__field">
                                    <div className="field__label">Email id<span className="validation_asteris">*</span></div>
                                    <div className="field__wrap">
                                    <div className="field__icon"><img src="/assets/images/email.png" width="22px" /></div>
                                      <input className="field__input" type="text" placeholder="Enter your Email Id" ref="email_id" value={this.state.email_id} onChange={(e) => { this.setState({ email_id: e.target.value }) }} name="email_id" autoComplete="off" />
                                    </div>
                                    <div className="error_class">
                                      {this.state.error_email_id}
                                    </div>
                                  </div>
                                  <div className="field auth__field">
                                    <div className="field__label"> Password <span className="validation_asteris">*</span></div>
                                    <div className="field__wrap">
                                    <div className="field__icon"><img src="/assets/images/lock.png" /></div>
                                      <input className="field__input" type="password" placeholder="Set password" ref="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} name="password" autoComplete="off" />
                                    </div>
                                    <div className="error_class">
                                      {this.state.error_password}
                                    </div>
                                  </div>

                                  {
                                    this.state.firstStepLoader ?
                                    <button className="btn btn-primary cp-primary-btn" type="button" > <div className="loader"><span className="spinner-border spinner-border-md"></span></div> </button>
                                    :
                                    <button className="btn btn-primary cp-primary-btn" type="button" onClick={() => { this.stepStepOneReg() }} > Sign Up <i className="la la-arrow-right"></i></button>
                                  }
                                  

                                </div>


                               
                              <div className={"reg_seconds_three_blocks " + (!this.state.regStep ? " hide_register":null)}>
                                  <div className="custom_auth_title reg_go_back"><i className='la la-arrow-left' onClick={()=> this.setState({step: true})}></i></div>
                                  <h1 className="greet_user">Hello {this.state.full_name}</h1>
                                  <p className="greet_user_sub">Lets setup your publisher account.</p>
                              <div className="field auth__field">
                                <div className="field__label">Username <span className="validation_asteris">*</span></div>
                                <div className="field__wrap">
                                <div className="field__icon"><img src="/assets/images/username.png" /></div>
                                  <input className="field__input" type="text" placeholder="Enter your username" ref="username" value={this.state.username} onChange={(e) => { this.setState({ username: e.target.value }) }} name="username" autoComplete="off" />
                                </div>
                                <div className="error_class">
                                  {this.state.error_username}
                                </div>
                              </div>

                            {/* <div className="field auth__field">
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text select_option_span"> 
                                    <select className="my_custom_select" name="country_row_id" onChange={(e)=>{this.setState({country_row_id: e.target.value})}} useref="country_row_id" >
                                      {
                                          this.state.countryList ?
                                            this.state.countryList.map((item, i) =>
                                              <option value={item.country_id} key={item.country_id} selected={this.state.country_row_id == item.country_id}>{item.country_code} &nbsp;&nbsp;&nbsp;&nbsp; ( {item.country_name} )</option>
                                            )
                                            : null
                                        }
                                    </select>
                                  </span>
                                </div>
                                <input className="form-control field__input" type="number" placeholder="Enter your mobile number" ref="mobile_number" value={this.state.mobile_number} onChange={(e) => { this.setState({ mobile_number: e.target.value }) }} name="mobile_number" autoComplete="off" />
                              </div>
                              <div className="error_reg">{this.state.error_mobile_number}</div>
                            </div> */}




                            <div className="field auth__field">
                              <div className="field__label">Phone number <span className="validation_asteris">*</span></div>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text select_option_span"> 
                                    <select className="my_custom_select" name="country_row_id" onChange={(e)=>{this.setState({country_row_id: e.target.value})}} useref="country_row_id" >
                                      {
                                          this.state.countryList ?
                                            this.state.countryList.map((item, i) =>
                                              <option value={item.country_id} key={item.country_id} selected={this.state.country_row_id == item.country_id}>{item.country_code} &nbsp;&nbsp;&nbsp;&nbsp; ( {item.country_name} )</option>
                                            )
                                            : null
                                        }
                                    </select>
                                  </span>
                                </div>
                                <input className="form-control field__input country_input_field" type="number" placeholder="Enter your phone number" ref="mobile_number" value={this.state.mobile_number} onChange={(e) => { this.setState({ mobile_number: e.target.value }) }} name="mobile_number" autoComplete="off" />
                              </div>
                              <div className="error_reg">{this.state.error_mobile_number}</div>
                            </div>



                       

                              <div className="field auth__field">
                                <div className="field__label">Location <span className="validation_asteris">*</span></div>
                                <div className="field__wrap">
                                <div className="field__icon"><img src="/assets/images/city.png" /></div>
                                  <Autocomplete className="field__input" apiKey={'AIzaSyBDkKetQwosod2SZ7ZGCpxuJdxY3kxo5Po'} onPlaceSelected={(place) => console.log(place)} placeholder="Enter your location" ref="location" value={this.state.location} onChange={(e) => { this.setState({ location: e.target.value }) }} name="location" autoComplete="off" />
                                </div>
                              </div>

                              {
                              this.state.loader ? 
                                 <button className="btn btn-primary empty__btn btn-loader cp-primary-btn" type="button" onClick={() => { this.stepStepTwoRegSave() }} ><div className="loader"><span className="spinner-border spinner-border-md"></span></div></button>
                               : 
                                 <button className="btn btn-primary cp-primary-btn" type="button" onClick={() => { this.stepStepTwoRegSave() }} > Verify account <i className="la la-arrow-right"></i></button>
                              }
                            </div>

                              
 

                                <p className="reg_auth_link">
                                <span className="dont_have_an_account">Have an account ?</span> <Link href="/login"><a className="auth__link">Login here</a></Link>
                                </p>
                                
                              </div>
                          </div>
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
                <a className="navbar-brand" href="#"><img className="logo-dark" src="/assets/img/BrandsNeed1.png" alt="Pr BrandsNeed" /></a>
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
          <div className="auth__main pr_auth_main" style={{ backgroundImage: "url('../assets/img/bg-login-mobile.jpg')" }}>
            <div className="auth__wrap">
              <div className="auth__preview"><Image className="auth__pic" src="/assets/img/logo-white.svg" height='30' width="30" alt="Logo" /></div>
              <div className="auth__title title">Create Your Publisher Account</div>

            </div>
          </div>
          <div className="auth__bg" style={{ backgroundImage: "url('../assets/img/bg-login-sign-up.jpg')" }}></div>
          <div className="auth__container register_form">
            <div className="auth__inner">
              <div className="auth__head">
                <div className="auth__title title title_xl">
                  <p>Create Your Publisher Account</p>
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
                        <input className="field__input" type="text" placeholder="Enter your Email Id" ref="email_id" value={this.state.email_id} onChange={(e) => { this.setState({ email_id: e.target.value }) }} name="email_id" autoComplete="off" />
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
                      <div className="field__label">Location</div>
                      <div className="field__wrap">
                        <Autocomplete className="field__input" apiKey={'AIzaSyBDkKetQwosod2SZ7ZGCpxuJdxY3kxo5Po'} onPlaceSelected={(place) => console.log(place)} placeholder="Enter your location" ref="location" value={this.state.location} onChange={(e) => { this.setState({ location: e.target.value }) }} name="location" autoComplete="off" />
                        <div className="field__icon"><i className="la la-institution"></i></div>
                      </div>
                      <div style={{ color: "red" }}>
                        {this.state.error_location}
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