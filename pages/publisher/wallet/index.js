import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import MenuBar from '../../../components/publisher/dash_menu_bar'
import TopMenuBar from '../../../components/publisher/dash_top_menu_bar'
import ReactPaginate from 'react-paginate'
import Axios from 'axios'
import jsCookie from "js-cookie"
import * as constants from '../../../components/constants'
import moment from 'moment';
import cookie from "cookie"

import TableContentLoader from '../../../components/tableLoader'

function wallet(props) 
{
  const [API_BASE_URL] = useState(constants.API_BASE_URL)
  const [withdraw_list, set_withdraw_list] = useState([])
  const [userAgent] = useState(props.userAgent)
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0)
  const [selected_page, set_selected_page] = useState(0)
  const [main_balance, setMainBalance] = useState(0)
  const [funds_earned, fundsEarned] = useState(0)
  const [funds_withdrawal, setFundsWithdrawal] = useState(0)
  const [dataLoaderStatus, setDataLoaderStatus] = useState(true)

  useEffect(() => {
    getData()
    getWalletBal()
  }, [offset])

  const handlePageClick = (e) => {
    set_selected_page(e.selected)
    const selectedPage = e.selected;
    setOffset(selectedPage * perPage)
  };

  const handleprevious = (e) => {
    set_selected_page(e - 1)
    const selectedPage = e - 1;
    setOffset(selectedPage * perPage)
  };


  const handlenext = (e) => {
    set_selected_page(e + 1)
    const selectedPage = e + 1;
    setOffset(selectedPage * perPage)
  };


  const config = {
    headers: {
      "X-API-KEY": "123123",
      token: jsCookie.get("publisher_token"),
    }
  }

  const getWalletBal = () => {
    Axios.get(API_BASE_URL + "publisher/pwallet/overview", config)
      .then(res => {
        console.log(res.data)
        if(res.data.status)
         {
          setMainBalance(res.data.message.main_balance)
          fundsEarned(res.data.message.funds_earned)
          setFundsWithdrawal(res.data.message.funds_withdrawal)
        }
      })
  }

  const getData = async () => {
    const res = await Axios.get(API_BASE_URL + 'publisher/pwallet/get_transactions', config)
    console.log(res)
    if(res.data)
    {
      setDataLoaderStatus(false)
    
   
    if (res.data.message.length > 0) 
    {
      set_withdraw_list(res.data.message)
      const data = res.data.message;
      const slice = data.slice(offset, offset + perPage)
      const postData = slice.map((e, i) =>
      {
        return (<tr className='custom-table' key={i}>
            <td>{moment(e.date_n_time).format("DD MMM YYYY h:mma")}</td>
            <td>
              {
                parseInt(e.credit_debit_type) === 1 ?
                <span className="green btn-sm custom_table_button">Credited</span>
                :
                <span className="red btn-sm custom_table_button">Debited</span>
              }
              </td>
            <td>{parseFloat(e.amount)} USD</td>
            <td>
                {
                  parseInt(e.transaction_type) === 1 ?
                  <>Earned by order</>
                  :
                  parseInt(e.transaction_type) === 2 ?
                  <>Withdraw request placed</>
                  :
                  parseInt(e.transaction_type) === 3 ?
                  <>Withdraw request rejected</>
                  :
                  null
                }
              </td>
        </tr>)
      })
      setData(postData)
      setPageCount(Math.ceil(data.length / perPage))
    }
    }
  }
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Wallet</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      </Head>
      <div className="page">
        <MenuBar />

        <div className="container-dash ">
          <TopMenuBar full_name={userAgent.publisher_full_name} />
          <div className="container__body">

              <div className="panel_title_block text-center">
                <h2>My Wallet</h2>
                <p>Recieve Withdraw and Track Your Earnings</p>
              </div>
              
              <div className="wallet_blocks">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="wallet_details_block">
                      <img src="/assets/images/wallet.png" className="wallet_img" />
                      <img src="/assets/images/wallet-line.png" className="wallet_line" />
                      <h2><span>$</span> 500</h2>
                      <h4>Total Balance</h4>
                      <div className="row">
                        <div className="col-md-6 col-6">
                          <h5>$ 100</h5>
                          <h6>Available Balance</h6>
                        </div>
                        <div className="col-md-6 col-6">
                          <h5>$ 670</h5>
                          <h6>In Withdrawls</h6>
                        </div>
                      </div>
                      <div className="col-md-12 wallet_btn">
                        <p><Link href="/publisher/wallet/withdraw"><a>Withdraw</a></Link></p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-9">
                    <div className='wallet_filters'>
                      <div className="row">
                        <div className="col-lg-6">
                          <h4>Wallet Payment History</h4>
                        </div>
                        <div className="col-lg-6">
                          <div className="row">
                            <div className="col-lg-4"></div>
                            {/* <div className="col-lg-4"><p className="view_all">View All<i className="la la-angle-down"></i></p></div>
                            <div className="col-lg-4"><p className="search">Search<img src="/assets/images/search.png" /></p></div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="panel-table">
                      <div class="table-responsive">          
                        <table class="table">
                          <thead>
                            <tr>
                              <th>Date</th>
                              <th>Amount</th>
                              <th>Order</th>
                              <th>Status</th>
                              <th>View</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="table_wallet_date">12 Jul 2021 02:44 AM</td>
                              <td className="table_wallet_Amount">$ 320.00</td>
                              <td className="table_wallet_order_name">Quick Tips About Facebook</td>
                              <td className="table_wallet_status"><><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Confirmation Waiting</span></></td>
                              <td className="table_wallet_view"><Link href="#"><a className="btn cp-primary-btn view_reciept">View Reciept <img src="/assets/images/view_report.png" /></a></Link></td>
                            </tr>
                            <tr>
                              <td className="table_wallet_date">12 Jul 2021 02:44 AM</td>
                              <td className="table_wallet_Amount">$ 320.00</td>
                              <td className="table_wallet_order_name">Quick Tips About Facebook</td>
                              <td className="table_wallet_status"><><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Confirmed</span></></td>
                              <td className="table_wallet_view"><Link href="#"><a className="btn cp-primary-btn view_reciept">View Reciept <img src="/assets/images/view_report.png" /></a></Link></td>
                            </tr>
                            <tr>
                              <td className="table_wallet_date">12 Jul 2021 02:44 AM</td>
                              <td className="table_wallet_Amount">$ 320.00</td>
                              <td className="table_wallet_order_name">Quick Tips About Facebook</td>
                              <td className="table_wallet_status"><><span className="span_status_two status_rejected"></span><span className="span_status status_rejected_text">Confirmation Rejected</span></></td>
                              <td className="table_wallet_view"><Link href="#"><a className="btn cp-primary-btn view_reciept">View Reciept <img src="/assets/images/view_report.png" /></a></Link></td>
                            </tr>
                            <tr>
                              <td className="table_wallet_date">12 Jul 2021 02:44 AM</td>
                              <td className="table_wallet_Amount">$ 320.00</td>
                              <td className="table_wallet_order_name">Quick Tips About Facebook</td>
                              <td className="table_wallet_status"><><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Submitted for Review</span></></td>
                              <td className="table_wallet_view"><Link href="#"><a className="btn cp-primary-btn view_reciept">View Reciept <img src="/assets/images/view_report.png" /></a></Link></td>
                            </tr>
                            <tr>
                              <td className="table_wallet_date">12 Jul 2021 02:44 AM</td>
                              <td className="table_wallet_Amount">$ 320.00</td>
                              <td className="table_wallet_order_name">Quick Tips About Facebook</td>
                              <td className="table_wallet_status"><><span className="span_status_two status_rejected"></span><span className="span_status status_rejected_text">Modify Order</span></></td>
                              <td className="table_wallet_view"><Link href="#"><a className="btn cp-primary-btn view_reciept">View Reciept <img src="/assets/images/view_report.png" /></a></Link></td>
                            </tr>
                            <tr>
                              <td className="table_wallet_date">12 Jul 2021 02:44 AM</td>
                              <td className="table_wallet_Amount">$ 320.00</td>
                              <td className="table_wallet_order_name">Quick Tips About Facebook</td>
                              <td className="table_wallet_status"><><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Amount Received</span></></td>
                              <td className="table_wallet_view"><Link href="#"><a className="btn cp-primary-btn view_reciept">View Reciept <img src="/assets/images/view_report.png" /></a></Link></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>







                    <div className="panel-table">
                      {
                        dataLoaderStatus === false ?
                        data.length > 0
                        ?
                        <>
                        <div className="table-responsive">
                          <table className="table custom-table">
                            <thead>
                              <tr>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Txns Type</th>
                                <th>Description</th>
                              </tr>
                            </thead>
                            <tbody>
                              {data}
                            </tbody>
                          </table>
                        </div>
                        
                        </>
                        :
                        <div className="data__item text-center">
                          Sorry, No Releated data found.
                        </div>
                        :
                        <TableContentLoader row="4" col="4" />
                      }
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



            
            {/* <div className="layout">
              <div className="layout_panel my_layout_panel_x2 panel wallet_panel">
                <div className="panel_body panel_body_bg">
                  <div className="wallet_block wallet_main_block">
                    <div className="wallet_left_block">
                      <div className="wallet_first_block">
                        <p className="wallet_first_block_text">Wallet</p>
                        <p className="container__title title title_lg">$ {main_balance}</p>
                        <p className="wallet_first_block_pending">Funds Earned: $ {funds_earned}</p>
                      </div>
                      <div className="wallet_second_block">
                        <img src="/assets/img/stats-chart-1.png" width={100} />
                        <p className="wallet_first_block_pending">TotalWithdrawals: $ {funds_withdrawal}</p>
                      </div>
                      <div className="wallet_third_block">
                        <button className="btn btn-success withdraw_funds_button"><Link href="/publisher/wallet/withdraw"><a style={{ color: 'white' }}><i className="la la-wallet" style={{ marginRight: '3px' }} ></i>Withdraw Funds</a></Link></button>
                      </div>
                    </div>
                    <div className="wallet_right_block">
                      <div>
                        <img src="/assets/img/dashboard image.png" style={{ height: '161px', width: '100%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            {/* <div className="panel js-panel custom_panel">
              <div className="panel__head panel__head_line ">
                <div className="panel__group btn-group btn-group_tabs">
                  <div className="sort js-sort">
                    <div className="js-sort-head">
                        <div className="container__title title title_md">Wallet History</div>
                    </div>
                  </div>
                </div>
                <div className="panel__group">
                  <button style={{ fontSize: '14px', color: '#63a1fd' }}>Total requests ({withdraw_list.length ? withdraw_list.length : "0"})</button>
                </div>
              </div>
              
              <div className="panel__body">
                <div className="panel__tab js-panel-tab">
                  <div className="data data_list">
                    <div className="data__container panel-table">
                      <div className="data__body">
                        {
                            dataLoaderStatus === false ?
                            data.length > 0
                            ?
                            <>
                            <div className="table-responsive">
                              <table className="table custom-table">
                                <thead>
                                  <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Txns Type</th>
                                    <th>Description</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data}
                                </tbody>
                              </table>
                            </div>
                            
                            </>
                            :
                            <div className="data__item text-center">
                              Sorry, No Releated data found.
                            </div>
                            :
                            <TableContentLoader row="4" col="4" />
                        }
                      </div>
                    </div>
                  </div>
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

            </div> */}
          </div>
        </div>

      </div>
    </>
  )
}

export async function getServerSideProps({ req }) {
  const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
  if (!userAgent.publisher_token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  else {
    return { props: { userAgent: userAgent } }
  }
}


export default wallet