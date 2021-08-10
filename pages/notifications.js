import React from 'react'
import MenuBar from '../components/publisher/dash_menu_bar'
import TopMenuBar from '../components/publisher/dash_top_menu_bar' 
import Link from 'next/link';
import Head from 'next/head'

function notifications() {
    return (
        <>
            <div className="page">
                <MenuBar />

                <div className="container-dash">
                    <TopMenuBar />
                    <div className="container__body">
                        <div className='row'>
                            <div className="col-lg-8">
                                <div className='panel_title_block'>
                                    <h2  className='custom_header_main_title'>Notifications</h2>
                                    <div className='row'>
                                        <div className="col-lg-8">
                                            <p className='custom_header_subtitle'>Manage all your campaigns in the most Effective Way</p>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="mark_read"><Link href='#'><a>Mark all as read</a></Link></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="messages_block">
                                    <div className="messages">
                                        <h6>New Order Received</h6>
                                        <p className="message_body">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <p className="message_time">Jun 29, 2021, &nbsp;11:36 AM</p>
                                    </div>
                                    <div className="messages">
                                        <h6>New Order Received</h6>
                                        <p className="message_body">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <p className="message_time">Jun 29, 2021, &nbsp;11:36 AM</p>
                                    </div>
                                    <div className="messages">
                                        <h6>New Order Received</h6>
                                        <p className="message_body">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <p className="message_time">Jun 29, 2021, &nbsp;11:36 AM</p>
                                    </div>
                                    <div className="messages">
                                        <h6>New Order Received</h6>
                                        <p className="message_body">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <p className="message_time">Jun 29, 2021, &nbsp;11:36 AM</p>
                                    </div>
                                    <div className="messages">
                                        <h6>New Order Received</h6>
                                        <p className="message_body">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <p className="message_time">Jun 29, 2021, &nbsp;11:36 AM</p>
                                    </div>
                                    <div className="messages">
                                        <h6>New Order Received</h6>
                                        <p className="message_body">Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                                        <p className="message_time">Jun 29, 2021, &nbsp;11:36 AM</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4"></div>
                        </div>
 
                    </div>
                </div>
            </div>  
        </>
    )
}

export default notifications
