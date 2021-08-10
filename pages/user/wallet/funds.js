import React,{useState, useEffect} from 'react'
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import Axios from 'axios';
import Countdown from 'react-countdown' 
import moment from 'moment'
import cookie from "cookie"
import QRCode from "react-qr-code"
import * as constants from '../../../components/constants'
import TopMenuBar from '../../../components/advertiser/dash_top_menu_bar'
import MenuBar from '../../../components/advertiser/dash_menu_bar'
import Popupmodal from '../../../components/popUpModal'
import TableContentLoader from '../../../components/tableLoader'
import ReactPaginate from 'react-paginate';


function paymentMethods(props) 
{
    const {initialMinute = 0,initialSeconds = 0, userAgent, headers} = props
    
    const advertiser_full_name = userAgent.advertiser_full_name
    const advertiser_token = userAgent.advertiser_token

    const [minutes, setMinutes ] = useState(initialMinute)
    const [seconds, setSeconds ] =  useState(initialSeconds)

    const [API_BASE_URL] = useState(constants.API_BASE_URL)
    const [eth_recieving_address] = useState(constants.eth_recieving_address)
    const [bnb_recieving_address] = useState(constants.bnb_recieving_address)
    const [btc_recieving_address] = useState(constants.btc_recieving_address)
    
    const [profile_links, setProfile_links]=useState(false); 
    const [coin_id, set_coin_id]= useState("bitcoin")
    const [coin_symbol, set_coin_symbol]=useState("BTC")
    const [payment_type, set_payment_type]=useState("1")
    const [coin_current_price, set_coin_current_price] = useState(0)
    const [amount, set_amount] = useState("")
    const [step, set_step] = useState(1)
    const [hash, set_hash] = useState("")
    const [alert_message, set_alert_message]=useState("")
    const [receivingAddress, setReceivingAddress]=useState(btc_recieving_address)


    const [funds_list, set_funds_list]=useState([])
    
    const [offset, setOffset] = useState(0);
    const [data, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0) ;
   
    const [selected_page, set_selected_page] = useState(0) 
    const [main_balance, setMainBalance] = useState(0)
    const [funds_transfer, setFundsTransfer] = useState(0)
    const [dataLoaderStatus, setDataLoaderStatus] = useState(true)
    
    const [modalData, setModalData] = useState({
        title: "",
        image_name: "",
        description: ""
      }) 

      const [timeinterval , setTimeInterval] = useState(Date.now() + 600000)

    
    const [copyLink, setCopyLink] = useState(false) 
    
    const myReferrlaLink= ()=> {
        var textField = document.createElement('textarea')
        textField.innerText = receivingAddress
        document.body.appendChild(textField)
        textField.select()
        document.execCommand('copy')
        textField.remove()
        setCopyLink(true)
          
        setTimeout(function() {
            setCopyLink(false)
        }, 5000)
    }


    useEffect(()=>
    {
      get_coin_data(coin_id)
    },[])

    const get_coin_data=(id)=>{
        Axios.get("https://api.coingecko.com/api/v3/coins/"+id)
        .then(response=>{ 
            set_coin_current_price(response.data.market_data.current_price.usd)
        })
    }
    
    const SelectedOption=(id)=> {
        set_coin_id(id)
        set_step(1)
        setTimeInterval(Date.now() + 600000)
        if(id === "bitcoin") {
            set_coin_symbol("BTC")
            set_payment_type("1")
            setReceivingAddress(btc_recieving_address)
        }
        else if(id === "ethereum") {
            set_coin_symbol("ETH")
            set_payment_type("2")
            setReceivingAddress(eth_recieving_address)
        }
        else if(id === "binancecoin") {
            set_coin_symbol("BNB")
            set_payment_type("3")
            setReceivingAddress(bnb_recieving_address)
        }
        else if(id === "paypal") {
            set_coin_symbol("USD")
            set_coin_current_price(1)
            set_payment_type("4")
            
        }

        if(id !== "paypal")
        {
            get_coin_data(id)
        } 
    } 
    const SubmitDetails=()=> {

          setModalData({
            title: "",
            image_name: "",
            description: ""
          })


          let data; 

        if(payment_type === "2")
        {
         data = {
                payment_type: payment_type,
                amount: amount,
                trans_hash: hash,
                eth_bnb_value: amount/coin_current_price,
                from_address: "",
                one_eth_bnb_rate_in_usd: coin_current_price,
                to_address: eth_recieving_address
            }  
        }
        else if(payment_type === "3"){
            data = {
                payment_type: payment_type,
                amount: amount,
                trans_hash: hash,
                eth_bnb_value: amount/coin_current_price,
                from_address: "",
                one_eth_bnb_rate_in_usd: coin_current_price,
                to_address: bnb_recieving_address
            }  
        }
        else{
            data = {
                payment_type: payment_type,
                amount: amount,
                trans_hash: hash,
            }
        }
  
        Axios.post(API_BASE_URL+"user/funds", data, headers )
        .then(response=> {
            console.log(response);
            if(response.data.status)
            {
                setModalData({
                    title: "Funds Added successfully",
                    image_name: "select.svg",
                    description: response.data.message.alert_message
                  }) 
                getData()
            }
            else
            {
                if(response.data.message.alert_message)
                {
                        setModalData({
                        title: "Alert",
                        image_name: "reject.svg",
                        description: response.data.message.alert_message
                        }) 
                }
            }
            get_coin_data('bitcoin')
            set_coin_symbol('BTC')
            set_step(1)
            set_amount('')
        })
    }

    const nextStep =()=>{
        set_step(2)
        setTimeInterval(Date.now() + 600000)
    }

    

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
        const res = await Axios.get(API_BASE_URL+'user/funds/added_funds_list', config)
        console.log(res.data.message)
        set_funds_list(res.data.message)

        if(res.data.message.length > 0) {
        const data = res.data.message
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

            
        return <tr key={e.id} className='custom-table'>
              <td>{moment(e.date_n_time).format("DD MMM YYYY")}</td>
              <td>{parseFloat(e.amount)} USD</td>
              <td>
                { 
                    e.payment_type === "1" ? "BTC" 
                    : e.payment_type === "2" ? "ETH" 
                    : e.payment_type === "3" ? "BNB" 
                    : e.payment_type === "4" ? "Paypal"
                    : null
                }
              </td>
              <td>
                <a href={tokenLink} target='_blank'>{subStrFun(e.trans_hash)}</a>
              </td>
              <td data-toggle="modal" data-target="#abc" style={{cursor:'pointer'}}>
                {
                    e.approval_status === "0" 
                    ?
                    
                    <div className="order_status_dashboard">
                        
                        <span style={{color:'#f4be5e'}}>Approval Pending</span>
                        
                    </div>
                    : e.approval_status === "1" 
                    ?
                
                    
                    <div className="order_status_dashboard">
                        
                            <span style={{color:'#39daad'}}>Approved</span>
                        
                    </div>
                    : e.approval_status === "2" 
                    ?
                    <div className="order_status_dashboard">
                        <span style={{color:'#ff808b'}}>Rejected</span>
                    </div>
                    : null
                }
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
        <meta charset="utf-8" />
        <title>Select Payment Options</title>
    </Head>
    <div className="page">
        <MenuBar />
        <div className="container-dash">
            <TopMenuBar  full_name={advertiser_full_name}/>
            <div className="container__body">
                <div className="panel_title_block">
                    <h2>My Funds</h2>
                    <p>Recieve Withdraw and Track Your Earnings</p>
                </div>

                <div className="funds_page">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="ad_wallet_amount">
                                {
                                    step === 1
                                    ?
                                        <div className="">
                                            <div className="field auth__field select_platform">
                                                <div className="field__label platform_field_label">Select Payment Type</div>
                                                <div className="field__wrap platform_field_wrap">
                                                    <div className="field__icon custom_dropdown_icon"><i className="la la-angle-down"></i></div>
                                                    <select className="field__select"  name="payment_type" onChange={(e)=>{SelectedOption(e.target.value)}}  useref="payment_type">
                                                        <option value="" disabled>Select Payment Type</option>
                                                        <option value="bitcoin">Bitcoin (BTC)</option>
                                                        <option value="ethereum">Ethereum (ETH)</option>
                                                        <option value="binancecoin">Binance (BNB)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="field auth__field select_platform">
                                                <div className="field__label platform_field_label">Enter Amount in USD</div>
                                                <div className="field__wrap platform_field_wrap">
                                                    <input className="field__input" type="number" min="1" step="0.01" value={amount} onChange={(e)=>set_amount(e.target.value)} />                                 
                                                </div>
                                            </div>
                                            <div className="field auth__field select_platform">
                                                <div className="field__label platform_field_label">Pay Amount (in {coin_symbol}) {coin_id !== "paypal" ? <span style={{float: 'right'}}>One {coin_symbol} Rate in {coin_current_price} USD</span> : null}</div>
                                                <div className="field__wrap platform_field_wrap">
                                                    <input className="field__input" type="text" value={amount ? (amount/coin_current_price).toFixed(8): ''}  readOnly={true}/>
                                                </div>
                                            </div>
                                            {
                                                amount > 0
                                                ?
                                                <div className="getQRcodeBtn"><button onClick={()=>nextStep()} className="cp-primary-btn">Get QR code or Address</button></div>
                                                :
                                                <div className="getQRcodeBtn"><button style={{opacity: 0.5}} className="cp-primary-btn">Get QR code or Address</button></div>
                                                
                                            }
                                        </div>
                                    :
                                        <div className="">

                                            <div className="">
                                                <p className='text-center'>Deposit within 
                                                    <p className='fundsAddCountDown'>{step == 2 ? <Countdown date={timeinterval} daysInHours={true} onComplete={()=>SelectedOption(coin_id)} /> : null}
                                                        <span className="fundsAddCountDownSpan">
                                                            <Link href='#'><a className='back_link' onClick={()=>SelectedOption(coin_id)} >
                                                                <i className='la la-arrow-left'></i> Back</a>
                                                            </Link>
                                                        </span>
                                                    </p>
                                                </p>

                                            </div>
                                            <p className='qr_code_title'>Scan {coin_symbol} QR Code Address or Pay Using Token Address</p>
                                            <div className='qrcodenpm'><QRCode value={receivingAddress} width='100' height='100' /></div>
                                            <div id='hmmm' className='addressToCopy'>{receivingAddress}</div>
                                            
                                            {
                                                copyLink ?
                                                <div className="addressCopyBtn"><button className="cp-primary-btn">Copied <i className="la la-copy"></i></button></div>
                                                :
                                                <div className="addressCopyBtn"><button className="cp-primary-btn" onClick={() => myReferrlaLink()}>Copy <i className="la la-copy"></i></button></div>
                                                
                                            }
                                
                                            <div className="field">
                                                <div className="field__label platform_field_label">Paste your Hash Link/Code</div>
                                                <div className="field__wrap platform_field_wrap">
                                                    <input className="field__input" onChange={(e)=>set_hash(e.target.value)} type="text" />
                                                </div>
                                            </div>  

                                            {
                                                hash
                                                ?
                                                <div className="hash_paste"><button className="cp-primary-btn" onClick={()=> SubmitDetails()}>Process Your Payment</button></div>
                                                :
                                                <div className="hash_paste"><button className="cp-primary-btn" style={{opacity: 0.5}}>Process Your Payment</button></div>
                                            }
                                            <p className='payment_instructions'>Copy the {coin_symbol} address or scan QR code and pay the amount of {amount} {coin_symbol} and next step send hash or transaction code</p>
                                            <p>{alert_message}</p>
                                        </div>
                                }
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="funds_table_block">
                                <h4>Funds Added History</h4>
                                <div className="panel-table">
                                    {
                                        dataLoaderStatus === false ?
                                        data.length > 0
                                        ?
                                        <>
                                        <div className="table-responsive">
                                            <table className="table">
                                            <thead>
                                                <tr className='custom-table'>
                                                <th>Fund Date</th>
                                                <th>Deposited Amount</th>
                                                <th>Payment Type</th>
                                                <th>Transaction hash</th>
                                                <th>Status</th>
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
                                        <TableContentLoader row="5" col="5" />
                                    } 
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
                    </div>

                </div>
                



<br></br>
<br></br>
<br></br>
<br></br>
<br></br>







                      
{/* <div className="row">
<div className="col-md-4">
 <div>
<div className="panel__body">
<div className="panel__tab js-panel-tab" >
{
step === 1
?
<div className="layout"> 
<div className="layout__panel layout__panel_x2 panel select_payments_block">
<p className='container__title title mb-4'>Place Deposit Funds Request</p>
<div className="settings">
<div className="settings__container">
    <div className="settings__inner" style={{marginBottom:'0px'}}>
        <div className="settings__tab"  data-tabs-group="settings" data-tabs-item="01">
            <div className="form form_settings">
                <div className="form__row">
                    <div className="form__col" style={{flex:'1 0 50%'}}>
                        <div className="field form__field">
                            <div className="field__label">Select Payment Type</div>
                            <div className="field__wrap">
                             <select className="field__select"  name="payment_type" onChange={(e)=>{SelectedOption(e.target.value)}}  useref="payment_type">
                                <option value="" disabled>Select Payment Type</option>
                                <option value="bitcoin">Bitcoin (BTC)</option>
                                <option value="ethereum">Ethereum (ETH)</option>
                                <option value="binancecoin">Binance (BNB)</option>
                             </select>                       
                            </div>
                            <br />
                            <div className="field__label">Enter Amount in USD</div>
                            <div className="field__wrap">
                                <input className="field__input" type="number" min="1" step="0.01" value={amount} onChange={(e)=>set_amount(e.target.value)} />                                 
                            </div>

                            <br />
                            <div className="field__label">Pay Amount (in {coin_symbol}) {coin_id !== "paypal" ? <span style={{float: 'right'}}><strong>One {coin_symbol} Rate in {coin_current_price} USD</strong></span> : null} </div>
                            <div className="field__wrap">
                            <input className="field__input" type="text" value={amount ? (amount/coin_current_price).toFixed(8): ''}  readOnly={true} />
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            amount > 0
            ?
            <span onClick={()=>nextStep()} className='btn btn-primary' style={{width:'100%'}}>Get QR code or Address</span>
            :
            <span className='btn btn-primary' style={{opacity: 0.5}}>Get QR code or Address</span>
        }
    </div>
</div>
</div>
</div>
</div> 
:
    <div className="layout">
        <div className="layout__panel layout__panel_x2 panel select_payments_block"> 
            <div className='row addFundsDeposit'>
                <div className='col-lg-2 col-md-3 col-sm-3 col-2'></div>
                <div className='col-lg-8 col-md-4 col-sm-6 col-6' style={{display:'flex',justifyContent:'center'}}>
                    <p>Deposit within 
                        <p className='fundsAddCountDown'>{step == 2 ? <Countdown date={timeinterval} daysInHours={true} onComplete={()=>SelectedOption(coin_id)} /> : null}</p>
                    </p>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-3 col-4'>
                    <Link href='#'><a className='back_link' onClick={()=>SelectedOption(coin_id)} >
                        <i className='la la-arrow-left' style={{marginRight:'10px',cursor:'pointer'}}></i> Back</a>
                    </Link>
                </div>
            </div>

            <div className="settings">
                <div className="settings__container">
                    <div className="settings__inner fundsAddSettingsInnter">
                        <div className="settings__tab" style={{display:'block'}} data-tabs-group="settings" data-tabs-item="01">
                            <div className='qr_block'>
                                <div className='qr_sub_block'>
                                <p className='container__title title_md company_payment'>Scan {coin_symbol} QR Code Address or Pay Using Token Address</p>
                                <div className='qrcodenpm'><QRCode value={receivingAddress} width='100' height='100'  style={{margin:'auto'}}/></div>
                                <div id='hmmm' className='addressToCopy'>{receivingAddress}</div>
                                    {
                                    copyLink ?
                                    <span title="Copied" className="btn btn-primary addressCopyBtn">Copied <i className="fa fa-copy" style={{marginLeft:'10px'}}></i></span>
                                    :
                                    <span title="Copy" className="btn btn-primary addressCopyBtn" onClick={() => myReferrlaLink()}>Copy<i className="fa fa-copy" style={{marginLeft:'10px'}}></i></span>
                                    }
                                </div>
                            </div>
                            <div className="form form_settings">
                                <div className="form__row">
                                    <div className="form__col" style={{flex:'1 0 50%'}}>
                                    <div className="field form__field">
                                        <div className="field__label">Paste your Hash Link/Code</div>
                                        <div className="field__wrap">
                                        <input className="field__input" onChange={(e)=>set_hash(e.target.value)} type="text" />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {
                            hash
                            ?

                            <span className='btn btn-primary' style={{width: "100%"}} onClick={()=> SubmitDetails()}>Process Your Payment</span>
                            :
                            <span className='btn btn-primary' style={{opacity: 0.5, width: "100%"}} >Process Your Payment</span>
                        }
                    <p className='payment_instructions'>Copy the {coin_symbol} address or scan QR code and pay the amount of {amount} {coin_symbol} and next step send hash or transaction code</p>
                </div>
                <p>{alert_message}</p>
            </div>
        </div>
    </div>
</div> 
}   
            </div>
        </div>
    </div> 
</div>

    <div className="col-md-8">
        <h2>Funds Added History</h2>    
        <div className="panel-table">
        {
            dataLoaderStatus === false ?
            data.length > 0
            ?
            <>
            <div className="table-responsive">
                <table className="table">
                <thead>
                    <tr className='custom-table'>
                    <th>Fund Date</th>
                    <th>Deposited Amount</th>
                    <th>Payment Type</th>
                    <th>Transaction hash</th>
                    <th>Status</th>
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
            <TableContentLoader row="5" col="5" />
        }  
         {
            funds_list.length > 10 
            ?
            <div className="panel__foot new_panel_footer">
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
    </div>
                    </div>  
                </div>*/}
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

                    
            {/* .............new modal starts here.................         */}

                <div className="funds_modal">
                    <div className="modal" id="abc">
                        <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Transaction Details</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <div className="modal_fields">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="modal_label"><p>Id</p></div>
                                        </div>
                                        <div className="col-lg-2">:</div>
                                        <div className="col-lg-5">
                                            <div className="modal_value"><p>1</p></div>    
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="modal_label"><p>Payment Type</p></div>
                                        </div>
                                        <div className="col-lg-2">:</div>
                                        <div className="col-lg-5">
                                            <div className="modal_value"><p>1</p></div>    
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="modal_label"><p>Amount</p></div>
                                        </div>
                                        <div className="col-lg-2">:</div>
                                        <div className="col-lg-5">
                                            <div className="modal_value"><p>20.00</p></div>    
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="modal_label"><p>Approval status</p></div>
                                        </div>
                                        <div className="col-lg-2">:</div>
                                        <div className="col-lg-5">
                                            <div className="modal_value"><p>1</p></div>    
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="modal_label"><p>Date and time</p></div>
                                        </div>
                                        <div className="col-lg-2">:</div>
                                        <div className="col-lg-5">
                                            <div className="modal_value"><p>2021-06-09 13:19:44</p></div>    
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <div className="modal_label"><p>Reason</p></div>
                                        </div>
                                        <div className="col-lg-2">:</div>
                                        <div className="col-lg-5">
                                            <div className="modal_value"><p>null</p></div>    
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            
            {/* ..............new modal ends here................. */}
             
        </>
    )
}


export async function getServerSideProps({query, req})
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
    const headers = {
      headers : {
        "X-API-KEY":"123123",
        "token":userAgent.advertiser_token
      }
    }
    return {props: {userAgent:userAgent, headers:headers}}
  }
}

export default paymentMethods