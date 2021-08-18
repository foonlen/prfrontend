import React,{useState,useEffect} from 'react' 
import cookie from "cookie"
import Link from 'next/link';
import Head from 'next/head'
import jsCookie from "js-cookie"
import MenuBar from '../../components/publisher/dash_menu_bar'
import TopMenuBar from '../../components/publisher/dash_top_menu_bar'
import * as constants from '../../components/constants'
import Axios from 'axios'
import moment from 'moment'
import Popupmodal from '../../components/popUpModal';
import TableContentLoader from '../../components/tableLoader'

function dashboard({userAgent, data}) 
{
  const publisher_full_name = userAgent.publisher_full_name
  // console.log(userAgent)
  const token = userAgent.publisher_token  
  // if(userAgent.alert_message)
  // {
  //   var alertObj = {title: "Register Success", image_name: "select.svg", description: userAgent.alert_message}
  // }
  // else
  // {
  //   var alertObj = {title: "", image_name: "", description: ""}
  // }
 
  let counts = data.orders_counts
  const [completedorder] = useState(data.orders_counts.completed)
  const [pendingorder] = useState(data.orders_counts.pending) 
  const [totalorders] = useState(parseFloat(counts.accepted + counts.completed + counts.modify + counts.pending + counts.rejected + counts.submitted)) 
  const [ordersList] = useState(data.recent_orders)
  const [main_balance, setMainBalance] = useState(0)
  const [funds_earned, fundsEarned] = useState(0)
  const [funds_withdrawal, setFundsWithdrawal] = useState(0)
  const [in_withdrawal_process, setInWithdrawProcess] = useState(0)
  const [this_month_earnings, setThisMonthEarnings] = useState(0)
  const [modalData, setModalData] = useState({title: "", image_name: "", description: ""})
  const [pr_plat_status,setPr_plat_status]= useState('')
  const [totalPlatform,setTotalPlatform]= useState('')
  const [pendingPlatform,setPendingPlatform]= useState('')
  const [approvedPlatform,setApprovedPlatform]= useState('')
  const [rejectedPlatform,setRejectedPlatform]= useState('')


  var recent_order = []
  if(data.recent_orders.length > 0)
  {
    var recent_order = data.recent_orders.first()
  }
  const [recent_one_order] = useState(recent_order)

  // console.log(ordersList)

  const [API_BASE_URL] = useState(constants.API_BASE_URL)

  const config = {
    headers: {
      "X-API-KEY": "123123",
      token: token,
    }
  }

  Axios.get(API_BASE_URL+"publisher/dashboard/overview", config)
  .then(response=>
    setPr_plat_status(response.data.message.platform_added_status),
    
  )


  const getWalletBal = () =>
  {
    Axios.get(API_BASE_URL+"publisher/pwallet/overview", config)
    .then(res => { 
      // console.log(res.data)
      if(res.data.status) 
      { 
        setMainBalance(res.data.message.main_balance)
        fundsEarned(res.data.message.funds_earned)
        setFundsWithdrawal(res.data.message.funds_withdrawal)
        setInWithdrawProcess(res.data.message.in_withdrawal_process)
        setThisMonthEarnings(res.data.message.this_month_earnings)
      }
    })
  }

  const getPlatformsCounts = () =>
  {
    Axios.get(API_BASE_URL+"publisher/dashboard/overview", config)
    .then(res => { 
      // console.log(res.data)
      if(res.data.status) 
      { 
        setTotalPlatform(res.data.message.platforms_counts.total_platforms)
        setPendingPlatform(res.data.message.platforms_counts.pending)
        setApprovedPlatform(res.data.message.platforms_counts.approved)
        setRejectedPlatform(res.data.message.platforms_counts.rejected)
      }
    })
  }

  useEffect(()=>{
    // if(userAgent.alert_message)
    // {
    //   jsCookie.remove('alert_message')
    // }
    getWalletBal();
    getPlatformsCounts();
    
    },[])



  return (
    <>
      <Head>
      <meta charSet="utf-8" />
      <title>Publisher Dashboard</title>
      {/* <link rel="stylesheet" media="all" href="/assets/css/app.css" /> */}
      </Head>
    {/* page*/}
    <MenuBar />
    <div className="page">
      {/* sidebar*/}
      
 
      {/* container*/}
      <div className="container-dash">
        <TopMenuBar  full_name={publisher_full_name}  />

        <div className="container__body">
          <div className="panel_title_block text-center">
            <h2>One Tool For All Your Orders</h2>
            <p>Use BrandsNeed publisher tool to manage all your campaigns in the most effective way</p>
          </div>
          <div className="dashboard_banner">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 col-lg-4">
                {/* <div className="wallet_details_block">
                  <img src="/assets/images/wallet.png" className="wallet_img" />
                  <img src="/assets/images/wallet-line.png" className="wallet_line" />
                  <h2><span>$</span> {main_balance}</h2>
                  <h4>Available Balance</h4>
                  <div className="row">
                    <div className="col-md-4 col-4">
                      <h5>${funds_earned}</h5>
                      <h6>Total Earned</h6>
                    </div>
                    <div className="col-md-4 col-4">
                      <h5>$ {in_withdrawal_process}</h5>
                      <h6>On Process</h6>
                    </div>
                    <div className="col-md-4 col-4">
                      <h5>$ {funds_withdrawal}</h5>
                      <h6>Withdrawn</h6>
                    </div>
                  </div>

                  <div className="col-md-12 wallet_btn">
                    <p><Link href="/publisher/wallet"><a>Go To Wallet</a></Link></p>
                  </div>

                </div> */}

                <div className="wallet_details_block">
                  <img src="/assets/images/wallet.png" className="wallet_img" />
                  <img src="/assets/images/wallet-line.png" className="wallet_line" />
                  <h2 className="dash_available_balance"><span>$</span> 0</h2>
                  <h4>Available balance</h4>
                  {/* <p className="dash_coming_soon">{"( Coming Soon )"}</p> */}
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-4 dash_inner_block">
                      <h5>$ 0</h5>
                      <h6>Total earned</h6>
                    </div>
                    <div className="col-lg-4 col-md-4 col-4 dash_inner_block">
                      <h5>$ 0</h5>
                      <h6>On process</h6>
                    </div>
                    <div className="col-lg-4 col-md-4 col-4 dash_inner_block">
                      <h5>$ 0</h5>
                      <h6>Withdrawn</h6>
                    </div>
                  </div>

                  <div className="col-md-12 wallet_btn">
                    <p><Link href="#"><a>Go to wallet</a></Link></p>
                  </div>
                  <p className="wallet_block_note">Note : The wallet feature will be updated in next version.</p>

                </div>
              </div>
              <div className="col-md-12 col-sm-12 col-xs-12 col-lg-8">
                <div className="row">
                  <div className="col-md-12">
                    <div className="new_order dash_new_order">
                    {
                      recent_one_order.length > 0 ?
                      <div className="row">
                        <div className="col-md-8">
                          <h3><img src="/assets/images/dashboard-notification.png" />{recent_one_order.title}</h3>
                          <h4>From <span>{ordersList[0].advertiser_name}</span> for <span>{recent_one_order.service_name}</span></h4>
                        </div>
                        <div className="col-md-4">
                          <p className="go_to_orders"><Link href={`/publisher/orders/` + ordersList[0].assigned_row_id}><a>Go to Order</a></Link></p>
                        </div>
                      </div>
                      :
                      null
                    }
                      <p className="dashboard_notifications"><Link href="/publisher/notifications"><a>View All Notifications</a></Link></p>
                      
                    </div>
                    
                  </div>
                </div>
                
              
              
                <div className="row">
                  <div className="col-md-3">
                    <div className="orders_details">
                      <img src="/assets/images/dashboard-total-orders.png" />
                      <h2>{totalPlatform ? totalPlatform:0}</h2>
                      <p>Total Platforms</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="orders_details">
                      <img src="/assets/images/dashboard-completed-orders.png" />
                      <h2>{pendingPlatform ? pendingPlatform:0}</h2>
                      <p>Pending Platforms</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="orders_details">
                      <img src="/assets/images/dashboard-progress-order.png" />
                      <h2>{approvedPlatform ? approvedPlatform : 0}</h2>
                      <p>Approved Platforms</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="orders_details">
                      <img src="/assets/images/reject.png" />
                      <h2>{rejectedPlatform ? rejectedPlatform : 0}</h2>
                      <p>Rejected Platforms</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

            <div className="dashboard_table_row dash_hide_table">
              <div className="custom_panel my_orders_dashboard">
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-8 col-7">
                    <h3 className="panel__title title">My orders</h3>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-5 go_back" >
                    <Link href="/publisher/orders/" ><a>View all<i className="la la-angle-right"></i></a></Link>
                  </div>
                </div>
                <div className="panel-table">
                 
                  {
                    pr_plat_status === 0
                    ?
                    <div className='sorry_block'>
                      <div className='sorry_block_text'>Sorry no related data found</div>
                    </div>
                    :
                    pr_plat_status === 1
                    ?
                    ordersList.length > 0
                    ?
                    <div className="table-responsive">
                      <table className="table custom-table">
                        <thead>
                          <tr>
                            <th>Order title</th>
                            <th>Platform name</th>
                            <th>Services</th>
                            <th>Last date</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>View</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            ordersList.length > 0
                            ?
                            ordersList.map((e,i)=>{
                              return <tr key={i}>
                                <td>{e.title.length > 20 ? (e.title).slice(0, 15)+"..." : e.title}</td>
                                <td>{e.length > 20 ? (e.project_name).slice(0,15)+ "..." : e.project_name }</td>
                                <td>{e.service_name.length > 20 ? (e.service_name).slice(0, 15)+"..." : e.service_name}</td>
                                <td>{moment(e.end_date_n_time).format("DD MMM YYYY h:mma")}</td>
                                <td>$ {parseFloat(e.price)}</td>
                                <td>
                                  {
                                    parseInt(e.order_accept_status) === 5 
                                    ?
                                    <div className="order_status_dashboard">
                                      <span style={{color:'#39daad'}}>Confirm Request</span>
                                    </div>
                                    :
                                    parseInt(e.order_accept_status) == 7 ?
                                    <div className="order_status_dashboard">
                                      <span style={{color:'#39daad'}}>Request Accepted</span>
                                    </div>
                                    :
                                    parseInt(e.order_accept_status) == 8 ?
                                    <div className="order_status_dashboard">
                                      <span style={{color:'#ff808b'}}>Request Rejected</span>
                                    </div>
                                    : 
                                    parseInt(e.order_accept_status) == 9
                                    ?
                                    <div className="order_status_dashboard">
                                      <span style={{color:'#f4be5e'}}>In Review</span>
                                    </div>
                                    :
                                    parseInt(e.order_accept_status) == 10
                                    ?
                                    <div className="order_status_dashboard">
                                        <span style={{color:'#39daad'}}>Order Accepted</span>
                                    </div>
                                    :
                                    parseInt(e.order_accept_status) == 11
                                    ?
                                    <div className="order_status_dashboard">
                                      <span style={{color:'#ff808b'}}>Modify Order</span>
                                    </div>
                                    :
                                    null 
                                    
                                  }
                                </td>
                                <td>
                                  <Link href={`/publisher/orders/` + e.assigned_row_id}><a>
                                  <button className='table-primary-btn' title='View'>View</button>
                                  </a></Link>
                                </td>
                              </tr>
                            })
                            
                            :
                            null
                          }
                        </tbody>
                      </table>
                    </div>
                    :
                    null
                    :
                    <TableContentLoader row="5" col="7" />
                  }
                </div>
              </div>
            </div>







            {/* <!-- ..... 5) Success modal starts here.....  --> */}
              <div className="pr_modal ">
                <button type="button" className="btn btn-success dash_hide_table" data-toggle="modal" data-target="#success">
                  Success Modal
                </button>
                <div className="success_modal_block">
                  <div className="modal_block">
                    <div className="modal" id="success">
                      <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                          <div className="modal-header">
                            <img src="/assets/images/sucess.png" />
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="success_modal">
                            <div className="modal-body">
                              <h6>Success Modal Title Goes Here</h6>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
            {/* <!-- ..... 5) Success modal ends here.....  --> */}

            {/* <!-- ..... 5) Rejected modal starts here.....  --> */}
              <div className="pr_modal ">
                <button type="button" className="btn btn-danger dash_hide_table" data-toggle="modal" data-target="#rejectedModal">
                  Rejected Modal
                </button>
                <div className="success_modal_block">
                  <div className="modal_block">
                    <div className="modal" id="rejectedModal">
                      <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                          <div className="modal-header">
                            <img src="/assets/images/cancel.png" />
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                          </div>
                          <div className="success_modal">
                            <div className="modal-body">
                              <h6>Rejected Modal Title Goes Here</h6>
                              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/* <!-- ..... 5) Rejected modal ends here.....  --> */}



            {/* <!-- ..... 4) Order Accepted modal starts here.....  --> */}
              <div className="pr_modal ">
                <button type="button" className="btn cp-primary-btn dash_hide_table" data-toggle="modal" data-target="#rejected">
                  Accept Order
                </button>
                <div className="modal_block order_rejected_modal">
                  <div className="modal" id="rejected">
                    <div className="modal-dialog modal-sm">
                      <div className="modal-content">
                        <div className="confirmation_modal_body">
                          <div className="modal-body">
                            <h5 className="confirmation_modal_h5">Do you want to Accept this Order ?</h5>
                            <div className="confim_action_btn">
                              <button className="btn cp-primary-btn modal_disable order_accept_modal_btn">Approve</button>
                              <button className="btn btn-danger" data-dismiss="modal">Reject</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/* <!-- ..... 4) Order Accepted modal ends here.....  --> */}


              {/* <!-- ..... 4) Order Reject Confirmation modal starts here.....  --> */}
                <div className="pr_modal ">
                  <button type="button" className="btn cp-primary-btn dash_hide_table" data-toggle="modal" data-target="#order_rejec_confirmation">
                    Order Reject Confirmation
                  </button>
                  <div className="modal_block order_rejected_modal">
                    <div className="modal" id="order_rejec_confirmation">
                      <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                          <div className="confirmation_modal_body">
                            <div className="modal-body">
                              <h5 className="confirmation_modal_h5">Confirmation Title goes here</h5>
                              <div className="confim_action_btn">
                                <button className="btn btn-danger order_accept_modal_btn" data-dismiss="modal">Close</button>
                                <button className="btn cp-primary-btn  modal_disable" >Reject</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              {/* <!-- ..... 4) Order Reject Confirmation page modal ends here.....  --> */}

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
  if(!userAgent.publisher_token)
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
        headers['token'] = userAgent.publisher_token
        const token_data = {
          headers : {
            "X-API-KEY":"123123",
            "token":userAgent.publisher_token
          }
        }
        const API_BASE_URL = constants.API_BASE_URL
        const query = await fetch(API_BASE_URL+"publisher/dashboard/overview", token_data)
        const query_run = await query.json()
        // console.log(query_run)
        
        if(query_run.tokenStatus === false)
        {
          return {
            redirect: {
              destination: '/publisher/logout',
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


export default dashboard