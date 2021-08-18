import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import cookie from "cookie"
import Axios from 'axios'
import * as constants from '../../../../components/constants'
import MenuBar from '../../../../components/advertiser/dash_menu_bar'
import ProgressBar from '../../../../components/advertiser/orders_progress'
import SuppportTeam from '../../../../components/advertiser/orders_support_team'
import TopMenuBar from '../../../../components/advertiser/dash_top_menu_bar'
 
class orderDetails extends React.Component 
{
    constructor(props)
    {
        super(props)
        const { userAgent, headers, data, order_row_id } = this.props
        console.log(this.props)

        this.state = {
            API_BASE_URL:constants.API_BASE_URL,
            advertiser_full_name:userAgent.advertiser_full_name,
            orderData:data,
            order_row_id:order_row_id,
            servModalStatus:false,
            servIndividualDetails:{},
            main_balance:0,
            headers:headers,
            alert_message:null,
            ordersList: [],
        }
    }
  
    servAddMore(service)
    {
      this.setState({servIndividualDetails:service, servModalStatus:true}) 
    }

    

    componentDidMount()
    {
      this.getWalletBal()
    }

    getWalletBal()
    {
      console.log(this.state.headers)
      Axios.get(this.state.API_BASE_URL+"user/awallet/overview", this.state.headers)
      .then(res => { 
        console.log(res.data)
        if(res.data.status) 
        { 
          this.setState({main_balance:res.data.message.main_balance})
        }
      })
    }

render()
{
    var { main_balance, orderData, order_row_id, servIndividualDetails }  = this.state;
return (
  <div>
    <Head>
        <meta charset="utf-8" />
        <title>Order Waiting</title>
    </Head>
    <div className="page">
        <MenuBar />
        <div className="container-dash">
        <TopMenuBar full_name={this.state.advertiser_full_name} />
          <div className="container__body">
              <div className="row">
                <div className="col-lg-10 col-md-10 col-sm-10 col-8">
                  <div className="panel_title_block text-center">
                    <h2>Order Details</h2>
                    <p>Track your campaign here with the help of our dedicated Agent.</p>
                  </div>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-2 col-4 go_back_block">
                  <p className="panel_title_go_back"><Link href="/user/orders"><a ><i className="la la-arrow-left"></i>Back</a></Link></p>
                </div>
              </div>
            {/* new advertiser panel image code starts here */}
              <div className="orders_waiting_approval">
                {/* <div className="orders_progress">
                  <div className="overview__progress progress custom_progress">
                    <div className="progress__value bg-green-raw" style={{ width: '25%' }} />
                  </div>

                  <ul className="order_progress_status">
                      <li className="completed">
                          <img src="/assets/images/ok_green.png"/>
                          <p>Campaign Submitted</p>
                      </li>
                      <li className="pending"> 
                          <span className="pending_block"></span>
                          <p>Discussion & Approval</p>
                      </li>
                      <li className="pending">
                          <span className="pending_block"></span>
                          <p>Hire People </p>
                      </li>
                      <li className="pending">
                          <span className="pending_block"></span>
                          <p>Work Process</p>
                      </li>
                      <li className="pending">
                          <span className="pending_block"></span>
                          <p>Completed</p>
                      </li>
                  </ul> 
                </div> */}


                
                <div className="row">
                  <div className="col-lg-8">
                    <div className="panel orders_waiting_left_block">
                      <div className="orders_title">
                        <div className='row'>
                          <div className='col-lg-8 col-md-8 col-sm-8 col-7'><h4>{orderData.title}</h4></div>
                          {/* <div className='col-lg-4 col-md-4 col-sm-4 col-5'><div className="show_more"><p>Show More</p><img src="/assets/images/down_arrow.png" /></div></div> */}
                        </div>
                      </div>
                      
                      <div className="order_details">
                        <h5 className="order_details_about_campaign">Order description</h5>
                        <p>{orderData.description}</p>
                        <h5 className="order_details_services_required">Service required</h5>
                        <div className="panel-table">
                          {
                            <div className="table-responsive">
                              <table className="table">
                                <thead>
                                  <tr>
                                    <th className="table_platform_name">Platform</th>
                                    <th className="table_service">Services</th>
                                    <th>Publishers</th>
                                    <th>Requirements</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {   
                                  orderData.service_data ?
                                  orderData.service_data.map((item, index) => 
                                      <tr key={index}>
                                        <td>{item.platform_name}</td>
                                        <td>{item.service_name}</td>
                                        <td>{item.num_of_peoples}</td>
                                        <td><button onClick={() => {this.servAddMore(item)}}><img className="ad_orders_view" src="/assets/images/eye.png" /></button></td>
                                      </tr>
                                  )
                                  :
                                  null
                                  }
                                </tbody>
                              </table>
                            </div>
                            
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className='panel orders_details_block'>
                      <div className='first'>
                        <div className='row'>
                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p>Order id</p></div>
                          <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'>
                            <p className="order_values">
                              {orderData.order_id}
                            </p>
                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p>Order title</p></div>
                          <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">{orderData.title}</p></div>
                        </div>
                        
                        <div className='row'>
                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p>Order budget</p></div>
                          <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">{parseFloat(orderData.min_price)} - {parseFloat(orderData.max_price)} USD</p></div>
                        </div>
                            
                        <div className='row'>
                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p>Website</p></div>
                          <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">{orderData.website_link}</p></div>
                        </div>

                        <div className='row'>
                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p>Order created on</p></div>
                          <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">{orderData.date_n_time}</p></div>
                        </div>
                        <div className='row'>
                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p>Order ends on</p></div>
                          <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">{orderData.end_date_n_time}</p></div>
                        </div>
                            
                        {
                          orderData.order_status == 2 ?
                          <div className='row'>
                            <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p>Rejected reason</p></div>
                            <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                            <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">{orderData.reason}</p></div>
                          </div>
                          :
                          null
                          
                        }
                            
                      </div>
                      {
                        orderData.order_status == 0 ?
                        <div className="waiting_approval_btn">
                          <button className="btn btn-block">Waiting for approval</button>
                        </div>
                        :
                        null
                      }

                      {/* {
                       orderData.min_price > main_balance ?
                        <div className="estimated_price text-center">
                          <p className="estimated_title">Order Estimate Price</p>
                          <h3>$ {parseFloat(orderData.min_price)} </h3>
                          <p className="estimated_link">
                            <Link href="#"><a>Pay Now</a></Link>
                            </p>
                        </div>
                        :
                        null
                      } */}
                      
                      {/* {
                         main_balance >=  orderData.min_price?
                       <div className="estimated_price paid text-center">
                          <p className="estimated_title" style={{color:'#fff'}}>Main Wallet Balance</p>
                          <h3>${parseFloat(main_balance)}</h3>
                          <p className="estimated_link" style={{color:'#fff'}}>
                            <Link href="#"><a style={{color:'#fff'}}>Last Deposited @ 22 May 2022 11:30 PM</a></Link>
                          </p>
                        </div>
                        :
                        null
                      } */}
                    </div>

                    <div className='orders_conversation_block'>
                      <h6>Start discussion to admin</h6>
                      <div className='conversation_block'>
                        <div className="media conversation_media">
                          <div className="media-left">
                              <img src="/assets/img/user-2.jpg" alt="User"  className="mr-2 rounded-circle" width='38' height='38' />
                          </div>
                          <div className="media-body">
                          <h6 className="media-heading">Olive Dixon <span className='conversation_time'>12:04 Am</span></h6>
                          <p>Lorem ipsum dolor sit amet</p>
                          </div>
                        </div>
                        <div className="media conversation_media">
                          <div className="media-left">
                              <img src="/assets/img/user-2.jpg" alt="User"  className="mr-2 rounded-circle" width='38' height='38' />
                          </div>
                          <div className="media-body">
                          <h6 className="media-heading">Olive Dixon <span className='conversation_time'>12:04 Am</span></h6>
                          <p>Lorem ipsum dolor sit amet</p>
                          </div>
                        </div>
                        <div className="media conversation_media">
                          <div className="media-left">
                              <img src="/assets/img/user-2.jpg" alt="User"  className="mr-2 rounded-circle" width='38' height='38' />
                          </div>
                          <div className="media-body">
                          <h6 className="media-heading">Olive Dixon <span className='conversation_time'>12:04 Am</span></h6>
                          <p>Lorem ipsum dolor sit amet</p>
                          </div>
                        </div>
                        <div className="media conversation_media">
                          <div className="media-left">
                              <img src="/assets/img/user-2.jpg" alt="User"  className="mr-2 rounded-circle" width='38' height='38' />
                          </div>
                          <div className="media-body">
                          <h6 className="media-heading">Olive Dixon <span className='conversation_time'>12:04 Am</span></h6>
                          <p>Lorem ipsum dolor sit amet</p>
                          </div>
                        </div>
                      </div>
                      <div className="conversation_send">
                        <div className="input-group">
                          <input type="text" className="form-control" placeholder="Type your message here" />
                          <div className="input-group-append">
                              <img src="/assets/images/send.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              

              {/* ......hire people page table code starts here................... */}
                  {/* <h2 className="mt-2 mb-2">hire people page design</h2>
                  <div className="hire_people_second_row">
                    <div className="row">
                      <div className="col-lg-8">
                        <div className="panel hire_people_left_block">
                          <div className="hire_people_count">
                            <div className="panel-table progress_table">
                              <div className="table-responsive">
                                <table className="table">
                                <thead>
                                  <tr>
                                      <th>Employee Selected</th>
                                      <th>Accepted By You</th>
                                      <th>Employee Pitched</th>
                                      <th>Publisher Accepted</th>
                                      <th>Publisher Submitted</th>
                                      <th>Modify Platforms</th>
                                      <th>Platforms Completed</th>
                                  </tr>
                                </thead>
                                  <tbody>
                                    <tr>
                                      <td><p>05</p></td>
                                      <td><p>05</p></td>
                                      <td><p>05</p></td>
                                      <td><p>05</p></td>
                                      <td><p>05</p></td>
                                      <td><p>05</p></td>
                                      <td><p>07/02</p></td>
                                    </tr>
                                  </tbody>
                                  </table>
                              </div>
                            </div>
                        </div>

                        <div className="left_title">
                            <div className="row">
                                <div className="col-lg-8 col-md-8 col-sm-6 col-12 ">
                                    <h6>Publisher List</h6>
                                    <p>Here you will find the details of orders, it is amazing if got great practice, Thank You.</p>
                                </div>
                                <div className="col-lg-4 col-md-4 col-sm-6">
                                  <div className="orders_filters_search">
                                    <div className="order_search">
                                      <div className="input-group">
                                        <input type="text" className="form-control" name="search" placeholder="Search" />
                                        <div className="input-group-append">
                                          <span className="input-group-text"><button type="submit"><img src="/assets/images/search.png" /></button></span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>

                            <div className="hire_people_table">
                              <div className="panel-table">
                                <div className="table-responsive">
                                  <table className="table">
                                        <thead>
                                          <tr>
                                            <th>Platform</th>
                                            <th className="table_service">Services</th>
                                            <th>Web/Blog Link</th>
                                            <th>Page Views</th>
                                            <th className="table_status">Status</th>
                                            <th className="table_action">Action</th>
                                            <th>Comment</th>
                                            <th>View</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <td>Youtube</td>
                                            <td>Mixed Sponser Ads</td>
                                            <td>Youtube</td>
                                            <td>10000</td>
                                            <td>
                                              
                                              <><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Admin Pitched</span></>
                                            </td>
                                            <td>
                                              <span className="hire_people_btn">Hire</span>
                                              <span className="reject_people_btn">Reject</span>
                                            </td>
                                            <td><img src="/assets/images/chat.png" /></td>
                                            <td><Link href="#"><a><img className="ad_orders_view" src="/assets/images/eye.png" /></a></Link></td>
                                          </tr>
                                          <tr>
                                            <td>Youtube</td>
                                            <td>Mixed Sponser Ads</td>
                                            <td>Youtube</td>
                                            <td>10000</td>
                                            <td>
                                              
                                              <><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Completed</span></>
                                            </td>
                                            <td>
                                              <span className="waiting_people_btn">Waiting for work</span>
                                            </td>
                                            <td><img src="/assets/images/chat.png" /></td>
                                            <td><Link href="#"><a><img className="ad_orders_view" src="/assets/images/eye.png" /></a></Link></td>
                                          </tr>

                                          <tr>
                                            <td>Youtube</td>
                                            <td>Mixed Sponser Ads</td>
                                            <td>Youtube</td>
                                            <td>10000</td>
                                            <td>
                                              <><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Admin Pitched</span></>
                                            </td>
                                            <td>
                                                <span className="hire_people_btn">Hire</span>
                                                <span className="reject_people_btn">Reject</span>
                                            </td>
                                            <td><img src="/assets/images/chat.png" /></td>
                                            <td><Link href="#"><a><img className="ad_orders_view" src="/assets/images/eye.png" /></a></Link></td>
                                          </tr>
                                          <tr>
                                            <td>Youtube</td>
                                            <td>Mixed Sponser Ads</td>
                                            <td>Youtube</td>
                                            <td>10000</td>
                                            <td>
                                              <><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Admin Pitched</span></>
                                            </td>
                                            <td>
                                              <span className="hire_people_btn">Hire</span>
                                              <span className="reject_people_btn">Reject</span>
                                            </td>
                                            <td><img src="/assets/images/chat.png" /></td>
                                            <td><Link href="#"><a><img className="ad_orders_view" src="/assets/images/eye.png" /></a></Link></td>
                                          </tr>
                                          </tbody>
                                      </table>
                                  </div>
                                </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className='panel orders_details_block'>
                            <div className='first'>
                              <div className='row'>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">Campaign Budget</p></div>
                                <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="hire_values">$ 100 - 300 </p></div>
                              </div>
                                
                              <div className='row'>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">Website Link</p></div>
                                <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="hire_values">https://cp.org</p></div>
                              </div>
                              <div className='row'>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">Campaign End On</p></div>
                                <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="hire_values">22 May 2021</p></div>
                              </div>
                            </div>
                            <div className="hire_people_estimated_price text-center">
                              <p className="estimated_title">Coinpedia Estimate Price</p>
                              <h3>$800.00</h3>
                              <p className="estimated_link"><Link href="#"><a>Paid @ 22 May 2022 11:30 PM</a></Link></p>
                            </div>
                          </div>
                        </div>
                    </div>
                </div> */}
              {/* .......................hire people page table ends here .......................... */}


              {/* ................completed page table starts here..................... */}
                {/* <h2 className="mt-2 ">completed page table below</h2>
                    <div className="hire_people_second_row">
                      <div className="row">
                          <div className="col-lg-8">
                              <div className="panel hire_people_left_block">
                                  <div className="hire_people_count">
                                      <div className="panel-table progress_table">
                                          <div className="table-responsive">
                                              <table className="table">
                                              <thead>
                                                  <tr>
                                                      <th>Total Publisher Required</th>
                                                      <th>Admin Pitched</th>
                                                      <th>You Accepted</th>
                                                      <th>Publisher Accepted</th>
                                                      <th>Publisher Submitted</th>
                                                      <th>Platforms Completed</th>
                                                  </tr>
                                              </thead>
                                              <tbody>
                                                  <tr>
                                                      <td><p>05</p></td>
                                                      <td><p>05</p></td>
                                                      <td><p>05</p></td>
                                                      <td><p>05</p></td>
                                                      <td><p>05</p></td>
                                                      <td><p>07/02</p></td>
                                                  </tr>
                                              </tbody>
                                              </table>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="left_title">
                                      <div className="row">
                                          <div className="col-lg-8 col-md-8 col-sm-6 col-12 ">
                                              <h6>Publisher List</h6>
                                              <p>Here you will find the details of orders, it is amazing if got great practice, Thank You.</p>
                                          </div>
                                          <div className="col-lg-4 col-md-4 col-sm-6">
                                            <div className="orders_filters_search">
                                              <div className="order_search">
                                                <div className="input-group">
                                                  <input type="text" className="form-control" name="search" placeholder="Search" />
                                                  <div className="input-group-append">
                                                    <span className="input-group-text"><button type="submit"><img src="/assets/images/search.png" /></button></span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="hire_people_table">
                                      <div className="panel-table">
                                          <div className="table-responsive">
                                              <table className="table">
                                                  <thead>
                                                      <tr>
                                                        <th>Platform</th>
                                                        <th className="table_service">Services</th>
                                                        <th>Web/Blog Link</th>
                                                        <th>Page Views</th>
                                                        <th className="table_status">Status</th>
                                                        <th className="table_action">Action</th>
                                                        <th>Comment</th>
                                                        <th>View</th>
                                                      </tr>
                                                  </thead>
                                                  <tbody>
                                                      <tr>
                                                        <td>Youtube</td>
                                                        <td>Mixed Sponser Ads</td>
                                                        <td>Youtube</td>
                                                        <td>10000</td>
                                                        <td>
                                                          <><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Completed</span></>
                                                        </td>
                                                        <td>
                                                            <span className="completed_people_btn">Completed</span>
                                                        </td>
                                                        <td><img src="/assets/images/chat.png" /></td>
                                                        <td data-toggle="modal" data-target="#rejected_popup"><Link href="#"><a><img className="ad_orders_view" src="/assets/images/eye.png" /></a></Link></td>
                                                      </tr>

                                                      <tr>
                                                          <td>Youtube</td>
                                                          <td>Mixed Sponser Ads</td>
                                                          <td>Youtube</td>
                                                          <td>10000</td>
                                                          <td>
                                                            <><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Completed</span></>
                                                          </td>
                                                          <td>
                                                            <span className="completed_people_btn">Completed</span>
                                                          </td>
                                                          <td><img src="/assets/images/chat.png" /></td>
                                                          <td data-toggle="modal" data-target="#rejected_popup"><Link href="#"><a><img className="ad_orders_view" src="/assets/images/eye.png" /></a></Link></td>
                                                      </tr>

                                                      <tr>
                                                          <td>Youtube</td>
                                                          <td>Mixed Sponser Ads</td>
                                                          <td>Youtube</td>
                                                          <td>10000</td>
                                                          <td>
                                                            <><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Completed</span></>
                                                          </td>
                                                          <td>
                                                              <span className="completed_people_btn">Completed</span>
                                                          </td>
                                                          <td><img src="/assets/images/chat.png" /></td>
                                                          <td data-toggle="modal" data-target="#rejected_popup"><Link href="#"><a><img className="ad_orders_view" src="/assets/images/eye.png" /></a></Link></td>
                                                      </tr>


                                                      <tr>
                                                          <td>Youtube</td>
                                                          <td>Mixed Sponser Ads</td>
                                                          <td>Youtube</td>
                                                          <td>10000</td>
                                                          <td>
                                                            <><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Completed</span></>
                                                          </td>
                                                          <td>
                                                              <span className="completed_people_btn">Completed</span>
                                                          </td>
                                                          <td><img src="/assets/images/chat.png" /></td>
                                                          <td data-toggle="modal" data-target="#rejected_popup"><Link href="#"><a><img className="ad_orders_view" src="/assets/images/eye.png" /></a></Link></td>
                                                      </tr>
                                                  </tbody>
                                              </table>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4">
                              <div className='panel orders_details_block'>
                                  <div className='first'>
                                      <div className='row'>
                                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">Campaign Budget</p></div>
                                          <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="hire_values">$ 100 - 300 </p></div>
                                      </div>
                                      <div className='row'>
                                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">Website Link</p></div>
                                          <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="hire_values">https://cp.org</p></div>
                                      </div>
                                      <div className='row'>
                                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">Campaign End On</p></div>
                                          <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="hire_values">22 May 2021</p></div>
                                      </div>
                                  </div>
                                  <div className="hire_people_estimated_price text-center">
                                      <p className="estimated_title">Coinpedia Estimate Price</p>
                                      <h3>$800.00</h3>
                                      <p className="estimated_link"><Link href="#"><a>Paid @ 22 May 2022 11:30 PM</a></Link></p>
                                  </div>
                              </div>
                            </div>
                      </div>
                  </div> */}

              {/* ................completed page table ends here..................... */}



              {/* ......................work process page table starts here................. */}
                      {/* <h2 className="mt-2 mb-2">work process page table below</h2>
                      <div className="hire_people_second_row">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="panel hire_people_left_block">
                                    <div className="hire_people_count">
                                        <div className="panel-table progress_table">
                                            <div className="table-responsive">
                                                <table className="table">
                                                <thead>
                                                    <tr>
                                                        <th>Total Publisher Required</th>
                                                        <th >Admin Pitched</th>
                                                        <th>You Accepted</th>
                                                        <th>Publisher Accepted</th>
                                                        <th>Publisher Submitted</th>
                                                        <th>Platforms Completed</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td><p>05</p></td>
                                                        <td><p>05</p></td>
                                                        <td><p>05</p></td>
                                                        <td><p>05</p></td>
                                                        <td><p>05</p></td>
                                                        <td><p>07/02</p></td>
                                                    </tr>
                                                </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="left_title">
                                        <div className="row">
                                            <div className="col-lg-8 col-md-8 col-sm-12 col-12 ">
                                                <h6>Publisher List</h6>
                                                <p>Here you will find the details of orders, it is amazing if got great practice, Thank You.</p>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                              <div className="orders_filters_search">
                                                <div className="order_search">
                                                  <div className="input-group">
                                                    <input type="text" className="form-control" name="search" placeholder="Search" />
                                                    <div className="input-group-append">
                                                      <span className="input-group-text"><button type="submit"><img src="/assets/images/search.png" /></button></span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hire_people_table">
                                        <div className="panel-table">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th>Platform</th>
                                                            <th className="table_service">Services</th>
                                                            <th>Web/Blog Link</th>
                                                            <th>Page Views</th>
                                                            <th className="table_status">Status</th>
                                                            <th  className="table_action">Action</th>
                                                            <th>Comment</th>
                                                            <th>View</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Youtube</td>
                                                            <td>Mixed Sponser Ads</td>
                                                            <td>Youtube</td>
                                                            <td>10000</td>
                                                            <td>
                                                              <><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Admin Pitched</span></>
                                                            </td>
                                                            <td>
                                                                <span className="waiting_for_work">Waiting for Work</span>
                                                            </td>
                                                            <td><img src="/assets/images/chat.png" /></td>
                                                            <td data-toggle="modal" data-target="#view"><Link href="#"><a><img className="ad_orders_view" src="/assets/images/eye.png" /></a></Link></td>
                                                        </tr>

                                                        <tr>
                                                            <td>Youtube</td>
                                                            <td>Mixed Sponser Ads</td>
                                                            <td>Youtube</td>
                                                            <td>10000</td>
                                                            <td>
                                                              <><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Admin Pitched</span></>
                                                            </td>
                                                            <td>
                                                                <span className="waiting_for_work">Waiting for work</span>
                                                            </td>
                                                            <td><img src="/assets/images/chat.png" /></td>
                                                            <td data-toggle="modal" data-target="#view"><Link href="#"><a><img className="ad_orders_view" src="/assets/images/eye.png" /></a></Link></td>
                                                        </tr>

                                                        <tr>
                                                            <td>Youtube</td>
                                                            <td>Mixed Sponser Ads</td>
                                                            <td>Youtube</td>
                                                            <td>10000</td>
                                                            <td>
                                                              <><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Admin Pitched</span></>
                                                            </td>
                                                            <td>
                                                                <span className="waiting_for_work">Waiting for Work</span>
                                                            </td>
                                                            <td><img src="/assets/images/chat.png" /></td>
                                                            <td data-toggle="modal" data-target="#view"><Link href="#"><a><img className="ad_orders_view" src="/assets/images/eye.png" /></a></Link></td>
                                                        </tr>


                                                        <tr>
                                                            <td>Youtube</td>
                                                            <td>Mixed Sponser Ads</td>
                                                            <td>Youtube</td>
                                                            <td>10000</td>
                                                            <td>
                                                              <><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Admin Pitched</span></>
                                                            </td>
                                                            <td>
                                                                <span className="completed_people_btn">Approve this Work</span>
                                                                
                                                            </td>
                                                            <td><img src="/assets/images/chat.png" /></td>
                                                            <td data-toggle="modal" data-target="#view"><Link href="#"><a><img className="ad_orders_view" src="/assets/images/eye.png" /></a></Link></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className='panel orders_details_block'>
                                    <div className='first'>
                                        <div className='row'>
                                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">Campaign Budget</p></div>
                                          <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                          <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="hire_values">$ 100 - 300 </p></div>
                                        </div>
                                        
                                        <div className='row'>
                                            <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">Website Link</p></div>
                                            <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                            <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="hire_values">https://cp.org</p></div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">Campaign End On</p></div>
                                            <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                            <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="hire_values">22 May 2021</p></div>
                                        </div>
                                    </div>
                                    <div className="hire_people_estimated_price text-center">
                                        <p className="estimated_title">Coinpedia Estimate Price</p>
                                        <h3>$800.00</h3>
                                        <p className="estimated_link"><Link href="#"><a>Paid @ 22 May 2022 11:30 PM</a></Link></p>
                                    </div>
                                </div>
                              </div>
                            </div>
                    </div> */}
                {/* ......................work process page table ends here................. */}





                {/* ....................rejected popup modal design starts here..................... */}
                  {/* <button type="button" className="btn btn-primary mt-2" data-toggle="modal" data-target="#new_rejected">
                    Rejected Popup
                  </button>

                  <div className="pr_modal ">
                    <div className="rejected_modal">
                      <div className="modal" id="new_rejected">
                        <div className="modal-dialog">
                          <div className="modal-content">
                            <div className="modal-header">
                              <div className="row">
                                <div className="col-lg-9 col-md-10 col-sm-10 col-10">
                                  <h4 className="modal-title">Your Request Rejected :(</h4>
                                </div>
                                <div className="col-lg-3 col-md-2 col-sm-2 col-2"><button type="button" className="close" data-dismiss="modal">&times;</button></div>
                              </div>
                              
                            </div>
                            <div className="modal-body">
                              <img src="/assets/images/rejected_popup.png" />
                              <p className="rejected_popup_text rejected_popup_subtext">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                              <p className="rejected_popup_category mt-4">Category</p>
                              <p className="rejected_popup_text category_text">Spam Message</p>
                              <p className="rejected_popup_category mt-4">Description</p>
                              <p className="rejected_popup_text category_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                {/* .....................rejected popup modal design ends here........................ */}



                {/* ....................Approve modal design starts here..................... */}
                  {/* <button type="button" className="btn btn-primary mt-2" data-toggle="modal" data-target="#approve_work">
                    Approve Work Modal
                  </button>

                  <div className="pr_modal approve_work_modal">
                    <div className="modal" id="approve_work">
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h4 className="modal-title">Publisher Name</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="modal-body">
                            <div className="modal_fields">
                              <div className="modal_label">Work Titles</div>
                              <textarea className="modal_textarea" placeholder="Work Details in Brief" required></textarea>
                            </div>
                            <div className="">
                              <div className="row">
                                <div className="col-lg-6"><button className="btn btn-danger btn-block">Reject</button></div>
                                <div className="col-lg-6"><button className="btn cp-primary-btn btn-block">Approve</button></div>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div> */}

                {/* .....................Approve modal design ends here........................ */}
















            {/* new advertiser panel image code ends here */}
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>


            {/* code from publisher panel starts here */}
              {/* <div className='row'>
                <div className='col-lg-8'>
                    <div className="orders_progress">
                        <ProgressBar order_status={orderData.order_status}  orders_counts={orderData.orders_counts}  order_row_id={order_row_id}/>
                    </div>
                    <div className="panel-table progress_table">
                        <div className="table-responsive">
                            <table className="table ">
                            <thead>
                                <tr>
                                  <th>Platform Type</th>
                                  <th>Service title</th>
                                  <th>No of People</th>
                                </tr>
                            </thead>
                            <tbody>
                                {   
                                  orderData.service_data ?
                                  orderData.service_data.map((item, index) => 
                                      <tr key={index}>
                                        <td>{item.platform_name}</td>
                                        <td>{item.service_name}</td>
                                        <td>{item.num_of_peoples}</td>
                                      </tr>
                                  )
                                  :
                                  null
                                }
                            </tbody>
                            </table>
                        </div>
                    </div>
                    <div className='details_block'>
                        <div className='row'>
                          <div className='col-lg-8'><h4>Token Sale Youtube Video</h4></div>
                          <div className='col-lg-4'><div className="show_more"><p>Show More</p><img src="/assets/images/down_arrow.png" /></div></div>
                        </div>
                        <p className='reference_link_title'>Reference Link</p>
                        <p className='reference_links'><Link href='#'><a >https://www.freepik.com</a></Link></p>
                        <p className='reference_links'><Link href='#'><a >https://www.freepik.com</a></Link></p>
                        <p className='reference_links'><Link href='#'><a >https://www.freepik.com</a></Link></p>
                        
                        <p className='referance_description'>{orderData.description}</p>
                    </div>
                    </div>
                    <div className='col-lg-4'>
                      <div className='orders_details_block'>
                        <div className='first'>
                          {
                              this.state.orderData.order_status == 0 ?
                              <div className='row'>
                                <div className='col-lg-5'><p>Status</p></div>
                                <div className='col-lg-1'>:</div>
                                <div className='col-lg-5'><p className="pending_status">Waiting for Approval</p></div>
                              </div>
                              :
                              null
                          }
                          <div className='row'>
                            <div className='col-lg-5'><p>Order Id</p></div>
                            <div className='col-lg-1'>:</div>
                            <div className='col-lg-5'>
                              <p className="order_values">
                                {orderData.order_id}
                              </p>
                            </div>
                          </div>
                          <div className='row'>
                            <div className='col-lg-5'><p>Order Title</p></div>
                            <div className='col-lg-1'>:</div>
                            <div className='col-lg-5'><p className="order_values">{orderData.title}</p></div>
                          </div>

                          <div className='row'>
                            <div className='col-lg-5'><p>Order Budget</p></div>
                            <div className='col-lg-1'>:</div>
                            <div className='col-lg-5'><p className="order_values">{parseFloat(orderData.max_price)} USD</p></div>
                          </div>
                              
                          <div className='row'>
                            <div className='col-lg-5'><p>Website</p></div>
                            <div className='col-lg-1'>:</div>
                            <div className='col-lg-5'><p className="order_values">{orderData.website_link}</p></div>
                          </div>

                          <div className='row'>
                            <div className='col-lg-5'><p>Order Created On</p></div>
                            <div className='col-lg-1'>:</div>
                            <div className='col-lg-5'><p className="order_values">{orderData.date_n_time}</p></div>
                          </div>
                              
                          {
                            orderData.order_status == 2 ?
                            <div className='row'>
                              <div className='col-lg-5'><p>Rejected Reason</p></div>
                              <div className='col-lg-1'>:</div>
                              <div className='col-lg-5'><p className="order_values">{orderData.reason}</p></div>
                            </div>
                            :
                            null
                            
                          }
                              
                        </div>
                      </div>


                      <div className='orders_conversation_block'>
                        <h6>Project Discussion with Admin</h6>
                        <div className='conversation_block'>
                          <div className="media conversation_media">
                            <div className="media-left">
                                <img src="/assets/img/user-2.jpg" alt="User"  className="mr-2 rounded-circle" width='38' height='38' />
                            </div>
                            <div className="media-body">
                            <h6 className="media-heading">Olive Dixon <span className='conversation_time'>12:04 Am</span></h6>
                            <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </div>
                          <div className="media conversation_media">
                            <div className="media-left">
                                <img src="/assets/img/user-2.jpg" alt="User"  className="mr-2 rounded-circle" width='38' height='38' />
                            </div>
                            <div className="media-body">
                            <h6 className="media-heading">Olive Dixon <span className='conversation_time'>12:04 Am</span></h6>
                            <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </div>
                          <div className="media conversation_media">
                            <div className="media-left">
                                <img src="/assets/img/user-2.jpg" alt="User"  className="mr-2 rounded-circle" width='38' height='38' />
                            </div>
                            <div className="media-body">
                            <h6 className="media-heading">Olive Dixon <span className='conversation_time'>12:04 Am</span></h6>
                            <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </div>
                          <div className="media conversation_media">
                            <div className="media-left">
                                <img src="/assets/img/user-2.jpg" alt="User"  className="mr-2 rounded-circle" width='38' height='38' />
                            </div>
                            <div className="media-body">
                            <h6 className="media-heading">Olive Dixon <span className='conversation_time'>12:04 Am</span></h6>
                            <p>Lorem ipsum dolor sit amet</p>
                            </div>
                          </div>
                        </div>
                        <div className="conversation_send">
                          <div className="input-group">
                            <input type="text" className="form-control" placeholder="Type Your Message Here" />
                            <div className="input-group-append">
                                <img src="/assets/images/send.png" />
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>
                    </div> */}
                {/* code from publisher panel ends here */}
            
       

                <div className="pr_modal">
                  <div className={"modal "+(this.state.servModalStatus ? "show":"")} tabIndex="-1" role="dialog" style={this.state.servModalStatus ? {display:"block"} : {display:"none"}}>
                    <div className="modal-dialog modal-md">
                      <div className="modal-content">
                        <div className="modal-header">
                        <h4 className="modal-title">Service Details</h4>
                          <button type="button" className="close"  onClick={()=>{this.setState({servModalStatus:false})}} >&times;</button>
                        </div>
                        <div className="modal-body">
                          {
                            servIndividualDetails ?
                            <div>
                              <div className='row'>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="modal_order_label">Platform Name</p></div>
                                <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="modal_order_values">{servIndividualDetails.platform_name}</p></div>
                              </div>
                              <div className='row'>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="modal_order_label">Service Name</p></div>
                                <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="modal_order_values">{servIndividualDetails.service_name}</p></div>
                              </div>
                              <div className='row'>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="modal_order_label">No of Publishers</p></div>
                                <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="modal_order_values">{servIndividualDetails.num_of_peoples}</p></div>
                              </div>
                              <div className='row'>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="modal_order_label">Requirement Details</p></div>
                                <div className='col-lg-2 col-md-2 col-sm-2 col-2'>:</div>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="modal_order_values">{servIndividualDetails.requirement_details}</p></div>
                              </div>
                            </div>
                            :
                            null
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            
            
            
            {/* <div className="layout">
              <div className="layout__row orderdetais_page">
                <div className="layout__panel layout__panel_x2">
                  <div className="panel panellayouts">
                    <div className="panel__body panel__body_bg overviewitems">
                        <ProgressBar order_status={orderDetails.order_status}  orders_counts={orderDetails.orders_counts} order_row_id={order_row_id}/>
                    </div>
                  </div>
                    <div className="singleorder_tbl" style={{padding:'24px 0px'}}>
                        <div className="panel">
                            <div className='influencers_block'>
                                <div style={{display:'flex'}} className='influencers_mini_block'>
                                    <div style={{display:'flex'}} className='influencers_left_mini_block'>
                                        <div className='influencers_tab influencer_id'>{orderDetails.order_id}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='corporate_description'>
                                <div className='influencers_title'>{orderDetails.title}</div>
                                <div className='influencers_text'>{orderDetails.description}</div>
                            </div>
                            <div className='corporate_website'>
                                <div className='influencers_title'>Website</div>
                                <div className='influencers_text'>{orderDetails.website_link}</div>
                            </div>
                            
                            {
                                orderDetails.order_status == 2 ?
                                <div className='corporate_website'>
                                    <div className='influencers_title'>Rejected Reason</div>
                                    <div className='influencers_text'>{orderDetails.reason}</div>
                                </div>
                                :
                                null
                            }

                            <div className='corporate_website'>
                              <div className='influencers_title pr_orders_table_header'>Job Details</div>
                                <div className="table-responsive">
                                    <table className="table">
                                      <thead>
                                        <tr className='custom-table'>
                                          <th>Platform Type</th>
                                          <th>Service title</th>
                                          <th>No of People</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                      {   
                                              orderDetails.service_data ?
                                              orderDetails.service_data.map((item, index) => 
                                                  <tr key={index} className='custom-table'>
                                                      <td><strong>{item.platform_name}</strong></td>
                                                      <td><strong>{item.service_name}</strong></td>
                                                      <td>{item.num_of_peoples}</td>
                                                  </tr>
                                              )
                                              :
                                              null
                                      }
                                      </tbody>
                                    </table>
                                  </div>
                                  <div className="tableoverflow">
                                    <div className="grid">
                                        <div className="grid__table">
                                            <div className="grid__head ">
                                                <div className="grid__cell">Platform Type</div>
                                                <div className="grid__cell">Service title</div>
                                                <div className="grid__cell">No of People</div>
                                                
                                            </div>
                                            <div className="grid__body">
                                            {   
                                                orderDetails.service_data ?
                                                orderDetails.service_data.map((item, index) => 
                                                    <div className="grid__row" key={index}>
                                                        <div className="grid__cell my_custom_cell ">
                                                            <div className="grid__text">{item.platform_name}</div>
                                                        </div>
                                                        <div className="grid__cell my_custom_cell">
                                                            <div className="grid__text-right"><strong>{item.service_name}</strong></div>
                                                        </div>
                                                        <div className="grid__cell my_custom_cell">
                                                            <div className="grid__text">{item.num_of_peoples}</div>
                                                        </div>
                                                    
                                                    </div>
                                                )
                                                :
                                                null
                                            }  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>      
                    </div>
                </div>

                <div className="layout__panel panel orders_secondlayout">
                  <div className="panel__body panel__body_bg">
                    <div className="overview__item order_cards">
                        <div className="overview__col">
                          <div className="overview__label custom_overview_value">Estimate Order Budget</div>
                          <div className="overview__value custom_overview_value">
                            
                            <span className='estimatedUsd'>{parseFloat(orderDetails.max_price)} USD</span>
                            <span className='estimatedUsdPadid'>Maintain Your Wallet Balance</span>
                          </div>
                        </div>
                    </div>
                    <SuppportTeam order_status={orderDetails.order_status} date_n_time={orderDetails.date_n_time}/>
                    
                  </div>
                </div>

              </div>
            </div> */}
          </div>
        </div>
      </div> 
    </div>
    
       
    )
}
}

export async function getServerSideProps({query, req})
{ 
  const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
  const order_row_id = query.order_row_id
  if(!userAgent.advertiser_token)
  {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  else
  { 
    
    var headers = constants.headers
    headers['token'] = userAgent.advertiser_token

    const token_data = {
      headers : {
        "X-API-KEY":"123123",
        "token":userAgent.advertiser_token
      }
    }
    const API_BASE_URL = constants.API_BASE_URL
    
    const query = await fetch(API_BASE_URL+"user/orders/individual_detail/"+order_row_id, token_data)
    const query_run = await query.json()
    if(query_run.status === false)
    {
        return {
            redirect: {
              destination: '/login',
              permanent: false,
            }
          }
    }
    else
    {
        return {props: {userAgent:userAgent, headers:token_data, order_row_id:order_row_id, data:query_run.message}}
    }

  }
}
export default orderDetails