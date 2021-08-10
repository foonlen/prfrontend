import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import Authnavbar from '../components/authNavbar'
import * as constants from '../components/constants'

class Set_Password extends React.Component {

    constructor() {
        super();
        this.state = {
            API_BASE_URL: constants.API_BASE_URL,
            headers: constants.headers,
            alert_message: "",
            forgot_otp: "",
            error_forgot_otp: "",
            forgot_user_row_id: "",
            forgot_verify_code: "",
            forgot_alert_message: "",
            new_password: "",
            confirm_new_password: "",
            error_new_password: "",
            error_confirm_new_password: "",
            loader: false
        }
    }


    forgotSetPasswordFun() {
        let formIsValid = true;

        if (this.state.new_password == '') {
            this.setState({
                error_new_password: "The New Password field is required."
            });
            formIsValid = false;
        }
        else if (this.state.new_password.length < 6) {
            this.setState({
                error_new_password: "The New password field must be at least 6 characters in length."
            });
            formIsValid = false;
        }
        else {
            this.setState({
                error_new_password: ""
            });
        }



        if (this.state.confirm_new_password === '') {
            this.setState({
                error_confirm_new_password: "The Confirm Password field is required."
            });
            formIsValid = false;
        }
        else if (this.state.confirm_new_password !== this.state.new_password) {
            this.setState({
                error_confirm_new_password: "The Confirm password is not matching with New password."
            });
            formIsValid = false;
        }
        else {
            this.setState({
                error_confirm_new_password: ""
            });
        }

        if (!formIsValid) {
            return true;
        }

        this.setState({
            loader: true
        });
        var reqObj = {
            new_password: this.state.new_password,
            forgot_verify_code: this.state.forgot_verify_code
        }
        fetch(this.state.API_BASE_URL + "forgot_password/set_new_password", {
            method: 'POST',
            headers: this.state.headers,
            body: JSON.stringify(reqObj)
        }).then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        loader: false
                    });
                    console.log(result)
                    if (result.status === true) {
                        localStorage.removeItem('forgot_user_row_id')
                        localStorage.removeItem('forgot_verify_code')
                        localStorage.removeItem('forgot_alert_message')
                        localStorage.setItem('alert_message', result.message.alert_message)
                        Router.push('login')
                    }
                    else {
                        if (result.message.alert_message) {
                            var var_alert_message = result.message.alert_message;
                        }
                        else {
                            var var_alert_message = "";
                        }
                        this.setState({
                            alert_message: var_alert_message
                        });
                    }
                });
    }



    checkLocalStorage() {
        if (!localStorage.getItem('forgot_user_row_id') || !localStorage.getItem('forgot_verify_code')) {
            Router.push('login')
        }

        this.setState({
            forgot_user_row_id: localStorage.getItem('forgot_user_row_id'),
            forgot_verify_code: localStorage.getItem('forgot_verify_code'),
            alert_message: localStorage.getItem('forgot_alert_message')
        })
    }

    componentDidMount() {
        this.checkLocalStorage()
    }

    render() {
        return (
            <div>
                <Head>
                    <meta charset="utf-8" />
                    <meta charSet="utf-8" />
                    <title>Set Password</title>
                    <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
                </Head>


                {/* ..........login page code starts here........... */}
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
                                    <li><img src="/assets/images/plan-points.png" /> Get continued business queries</li>
                                    <li><img src="/assets/images/plan-points.png" /> Dedicated Agent at assistance </li>
                                    <li><img src="/assets/images/plan-points.png" /> Faster Payments</li>
                                    <li><img src="/assets/images/plan-points.png" /> Manage Campaigns hussle free</li>
                                    <li><img src="/assets/images/plan-points.png" /> Publisher Profile Page</li>
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
                                    <h1 className="title_xl">Set New Password</h1>
                                    <p>Your OTP has been verified, Set new password.</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-9">
                                    <div className="field auth__field">
                                        <div className="field__label">New Password</div>
                                        <div className="field__wrap">
                                        <div className="field__icon"><img src="/assets/images/lock.png" /></div>
                                            <input className="field__input" placeholder="" type="password" value={this.state.new_password} onChange={(e) => { this.setState({ new_password: e.target.value }) }} name="new_password" />
                                        </div>
                                        <div className="error_class">
                                            {this.state.error_new_password}
                                        </div>
                                    </div>
                                    <div className="field auth__field">
                                        <div className="field__label">Confirm New Password</div>
                                        <div className="field__wrap">
                                        <div className="field__icon"><img src="/assets/images/lock.png" /></div>
                                        <input className="field__input" placeholder="" type="password" value={this.state.confirm_new_password} onChange={(e) => { this.setState({ confirm_new_password: e.target.value }) }} name="confirm_new_password" />
                                        
                                        </div>
                                        <div className="error_class">
                                            {this.state.error_confirm_new_password}
                                        </div>
                                    </div>
                                    
                                    
                                    <button className="btn btn-primary cp-primary-btn" type="button" onClick={() => { this.forgotSetPasswordFun() }} >
                                        {this.state.loader ? (
                                            <span className="spinner-border spinner-border-sm mr-1"></span>
                                        ) : (
                                            <>Set New Password <i className="la la-arrow-right"></i></>
                                        )}
                                    </button>
                                    
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

                {/* <div className="auth">
                    <div className="auth__main pr_auth_main" style={{ backgroundImage: "url('../assets/img/bg-login-mobile.jpg')" }}>
                        <div className="auth__wrap">
                            <div className="auth__preview"><Image className="auth__pic" src="/assets/img/logo-white.svg" width="30" height='30' alt="Logo" /></div>
                            <div className="auth__title title">Forgot Your Password</div>

                        </div>
                    </div>
                    <div className="auth__bg" style={{ backgroundImage: "url('../assets/img/bg-login-recover.jpg')" }}></div>
                    <div className="auth__container login_form">
                        <div className="auth__inner">
                            <div className="auth__head custom_auth_head">
                                <div className="auth__title title ">
                                    <div className="title_xl otp_title">Forgot Your Password</div>
                                    <div className='otp_sub_title'>
                                      
                                    </div>
                                </div>
                            </div>


                            <div className="field auth__field">
                                <div className="field__label">New Password</div>
                                <div className="field__wrap">
                                    <input className="field__input" placeholder="" type="password" value={this.state.new_password} onChange={(e) => { this.setState({ new_password: e.target.value }) }} name="new_password" />
                                    <div className="field__icon"><i className="la la-lock"></i></div>
                                </div>
                                <div className="error">
                                    {this.state.error_new_password}
                                </div>
                            </div>

                            <div className="field auth__field">
                                <div className="field__label">Confirm New Password</div>
                                <div className="field__wrap">
                                    <input className="field__input" placeholder="" type="password" value={this.state.confirm_new_password} onChange={(e) => { this.setState({ confirm_new_password: e.target.value }) }} name="confirm_new_password" />
                                    <div className="field__icon"><i className="la la-lock"></i></div>
                                </div>
                                <div className="error">
                                    {this.state.error_confirm_new_password}
                                </div>
                            </div>


                            <div className="auth__btns" style={{ display: 'block' }}>
                                <button className="btn btn-primary empty__btn" type="button" onClick={() => { this.forgotSetPasswordFun() }} >
                                    {this.state.loader ? (
                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                    ) : (
                                        <>Set New Password <i className="la la-arrow-right"></i></>
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
export default Set_Password;
