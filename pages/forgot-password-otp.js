import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import OtpInput from 'react-otp-input';
import * as constants from '../components/constants'
import Authnavbar from '../components/authNavbar'

class forgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            API_BASE_URL: constants.API_BASE_URL,
            headers: constants.headers,
            alert_message: "",
            forgot_otp: "",
            error_forgot_otp: "",
            forgot_user_row_id: '',
            forgot_user_type: '',
            loader: false
        }
    }


    handleChange = forgot_otp => this.setState({ forgot_otp });

    forgotOTPFun() {
        let formIsValid = true;

        if (!this.state.forgot_otp) {
            this.setState({
                error_forgot_otp: "The OTP field is required."
            });
            formIsValid = false;
        }
        else if (this.state.forgot_otp.length != 6) {
            this.setState({
                error_forgot_otp: "The OTP field must be at exactly 6 characters in length."
            });
            formIsValid = false;
        }
        else {
            this.setState({
                error_forgot_otp: ""
            });
        }

        if (!formIsValid) {
            return true;
        }

        this.setState({
            loader: true
        })

        var reqObj = {
            otp_number: this.state.forgot_otp,
            forgot_user_row_id: this.state.forgot_user_row_id,
            user_type: this.state.forgot_user_type
        }

        fetch(this.state.API_BASE_URL + "forgot_password/verify_otp", {
            method: 'POST',
            headers: this.state.headers,
            body: JSON.stringify(reqObj)
        }).then(res => res.json())
            .then((result) => {
                this.setState({
                    loader: false
                });
                console.log(result);
                if (result.status === true) 
                {
                    localStorage.setItem('forgot_user_row_id', result.message.forgot_user_row_id)
                    localStorage.setItem('forgot_verify_code', result.message.forgot_verify_code)
                    localStorage.setItem('forgot_alert_message', result.message.alert_message)
                    Router.push('forgot-password-set-password')
                }
                else 
                {

                    if(result.message.alert_message) 
                    {
                        this.setState({
                            error_forgot_otp: result.message.alert_message
                        })
                    }
                }

            })
    }

    setVariables() 
    {
        if (!localStorage.getItem('forgot_user_row_id') || !localStorage.getItem('forgot_user_type')) {
            Router.push('forgot-password')
        }

        this.setState({
            forgot_user_row_id: localStorage.getItem('forgot_user_row_id'),
            forgot_user_type: localStorage.getItem('forgot_user_type'),
            alert_message: localStorage.getItem('forgot_alert_message')
        })
    }

    componentDidMount() {
        this.setVariables()

    }

    render() {
        return (
            <div>
                <Head>
                    <meta charset="utf-8" />
                    <title>Forgot Password - OTP</title>
                    <meta charSet="utf-8" />
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
                                        <li><img src="/assets/images/plan-points.png" /> Get Continued Business Queries</li>
                                        <li><img src="/assets/images/plan-points.png" /> Dedicated Agent at assistance</li>
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
                                        <div className="verify_back">
                                            <Link href="/login"><a><i className="la la-arrow-left"></i></a></Link>
                                        </div>
                                        <div className="auth__head">
                                            <div className="auth__title title ">
                                                <h1 className="title_xl">Enter OTP</h1>
                                                <p>Please check your email for OTP.</p>
                                                    {/* {
                                                        this.state.alert_message ?
                                                        <p>{this.state.alert_message}</p>
                                                        :
                                                        null
                                                    } */}
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="field auth__field otp_auth_field">
                                                    <div className="field__wrap">
                                                        <OtpInput className="otp-form-control" numInputs={6} value={this.state.forgot_otp} onChange={this.handleChange}  name="forgot_otp" />
                                                    </div>
                                                    <div className="error_class">
                                                    {this.state.error_forgot_otp}
                                                    </div>
                                                </div>
                                                <button className="btn btn-primary cp-primary-btn" type="button" onClick={() => { this.forgotOTPFun() }} >
                                                    {this.state.loader ? (
                                                        <span className="spinner-border spinner-border-sm mr-1"></span>
                                                    ) : (
                                                        <>Set new password <i className="la la-arrow-right"></i></>
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
                    <div className="auth__main" style={{ backgroundImage: "url('../assets/img/bg-login-mobile.jpg')" }}>
                        <div className="auth__wrap">
                            <div className="auth__preview"><Image className="auth__pic" src="/assets/img/logo-white.svg" width="30" height='30' alt="Logo" /></div>
                            <div className="auth__title title">Enter OTP</div>
                        </div>
                    </div>
                    <div className="auth__bg" style={{ backgroundImage: "url('../assets/img/bg-login-recover.jpg')" }}></div>
                    <div className="auth__container login_form">
                        <div className="auth__inner">
                            <div className="auth__head custom_auth_head">
                                <div className="auth__title title ">
                                    <div className="title_xl">Enter OTP</div>
                                    <div style={{ textAlign: 'center' }}>
                                        {
                                            this.state.alert_message ?
                                            this.state.alert_message
                                            :
                                            null
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12 forgot_otp_form_col'>
                                <div className="field auth__field auth_form">
                                    <OtpInput className="otp-form-control" numInputs={6} value={this.state.forgot_otp} onChange={this.handleChange} separator={<span>-</span>} name="forgot_otp" />
                                    <div className="error">
                                        {this.state.error_forgot_otp}
                                    </div>
                                </div>
                            </div>
                            <div className="auth__btns" style={{ display: 'block' }}>
                                <button className="btn btn-primary empty__btn custom_recieve_otp" type="button" onClick={() => { this.forgotOTPFun() }} >
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