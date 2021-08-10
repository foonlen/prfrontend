import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import cookie from "cookie"
import Router from 'next/router'
import * as constants from '../../../../components/constants'
import TableLoader from '../../../../components/tableLoader'
import MenuBar from '../../../../components/advertiser/dash_menu_bar'
import ProgressBar from '../../../../components/advertiser/orders_progress'
import SuppportTeam from '../../../../components/advertiser/orders_support_team'
import TopMenuBar from '../../../../components/advertiser/dash_top_menu_bar'
import PlatformView from '../../../../components/advertiser/orders_platform_view'
import PopUpModal from '../../../../components/popUpModal'
 
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
            modalMessage: {title:"", image_name:"", description:""},
            loaderStatus:false,
            headers:headers,
            alert_message:"",
            assigned_row_id:"",
            modalData: {icon: "", title: "", content:""},
            showModal: false,
            platformsList: [],
        }
    }

    setPlatformViewModal(assigned_row_id)
    {
        this.setState({platformStatus:false,platformViewModal:true})

        fetch(this.state.API_BASE_URL+"advertiser/orders/pub_platform_individual_details/"+assigned_row_id, {
            method:'GET',
            headers: this.state.headers
        }).then(res => res.json())
        .then((result) => {
            console.log('Pop Up Modal Data:',result);
            if(result.tokenStatus === true)
            {   
                if(result.status === true) 
                { 
                    this.setState({ 
                        platformData:result.message,
                        platformStatus:true
                    })
                }
            }
            else
            {
                //Router.push('/advertiser/logout')
            }
        })
    }
    
    

    acceptOrderConfirm(assigned_row_id)
    { 
       //this.dropDown(assigned_row_id)
       this.setState({assigned_row_id:assigned_row_id})
    }

    rejectOrderConfirm(assigned_row_id)
    {   
       //this.dropDown(assigned_row_id)  
       this.setState({assigned_row_id:assigned_row_id})
    }

    acceptOrder()
    {   
        var reqObj = {
            assigned_row_id: this.state.assigned_row_id
        }
        this.setState({ 
            modalMessage: { title: '', image_name: "", description: '' } 
        })
        fetch(this.state.API_BASE_URL+"advertiser/orders/accept_publisher_request", {
            method:'POST',
            headers: this.state.headers,
            body:JSON.stringify(reqObj)
        }).then(res => res.json())
        .then((result) => {
            console.log(result);
            if(result.tokenStatus === true)
            {    
                if(result.status === true) 
                { 
                    this.employeePickedPlatforms()
                    this.setState({ 
                        modalMessage:{title:"Publisher Selected", image_name:"select.svg", description:result.message.alert_message}
                    })
                }
                else
                {
                    this.setState({ 
                        modalMessage: { title: 'Insufficient Fund', image_name: "reject.svg", description: result.message.alert_message } 
                    })
                }
            }
            else
            {
                Router.push('/advertiser/logout')
            }
        })
    }


    rejectOrder()
    {   
        var reqObj = {
            assigned_row_id: this.state.assigned_row_id
        }
        fetch(this.state.API_BASE_URL+"advertiser/orders/reject_publisher_request", {
            method:'POST',
            headers: this.state.headers,
            body:JSON.stringify(reqObj)
        }).then(res => res.json())
        .then((result) => {
            console.log(result);
            if(result.tokenStatus  === true)
            {
                if(result.status === true) 
                {   
                    this.employeePickedPlatforms()
                    this.setState({ 
                        modalMessage:{title:"Publisher Rejected", image_name:"select.svg", description:result.message.alert_message}
                    })
                }
            }
            else
            {
                Router.push('/advertiser/logout')
            }
        })
    }

    employeePickedPlatforms()
    {
        fetch(this.state.API_BASE_URL+"advertiser/orders/employee_picked_platforms/"+this.state.order_row_id, {
            method:'GET',
            headers: this.state.headers,
        }).then(res => res.json())
        .then((result) => {
            console.log(result);
            if(result.tokenStatus  === true)
            {   
                this.setState({ 
                    loaderStatus:true
                })

                if(result.status === true) 
                { 
                    this.setState({ 
                    platformsList: result.message
                    })
                }
            }
            else
            {
                Router.push('/advertiser/logout')
            }
        })
    }

    dropDown(assigned_row_id)
    {
        var dropdownMenu = 'dropdownMenu'+assigned_row_id
        var str = document.getElementById(dropdownMenu).className
        var strReplace = (str.replace("dropdown-menu ", "")).trim()
        if(strReplace === 'show')
        {
            document.getElementById(dropdownMenu).classList.remove("show")
        }
        else
        {
            document.getElementById(dropdownMenu).classList.add("show")
        }
    }

    componentDidMount()
    {
        this.employeePickedPlatforms()
    }
  
