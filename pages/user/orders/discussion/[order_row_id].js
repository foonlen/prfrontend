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
    var { main_balance, orderData, order_row_id, servIndividualDetails }  = this.state
    
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
            <div className="panel_title_block text-center orders_waiting">
              <h2>Campaign Details <span> ( BrandsNeed Launch ) </span></h2>
              <p>Track your campaign here with the help of our dedicated Agent.</p>
            </div>


            {/* new advertiser panel image code starts here */}
              <div className="orders_waiting_approval">
                <div className="orders_progress">
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
                </div>


                
                <div className="row">
                  <div className="col-lg-8">
                    <div className="orders_waiting_left_block">
                      <div className="orders_title">
                        <div className='row'>
                          <div className='col-lg-8'><h4>BrandsNeed Launch</h4></div>
                          <div className='col-lg-4'><div className="show_more"><p>Show More</p><img src="/assets/images/down_arrow.png" /></div></div>
                        </div>
                      </div>
                      
                      <div className="order_details">
                        <h5>About Campaign</h5>
                        <p>{orderData.description}</p>
                        <h5>Service Required</h5>
                          <div className="panel-table">
                          <div classname="table-responsive">          
                            <table classname="table">
                              <thead>
                                <tr>
                                  <th>Platform</th>
                                  <th>Services</th>
                                  <th>No of Publishers</th>
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
                                        <td><button onClick={() => {this.servAddMore(item)}}><i class="la la-eye"></i></button></td>
                                      </tr>
                                  )
                                  :
                                  null
                                }
                              </tbody>
                            </table>
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <div className='orders_details_block'>
                      <div className='first'>
                        <div className='row'>
                          <div className='col-lg-5'><p>Order ID</p></div>
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
                          <div className='col-lg-5'><p className="order_values">{parseFloat(orderData.min_price)} - {parseFloat(orderData.max_price)} USD</p></div>
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
                      {
                        orderData.order_status == 0 ?
                        <div className="waiting_approval_btn">
                          <button className="btn btn-block">Waiting for Approval</button>
                        </div>
                        :
                        null
                      }

                      {
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
                      }
                      
                      {
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
                      }

                      
                      

                    </div>

                    <div className='orders_conversation_block'>
                      <h6>Start Discussion To Admin</h6>
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
                </div>
              </div>
              
              
              
            {/* new advertiser panel image code ends here */}
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>


            {/* code from publisher panel starts here */}
              <div className='row'>
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
                    </div>
                {/* code from publisher panel ends here */}
            
       
     
<div className={"modal "+(this.state.servModalStatus ? "show":"")} tabIndex="-1" role="dialog" style={this.state.servModalStatus ? {display:"block"} : {display:"none"}}>
    <div className="modal-dialog modal-lg">
        <div className="modal-content" style={{padding:'24px', borderRadius:'13px'}}>
            <div className="modal-header">
            Service Details
                <button type="button" className="close"  onClick={()=>{this.setState({servModalStatus:false})}} >&times;</button>
            </div>
            <div className="modal-body">
              {
                servIndividualDetails ?
                <div>
                  <h6>Platform Name</h6>
                  <p>{servIndividualDetails.platform_name}</p>

                  <h6>Service Name</h6>
                  <p>{servIndividualDetails.service_name}</p>

                  <h6>No of Publishers</h6>
                  <p>{servIndividualDetails.num_of_peoples}</p>

                  <h6>Requirement Details</h6>
                  <p>{servIndividualDetails.requirement_details}</p>
                </div>
                :
                null
              }
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