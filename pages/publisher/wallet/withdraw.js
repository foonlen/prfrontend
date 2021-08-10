import React,{useState, useEffect} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import jsCookie from "js-cookie"
import cookie from "cookie"
import Router from 'next/router'
import moment from 'moment';
import Axios from 'axios'
import MenuBar from '../../../components/publisher/dash_menu_bar'
import TopMenuBar from '../../../components/publisher/dash_top_menu_bar'
import * as constants from '../../../components/constants'
import Popupmodal from "../../../components/popUpModal"
import TableContentLoader from '../../../components/tableLoader'


function withdraw(props) 
{
  const [userAgent]=useState(props.userAgent)
  var selected_payment_type = ''
  
  const [API_BASE_URL] = useState(constants.API_BASE_URL)
  const [payment_list_data, set_payment_list_data] = useState([])
  const [selected_address , set_selected_address]=useState("")
  const [payment_receive_type, set_payment_receive_type]=useState("")
  const [one_token_rate, set_one_token_rate]=useState(0)
  
  const [amount, set_amount]=useState(0)
  const [payment_symbol, set_payment_symbol]=useState("")
  const [current_price, set_current_price]=useState(0)
    
  const [valid_address, set_valid_address]=useState("")
  const [valid_amount, set_valid_amount]=useState("")
  const [valid_payment_method, Setvalid_payment_method]=useState("")
  
  const [main_balance, setMainBalance] = useState(0)
  const [funds_earned, fundsEarned] = useState(0)
  const [funds_withdrawal, setFundsWithdrawal] = useState(0)
  const [payment_ID, setPaymentID]=useState("")
  const [modalData, setModalData] = useState({title: "", image_name: "", description: "", redirect: ""})
  const [withdraw_list, set_withdraw_list] = useState([])
  const [offset, setOffset] = useState(0);
  const [data, setData] = useState([]);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0)
  const [selected_page, set_selected_page] = useState(0)
  const [dataLoaderStatus, setDataLoaderStatus] = useState(true)
  const [get_order_data, set_get_order_data] = useState({})


  const config = {
    headers : {
      "X-API-KEY": "123123",
      token: jsCookie.get("publisher_token"),
    }
  } 

  useEffect(()=>{ 
    get_payment_list()
    getWalletBal()
    getData()
  },[offset])

  const get_payment_list=()=>{
    Axios.get(API_BASE_URL+"publisher/withdraw/payment_receive_types", config)
    .then(response=>{ 
      if(response.data.tokenStatus){
        if(response.data.status){
          set_payment_list_data(response.data.message)
          set_payment_symbol(response.data.message[0].token_request_id)  
          get_coin_data(response.data.message[0].token_request_id, amount)
          set_selected_address(response.data.message[0].token_address) 
          set_payment_receive_type(response.data.message[0].token_id)
        }
      }
      else{
        Router.push('/publisher/logout')
      }

    })
  }

  const get_selected_address=(id)=>
  {    
    payment_list_data.map(e=>{  
        if(id == e.token_id){
          set_payment_receive_type(id)
          set_payment_symbol(e.token_request_id)
          set_selected_address(e.token_address)
          get_coin_data(e.token_request_id, amount)
        }
    })
  }

  const get_coin_data=(id, amount)=>
  { 
    Axios.get("https://api.coingecko.com/api/v3/coins/"+id)
    .then(response=>{  
      console.log(response.data.symbol);
      set_one_token_rate(response.data.market_data.current_price.usd)
      if(amount > 0){
        set_current_price(amount / response.data.market_data.current_price.usd )
      }
      setPaymentID(response.data.symbol)
    })
  }

  const get_amount=(e)=>
  { 
    set_amount(e)
    get_coin_data(payment_symbol, e)
  }

  const submit_data=()=>
  {
      setModalData({
        title: "",
        image_name: "",
        description: "",
        redirect: ""
      })
      set_valid_address("")
      set_valid_amount("")  

      let flag = true
 
      if(!payment_receive_type){
        flag = false
        Setvalid_payment_method("Please select payment recieve type.")
      }
      
      if(!selected_address)
      {
        flag = false
        set_valid_address("Payment Recieving Address field is required")
      }
      else if(selected_address.length < 15)
      {
        flag = false
        set_valid_address("Payment Recieving Address field must be greater than 15 in characters in length")
      }

      if(amount <= 0)
      {
        flag = false
        set_valid_amount("The Withdraw Amount field is required.")
      }
      else if(amount < 50)
      {
        flag = false
        set_valid_amount("The Withdraw Amount in USD field must be greater than 50.")
      } 
      else if(amount > 500)
      {
        flag = false
        set_valid_amount("The Withdraw Amount in USD field must be less than 500.")
      } 
      else if(amount > main_balance)
      {
        flag = false
        set_valid_amount("The Withdraw Amount in USD field must be less than main wallet balance.")
      } 
 
      if(flag)
      {
        const reqObj = {
          withdraw_amount_in_usd: amount,
          one_token_rate: one_token_rate,
          withdraw_amount_in_token: current_price,
          payment_receive_type: payment_receive_type,
          payment_receive_address: selected_address
        } 

        Axios.post(API_BASE_URL+"publisher/withdraw", reqObj, config)
        .then(response=>{
          if(response.data.status)
          {
            getData()
            setModalData({
              title: "Withdraw request placed successfully",
              image_name: "check.png",
              description: response.data.message.alert_message
            })

            set_valid_address("")
            set_valid_amount("")
            Setvalid_payment_method("")
            set_amount("")
            set_current_price("")
            
          } 
        })
      }
  }

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

  const get_order_details = (id) => {
    const order_data = {
      request_row_id: id
    }

    Axios.post(API_BASE_URL + 'publisher/withdraw/individual_details', order_data, config)
      .then(response => {
        if (response.data.status) {
          set_get_order_data(response.data.message)
        }
      })
  }

  const getData = async () => {
    const res = await Axios.get(API_BASE_URL + 'publisher/withdraw/withdraw_request_list', config)
    setDataLoaderStatus(false)
    if (res.data.message.length > 0) {
      set_withdraw_list(res.data.message)
      const data = res.data.message;
      const slice = data.slice(offset, offset + perPage)
      const postData = slice.map((e, i) => {
        {
          var token = ''
          e.payment_receive_type === "1"
            ?
            token = "BTC"
            :
            e.payment_receive_type === "2"
              ?
              token = "ETH"
              :
              e.payment_receive_type === "3"
                ?
                token = "BNB"
                :
                e.payment_receive_type === "4"
                  ?
                  token = "Paypal"
                  :
                  null
        }
        return <tr key={i}>
              <td className="table_withdraw_date">{moment(e.date_n_time).format("DD MMM YYYY")}</td>
              <td className="table_withdraw_payment_recieve_type">{token}</td>
              <td className="table_withdraw_rate">$ {parseFloat(e.withdraw_amount_in_usd)}</td>
              <td className="table_withdraw_token_value">
                <span style={{color:'#8181a5'}}>1 {token} Rate</span><br/>
                $ {parseFloat(e.one_token_rate)}</td>
              <td >{parseFloat(e.withdraw_amount_in_token)} {token}</td>
              <td className="table_withdraw_status">
                {
                  e.approval_status === "0"
                    ?
                      // <span style={{color:'#f4be5e'}}>Request Pending</span>
                      <><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Request Pending</span></>
                      :
                    e.approval_status === "1"
                      ?
                        //<span style={{color:'#39daad'}}>Request Success</span>
                        <><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Request Success</span></>
                        :
                      e.approval_status === "2"
                        ?
                          //<span style={{color:'#ff808b'}}>Request Rejected</span>
                          <><span className="span_status_two status_rejected"></span><span className="span_status status_rejected_text">Request Rejected</span></>
                        :
                        null
                }
              </td>
              <td className="" onClick={() => get_order_details(e.id)} data-toggle="modal" data-target="#myModal">
                <button className="table-primary-btn">View</button>
              </td>
              
            </tr>
         

      })
      setData(postData)
      setPageCount(Math.ceil(data.length / perPage))
    }
  }

    return (
        <>
            <Head>
              <meta charSet="utf-8" />
              <title>Withdraw Funds</title>
              <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
              <meta name="theme-color" content="#fff" />
            </Head>

            <div className="page">
            <MenuBar />
        
        <div className="container-dash">
          <TopMenuBar full_name={userAgent.publisher_full_name}/>
          <div className="container__body">

            
              <div className='panel_title_block'>
                <h2>Wallet Withdraw</h2>
                <p>Recieve Withdraw and Track Your Earnings</p>
              </div>
            



            {/* ..............new code starts here.................... */}
            <div className="withdraw_block">
              <div className="row">
                <div className="col-lg-4">
                  <div className="withdraw_request">
                    <h4>Place your withdraw request</h4>
                    <div className="field auth__field select_platform">
                      <div className="field__label platform_field_label">Select Platform</div>
                      <div className="field__wrap platform_field_wrap">
                        <div className="field__icon"><i className="la la-globe"></i></div>
                        <div className="field__icon custom_dropdown_icon"><i className="la la-angle-down"></i></div>
                        <select className="field__select" defaultValue={'DEFAULT'} value={payment_receive_type} onChange={(e)=> get_selected_address(e.target.value)}>
                          <option value="">Payment Type</option>
                          {
                            payment_list_data.map((e,i)=>{
                              return <option key={i} value={e.token_id}>{e.token_symbol}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className="error_class">
                      {
                        valid_payment_method
                        ?
                        <div className="field__label error_class">{valid_payment_method}</div>
                        :
                        null 
                      }
                      </div>
                    </div>
                    <div className="field auth__field select_platform">
                      <div className="field__label platform_field_label">{payment_ID ? payment_ID.toUpperCase() : ""} Recieving Address</div>
                      <div className="field__wrap platform_field_wrap">
                        <div className="field__icon"><i className="la la-globe"></i></div>
                        <input className="field__input" type="text" onChange={(e)=> set_selected_address(e.target.value)} value={selected_address} placeholder="recieve address"  />
                      </div>
                      <div className="error_class">
                      {
                        valid_address
                        ?
                      <div className="field__label error_class">{valid_address}</div>
                      :
                      null 
                      }
                      </div>
                    </div>
                    <div className="field auth__field select_platform">
                      <div className="field__label platform_field_label">Enter Amount in USD  <span style={{float: 'right'}}>Balance<strong> {main_balance} USD</strong></span></div>
                      <div className="field__wrap platform_field_wrap">
                        <div className="field__icon"><i className="la la-globe"></i></div>
                        <input className="field__input" type="number" value={amount} onChange={(e)=> get_amount(e.target.value)} placeholder="0.00" />
                        
                      </div>
                      <div className="row">
                        <div className="col-md-6 col-6">
                          <p className="form_input_limit">Min-Max: 50-500 USD</p>
                        </div>
                        <div className="col-md-6 col-6">
                        <p className="form_input_limit text-right">{current_price} {payment_ID ? payment_ID.toUpperCase() : ""}</p>
                        </div>
                      </div>
                      
                        
                      <div className="error_class">
                      {
                          valid_amount
                          ?
                        <div className="field__label error_class">{valid_amount}</div>
                        :
                        null 
                        }
                      </div>
                    </div>
                    <button className="btn cp-primary-btn" onClick={()=> submit_data()}>Submit</button>
                    </div>
                  </div>
                <div className="col-lg-8">
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
                              <th>Payment receive type</th>
                              <th>Amount</th>
                              <th>Rate</th>
                              <th>Token value</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>{data}</tbody>
                        </table>
                      </div>
                      
                      </>
                      :
                      <div className="data__item text-center">
                        <strong>Sorry, No Releated data found.</strong>
                      </div>
                      :
                      <TableContentLoader row="5" col="7" />
                    }
                  </div>
                
                </div>
              </div>
            </div>
            {/* .......................new code ends here......................... */}
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

          {/* pop up modals starts here  */}
          <div className="withdraw_popup">
            <div className="modal" id="myModal">
              <div className="modal-dialog modal-lg">
                <div className="modal-content" style={{ padding: '24px', borderRadius: '13px' }}>
                  <div className="modal-header">
                    <div className="panel__title title">Transaction Details</div>
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                  </div>
                  <div className="modal-body platform_details_invoice_row">
                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5"><p>Payment receive type</p></div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">:</div>
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                        <div className="modal_transaction_details">
                        {
                            get_order_data.payment_receive_type === "1"
                              ?
                              "BTC"
                              :
                              get_order_data.payment_receive_type === "2"
                                ?
                                "ETH"
                                :
                                get_order_data.payment_receive_type === "3"
                                  ?
                                  "BNB"
                                  :
                                  get_order_data.payment_receive_type === "4"
                                    ?
                                    "Paypal"
                                    :
                                    null
                          }
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5"><p>Amount</p></div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">:</div>
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                        <div className="modal_transaction_details">
                          $ {parseFloat(get_order_data.withdraw_amount_in_usd)}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-5  col-md-5 col-sm-5 col-5"><p>One&nbsp;
                        {
                          get_order_data.payment_receive_type === "1"
                            ?
                            "BTC"
                            :
                            get_order_data.payment_receive_type === "2"
                              ?
                              "ETH"
                              :
                              get_order_data.payment_receive_type === "3"
                                ?
                                "BNB"
                                :
                                get_order_data.payment_receive_type === "4"
                                  ?
                                  "Paypal"
                                  :
                                  null
                        }&nbsp;Rate</p>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">:</div>
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                        <div className="modal_transaction_details">
                          $ {parseFloat(get_order_data.one_token_rate)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5"><p>Token Value</p></div>
                      <div className="col-lg-2">:</div>
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                        <span className='modal_transaction_details'> {parseFloat(get_order_data.withdraw_amount_in_token)} {
                        get_order_data.payment_receive_type === "1"
                          ?
                          "BTC"
                          :
                          get_order_data.payment_receive_type === "2"
                            ?
                            "ETH"
                            :
                            get_order_data.payment_receive_type === "3"
                              ?
                              "BNB"
                              :
                              get_order_data.payment_receive_type === "4"
                                ?
                                "Paypal"
                                :
                                null
                        }</span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5"><p>Payment receive address</p></div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">:</div>
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                        <div className="modal_transaction_details">
                          {get_order_data.payment_receive_address}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-5"><p>Approval status</p></div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">:</div>
                      <div className="col-lg-5">
                        <div className="modal_transaction_details">
                        {
                          get_order_data.approval_status === "0"
                            ?
                            <span style={{color:'#f4be5e'}}>Request Pending</span>
                            :
                            get_order_data.approval_status === "1"
                              ?
                              <span style={{color:'#39daad'}}>Request Success</span>
                              :
                              get_order_data.approval_status === "2"
                                ?
                                <span style={{color:'#ff808b'}}>Request Rejected</span>
                                :
                                null
                        }
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5"><p>Date and time</p></div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">:</div>
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                        <div className="modal_transaction_details">
                          {moment(get_order_data.date_n_time).format("DD MMM YYYY HH:mm:ss a")}
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                        <p>
                          {
                            get_order_data.approval_status === "2"
                            ?
                            <p className='modal_transaction_details_fields'>Reason</p>
                            :
                            null
                          }
                        </p>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 col-2">
                      {
                            get_order_data.approval_status === "2"
                            ?
                            <div className="">:</div>
                            :
                            null
                          }
                      </div>
                      <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                        <div className="modal_transaction_details">
                          {get_order_data.reason ? get_order_data.reason : ""}
                        </div>
                      </div>
                    </div>

                    {/* <div className='modal_transaction_details_fields'>
                      <p className="data__label">Payment receive type :
                        <span className='modal_transaction_details'>
                          {
                            get_order_data.payment_receive_type === "1"
                              ?
                              "BTC"
                              :
                              get_order_data.payment_receive_type === "2"
                                ?
                                "ETH"
                                :
                                get_order_data.payment_receive_type === "3"
                                  ?
                                  "BNB"
                                  :
                                  get_order_data.payment_receive_type === "4"
                                    ?
                                    "Paypal"
                                    :
                                    null
                          }
                        </span>
                      </p>
                    </div> */}
                    {/* <div className='modal_transaction_details_fields'>
                      <p className="data__label">Amount : <span className='modal_transaction_details'>$ {parseFloat(get_order_data.withdraw_amount_in_usd)}</span></p>
                    </div> */}
                    {/* <div className='modal_transaction_details_fields'>
                      <p className="data__label">One&nbsp;
                        {
                          get_order_data.payment_receive_type === "1"
                            ?
                            "BTC"
                            :
                            get_order_data.payment_receive_type === "2"
                              ?
                              "ETH"
                              :
                              get_order_data.payment_receive_type === "3"
                                ?
                                "BNB"
                                :
                                get_order_data.payment_receive_type === "4"
                                  ?
                                  "Paypal"
                                  :
                                  null
                        }  Rate : <span className='modal_transaction_details'>$ {parseFloat(get_order_data.one_token_rate)}</span></p>
                    </div> */}
                    {/* <div className='modal_transaction_details_fields'>
                      <p className="data__label">Token Value : <span className='modal_transaction_details'> {parseFloat(get_order_data.withdraw_amount_in_token)} {
                        get_order_data.payment_receive_type === "1"
                          ?
                          "BTC"
                          :
                          get_order_data.payment_receive_type === "2"
                            ?
                            "ETH"
                            :
                            get_order_data.payment_receive_type === "3"
                              ?
                              "BNB"
                              :
                              get_order_data.payment_receive_type === "4"
                                ?
                                "Paypal"
                                :
                                null
                      }</span></p>
                    </div> */}
                    {/* <div className='modal_transaction_details_fields'>
                      <p className="data__label">Payment receive address : <span className='modal_transaction_details'>{get_order_data.payment_receive_address}</span></p>
                    </div> */}
                    {/* <div className='modal_transaction_details_fields'>
                      <div className="data__label">Approval status : <span className='modal_transaction_details'>
                        {
                          get_order_data.approval_status === "0"
                            ?
                            <span style={{color:'#f4be5e'}}>Request Pending</span>
                            :
                            get_order_data.approval_status === "1"
                              ?
                              <span style={{color:'#39daad'}}>Request Success</span>
                              :
                              get_order_data.approval_status === "2"
                                ?
                                <span style={{color:'#ff808b'}}>Request Rejected</span>
                                :
                                null
                        }</span></div>
                    </div> */}
                    {/* <div className='modal_transaction_details_fields'>
                      <p className="data__label">Date and time : <span className='modal_transaction_details'>{moment(get_order_data.date_n_time).format("DD MMM YYYY HH:mm:ss a")}</span></p>
                    </div> */}
                    {/* {
                      get_order_data.approval_status === "2"
                      ?
                      <div className='modal_transaction_details_fields'>
                        <p className="data__label">Reason : <span className='modal_transaction_details'>{get_order_data.reason ? get_order_data.reason : "-"}</span></p>
                      </div>
                      :
                      null
                    } */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        {/* pop up modals ends here  */}
            </>
    )
}
export default withdraw;

withdraw.getInitialProps=async({req})=>
{   
  const userAgent = await cookie.parse(req ? req.headers.cookie || "" : document.cookie)
  return {  userAgent } 
}