render()
{
    var orderDetails = this.state.orderData
    var { order_row_id}  = this.state
    
return (
    <div>
        <Head>
            <meta charset="utf-8" />
            <title>Order Waiting</title>
        </Head>
        <MenuBar />
        <div className="page">
            <div className="container-dash">
            <TopMenuBar full_name={this.state.advertiser_full_name} />
            <div className="container__body">
                
                <div className="panel_title_block hire_people_title">
                    <div className="row">
                        <div className="col-lg-8 col-md-6 col-sm-6 col-12">
                            <h2>Brandneed Launch #5161611</h2>
                            <p>Sponser Ads for your <span>Youtube Chanel</span></p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-12">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className='activity_log_btn'>
                                        <button className='btn orders_activity'><img src="/assets/images/description.png" />Description</button>
                                    </div>
                                   
                                </div>
                                <div className="col-lg-6">
                                    <div className='activity_log_btn'>
                                        <button className='btn orders_activity'><img src="/assets/images/activity_logo.png" />Activity Log</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className="hire_people">
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
                    <div className="hire_people_second_row">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="hire_people_left_block">
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
                                            <div className="col-lg-8 col-md-8 col-sm-12 col-12 ">
                                                <h6>Publisher List</h6>
                                                <p>Here you will find the details of orders, it is amazing if got great practice, Thank You.</p>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                                {/* <div className="hire_search"><input type="text" placeholder="Search" /> <img src="/assets/images/search.png" /></div> */}
                                                <div className="hire_search">
                                                    <div classname="input-group">
                                                        <input type="text" classname="form-control" placeholder="Search" />
                                                        <div classname="input-group-append">
                                                        <span classname="input-group-text"><img src="/assets/images/search.png" /></span>
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
                                                            <th style={{minWidth:'143px'}}>Services</th>
                                                            <th>Web/Blog Link</th>
                                                            <th>Page Views</th>
                                                            <th style={{minWidth:'180px'}}>Status</th>
                                                            <th style={{minWidth:'180px'}}>Action</th>
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
                                                                {/* <span className="dot pending_hire_dot"></span>
                                                                <span className="pending_hire_status">Admin Pitched</span> */}
                                                                <div className="order_status_dashboard">
                                                                    <div className="dot pending_hire_dot"></div>
                                                                    <span className="pending_hire_status">Admin Pitched</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className=" hire_people_btn">Hire</span>
                                                                <span className=" reject_people_btn">Reject</span>
                                                            </td>
                                                            <td><img src="/assets/images/chat.png" /></td>
                                                            <td><Link href="#"><a><i className="la la-eye"></i></a></Link></td>
                                                        </tr>

                                                        <tr>
                                                            <td>Youtube</td>
                                                            <td>Mixed Sponser Ads</td>
                                                            <td>Youtube</td>
                                                            <td>10000</td>
                                                            <td>
                                                                {/* <span className="dot approved_hire_dot"></span>
                                                                <span className="completed_hire_status">You Accepted Pitch</span> */}
                                                                <div className="order_status_dashboard">
                                                                    <div className="dot approved_hire_dot"></div>
                                                                    <span className="completed_hire_status">Completed</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="waiting_people_btn">Waiting for work</span>
                                                            </td>
                                                            <td><img src="/assets/images/chat.png" /></td>
                                                            <td><Link href="#"><a><i className="la la-eye"></i></a></Link></td>
                                                        </tr>

                                                        <tr>
                                                            <td>Youtube</td>
                                                            <td>Mixed Sponser Ads</td>
                                                            <td>Youtube</td>
                                                            <td>10000</td>
                                                            <td>
                                                                {/* <span className="dot pending_order_dot"></span>
                                                                <span className="pending_order_status">Admin Pitched</span> */}
                                                                <div className="order_status_dashboard">
                                                                    <div className="dot pending_hire_dot"></div>
                                                                    <span className="pending_hire_status">Admin Pitched</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="hire_people_btn">Hire</span>
                                                                <span className="reject_people_btn">Reject</span>
                                                            </td>
                                                            <td><img src="/assets/images/chat.png" /></td>
                                                            <td><Link href="#"><a><i className="la la-eye"></i></a></Link></td>
                                                        </tr>


                                                        <tr>
                                                            <td>Youtube</td>
                                                            <td>Mixed Sponser Ads</td>
                                                            <td>Youtube</td>
                                                            <td>10000</td>
                                                            <td>
                                                                {/* <span className="dot pending_order_dot"></span>
                                                                <span className="pending_order_status">Admin Pitched</span> */}
                                                                <div className="order_status_dashboard">
                                                                    <div className="dot pending_hire_dot"></div>
                                                                    <span className="pending_hire_status">Admin Pitched</span>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <span className="hire_people_btn">Hire</span>
                                                                <span className="reject_people_btn">Reject</span>
                                                            </td>
                                                            <td><img src="/assets/images/chat.png" /></td>
                                                            <td><Link href="#"><a><i className="la la-eye"></i></a></Link></td>
                                                        </tr>
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
                    </div>
                </div>






                {/* code from publisher panel starts here */}
                    {/* <div className='row'>
                        <div className='col-lg-8'>
                            <div className="orders_progress">
                                <ProgressBar order_status={orderDetails.order_status}  orders_counts={orderDetails.orders_counts}  order_row_id={order_row_id}/>
                            </div>
                            {
                                this.state.alert_message ?
                                <div className="alert alert-info">
                                <span className="alert-close" onClick={() =>{this.setState({alert_message:null})}}>&times;</span>  
                                {this.state.alert_message}
                                </div>
                                :
                                null
                            }
                            <div className="panel-table progress_table">
                                <div className="table-responsive">
                                    <table className="table ">
                                    <thead>
                                       {
                                        this.state.platformsList.length > 0 
                                        ?
                                        this.state.platformsList.map((item, i) =>(
                                                <tr key={i}>
                                                    <th>Platform</th>
                                                    <th>Service</th>
                                                    <th>Price</th>
                                                    <th>Webiste Link</th>
                                                    <th>{ parseInt(item.platform_type) === 1 ? "Views Per Month" : "Followers"}</th>
                                                    <th>Status</th>
                                                    <th>Action</th>
                                                </tr>
                                        ))
                                        :
                                        null
                                        }
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.platformsList.length > 0 
                                            ?
                                            this.state.platformsList.map((item, i) =>(
                                            <tr key={i} className='custom-table'>
                                                <td><strong>{item.platform_name}</strong></td>
                                                <td><strong>{item.service_name}</strong></td>
                                                <td><strong>${parseFloat(item.price)}</strong></td>
                                                <td><strong><a href={item.website_link} target="_blank">Visit Site</a></strong></td>
                                                <td><strong>{item.followers_per_month}</strong></td>
                                                <td>
                                                    {
                                                        parseInt(item.order_accept_status) === 1 ?
                                                        <>
                                                            <button className="green btn-sm custom_table_button ad_order_recieve" data-toggle="modal" data-target="#selectModal" onClick={()=>{this.acceptOrderConfirm(item.assigned_row_id)}}>Accept</button>
                                                            <button className="red btn-sm custom_table_button" data-toggle="modal" data-target="#rejectModal" onClick={()=>{this.rejectOrderConfirm(item.assigned_row_id)}}>Reject</button>
                                                        </>
                                                        :
                                                        parseInt(item.order_accept_status) === 3 ?
                                                        <span className='custom_yellow'>Waiting for pitch-Accepted</span>
                                                        :
                                                        parseInt(item.order_accept_status) === 4 ?
                                                        <span className='custom_red'>Publisher Rejected </span>
                                                        :
                                                        parseInt(item.order_accept_status) === 5 ?
                                                        <span className='custom_green'>Pitch Request-Accepted</span>
                                                        :
                                                        parseInt(item.order_accept_status) === 6 ?
                                                        <span className='custom_red'>Pitch Request-Rejected</span>
                                                        :
                                                        parseInt(item.order_accept_status) === 7 ?
                                                        <span className='custom_green'>Publisher Request-Accepted</span>
                                                        :
                                                        parseInt(item.order_accept_status) === 8 ?
                                                        <span className='custom_red' style={{color:'#ff808b'}}>Publisher Request-Rejected</span>
                                                        :
                                                        parseInt(item.order_accept_status) === 9 ?
                                                        <span className='custom_yellow'>Order Submitted- Pending</span>
                                                        :
                                                        parseInt(item.order_accept_status) === 10 ?
                                                        <span className='custom_green'>Order Request- Completed</span>
                                                        :
                                                        parseInt(item.order_accept_status) === 11 ?
                                                        <span className='custom_yellow' >Order Request- Modify Order</span>
                                                        :
                                                        null
                                                    }
                                                </td>
                                                <td><Link href='#'><a onClick={()=>{this.setPlatformViewModal(item.assigned_row_id)}} className='action action_stroke pr_platform_edit'><i className="la la-eye"></i></a></Link></td>
                                            </tr>
                                            ))
                                            :
                                            <div className="details_block">
                                                <p>Sorry No Related Data Found.</p>
                                            </div>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                            
                            <div className='details_block'>
                                <div className='row'>
                                    <div className='col-lg-8 col-md-8 col-sm-6 col-6'><h4>Token Sale Youtube Video</h4></div>
                                    <div className='col-lg-4 col-md-4 col-sm-6 col-6'><div className="show_more"><p>Show More</p><img src="/assets/images/down_arrow.png" /></div></div>
                                </div>
                                <p className='reference_link_title'>Reference Link</p>
                                <p className='reference_links'><Link href='#'><a >https://www.freepik.com</a></Link></p>
                                <p className='reference_links'><Link href='#'><a >https://www.freepik.com</a></Link></p>
                                <p className='reference_links'><Link href='#'><a >https://www.freepik.com</a></Link></p>
                                
                                <p className='referance_description'>{this.state.orderData.description}</p>
                            </div>

                            
                        </div>
                        <div className='col-lg-4'>
                            <div className='orders_details_block'>
                                <div className='first'>
                                    <div className='row'>
                                        <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p>Status</p></div>
                                        <div className='col-lg-1 col-md-1 col-sm-1 col-1'>:</div>
                                        <div className='col-lg-5 col-md-5 col-sm-5 col-5' >
                                            <p>
                                            {
                                                parseInt(this.state.orderData.order_status)  === 0 ? 
                                                    <button className='pending_status'>Waiting for Approval</button>
                                                : parseInt(this.state.orderData.order_status) === 1 ? 
                                                    <button className='pending_status'>Hiring People</button>
                                                : 
                                                parseInt(this.state.orderData.order_status) === 2 ? 
                                                    <button className='rejected_status' >Rejected</button>
                                                :
                                                parseInt(this.state.orderData.order_status) === 3 ? 
                                                    <button className='pending_status' >Work Process</button>
                                                :
                                                parseInt(this.state.orderData.order_status) === 4 ? 
                                                <button className='completed_status'>Completed</button>
                                                :
                                                null
                                            }
                                            </p>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p>Funds Transferred To Completed Publisher</p></div>
                                        <div className='col-lg-1 col-md-1 col-sm-1 col-1'>:</div>
                                        <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">{this.state.orderData.paid_amount} USD</p></div>
                                    </div>
                                    
                                    <div className='row'>
                                        <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p>Order Created On</p></div>
                                        <div className='col-lg-1 col-md-1 col-sm-1 col-1'>:</div>
                                        <div className='col-lg-5 col-md-5 col-sm-5 col-5'><p className="order_values">{this.state.orderData.date_n_time}</p></div>
                                    </div>
                                    
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
                
                
                {/*<div className="layout">
                
                     <div className="layout__row orderdetais_page">
                        <div className="layout__panel layout__panel_x2">
                        <div className="panel panellayouts">
                            <div className="panel__body panel__body_bg overviewitems">
                                <ProgressBar order_status={orderDetails.order_status} orders_counts={orderDetails.orders_counts} order_row_id={order_row_id}/>
                            </div>
                        </div>
                        <div className="singleorder_tbl">
                            {
                                this.state.alert_message ?
                                <div className="alert alert-info">
                                <span className="alert-close" onClick={() =>{this.setState({alert_message:null})}}>&times;</span>  
                                {this.state.alert_message}
                                </div>
                                :
                                null
                            }
                            
                            <div className="data data_list">
                                <div className="data__container">
                                    <div className="data__body">
                                        {
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead>
                                                        {
                                                        this.state.platformsList.length > 0 
                                                        ?
                                                        this.state.platformsList.map((item, i) =>(
                                                                <tr key={i} className='custom-table'>
                                                                    <th>Platform</th>
                                                                    <th>Service</th>
                                                                    <th>Price</th>
                                                                    <th>Webiste Link</th>
                                                                    <th>{ parseInt(item.platform_type) === 1 ? "Views Per Month" : "Followers"}</th>
                                                                    <th>Status</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                        ))
                                                        :
                                                        null
                                                        }
                                                    </thead>
                                                    <tbody>
                                                    {
                                                        this.state.platformsList.length > 0 
                                                        ?
                                                        this.state.platformsList.map((item, i) =>(
                                                        <tr key={i} className='custom-table'>
                                                            <td><strong>{item.platform_name}</strong></td>
                                                            <td><strong>{item.service_name}</strong></td>
                                                            <td><strong>${parseFloat(item.price)}</strong></td>
                                                            <td><strong><a href={item.website_link} target="_blank">Visit Site</a></strong></td>
                                                            <td><strong>{item.followers_per_month}</strong></td>
                                                            <td>
                                                                {
                                                                    parseInt(item.order_accept_status) === 1 ?
                                                                    <>
                                                                        <button className="green btn-sm custom_table_button ad_order_recieve" data-toggle="modal" data-target="#selectModal" onClick={()=>{this.acceptOrderConfirm(item.assigned_row_id)}}>Accept</button>
                                                                        <button className="red btn-sm custom_table_button" data-toggle="modal" data-target="#rejectModal" onClick={()=>{this.rejectOrderConfirm(item.assigned_row_id)}}>Reject</button>
                                                                    </>
                                                                    :
                                                                    parseInt(item.order_accept_status) === 3 ?
                                                                    <span className='custom_yellow'>Waiting for pitch-Accepted</span>
                                                                    :
                                                                    parseInt(item.order_accept_status) === 4 ?
                                                                    <span className='custom_red'>Publisher Rejected </span>
                                                                    :
                                                                    parseInt(item.order_accept_status) === 5 ?
                                                                    <span className='custom_green'>Pitch Request-Accepted</span>
                                                                    :
                                                                    parseInt(item.order_accept_status) === 6 ?
                                                                    <span className='custom_red'>Pitch Request-Rejected</span>
                                                                    :
                                                                    parseInt(item.order_accept_status) === 7 ?
                                                                    <span className='custom_green'>Publisher Request-Accepted</span>
                                                                    :
                                                                    parseInt(item.order_accept_status) === 8 ?
                                                                    <span className='custom_red' style={{color:'#ff808b'}}>Publisher Request-Rejected</span>
                                                                    :
                                                                    parseInt(item.order_accept_status) === 9 ?
                                                                    <span className='custom_yellow'>Order Submitted- Pending</span>
                                                                    :
                                                                    parseInt(item.order_accept_status) === 10 ?
                                                                    <span className='custom_green'>Order Request- Completed</span>
                                                                    :
                                                                    parseInt(item.order_accept_status) === 11 ?
                                                                    <span className='custom_yellow' >Order Request- Modify Order</span>
                                                                    :
                                                                    null
                                                                }
                                                            </td>
                                                            <td><Link href='#'><a onClick={()=>{this.setPlatformViewModal(item.assigned_row_id)}} className='action action_stroke pr_platform_edit'><i className="la la-eye"></i></a></Link></td>
                                                        </tr>
                                                        ))
                                                        :
                                                        null
                                                    }
                                                    </tbody>
                                                </table>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="modal" id="selectModal" tabIndex="-1" role="dialog">
                                    <div className="modal-dialog modal-sm" role="document">
                                        <div className="modal-content">
                                        <div className="modal-body text-center">
                                            <h5 className="modal-heading">Select Publisher</h5>
                                            <img src="../../../assets/img/select.svg" alt="Select" className="alert-image-center" />
                                            <h6 className="modal-description">Do you really want to select this publisher platform ?</h6>
                                            <div >
                                                <button type="button" className="btn btn-secondary btn-m-10" data-dismiss="modal" >Close</button>
                                                <button type="button" className="btn btn-success btn-m-10" onClick={()=>{this.acceptOrder()}}  data-dismiss="modal" >Accept</button>
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
                                            <h6 className="modal-description">Do you really want to reject this publisher platform ?</h6>
                                            <div>
                                                <button type="button" className="btn btn-secondary btn-m-10" data-dismiss="modal">Close</button>
                                                <button type="button" className="btn btn-warning btn-m-10"  onClick={()=>{this.rejectOrder()}}  data-dismiss="modal" >Reject</button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    {/* <div className="layout__panel panel orders_secondlayout">
                        <div className="panel__body panel__body_bg">
                            <div className="overview__item order_cards">
                                <div className="overview__col" >
                                    <div className="overview__label custom_overview_value">Coinpedia Estimate Price</div>
                                    <div className="overview__value custom_overview_value">
                                        <img className='check_img' src="/assets/img/check.png" />
                                        <span className='estimatedUsd'>800 USD</span>
                                        <span className='estimatedUsdPadid'>Paid</span>
                                    </div>
                                </div>
                            </div>
                            <SuppportTeam order_status={orderDetails.order_status} date_n_time={orderDetails.date_n_time}/>
                        </div>
                    </div> 
                </div>
            </div>*/}
        </div>
    </div>


        <div className={"modal "+(this.state.platformViewModal ? "show":"")} tabIndex="-1" role="dialog" style={this.state.platformViewModal ? {display:"block"} : {display:"none"}}>
        <div className="modal-dialog modal-lg">
            <div className="modal-content" style={{padding:'24px', borderRadius:'13px'}}>
                <div className="modal-header">
                    <button type="button" className="close"  onClick={()=>{this.setState({platformViewModal:false})}} >&times;</button>
                </div>
                <div className="modal-body">
                    {
                        this.state.platformStatus ?
                        <PlatformView platformData={this.state.platformData} />
                        :
                        <div className="text-center">
                            <h6>Please wait...</h6>
                            <img src="../../../assets/img/loader.gif" className="alert-image-center" />
                            <p>We are fetching your data</p>
                        </div> 
                    }
                </div>
            </div>
        </div>
    </div>
    
    {
        this.state.modalMessage.title
        ? 
        <PopUpModal message={this.state.modalMessage} /> 
        :
        null
    }              


        
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
    
    const query = await fetch(API_BASE_URL+"advertiser/orders/individual_detail/"+order_row_id, token_data)
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
        return {props: {userAgent:userAgent, headers:headers, order_row_id:order_row_id, data:query_run.message}}
    }

  }
}
export default orderDetails



