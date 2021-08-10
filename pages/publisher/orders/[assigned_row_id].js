import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head'
import moment from 'moment'
import axios from 'axios'
import cookie from "cookie"
import { useRouter } from 'next/router'
import MenuBar from '../../../components/publisher/dash_menu_bar'
import TopMenuBar from '../../../components/publisher/dash_top_menu_bar'
import OrdersProgress from '../../../components/publisher/orders_progress'
import * as constants from '../../../components/constants'
import PopUpModal from '../../../components/popUpModal'


function singleorder(props) {
  const { userAgent, headers, resultData, assigned_row_id } = props
  // console.log('resultData', resultData)
  // console.log('assigned_row_id', assigned_row_id)
  const router = useRouter()
  const API_BASE_URL = constants.API_BASE_URL
  const publisher_full_name = userAgent.publisher_full_name
  const publisher_token = userAgent.publisher_token

  const [modalMessage, setModalMessage] = useState({ title: "", image_name: "", description: "" })
  const [data, setData] = useState(resultData)
  const [orderStatus, setOrderStatus] = useState(resultData.order_accept_status)
  const [completed_link, setCompletedLink] = useState('')
  const [completed_description, setDescription] = useState('')
  const [errDescription, setErrDescription] = useState('')
  const [errCompletedLink, setErrCompletedLink] = useState('')
  const [submitOrderModal, setSubmitOrderModal] = useState(false)

  const config = {
    headers: {
      "X-API-KEY": "123123",
      token: publisher_token
    }
  }

  const reqObj = {
    assigned_row_id: assigned_row_id
  }

  const getSingleData = () => {
    axios.get(API_BASE_URL + "publisher/orders/details/" + assigned_row_id, config)
      .then(response => {
        if (response.data.status) {
          setData(response.data.message)
        }
      })
  }

  const acceptRequest = () => {
    axios.post(API_BASE_URL + "publisher/orders/accept_order", reqObj, config)
      .then(res => {
        if (res.data.status === true) {
          getSingleData()
          setOrderStatus(9)
          setModalMessage({ title: "Order Request Accepted", image_name: "select.svg", description: res.data.message.alert_message })
        }
      })
  }

  const rejectRequest = () => {
    axios.post(API_BASE_URL + "publisher/orders/reject_order", reqObj, config)
      .then(res => {
        if (res.data.status === true) {
          getSingleData()
          setModalMessage({ title: "Order Request Rejected", image_name: "reject.svg", description: res.data.message.alert_message })
        }
      })
  }

  const submitWorkDetails = () => {
    let formIsValid = true
    if (completed_link === '') {
      setErrCompletedLink('The Completed Link field is required.')
      formIsValid = false
    }
    else if (completed_link.length < 6) {
      setErrCompletedLink('The Completed Link field must be at least 6 characters in length.')
      formIsValid = false
    }
    else {
      setErrCompletedLink('')
    }

    if (completed_description === '') {
      setErrDescription('The Order Description field is required.')
      formIsValid = false
    }
    else if (completed_description.length < 6) {
      setErrDescription('The Order Description field must be at least 6 characters in length.')
      formIsValid = false
    }
    else {
      setErrDescription('')
    }

    if (!formIsValid) {
      return true
    }

    var reqObj = {
      assigned_row_id: assigned_row_id,
      completed_link: completed_link,
      description: completed_description
    }

    axios.post(API_BASE_URL + "publisher/orders/submit_order_details", reqObj, config)
      .then(res => {
        console.log(res);
        if (res.data.status == true) {
          setCompletedLink('')
          setDescription('')
          setErrCompletedLink('')
          setErrDescription('')
          setSubmitOrderModal(false)
          getSingleData()
          setModalMessage({ title: "Order Details Submitted", image_name: "select.svg", description: res.data.message.alert_message })
        }
      })

  }


  // 0:not-selected, 1:emp-select, 2:emp-reject, 3:ad-accept, 4:ad-reject, 5:emp-pitch-accept, 6:emp-pitch-reject, 
  // 7:pub-req-accept, 8:pub-req-reject, 9:pub-order-submit, 10:accept-order, 11:modify-order

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Order Details</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Head>

      {/* page*/}
      <div className="page">
        <MenuBar />

        <div className="container-dash">
          <TopMenuBar full_name={publisher_full_name} />

<div className="container__body single_order">
{/* ..............order details code starts here........................ */}
<div className='panel_title_block'>
  <h2  className='custom_header_main_title'>New Order #{data.order_id}</h2>
  <p className='custom_header_subtitle'>Please check with your availibility, order details and confirm the order</p>
</div>

<div className='platform_update_blocks'>
<div className='row'>
<div className='col-lg-4'>
  <div className='platform_overview brands_need'>
    <h3 className="text-capitalize">{data.order_title}</h3>
    <div className='brand_details'>
      <div className=''>
        <p>Services for {data.platform_type_name}</p>
        <h3 className="text-capitalize">{data.service_name}</h3>
      </div>

      <div className='order_deadline'>
        <p>Order Assigned On</p>
        <p className="order_assigned_date">{moment(data.end_date_n_time).format("DD MMM YYYY")}</p>
      </div>

      <div className=''>
        <p>Price</p>
        <h3>{parseFloat(data.price)}</h3>
      </div>
      

      <div className='referral_block'>
        <p>Requirement</p>
        <p className='referral_link'>{data.requirement_details}</p>
      </div>

      <div className=''>
        <p>Order ends on</p>
        <div className='order_deadline'>
          <div className='row'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-6'>{moment(data.end_date_n_time).format("DD MMM YYYY")}</div>
            <div className='col-lg-6 col-md-6 col-sm-6 col-6'><p>Ends {moment(data.end_date_n_time).endOf('day').fromNow()}</p></div>
          </div>
        </div>
      </div>
    </div>

{
    parseInt(data.order_accept_status) === 4 ?
    <div className="row">
      <div className="col-lg-6">
        <button className="btn order_accept" data-toggle="modal" data-target="#selectModal">Accept</button>
      </div>
      <div className="col-lg-6">
        <button className="btn order_reject" data-toggle="modal" data-target="#rejectModal">Reject</button>
      </div>
    </div>
    :
    parseInt(data.order_accept_status) === 5 ?
    <button type="button" className="btn btn-success btn-block" onClick={() => setSubmitOrderModal(true)}>Submit Your Order</button>
    :
    parseInt(data.order_accept_status) == 6 ?
    <button className="btn btn-danger btn-block">Confirmation Rejected</button>
    :
    parseInt(data.order_accept_status) === 7 ?
    <button className="btn btn-warning btn-block">Order In Review</button>
    :
    parseInt(data.order_accept_status) === 9 ?
    <button className="btn btn-success btn-block">Order Completed</button>
    :
    parseInt(data.order_accept_status) === 8 ?
    <button type="button" className="btn btn-warning btn-block" onClick={() => setSubmitOrderModal(true)}>Re-Submit Your Order</button>
    :
    null
}
    
  </div>
</div>              
         
<div className='col-lg-8'>
<div className='platform_overview'>
    <h5>Order Descriptions</h5>
    <p className='description_first_block'>
      {data.description} 
    </p>

    <h5>Tip from Support Team</h5>
    <p className='employee_tip'>
      {data.employee_tip} 
    </p>
    {/* 4:emp-hired, 5:pub-req-accept, 6:pub-req-reject, 7:pub-order-submit, 8:ad-modify-order, 9:ad-order-received */}

    {
    (parseInt(data.order_accept_status) === 7) || (parseInt(data.order_accept_status) === 8) || (parseInt(data.order_accept_status) === 9) ?
      <>
      <div className="completed_order_details">
        <h5>Completed Details</h5>
        <h6>Completed On</h6>
        <p className='completed_detail_fields'>{moment(data.completed_on).format("DD MMM YYYY h:mma")}</p>
        <h6>Completed Link</h6>
        <p className='completed_detail_fields'><a href={data.completed_link} target="_blank">{data.completed_link}</a></p>

        <h6>Completed Description</h6>
        <p className='completed_detail_fields'>{data.completed_description}</p>
      </div>
      </>
      :
      null
    }
    
    {
      parseInt(data.order_accept_status) === 8 ?
      <>
      <h3>Rejected Reason</h3>
      <p className='description_first_block'>{data.rejected_reason}</p>
      </>
      :
      null
    }

    {
      parseInt(data.order_accept_status) === 10 ?
        <div className="overview__item order_cards">
          <div className="overview__col" >
            <div className="overview__label custom_overview_value">Earned Price</div>
            <div className="overview__value custom_overview_value">
              <img className='check_img' src="/assets/img/check.png" />
              <span className='estimatedUsd'>{parseFloat(data.earned_amount)} USD</span>
              <span className='estimatedUsdPadid'>Transferred to Wallet</span>
            </div>
          </div>
        </div>
        :
        null
    }

{
  parseInt(data.order_accept_status) === 4 ?
    <>
      <div className="modal" id="selectModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-body text-center">
              <h5 className="modal-heading">Accept Request</h5>
              <img src="../../../assets/img/select.svg" alt="Select" className="alert-image-center" />
              <h6 className="modal-description">Do you really want to accept this order request ?</h6>
              <div >
                <button type="button" className="btn btn-secondary btn-m-10" data-dismiss="modal" >Close</button>
                <button type="button" className="btn btn-success btn-m-10" onClick={acceptRequest} data-dismiss="modal" >Accept</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal" id="rejectModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-sm" role="document">
          <div className="modal-content">
            <div className="modal-body text-center">
              <h5 className="modal-heading">Reject Publisher</h5>
              <img src="../../../assets/img/reject.svg" alt="Select" className="alert-image-center" />
              <h6 className="modal-description">Do you really want to reject this order request ?</h6>
              <div>
                <button type="button" className="btn btn-secondary btn-m-10" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-warning btn-m-10" onClick={rejectRequest} data-dismiss="modal" >Reject</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    :
    null
}

{
  (parseInt(data.order_accept_status) === 7) || (parseInt(data.order_accept_status) === 11)
    ?
    <div className={"modal " + (submitOrderModal ? " show" : "")} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div className="title modifyOrdersTitle">Submit Your Completed Order Details</div>
            <div className="settings">
              <div className="settings__container">

                <div className="settings__inner" style={{ marginBottom: '6px' }}>
                  <div className="settings__tab" style={{ display: 'block' }} >
                    <div className="form form_settings">

                      <div className="form__col modal_form_field modifyOrdersFormField">
                        <div className="field form__field">
                          <div className="field__label label_custom">Completed Link</div>
                          <div className="field__wrap">
                            <input className="form-control" name='completed_link' value={completed_link} onChange={(e) => setCompletedLink(e.target.value)} type="text" />
                            <div className="field__icon" />
                            <div className="error">{errCompletedLink}</div>
                          </div>
                        </div>
                      </div>

                      <div className="form__col modal_form_field modifyOrdersFormField">
                        <div className="field form__field">
                          <div className="field__label label_custom">Order Description</div>
                          <div className="field__wrap">
                            <textarea rows="5" className="form-control" name='completed_description' value={completed_description} onChange={(e) => setDescription(e.target.value)} />
                            <div className="field__icon" />
                            <div className="error">{errDescription}</div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="settings__foot">
                  <button type="button" className="btn btn-success btn-m-10" onClick={() => submitWorkDetails()} >Submit Details</button>
                  <button type="button" className="btn btn-secondary btn-m-10" onClick={() => setSubmitOrderModal(false)}>Close</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    :
    null
}






                        {/* ........remaining fields ends here............  */}
                      </div>
                    </div>
                  </div>
                </div>
              {/* ..............order details code ends here........................ */}


            {
              parseInt(data.order_accept_status) === 5 ?
                <>
                  <div className="modal" id="selectModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-sm" role="document">
                      <div className="modal-content">
                        <div className="modal-body text-center">
                          <h5 className="modal-heading">Accept Request</h5>
                          <img src="../../../assets/img/select.svg" alt="Select" className="alert-image-center" />
                          <h6 className="modal-description">Do you really want to accept this order request ?</h6>
                          <div >
                            <button type="button" className="btn btn-secondary btn-m-10" data-dismiss="modal" >Close</button>
                            <button type="button" className="btn btn-success btn-m-10" onClick={acceptRequest} data-dismiss="modal" >Accept</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal" id="rejectModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-sm" role="document">
                      <div className="modal-content">
                        <div className="modal-body text-center">
                          <h5 className="modal-heading">Reject Publisher</h5>
                          <img src="../../../assets/img/reject.svg" alt="Select" className="alert-image-center" />
                          <h6 className="modal-description">Do you really want to reject this order request ?</h6>
                          <div>
                            <button type="button" className="btn btn-secondary btn-m-10" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-warning btn-m-10" onClick={rejectRequest} data-dismiss="modal" >Reject</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                :
                null
            }


            {
              (parseInt(data.order_accept_status) === 5) || (parseInt(data.order_accept_status) === 8)
                ?
                <div className="order_details_modal">
                  <div className={"modal " + (submitOrderModal ? " show" : "")} style={submitOrderModal ? {display:'block' } : {display:'none'}} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="title modifyOrdersTitle">Submit Your Completed Order Details</div>
                          <div className="settings">
                            <div className="settings__container">

                              <div className="settings__inner" style={{ marginBottom: '6px' }}>
                                <div className="settings__tab" style={{ display: 'block' }} >
                                  <div className="form form_settings">


                                  <div className="field auth__field select_platform">
                                    <div className="field__label platform_field_label">Completed Link</div>
                                    <div className="field__wrap platform_field_wrap">
                                      <input className="form-control" name='completed_link' value={completed_link} onChange={(e) => setCompletedLink(e.target.value)} type="text" style={{paddingLeft:'0px'}} />
                                    </div>
                                  </div>  
                                  <div className="error_class">{errCompletedLink}</div>

                                  <div className="field auth__field select_platform">
                                    <div className="field__label platform_field_label">Order Description</div>
                                    <div className="field__wrap platform_field_wrap">
                                        
                                        <textarea rows="5" className="form-control" name='completed_description' value={completed_description} onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                  </div>  
                                  <div className="error_class">{errDescription}</div>
                                    
                                  </div>
                                </div>
                              </div>

                              <div className="settings__foot">
                                <button type="button" className="btn btn-success btn-m-10" onClick={() => submitWorkDetails()} >Submit Details</button>
                                <button type="button" className="btn btn-secondary btn-m-10" onClick={() => setSubmitOrderModal(false)}>Close</button>
                              </div>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                :
                null
            }
          </div>
        </div>
      </div>

      {
        modalMessage.title
          ?
          <PopUpModal message={modalMessage} />
          :
          null
      }
    </>
  )
}



export async function getServerSideProps({ query, req }) {
  const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
  const assigned_row_id = query.assigned_row_id
  if (!userAgent.publisher_token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  else {
    var headers = constants.headers
    headers['token'] = userAgent.publisher_token

    const token_data = {
      headers: {
        "X-API-KEY": "123123",
        "token": userAgent.publisher_token
      }
    }
    const API_BASE_URL = constants.API_BASE_URL
    const query = await fetch(API_BASE_URL + 'publisher/orders/details/' + assigned_row_id, token_data)
    const query_run = await query.json()

    if (query_run.status === false) {
      return {
        redirect: {
          destination: '/publisher/dashboard',
          permanent: false,
        }
      }
    }
    else {
      return { props: { userAgent: userAgent, headers: headers, assigned_row_id: assigned_row_id, resultData: query_run.message } }
    }
  }

}


export default singleorder;