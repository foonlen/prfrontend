import React,{useState,useEffect}from 'react'
import cookie from "cookie"
import Link from 'next/link';
import Head from 'next/head'
import jsCookie from "js-cookie"
import Axios from 'axios'
import MenuBar from '../../components/publisher/dash_menu_bar'
import TopMenuBar from '../../components/publisher/dash_top_menu_bar' 
import * as constants from '../../components/constants'

function notifications({data}) {

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
                                {
                                    data.length > 0
                                    ?
                                    data.map((e,i)=>{
                                      return <Link href={`/publisher/orders/` + e.orders_listed_row_id}><a><div className="messages">
                                                <h6>{e.title}</h6>
                                                <p className="message_body">{e.description}</p>
                                                <p className="message_time">{e.date_n_time}</p>
                                             </div></a></Link>
                                    })
                                    :
                                    null
                                }
                                    
                                    
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
    var headers = constants.headers
    headers['token'] = userAgent.publisher_token
    const token_data = {
      headers : {
        "X-API-KEY":"123123",
        "token":userAgent.publisher_token
      }
    }
    const API_BASE_URL = constants.API_BASE_URL
    const query = await fetch(API_BASE_URL+"publisher/notification/notifications_list", token_data)
    const query_run = await query.json()
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
}

export default notifications
