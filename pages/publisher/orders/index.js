import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import MenuBar from '../../../components/publisher/dash_menu_bar'
import TopMenuBar from '../../../components/publisher/dash_top_menu_bar'
import * as constants from '../../../components/constants'
import jsCookie from "js-cookie"
import axios from 'axios'
import moment from 'moment'
import cookie from "cookie"
import ReactPaginate from 'react-paginate';
import TableContentLoader from '../../../components/tableLoader'
import Publisher_filters from '../../../components/publisher/publisher_filters';

function orders(props) {
  const [API_BASE_URL] = useState(constants.API_BASE_URL)
  const [userAgent] = useState(props.userAgent);
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0)
  const [selected_page, set_selected_page] = useState(0)
  const [data, set_data] = useState([])
  const [dataLoaderStatus, setDataLoaderStatus] = useState(true)
  

  const config = {
    headers: {
      "X-API-KEY": "123123",
      token: jsCookie.get("publisher_token"),
    }
  }

  useEffect(() => {
    fetch()
  }, [offset])

  const fetch = () => {
    axios.get(API_BASE_URL + "publisher/orders/new_orders", config)
      .then(response => {
        console.log(response)
        setDataLoaderStatus(false)
        if (response.data.status) {
          set_data(response.data.message)
          let abc = response.data.message.slice(offset, offset + perPage)
          set_data(abc)
          setPageCount(Math.ceil(response.data.message.length / perPage))
        }
      })
  }

  const handlePageClick = (e) => {
    set_selected_page(e.selected)
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage)
  }

  const handleprevious = (e) => {
    set_selected_page(e - 1)
    const selectedPage = e - 1;
    setOffset(selectedPage * perPage)
  }

  const handlenext = (e) => {
    set_selected_page(e + 1)
    const selectedPage = e + 1;
    setOffset(selectedPage * perPage)
  };
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>My Orders</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Head>
      {/* page*/}
      <div className="page">
        <MenuBar />
        <div className="container-dash">
          <TopMenuBar full_name={userAgent.publisher_full_name} />
          <div className="container__body">
                
            <div className="custom_panel">
              <div className='panel_title_block'>
                <h2  className='custom_header_main_title'>Manage your Orders</h2>
                <p className='custom_header_subtitle'>Add Customs Orders, Approve Decline, Submit and Track Everythin Smooth</p>
              </div>
              <Publisher_filters />

              
              <div className="panel-table">  
                {
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="table_order_title">Serial Number</th>
                          <th className="table_order_title">Order Title</th>
                          <th className="table_platform_name">Platform Name</th>
                          <th className="table_service">Services</th>
                          <th className="table_order_ends_on">Ends On</th>
                          <th className="table_price">Price</th>
                          <th className="table_status">Status</th>
                          <th>View</th>
                        </tr>
                      </thead>
                      <tbody>
                      
                        {
                          
                          dataLoaderStatus === false ?
                          data.length > 0
                          ?
                          data.map((e, i) => {
                            return <tr id={e.id} key={i}>
                              <td>{i+1}</td>
                              <td className="text-capitalize">{e.platform_name.length > 25 ? (e.platform_name).slice(0,25) + "..." : e.platform_name}</td>
                              <td className="text-capitalize">{e.order_title.length > 25 ? (e.order_title).slice(0, 25) + "..." : e.order_title}</td>
                              <td className="text-capitalize">{e.service_name}</td>
                              <td>{moment(e.end_date_n_time).format("DD, MMM YYYY")}</td>
                              <td>$ {parseFloat(e.price)}</td>
                              <td>
                              {
                                  parseInt(e.order_accept_status) === 4 ?
                                    <><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Confirmation Waiting</span></>
                                  :
                                  parseInt(e.order_accept_status) === 5 ?
                                  <><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Confirmed</span></>
                                  :
                                  parseInt(e.order_accept_status) === 6 ?
                                  <><span className="span_status_two status_rejected"></span><span className="span_status status_rejected_text">Confirmation Rejected</span></>
                                  
                                  :
                                  parseInt(e.order_accept_status) === 7 ?
                                  <><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Order In Review</span></>
                                  :
                                  parseInt(e.order_accept_status) === 8 ?
                                  <><span className="span_status_two status_rejected"></span><span className="span_status status_rejected_text">Modify Order</span></>
                                  :
                                  parseInt(e.order_accept_status) === 9 ?
                                  <><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Amount Received</span></>
                                  :
                                  null
                                }
                                </td>
                                <td>
                                  <Link href={`/publisher/orders/` + e.id}><a> 
                                  <button className='table-primary-btn' title='View'>View</button>
                                  </a></Link>
                                </td>
                            </tr>
                          })
                          :
                          <div className="data__item text-center">Sorry, No Releated data found.</div>
                            
                          :
                          <TableContentLoader row="5" col="8" />
                        }
                        
                      </tbody>
                    </table>
                  </div>
                }
              </div>
            </div>
            {
              data.length > 10
                ?
                <div className="panel__foot">
                  <div className="pager new_pager">
                    {
                      selected_page === 0
                        ?
                        <span className="pager__arrow action new_action action_icon_before" ><i className="la la-angle-left "></i>Prev</span>
                        :
                        <span onClick={() => handleprevious(selected_page)} className="pager__arrow action new_action action_icon_before" ><i className="la la-angle-left "></i>Prev</span>
                    }
                    <div className="pager__list pagination_element">
                      <ReactPaginate
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={pageCount}
                        marginPagesDisplayed={10}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                      />
                    </div>
                    {
                      selected_page + 1 === pageCount
                        ?
                        <span className="pager__arrow new_action action action_icon_after">Next<i className="la la-angle-right "></i></span>
                        :
                        <span onClick={() => handlenext(selected_page)} className="pager__arrow new_action action action_icon_after">Next<i className="la la-angle-right "></i></span>
                    }
                  </div>
                </div>
                :
                null
            }
          </div>
        </div>
      </div>



    </>
  )
}

export default orders;


orders.getInitialProps = async ({ req }) => {
  const userAgent = await cookie.parse(req ? req.headers.cookie || "" : document.cookie)
  return { userAgent }
}




