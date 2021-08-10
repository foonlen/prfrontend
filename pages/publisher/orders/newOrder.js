import React from 'react'
import MenuBar from '../../../components/publisher/dash_menu_bar'
import TopMenuBar from '../../../components/publisher/dash_top_menu_bar'
import OrdersProgress from '../../../components/publisher/orders_progress'
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head'

function newOrder() {
    return (
        <>
        <div className="page">
        <MenuBar />

        <div className="container-dash">
          <TopMenuBar />

          <div className="container__body">
            <div className='panel_title_block'>
                <div className='row'>
                    <div className="col-lg-8">
                        <h2>Brand Need Launch #56561655</h2>
                        <p>Sponser Ads For Your Youtube Channel</p>
                    </div>
                    <div className="col-lg-4">
                        <div className='activity_log_btn'>
                            <button className='btn orders_activity'><img src="/assets/images/activity_logo.png" height="18px" />Activity Log</button>
                        </div>
                        
                    </div>
                </div>
            </div>

            

            <div className='row'>
                <div className='col-lg-8'>
                    <div className="orders_progress">
                        <div className="overview__progress progress custom_progress">
                            <div className="progress__value bg-green-raw" style={{ width: '25%' }} />
                        </div>
                        <ul className="order_progress_status">
                            <li className="completed">
                                <img src="https://img.icons8.com/fluent/30/000000/ok.png"/>
                                <p> Order Accepted </p>
                            </li>
                            <li className="pending"> 
                                <span className="pending_block"></span>
                                <p>Discussion</p>
                            </li>
                            <li className="pending">
                                <span className="pending_block"></span>
                                <p>Start </p>
                            </li>
                            <li className="pending">
                                <span className="pending_block"></span>
                                <p> Submit </p>
                            </li>
                            <li className="pending">
                                <span className="pending_block"></span>
                                <p> Completed </p>
                            </li>
                        </ul>  
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
                        
                        <p className='referance_description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p className='referance_description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                        <p className='referance_description'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>


                    <div className='order_details_block'>
                        <h6>Order Details</h6>
                        <div className="row_title">
                            <div className='row'>
                                <div className='col-lg-6'><p className='reference_link_title'>Reference Links</p></div>
                                <div className='col-lg-6'><div className="show_more"><p className='show_more'>Show More...<img src='/assets/images/down_arrow.png'  /></p></div></div>
                            </div>
                        </div>
                        <p className='reference_link'><Link href='#'><a >https://www.freepik.com</a></Link></p>
                    </div>



                    <div className='activity_block'>
                        <div className="row_title">
                            <div className='row'>
                                <div className='col-lg-6'><h6>Activity Log</h6></div>
                                <div className='col-lg-6'><p>Order Completed in 6 Days</p></div>
                            </div>
                        </div>

                        {/* .............................   */}
                            <div className="vertical-timeline vertical-timeline--animate vertical-timeline--one-column">
                                <div className="vertical-timeline-item vertical-timeline-element">
                                    <div> <span className="vertical-timeline-element-icon bounce-in"> <i className="badge badge-dot badge-dot-xl badge-warning"> </i> </span>
                                        <div className="vertical-timeline-element-content bounce-in">
                                            <p className="order_status">Order Accepted By You</p>
                                            <p className="order_date_time">12/07/2021 11:30 AM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="vertical-timeline-item vertical-timeline-element">
                                    <div> <span className="vertical-timeline-element-icon bounce-in"> <i className="badge badge-dot badge-dot-xl badge-warning"> </i> </span>
                                        <div className="vertical-timeline-element-content bounce-in">
                                            <p className="order_status">Order Started By You</p>
                                            <p className="order_date_time">12/07/2021 11:30 AM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="vertical-timeline-item vertical-timeline-element">
                                    <div> <span className="vertical-timeline-element-icon bounce-in"> <i className="badge badge-dot badge-dot-xl badge-warning"> </i> </span>
                                        <div className="vertical-timeline-element-content bounce-in">
                                            <p className="order_status">Work Submitted for Review</p>
                                            <p className="order_date_time">12/07/2021 11:30 AM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="pending">
                                    <div className="vertical-timeline-item vertical-timeline-element">
                                        <div> <span className="vertical-timeline-element-icon bounce-in"> <i className="badge badge-dot badge-dot-xl badge-warning"> </i> </span>
                                            <div className="vertical-timeline-element-content bounce-in">
                                                <p className="order_status">Review Recieved</p>
                                                <p className="order_date_time">12/07/2021 11:30 AM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="pending">
                                    <div className="vertical-timeline-item vertical-timeline-element">
                                        <div> <span className="vertical-timeline-element-icon bounce-in"> <i className="badge badge-dot badge-dot-xl badge-warning"> </i> </span>
                                            <div className="vertical-timeline-element-content bounce-in">
                                                <p className="order_status">Review Work Updated</p>
                                                <p className="order_date_time">15/07/2021 02:00 AM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="pending">
                                    <div className="vertical-timeline-item vertical-timeline-element">
                                        <div> <span className="vertical-timeline-element-icon bounce-in"> <i className="badge badge-dot badge-dot-xl badge-warning"> </i> </span>
                                            <div className="vertical-timeline-element-content bounce-in">
                                                <p className="order_status">Order Accepted by Advertiser</p>
                                                <p className="order_date_time">15/07/2021 02:00 AM</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                            </div>
                        {/* .................................... */}
                        
                    </div>
                </div>
                <div className='col-lg-4'>
                    <div className='orders_details_block'>
                        <div className='first'>
                            <div className='row'>
                                <div className='col-lg-5'><p>Status</p></div>
                                <div className='col-lg-1'>:</div>
                                <div className='col-lg-5'><p>In Process</p></div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-5'><p>Order Value</p></div>
                                <div className='col-lg-1'>:</div>
                                <div className='col-lg-5'><p>$ 350.00</p></div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-5'><p>Start Date</p></div>
                                <div className='col-lg-1'>:</div>
                                <div className='col-lg-5'><p>06 Jan 2021</p></div>
                            </div>
                            <div className='row'>
                                <div className='col-lg-5'><p>Deadline</p></div>
                                <div className='col-lg-1'>:</div>
                                <div className='col-lg-5'><p>10 Jan 2021</p></div>
                            </div>
                        </div>
                        <div className='second'>
                            <button className='btn btn-primary btn-block'>Start Work</button>
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
                        <div className='conversation_send'>
                            <div className='row'>
                                <div className='col-lg-8'>
                                    <p>type your message here</p>
                                </div>
                                <div className='col-lg-2'>
                                    <i className='la la-arrow-right'></i>
                                </div>
                                <div className='col-lg-2'>
                                    <img src="/assets/images/send.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
         </div>
        </div>
      </div>  
        </>
    )
}

export default newOrder
