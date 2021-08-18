import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router';
import * as constants from '../components/constants'
import Authnavbar from '../components/authNavbar'


class forgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            API_BASE_URL: constants.API_BASE_URL,
            headers: constants.headers,
            alert_message: null,
            login_id: "",
            error_login_id: "",
            forgot_password_sess_id: "",
            forgot_password_sess_email_id: "",
            forgot_password_date_n_time: "",
            loader: false
        }

    }


    forgotFun() {
        // return false;
        let formIsValid = true;

        if (!this.state.login_id) {
            this.setState({
                error_login_id: "Required."
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

        const user_data = {
            login_id: this.state.login_id
        }

        fetch(this.state.API_BASE_URL + "forgot_password/check_login_id", {
            method: 'POST',
            headers: this.state.headers,
            body: JSON.stringify(user_data)
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        loader: false
                    });

                    if (result.status === true) {
                        console.log(result);
                        localStorage.setItem('forgot_user_row_id', result.message.forgot_user_row_id);
                        localStorage.setItem('forgot_user_type', result.message.user_type);
                        localStorage.setItem('forgot_alert_message', result.message.alert_message);
                        Router.push('forgot-password-otp')
                    }
                    else {

                        if (result.message.alert_message) {
                            var var_alert_message = result.message.alert_message;
                        }
                        else {
                            var var_alert_message = "";
                        }

                        if (result.message.login_id) {
                            var var_error_login_id = result.message.login_id;
                        }
                        else {
                            var var_error_login_id = "";
                        }

                        this.setState({
                            alert_message: var_alert_message,
                            error_login_id: var_error_login_id,
                            login_id: ""
                        });
                    }

                });
    }

    componentDidMount() {
        // if(localStorage.getItem('token'))
        // {
        //     this.props.history.push('/user/dashboard');
        // } 
    }

    render() {
        return (
            <div>
                <Head>
                    <meta charset="utf-8" />
                    <title>Forgot Password</title>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                    <link rel="shortcut icon" href="/assets/images/brands_need_fav.png" />
                </Head>

                {/* ..........login page code starts here........... */}
                <div className="auth_page ad_reg login_page">
            <Authnavbar/>
                <div className="row auth_page_form">
                  <div className="col-md-6 col-lg-6 order-md-1 order-sm-2 order-2   auth_left">
                    <div className="bg_auth_left"></div>
                    <div className="row">
                        <div className="col-md-1 col-lg-2"></div>
                        <div className="col-md-10 col-lg-8">
                            <div className="plan_details">
                                <h4>The source of global PR and influencer marketing business</h4>
                                <ul>
                                <li><img src="/assets/images/plan-points.png" /> Rapidly growing global advertisers.</li>
                                <li><img src="/assets/images/plan-points.png" /> 3000+ verified publishers and influencers.</li>
                                <li><img src="/assets/images/plan-points.png" /> Safe and fast payment system.</li>
                                <li><img src="/assets/images/plan-points.png" /> 100% job efficiency.</li>
                                <li><img src="/assets/images/plan-points.png" /> Dedicated assistance and support.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                  </div>  
                  <div className="col-md-6 col-lg-6 order-md-2 order-sm-1 order-1   auth_right">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="auth__inner">
                            <div className="reg_go_back">
                                <Link href="/login"><a><i className="la la-arrow-left custom_auth_title"></i></a></Link>
                            </div>
                          <div className="auth__head">
                            <div className="auth__title title ">
                              <h1 className="title_xl">Forgot password ?</h1>
                              <p>Verify your email OTP to get new password.</p>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col-md-9">
                              <div className="field auth__field">
                                <div className="field__label">Login id<span className="validation_asteris">*</span></div>
                                <div className="field__wrap">
                                <div className="field__icon"><img src='/assets/images/email.png' width="22px" /></div>
                                  <input className="field__input" type="text" placeholder="Username or Email" value={this.state.login_id} onChange={(e) => { this.setState({ login_id: e.target.value }) }} name="login_id" />
                                </div>
                                <div className="error_class">
                                    {this.state.error_login_id}
                                </div>
                              </div>
                              
                              
                              
                                <button className="btn btn-primary cp-primary-btn" type="button" onClick={() => { this.forgotFun() }} >
                                    {this.state.loader ? (
                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                    ) : (
                                        <>Receive OTP <i className="la la-arrow-right"></i></>
                                    )}
                                    
                                </button>
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
                            <Authnavbar />
                            
                        </div>
                    </header>
                </div> */}
                {/* <div className="auth ">
                    <div className="auth__main login_auth_main" style={{ backgroundImage: "url('../assets/img/bg-login-mobile.jpg')" }}>
                        <div className="auth__wrap">
                            <div className="auth__preview"><Image className="auth__pic" src="/assets/img/logo-white.svg" width="30" height='30' alt="Logo" /></div>
                            <div className="auth__title title title">Forgot Your Password</div>

                        </div>
                    </div>
                    <div className="auth__bg" style={{ backgroundImage: "url('../assets/img/bg-login-recover.jpg')" }}></div>
                    <div className="auth__container login_form">
                        <div className="auth__inner">
                            <div className="auth__head custom_auth_head">
                                <div className="auth__title title title_xl">
                                    <p>Forgot Your Password</p>

                                </div>

                            </div>
                            <div className="field auth__field">
                                <div className="field__label">Login ID</div>
                                <div className="field__wrap">
                                    <input className="field__input" type="text" placeholder="Username or Email" value={this.state.login_id} onChange={(e) => { this.setState({ login_id: e.target.value }) }} name="login_id" />
                                    <div className="field__icon"><i className="la la-envelope "></i></div>
                                </div>
                                <div className="error">
                                    {this.state.error_login_id}
                                </div>
                            </div>
                            <div className="auth__btns" style={{ display: 'block' }}>
                                <button className="btn btn-primary empty__btn" type="button" onClick={() => { this.forgotFun() }} >
                                    {this.state.loader ? (
                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                    ) : (
                                        <>Receive OTP <i className="la la-arrow-right"></i></>
                                    )}
                                </button>
                                <p className="reg_auth_link">
                                    <Link href="/login"><a className="auth__link">Have an Account? Login Here</a></Link>
                                </p>
                            </div>
                        </div>
                    </div>

                </div> */}
            </div>
        )
    }
}
export default forgotPassword