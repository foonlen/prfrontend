import React,{useState, useEffect} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Axios from 'axios'
import cookie from "cookie"
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import * as constants from '../../../components/constants';
import MenuBar from '../../../components/advertiser/dash_menu_bar'
import TopMenuBar from '../../../components/advertiser/dash_top_menu_bar'
import TableContentLoader from '../../../components/tableLoader'

//1:btc, 2:eth, 3:bnb, 4:paypal
export default function addFunds({userAgent}) {
    
    const advertiser_full_name = userAgent.advertiser_full_name
    const advertiser_token = userAgent.advertiser_token

    const [funds_list, set_funds_list]=useState([])
    const [API_BASE_URL] = useState(constants.API_BASE_URL)
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0) ;
   
    const [selected_page, set_selected_page] = useState(0) 
    const [main_balance, setMainBalance] = useState(0)
    const [funds_transfer, setFundsTransfer] = useState(0)
    const [dataLoaderStatus, setDataLoaderStatus] = useState(true)

    const getWalletBal = () =>
    {
        Axios.get(API_BASE_URL+"user/awallet/overview", config)
        .then(res => { 
            setDataLoaderStatus(false)
            console.log(res.data)
            if(res.data.status) 
            { 
            setMainBalance(res.data.message.main_balance)
            setFundsTransfer(res.data.message.funds_transfer)
            }
        })
    }

    const config = {
        headers : {
          "X-API-KEY": "123123",
          token: advertiser_token,
        }
      }  

    useEffect(() => {
        getData()
        getWalletBal()
    }, [offset])

    const subStrFun = (string) => {
        if(string.length > 6)
        {
            var substring = string.substr(-4, 4)+'..'+string.substr(0, 4)     
            return substring
        }
        else
        { 
            return string
        }
    }

    const handlePageClick = (e) => { 
        set_selected_page(e.selected)
        const selectedPage = e.selected;
        setOffset(selectedPage * perPage)
    }
    
    const handleprevious = (e) => {      
        set_selected_page(e-1)
        const selectedPage = e -1;
        setOffset(selectedPage * perPage)
    }

   
    const handlenext = (e) => {    
        set_selected_page(e+1)
        const selectedPage = e +1;
        setOffset(selectedPage * perPage)
    };

    const getData = async() => {
        const res = await Axios.get(API_BASE_URL+'user/awallet/get_transactions', config)
        console.log(res.data.message)
        set_funds_list(res.data.message) 
        if(res.data.message.length > 0) {
        const data = res.data.message;
                  const slice = data.slice(offset, offset + perPage)
                  const postData = slice.map(e => {
                      var tokenLink = '';

                      if(e.payment_type == 1)
                      {
                        tokenLink = 'https://www.blockchain.com/btc/tx/'+e.trans_hash
                      }
                      else if(e.payment_type == 2)
                      {
                        tokenLink = 'https://etherscan.io/tx/'+e.trans_hash
                      }
                      else if(e.payment_type == 3)
                     {
                        tokenLink = 'https://bscscan.com/tx/'+e.trans_hash
                     }

                     
                    return <tr className='custom-table'>
                          <td>{moment(e.date_n_time).format("DD MMM YYYY")}</td>
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
                                    <>Funds added to account</>
                                    :
                                    parseInt(e.transaction_type) === 2 ?
                                    <>Transferred for order</>
                                    :
                                    parseInt(e.transaction_type) === 3 ?
                                    <>Employee Pitch Rejected</>
                                    :
                                    parseInt(e.transaction_type) === 4 ?
                                    <>Publisher Request Rejected</>
                                    :
                                    null
                                }
                                
                            </td>
                        </tr>
                      
                  })
                  setData(postData)
                  setPageCount(Math.ceil(data.length / perPage))
                }
    } 

    
    return (
        <div> 
            <Head>
                <title>Manage Funds</title>
            </Head>
            <div className="page">
                <MenuBar/>
                <div className="container-dash">
                    <TopMenuBar  full_name={advertiser_full_name}/>
                    <div className="container__body">
                        <div className="panel_title_block">
                            <h2>My Wallet</h2>
                            <p>Recieve Withdraw and Track Your Earnings</p>
                        </div>

                        {/* .................new static dummy design, use this design code to integrate the functionalities for this page.......starts here.......... */}
                            <div className="wallet_top_block">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="add_funds_block">
                                            <p className="wallet_add_funds"><Link href="#"><a><i className="la la-plus"></i>Add Fund</a></Link></p>
                                            <p className="add_funds_estimated">PR4578AD Estimated Amount</p>
                                            <div className="wallet_estimated_amount">
                                                <div className="row">
                                                    <div className="col-lg-8"><h3>$ 1200.00</h3></div>
                                                    <div className="col-lg-4"><p>Pay Now</p></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="wallet_details_block locked_block">
                                            <h6>Total Balance</h6>
                                            <h3>$ 3600.30</h3>
                                            <div class="locked_amount_nav">
                                                <ul class="nav  nav-pills" id="pills-tab" role="tablist">
                                                    <li class="nav-item">
                                                        <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Locked Amount</a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Locked Amount</a>
                                                    </li>
                                                    
                                                </ul>
                                            </div>
                                            <p className="withdraw_funds"><Link href="#"><a>Withdraw my Funds <i className="la la-angle-down"></i></a></Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="wallet_second_block">
                                {/* .........advertiser wallet page page title and filter starts here.......... */}
                                <div className="wallet_filters">
                                    <div className="row">
                                        <div className="col-xl-9 col-lg-6 col-md-8 col-sm-8 col-12"> 
                                            <div className="">
                                                <h4>Wallet Payment History</h4>
                                            </div>
                                        </div>
                                        <div className="col-xl-3 col-lg-6 col-md-4 col-sm-8 col-12">
                                            <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6 ">
                                                    <div className="wallet_view_all">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" placeholder="View" />
                                                            <div class="input-group-append">
                                                                <span class="input-group-text"><img src="/assets/images/down_arrow_grey.png"  /></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                                    <div className="wallet_search">
                                                        <div class="input-group">
                                                            <input type="text" class="form-control" placeholder="Search" />
                                                            <div class="input-group-append">
                                                                <span class="input-group-text"><img src="/assets/images/search.png"  /></span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* .........advertiser wallet page page title and filter ends here.......... */}
                                
                                <div className="panel-table">
                                    <div class="table-responsive">          
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Serial Number</th>
                                                    <th>Date</th>
                                                    <th>Amount</th>
                                                    <th>Transaction Type</th>
                                                    <th>Description</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>07 Jul 2021</td>
                                                    <td>$ 350</td>
                                                    <td>BTC</td>
                                                    <td>Lorem Ipsum...</td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>10 Aug 2020</td>
                                                    <td>$ 100</td>
                                                    <td>ETH</td>
                                                    <td>Lorem Ipsum...</td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>15 Jan 2018</td>
                                                    <td>$ 200</td>
                                                    <td>BNB</td>
                                                    <td>Lorem Ipsum...</td>
                                                </tr>
                                                <tr>
                                                    <td>4</td>
                                                    <td>07 Jul 2021</td>
                                                    <td>$ 350</td>
                                                    <td>BTC</td>
                                                    <td>Lorem Ipsum...</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>







                        {/* .................new static dummy design, use this design code to integrate the functionalities for this page.........ends here........ */}




                        {/* ....original integrated page starts here...... */}

                            <div className="wallet_blocks">
                                <div className="row">
                                    <div className="col-lg-3">
                                        <div classname="wallet_details_block ad_wallets_left_block">
                                        <img src="/assets/images/wallet.png" classname="wallet_img" />
                                        <img src="/assets/images/wallet-line.png" classname="wallet_line" />
                                        <h2><span>$</span> 5062</h2>
                                        <h4>Available Balance</h4>
                                        <div classname="row">
                                            <div classname="col-md-6 col-sm-6 col-6">
                                            <h5>$ {main_balance}</h5>
                                            <h6>Go to Wallet Transaction</h6>
                                            </div>
                                            <div classname="col-md-6 col-sm-6 col-6">
                                            <h5>$ {funds_transfer}</h5>
                                            <h6>Transferred For Order</h6>
                                            </div>
                                        </div>
                                        <div classname="col-md-12 wallet_btn"><p><Link href="/user/wallet/funds"><a>Add Funds</a></Link></p></div>
                                        </div>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className='wallet_filters'>
                                        <div className="row">
                                            <div className="col-lg-12 col-md-12 col-12 col-sm-12">
                                            <h4>Wallet Payment History</h4>
                                            </div>
                                            <div className="col-lg-6 col-md-6 col-6 col-sm-6">
                                            <div className="row">
                                                <div className="col-lg-4"></div>
                                            </div>
                                            </div>
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
                                            funds_list.length > 10 
                                            ?
                                            <div className="panel__foot new_panel_footer">
                                                <div className="pager new_pager">
                                                    <div className="pager__list pagination_element"> 
                                                        <ReactPaginate 
                                                            breakLabel={"..."}
                                                            breakClassName={"break-me"}
                                                            pageCount={pageCount}
                                                            marginPagesDisplayed={2} 
                                                            onPageChange={handlePageClick}
                                                            containerClassName={"pagination"}
                                                            subContainerClassName={"pages pagination"}
                                                            activeClassName={"active"}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            null

                                        }
                                    
                                    </div>
                                </div>
                            </div>
                        {/* ........original integrated code ends here .......... */}

                        
                        
                        
                        
                        
                        {/* ...................old wallet design after successfull integration of the wallet functionalities
                                            this code should be removed........................ */}
                                            {/* <div className="panel js-panel">
                                                <div className="panel__body">
                                                    <div className="panel__tab js-panel-tab">
                                                        <div className="data data_list addFundsData">
                                                            <div className="data__container"> 
                                                                <div className="data__body">
                                                                    {
                                                                        dataLoaderStatus === false ?
                                                                        data.length > 0
                                                                        ?
                                                                        <>
                                                                        <table className="table">
                                                                            <thead>
                                                                            <tr className='custom-table'>
                                                                                <th>Transaction Date</th>
                                                                                <th>Transaction Type</th>
                                                                                <th>Amount</th>
                                                                                <th>Description</th>
                                                                            </tr>
                                                                            </thead>
                                                                            <tbody>{data}</tbody>
                                                                        </table>
                                                                        
                                                                        </>
                                                                        :
                                                                        <div className="data__item text-center">
                                                                            <strong>Sorry, No Releated data found.</strong>
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
                                                    funds_list.length > 10 
                                                    ?
                                                    <div className="panel__foot">
                                                        <div className="pager new_pager">
                                                            {
                                                            selected_page === 0
                                                            ?
                                                            <span className="pager__arrow action new_action action_icon_before" ><i className="la la-angle-left "></i>Prev</span>
                                                            :
                                                            <span onClick={()=> handleprevious(selected_page)} className="pager__arrow action new_action action_icon_before" ><i className="la la-angle-left "></i>Prev</span>
                                                            }
                                                            <div className="pager__list pagination_element"> 
                                                                <ReactPaginate 
                                                                    breakLabel={"..."}
                                                                    breakClassName={"break-me"}
                                                                    pageCount={pageCount}
                                                                    marginPagesDisplayed={2} 
                                                                    onPageChange={handlePageClick}
                                                                    containerClassName={"pagination"}
                                                                    subContainerClassName={"pages pagination"}
                                                                    activeClassName={"active"}
                                                                />
                                                            </div>
                                                            {
                                                                selected_page+1 === pageCount
                                                                ?
                                                                <span className="pager__arrow new_action action action_icon_after">Next<i className="la la-angle-right "></i></span>
                                                                :
                                                                <span onClick={()=> handlenext(selected_page)} className="pager__arrow new_action action action_icon_after">Next<i className="la la-angle-right "></i></span>
                                                            } 
                                                        </div>
                                                    </div>
                                                    :
                                                    null

                                                }
                                            </div> */}
                        {/* ...................old wallet design after successfull integration of the wallet functionalities
                        this code should be removed........................ */}
                    </div>
                </div> 
                <div className="modal fade" id="myModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content" style={{ padding:'24px', borderRadius:'13px'}}>
                            <div className="modal-header">
                                <div className="container__title title_md">Transaction Details</div>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className='modal_transaction_details_fields'>
                                    <p className="data__label">id:<span className='modal_transaction_details'>1</span></p>
                                </div>
                                <div className='modal_transaction_details_fields'>
                                    <p className="data__label">Payment Type : <span className='modal_transaction_details'>1</span></p>
                                </div>
                                <div className='modal_transaction_details_fields'>
                                    <p className="data__label">Amount : <span className='modal_transaction_details'>20.00</span></p> 
                                </div>
                                <div className='modal_transaction_details_fields'>
                                    <p className="data__label">transaction Hash : <span className='modal_transaction_details'><Link href='#'><a>0x98f1d94940a9a8dcedeb4969e317f14f17d4d42cce909fd6f5347a8f855b88b4</a></Link></span></p>
                                </div>
                                <div className='modal_transaction_details_fields'>
                                    <p className="data__label">Approval status : <span className='modal_transaction_details'>1</span></p>
                                </div>
                                <div className='modal_transaction_details_fields'>
                                    <p className="data__label">Date and time : <span className='modal_transaction_details'> 2021-06-09 13:19:44</span></p>
                                </div>
                                <div className='modal_transaction_details_fields'>
                                    <p className="data__label">Reason : <span className='modal_transaction_details'>null</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
 
        </div>
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
        return {props: {userAgent:userAgent}}
    }
}