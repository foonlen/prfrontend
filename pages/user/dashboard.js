import React,{useState,useEffect} from 'react' 
import cookie from "cookie" 
import Link from 'next/link'
import Head from 'next/head'
import jsCookie from "js-cookie"
import MenuBar from '../../components/advertiser/dash_menu_bar'
import TopMenuBar from '../../components/advertiser/dash_top_menu_bar'
import * as constants from '../../components/constants'
import Axios from 'axios'
import moment from 'moment'
import Popupmodal from '../../components/popUpModal'
import TableContentLoader  from '../../components/tableLoader'

export default function dashboard({userAgent, data})
{    
  const advertiser_full_name = userAgent.advertiser_full_name
  const advertiser_token = userAgent.advertiser_token
  // if(userAgent.alert_message) 
  // {
    
  //   var alertObj = {title: "Register Success", image_name: "select.svg", description: userAgent.alert_message}
  // }
  // else
  // {
  //   var alertObj = {title: "", image_name: "", description: ""}
  // }
  
  const headers = userAgent.headers
  const API_BASE_URL = constants.API_BASE_URL

  const [showItems]=useState(false)
  const [selectedItem]=useState('')
  
  const [approvedorder] = useState(data.orders_counts.approved)
  const [completedorder] = useState(data.orders_counts.completed)
  const [pendingorder] = useState(data.orders_counts.pending)
  const [total_campaigns] = useState(data.orders_counts.total_campaigns)
  const [in_process] = useState(data.orders_counts.in_process)
  const [ordersList] = useState(data.recent_orders)
  const [main_balance, setMainBalance] = useState(0)
  const [in_order_balance, setInOrderBalancer] = useState(0)
  const [modalData, setModalData] = useState({title: "", image_name: "", description: ""})

  const config = {
    headers: {
      "X-API-KEY": "123123",
      token: advertiser_token,
    }
  }
  
     
useEffect(()=> { 
  // if(userAgent.alert_message)
  // {
  //   jsCookie.remove('alert_message')
  // }
  getWalletBal()
  
},[])

const getWalletBal = () =>
{
  Axios.get(API_BASE_URL+"user/awallet/overview", config)
  .then(res => { 
    console.log(res.data)
    if(res.data.status) 
    { 
      setMainBalance(res.data.message.main_balance)
      setInOrderBalancer(res.data.message.in_order_balance)
    }
  })
}


console.log(ordersList)
    
  return (
        <>
        <Head>
            <meta charset="utf-8" />
            <title>Advertiser Dashboard</title>
        </Head>
        
        <div className="page">
        <MenuBar/>

        <div className="container-dash">
        <TopMenuBar full_name={advertiser_full_name} />

        <div className="container__body">
          <div className="panel_title_block text-center">
            <h2>One tool for all your Orders</h2>
            <p>Use coinpedia publisher tool to manage all your campaigns in the most effective way</p>
          </div>


          <div className="dashboard_top_row">
            <div className="row ">
              <div className="col-lg-4 col-md-12">
                {/* <div className="wallet_details_block dashboard_wallet_block ad_dash">
                  <h4>Total Balance</h4>
                  <h2>${main_balance}</h2>
                  <div className="amount_block">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <button className="btn locked_amount">Locked Amount</button>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <button className="available_amount" >Available Amount</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 wallet_btn">
                    <p><Link href="/advertiser/wallet/funds"><a>Withdraw my Funds<i className="la la-angle-down"></i></a></Link></p>
                  </div>
                </div> */}

                <div className="wallet_details_block dashboard_wallet_block ad_dash">
                  <h2 className="dash_available_balance"><span>$</span> 0</h2>
                  <h4>Total Balance</h4>
                  <span className="dash_coming_soon">( Coming Soon )</span>
                  <div className="amount_block new_amount_block">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <button className="btn locked_amount">Locked Amount</button>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <button className="available_amount" >Available Amount</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 wallet_btn">
                    <p><Link href="#"><a>Withdraw my Funds<i className="la la-angle-down"></i></a></Link></p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8 col-md-12">
                <div className="row">
                  <div className="col-md-12">
                    {/* <div className="new_order">
                      <div className="row">
                        <div className="col-md-8">
                          <h3><img src="/assets/images/dashboard-notification.png" />New order received</h3>
                          <h4>From <span>Coinpedia News Site</span> for <span>PR Publishing</span></h4>
                        </div>
                        <div className="col-md-4">
                          <p className="go_to_orders"><a href="/advertiser/orders/">Go to Order</a></p>
                        </div>
                      </div>
                      <p className="dashboard_notifications"><a href="/notifications">View All Notifications</a></p>
                    </div> */}
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="orders_details">
                      <img src="/assets/images/dashboard-total-orders.png" />
                      <h2>{total_campaigns ? total_campaigns:0}</h2>
                      <p>Total Campaigns</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="orders_details">
                      <img src="/assets/images/dashboard-completed-orders.png" />
                      <h2>{completedorder ? completedorder:0}</h2>
                      <p>Completed Campaigns</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="orders_details">
                      <img src="/assets/images/dashboard-progress-order.png" />
                      <h2>{in_process ? in_process:0}</h2>
                      <p>In Progress Campaigns</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


            <div className="dashboard_table_row dash_hide_table">
              <div className="dash_row_filters">
                <div className="row">
                  <div className="col-lg-9">
                    <ul>
                      <li>
                        <p><img src="/assets/images/frame.png" /> Pending Approved</p>
                      </li>
                      <li>
                        <p><img src="/assets/images/tab_new_order.png" /> Hiring People</p>
                      </li>
                      <li>
                        <p><img src="/assets/images/tab_completed.png" />Work Process</p>
                      </li>
                      <li>
                        <p><img src="/assets/images/tab_completed.png" />Completed</p>
                      </li>
                      <li>
                        <p><img src="/assets/images/reject.png" />Rejected</p>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-3 ad_search">
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Search" />
                      <div className="input-group-append">
                        <span className="input-group-text"><img src="/assets/images/search.png" /></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="custom_panel my_orders_dashboard">
                <div className="panel-table">
                        
                          {
                            
                            ordersList.length > 0
                            ?
                            <div className="table-responsive">
                              <table className="table custom-table">
                                <thead>
                                  <tr>
                                    <th>Order Id</th>
                                    <th>Order Title</th>
                                    <th>Price Range</th>
                                    <th>Created On</th>
                                    <th>Orders Ends On</th>
                                    <th>Platform</th>
                                    <th>No Of Publishers</th>
                                    <th>Status</th>
                                    <th>View</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {
                                  ordersList.length > 0
                                  ?
                                  ordersList.map((item, i) =>{
                                    return <tr key={i}>
                                      <td>{item.id}</td>
                                      <td>{item.title.length > 20 ? (item.title).slice(0, 15)+"..." : item.title}</td>
                                      <td></td>
                                      <td>{moment(item.date_n_time).format("DD MMM YYYY")}</td>
                                      <td>{moment(item.end_date_n_time).format("DD MMM YYYY")}</td>
                                      <td></td>
                                      <td></td>

                                      <td>
                                      {
                                          parseInt(item.order_status)  === 0 
                                          ?
                                          <div className="order_status_dashboard">
                                            <div className="dot completed_order_dot"></div>
                                            <span className="completed_order_status">Approved</span>
                                          </div>
                                          : parseInt(item.order_status) === 1 
                                          ? 
                                          <div className="order_status_dashboard">
                                            <div className="dot hire_order_dot"></div>
                                            <span className="hire_order_status">Hire People</span>
                                          </div>

                                          
                                          : 
                                          parseInt(item.order_status) === 2 
                                          ? 
                                          <div className="order_status_dashboard">
                                            <div className="dot reject_order_dot"></div>
                                            <span className="work_process_order_status">Rejected</span>
                                          </div>
                                          :
                                          parseInt(item.order_status) === 3 
                                          ? 
                                          <div className="order_status_dashboard">
                                            <div className="dot work_process_order_dot"></div>
                                            <span className="work_process_order_status">Work Process</span>
                                          </div>
                                          :
                                          parseInt(item.order_status) === 4 
                                          ? 
                                          <div className="order_status_dashboard">
                                            <div className="dot completed_order_dot"></div>
                                            <span className="completed_order_status">Completed</span>
                                          </div>
                                          :
                                          parseInt(item.order_status) === 5 
                                          ? 
                                          <div className="order_status_dashboard">
                                            <div className="dot pending_order_dot"></div>
                                            <span className="pending_order_status">Approval Pending</span>
                                          </div>
                                          :
                                          null
                                        }
                                      </td>

                                      <td>
                                      {
                                          parseInt(item.order_status)  === 0 ? 
                                          <Link href={'/advertiser/orders/discussion/'+item.id}><a title='view'>
                                            <i className="la la-eye" ></i>
                                            </a>
                                          </Link>
                                          
                                          : parseInt(item.order_status) === 1 ? 
                                          <Link href={'/advertiser/orders/hire-people/'+item.id}><a title='view'>
                                            <i className="la la-eye" ></i>
                                            </a>
                                          </Link>
                                          : 
                                          parseInt(item.order_status) === 2 ? 
                                          <Link href={'/advertiser/orders/discussion/'+item.id}><a title='view'>
                                            <i className="la la-eye" ></i>
                                            </a>
                                          </Link>
                                          : 
                                          parseInt(item.order_status) === 3 ? 
                                          <Link href={'/advertiser/orders/work-process/'+item.id}><a title='view'>
                                            <i className="la la-eye" ></i>
                                            </a>
                                          </Link>
                                          : 
                                          parseInt(item.order_status) === 4 ? 
                                          <Link href={'/advertiser/orders/completed/'+item.id}><a title='view'>
                                            <i className="la la-eye" ></i>
                                            </a>
                                          </Link>
                                          :
                                          null
                                        }
                                      </td>



                                      {/* <td>{item.title.length > 20 ? (item.title).slice(0, 15)+"..." : item.title}</td>
                                      <td>${parseFloat(item.min_price)} to ${parseFloat(item.max_price)}</td>
                                      <td>{moment(item.end_date_n_time).format("DD, MMM YYYY")}</td>
                                      <td>
                                      {
                                          parseInt(item.order_status)  === 0 
                                          ?
                                          <div className="order_status_dashboard">
                                            <span style={{color:'#39daad'}}>Approved</span>
                                          </div>
                                          : parseInt(item.order_status) === 1 
                                          ? 
                                          <div className="order_status_dashboard">
                                            <span style={{color:'#f4be5e'}}>Hiring People</span>
                                          </div>
                                          : 
                                          parseInt(item.order_status) === 2 
                                          ? 
                                          <div className="order_status_dashboard">
                                            <span style={{color:'#ff808b'}}>Rejected</span>
                                          </div> 
                                          :
                                          parseInt(item.order_status) === 3 
                                          ? 
                                          <div className="order_status_dashboard">
                                            <span style={{color:'#f4be5e'}}>Work Process</span>
                                          </div>
                                          :
                                          parseInt(item.order_status) === 4 
                                          ? 
                                          <div className="order_status_dashboard">
                                            <span style={{color:'#39daad'}}>Completed</span>
                                          </div>
                                          :
                                          null
                                        }
                                      </td>
                                      <td>
                                      {
                                          parseInt(item.order_status)  === 0 ? 
                                          <Link href={'/advertiser/orders/discussion/'+item.id}><a>
                                            <button className='table-primary-btn' title='View'>View</button>
                                            </a>
                                          </Link>
                                          : parseInt(item.order_status) === 1 ? 
                                          <Link href={'/advertiser/orders/hire-people/'+item.id}><a>
                                            <button className='table-primary-btn' title='View'>View</button>
                                            </a>
                                          </Link>
                                          : 
                                          parseInt(item.order_status) === 2 ? 
                                          <Link href={'/advertiser/orders/discussion/'+item.id}><a>
                                            <button className='table-primary-btn' title='View'>View</button>
                                            </a>
                                          </Link>
                                          : 
                                          parseInt(item.order_status) === 3 ? 
                                          <Link href={'/advertiser/orders/work-process/'+item.id}><a>
                                            <button className='table-primary-btn' title='View'>View</button>
                                            </a>
                                          </Link>
                                          : 
                                          parseInt(item.order_status) === 4 ? 
                                          <Link href={'/advertiser/orders/completed/'+item.id}><a>
                                            <button className='table-primary-btn' title='View'>View</button>
                                            </a>
                                          </Link>
                                          :
                                          null
                                        }
                                      </td> */}
                                    </tr>
                                  })
                                  :
                                  <div className="data__row dashboard_data_row">
                                    <div className="data__cell ">
                                      <div className="data__content "><strong>Sorry, No related data found.</strong></div>
                                    </div>
                                  </div>
                                }
                                </tbody>
                              </table>
                            </div>
                            :
                            <TableContentLoader row="5" col="7" />
                            
                            
                          }
                      </div>
              </div>

              
            </div>




        {/* ...... */}
        
        
        
        
        
        {/* <div className="layout dashboard_banner">
        <div className="layout__row ">
          
           
          <div className="layout__panel panel new_wallet_block">
            <div className="panel__body panel__body_bg">
              <div className='dashboard_wallet_block'>
                <div className='dashboard_main_wallet_one'>
                    <p className='dashboard_main_wallet_title'>Available Balance</p>
                    <p className='wallet_amount container__title title_md' style={{color:'#8181a5'}}>$<span style={{fontSize:'26px',fontWeight: '600', color:'black',marginLeft: '10px'}}>{main_balance}</span></p>
                    <Link href="/advertiser/wallet"><a className='dashboard_href_link'>Go to Wallet Transaction</a></Link>
                    </div>
                    <div className='dashboard_main_wallet_two'>
                    <p className='container__title title_md' style={{color:'#8181a5'}}>$ {in_order_balance}</p>
                    <Link href="/advertiser/orders"><a className='dashboard_href_link'>In Order Balance</a></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div> */}
        
        </div>
        </div>
        </div>
        {
          modalData.title
            ?
            <Popupmodal message={modalData} />
            :
            null
        }
      </>
    )
  
}


export async function getServerSideProps({req})
{ 
  const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
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
    if(parseInt(userAgent.login_user_email_status) === 1)
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
        
        const query = await fetch(API_BASE_URL+"user/dashboard/overview", token_data)
        const query_run = await query.json()
        if(query_run.tokenStatus === false)
        {
            return {
                redirect: {
                  destination: '/user/logout',
                  permanent: false,
                }
            }
        }
        else
        {
            return {props: {userAgent:userAgent, headers:token_data, data:query_run.message}}
        }
    }
    else
    {
      return {
        redirect: {
          destination: '/verify-email',
          permanent: false,
        }
    }
    }
    
  }
}


