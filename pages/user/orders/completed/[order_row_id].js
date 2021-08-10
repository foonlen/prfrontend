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
            headers:headers,
            platformViewModal: false,
            alert_message:"",
            assigned_row_id:"",
            showModal: false,
            platformsList: [],
        }
        console.log(this.state)
    }

    setPlatformViewModal(platform_service_row_id)
    {
        this.setState({platformStatus:false,platformViewModal:true})

        fetch(this.state.API_BASE_URL+"advertiser/orders/pub_platform_individual_details/"+platform_service_row_id, {
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

    completedPlatforms()
    {
        fetch(this.state.API_BASE_URL+"advertiser/orders/completed_platforms/"+this.state.order_row_id, {
            method:'GET',
            headers: this.state.headers,
        }).then(res => res.json())
        .then((result) => {
            console.log(result);
            if(result.tokenStatus  === true)
            {
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

    componentDidMount()
    {
        this.completedPlatforms()
    }
  
render()
{   
    var { order_row_id }  = this.state
    var orderDetails = this.state.orderData
    return (
        <div className="page">
            <MenuBar />
            <div className="container-dash">
                <TopMenuBar full_name={this.state.advertiser_full_name} />
                    <div className="container__body">

                    {/* new design code starts here */}
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
                                    <div className="progress__value bg-green-raw" style={{ width: '100%' }} />
                                </div>
                                <ul className="order_progress_status">
                                    <li className="completed">
                                        <img src="/assets/images/ok_green.png"/>
                                        <p>Campaign Submitted</p>
                                    </li>

                                    <li className="completed">
                                        <img src="/assets/images/ok_green.png"/>
                                        <p>Discussion & Approval</p>
                                    </li>

                                    <li className="completed">
                                        <img src="/assets/images/ok_green.png"/>
                                        <p>Hire People</p>
                                    </li>

                                    <li className="completed">
                                        <img src="/assets/images/ok_green.png"/>
                                        <p>Work Process</p>
                                    </li>

                                    <li className="completed">
                                        <img src="/assets/images/ok_green.png"/>
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
                                                    <div className="col-lg-8 col-md-8 col-sm-12 col-12 ">
                                                        <h6>Publisher List</h6>
                                                        <p>Here you will find the details of orders, it is amazing if got great practice, Thank You.</p>
                                                    </div>
                                                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
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
                                                                    <th style={{minWidth:'142px'}}>Status</th>
                                                                    <th>Action</th>
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
                                                                        <div className="order_status_dashboard">
                                                                            <div className="dot completed_order_dot"></div>
                                                                            <span className="completed_order_status">Completed</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <span className="completed_people_btn">Completed</span>
                                                                    </td>
                                                                    <td><img src="/assets/images/chat.png" /></td>
                                                                    <td data-toggle="modal" data-target="#rejected_popup"><Link href="#"><a><i className="la la-eye"></i></a></Link></td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Youtube</td>
                                                                    <td>Mixed Sponser Ads</td>
                                                                    <td>Youtube</td>
                                                                    <td>10000</td>
                                                                    <td>
                                                                        <div className="order_status_dashboard">
                                                                            <div className="dot completed_order_dot"></div>
                                                                            <span className="completed_order_status">Completed</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <span className="completed_people_btn">Completed</span>
                                                                    </td>
                                                                    <td><img src="/assets/images/chat.png" /></td>
                                                                    <td data-toggle="modal" data-target="#rejected_popup"><Link href="#"><a><i className="la la-eye"></i></a></Link></td>
                                                                </tr>

                                                                <tr>
                                                                    <td>Youtube</td>
                                                                    <td>Mixed Sponser Ads</td>
                                                                    <td>Youtube</td>
                                                                    <td>10000</td>
                                                                    <td>
                                                                        <div className="order_status_dashboard">
                                                                            <div className="dot completed_order_dot"></div>
                                                                            <span className="completed_order_status">Completed</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <span className="completed_people_btn">Completed</span>
                                                                    </td>
                                                                    <td><img src="/assets/images/chat.png" /></td>
                                                                    <td data-toggle="modal" data-target="#rejected_popup"><Link href="#"><a><i className="la la-eye"></i></a></Link></td>
                                                                </tr>


                                                                <tr>
                                                                    <td>Youtube</td>
                                                                    <td>Mixed Sponser Ads</td>
                                                                    <td>Youtube</td>
                                                                    <td>10000</td>
                                                                    <td>
                                                                        <div className="order_status_dashboard">
                                                                            <div className="dot completed_order_dot"></div>
                                                                            <span className="completed_order_status">Completed</span>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <span className="completed_people_btn">Completed</span>
                                                                    </td>
                                                                    <td><img src="/assets/images/chat.png" /></td>
                                                                    <td data-toggle="modal" data-target="#rejected_popup"><Link href="#"><a><i className="la la-eye"></i></a></Link></td>
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


                        <div className="view_publisher">
                            <div classname="modal fade" id="rejected_popup" role="dialog">
                                <div classname="modal-dialog">
                                    <div classname="modal-content">
                                        <div classname="modal-header">
                                            <h6 classname="modal-title text-center">Your Request rejected :(</h6>
                                            <button type="button" classname="close" data-dismiss="modal">&times;</button>
                                        </div>
                                        <div classname="modal-body">
                                            <img src="/assets/images/rejected_popup.png" />
                                            <p className="rejected_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            <p className="category">Category</p>
                                            <p className="rejected_text">Spam Message</p>
                                            <p className="category">Description</p>
                                            <p className="rejected_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                
                    {/* new design code ends here */}









                    {/* code from publisher panel starts here */}
                        {/* <div className='row'>
                            <div className='col-lg-8'>
                                <div className="orders_progress">
                                    <ProgressBar order_status={orderDetails.order_status}  orders_counts={orderDetails.orders_counts}  order_row_id={order_row_id}/>
                                </div>
                                <div className="panel-table progress_table">
                                    <div className="table-responsive">
                                        <table className="table ">
                                        <thead>
                                            <tr>
                                                <th>Platform</th>
                                                <th>Service</th>
                                                <th>Price</th>
                                                <th>Webiste Link</th>
                                            <th>
                                                {
                                                    this.state.platformsList ?
                                                    this.state.platformsList.map((item, i) =>(
                                                        parseInt(item.platform_type) === 1 ? "Views Per Month" : "Followers"
                                                    ))
                                                    :
                                                    null
                                                }
                                            </th>
                                            <th>Completed</th>
                                            <th>Action</th>
                                            
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.platformsList ?
                                                this.state.platformsList.map((item, i) =>(
                                                    <tr className='custom-table' key={i}>
                                                        <td>{item.platform_name}</td>
                                                        <td>{item.service_name}</td>
                                                        <td>${parseFloat(item.price)}</td>
                                                        <td><a href={item.website_link} target="_blank">Visit Site</a></td>
                                                        <td>{item.followers_per_month}</td>
                                                        <td><button className="completed_status">Completed</button></td>
                                                        <td onClick={()=>{this.setPlatformViewModal(item.assigned_row_id)}}>
                                                            <button title='view' className='table-primary-btn'>View</button>
                                                        </td>
                                                    </tr>
                                                ))
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
                                    
                                    <p className='referance_description'>{this.state.orderData.description}</p>
                                </div>

                                
                            </div>
                            <div className='col-lg-4'>
                                <div className='orders_details_block'>
                                    <div className='first'>
                                        <div className='row'>
                                            <div className='col-lg-5'><p>Status</p></div>
                                            <div className='col-lg-1'>:</div>
                                            <div className='col-lg-5'>
                                                <p>
                                                {
                                                    parseInt(this.state.orderData.order_status)  === 0 ? 
                                                        <button className='pending'>Waiting for Approval</button>
                                                    : parseInt(this.state.orderData.order_status) === 1 ? 
                                                        <button className='pending'>Hiring People</button>
                                                    : 
                                                    parseInt(this.state.orderData.order_status) === 2 ? 
                                                        <button className='rejected' >Rejected</button>
                                                    :
                                                    parseInt(this.state.orderData.order_status) === 3 ? 
                                                        <button className='pending' >Work Process</button>
                                                    :
                                                    parseInt(this.state.orderData.order_status) === 4 ? 
                                                    <button className='completed'>Completed</button>
                                                    :
                                                    null
                                                }
                                                </p>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-lg-5'><p>Funds Transferred To Completed Publisher</p></div>
                                            <div className='col-lg-1'>:</div>
                                            <div className='col-lg-5'><p>{this.state.orderData.paid_amount} USD</p></div>
                                        </div>
                                        
                                        <div className='row'>
                                            <div className='col-lg-5'><p>Order Created On</p></div>
                                            <div className='col-lg-1'>:</div>
                                            <div className='col-lg-5'><p>{this.state.orderData.date_n_time}</p></div>
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





                            {/* this is old code */}
                    {/* <div className="layout">
                            
                            
                            
                        <div className="layout__row orderdetais_page">
                            <div className="layout__panel layout__panel_x2">
                            <div className="panel panellayouts">
                                <div className="panel__body panel__body_bg overviewitems">
                                    <ProgressBar order_status={orderDetails.order_status}  orders_counts={orderDetails.orders_counts}  order_row_id={order_row_id}/>
                                
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
                                            <div className="panel-table">
                                                <div className="table-responsive">
                                                    <table className="table">
                                                    <thead>
                                                        <tr>
                                                        <th>Platform</th>
                                                        <th>Service</th>
                                                        <th>Price</th>
                                                        <th>Webiste Link</th>
                                                        <th>
                                                            {
                                                                this.state.platformsList ?
                                                                this.state.platformsList.map((item, i) =>(
                                                                    parseInt(item.platform_type) === 1 ? "Views Per Month" : "Followers"
                                                                ))
                                                                :
                                                                null
                                                            }
                                                        </th>
                                                        <th>Completed</th>
                                                        <th>Action</th>
                                                        
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.platformsList ?
                                                            this.state.platformsList.map((item, i) =>(
                                                                <tr className='custom-table' key={i}>
                                                                    <td>{item.platform_name}</td>
                                                                    <td>{item.service_name}</td>
                                                                    <td>${parseFloat(item.price)}</td>
                                                                    <td><a href={item.website_link} target="_blank">Visit Site</a></td>
                                                                    <td>{item.followers_per_month}</td>
                                                                    <td><button className="completed">Completed</button></td>
                                                                    <td onClick={()=>{this.setPlatformViewModal(item.assigned_row_id)}}>
                                                                        <button title='view' className='table-primary-btn'>View</button>
                                                                    </td>
                                                                    
                                                                </tr>
                                                            ))
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
                                
                            </div>
                            </div>
                            <div className="layout__panel panel orders_secondlayout">
                                <div className="panel__body panel__body_bg">
                                    <div className="overview__item order_cards">
                                    <div>
                                        <div className="overview__col" >
                                            <div className="overview__label custom_overview_value">Tranferred fund to completed publishers</div>
                                            <div className="overview__value custom_overview_value">
                                                <img className='check_img' src="/assets/img/check.png" />
                                                <span className='estimatedUsd'>{orderDetails.paid_amount} USD</span>
                                                <span className='estimatedUsdPadid'>Paid</span>
                                            </div>
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

        <div className={"modal "+(this.state.platformViewModal ? "show":"")} tabIndex="-1" role="dialog" style={this.state.platformViewModal ? {dispay:"block"}: {display:"none"}}>
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