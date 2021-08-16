import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import OtpInput from 'react-otp-input'
import cookie from "cookie"
import JsCookie from "js-cookie"
import Axios from 'axios'
import * as constants from '../components/constants'
import Authnavbar from '../components/authNavbar'
import Popupmodal from '../components/popUpModal'


export default function verifyEmail({userAgent, headers}) 
{
  const router = useRouter()
  const [loader, setLoader]=useState(false)
  const [API_BASE_URL] = useState(constants.API_BASE_URL)
  const [login_user_email_id]= useState(userAgent.login_user_email_id)
  const [login_user_type]= useState(userAgent.login_user_type)
  
  const [modal_data, setModalData] = useState({ title: "", image_name: "", description: ""})
  const [otp_number, setOtpNumber] = useState('')
  const [err_otp_number, setErrOtpNumber] = useState('')
  const [alert_message, setAlert_message]= useState('')
  
  
  
  var handleChange = otp_number => setOtpNumber(otp_number)

  const submitVerifyEmail = () => 
  { 
    setErrOtpNumber("")
      let formIsValid = true
      if(otp_number === '') 
      {
        setErrOtpNumber('*Required.')
        formIsValid = false
      }
      else if(otp_number.length < 6) 
      {
        setErrOtpNumber("Invalid OTP.")
        formIsValid = false
      }

      if(!formIsValid) 
      {
        return true
      }
      
      var reqObj = {
        one_time_password: otp_number
      }

      Axios.post(API_BASE_URL+"register/verify_email_via_otp", reqObj, headers)
      .then(res=> {
          console.log(res.data);
          if(res.data.status)
          {
            JsCookie.set('login_user_email_status', 1)
            JsCookie.set('login_user_email_id', res.data.message.email_id)
            if(parseInt(login_user_type) === 1)
            {
              router.push('/publisher/register-success')
            }
            else if(parseInt(login_user_type) === 2)
            {
              router.push('/user/register-success')
            }
          }
          else
          {
            setErrOtpNumber(res.data.message.alert_message)
          }
      })
  }

  const reSendOTP = () => 
  { 
    Axios.get(API_BASE_URL+"register/verify_email_resend_otp", headers)
      .then(res=> {
          console.log(res.data);
          if(res.data.status)
          {
            setModalData({ title: "OTP Sent", image_name: "select.svg", description: res.data.message.alert_message})
          }
          else
          {
            setErrOtpNumber(res.data.message.alert_message)
          }
      })
  }
  

  return (
    <div>
       <Head>
          <meta charSet="utf-8" />
          <title>Verify Email</title>
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
                              <div className="verify_back">
                                <Link href="/user/r"><a><i className="la la-arrow-left"></i></a></Link>
                              </div>
                              
                              <div className="auth__head">
                                <div className="auth__title title ">
                                  <h1 className="title_xl">Thanks, Verify your Email ID</h1>
                                  <p className="sub_text_verify_email">Enter the OTP sent to the provided email id <span>{login_user_email_id}</span></p>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-9">
                                    <div className="field auth__field otp_auth_field">
                                      <div className="field__wrap">
                                        <OtpInput isInputNum className="otp-form-control" numInputs={6}  name="otp_number" value={otp_number} onChange={handleChange} />
                                      </div>
                                      <div className="error_class">{err_otp_number}</div>
                                    </div>
                                    
                                    {
                                      otp_number.length > 5 
                                      ?

                                      <button className="btn btn-primary cp-primary-btn" type="button" onClick={()=>{submitVerifyEmail()}}>
                                        {loader ? (
                                            <span className="spinner-border spinner-border-sm mr-1"></span>
                                        ) : (
                                            <>Verify Account <i className="la la-arrow-right"></i></>
                                        )}
                                      </button>
                                      :
                                      <button className="btn btn-primary cp-primary-btn" style={{opacity:"0.5"}} type="button" onClick={()=>{submitVerifyEmail()}}>
                                        {loader ? (
                                            <span className="spinner-border spinner-border-sm mr-1"></span>
                                        ) : (
                                            <>Verify Account <i className="la la-arrow-right"></i></>
                                        )}
                                      </button>

                                          
                                    }
                                    
                                    <div>
                                      <button className="resend_otp" onClick={()=>{reSendOTP()}}>Resend OTP</button>
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
    </div>
  )
}

export async function getServerSideProps({ query, req }) 
{
  const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
  
  if(userAgent.login_user_email_status)
  {
    if(parseInt(userAgent.login_user_email_status) === 1)
    {
      if(userAgent.publisher_token) {
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
    }
    else
    {
        var token = ''
        if(userAgent.publisher_token) 
        {
          token = userAgent.publisher_token
        }
        else if(userAgent.advertiser_token) 
        {
          token = userAgent.advertiser_token
        }
        
        const headers = {
          headers : {
            "X-API-KEY":"123123",
            "token":token
          }
        }

        return {props: {userAgent:userAgent, headers:headers}}
    }

    

  }
  else
  { 
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  
  
 
  
} 











