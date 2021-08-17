import React, {useEffect, useState} from 'react' 
import Link from 'next/link'
import Head from 'next/head'
import cookie from "cookie"
import moment from 'moment' 
import * as constants from '../../../components/constants'
import TableLoader from '../../../components/tableLoader'
import MenuBar from '../../../components/advertiser/dash_menu_bar'
import TopMenuBar from '../../../components/advertiser/dash_top_menu_bar'
import Axios from 'axios'
import ReactPaginate from 'react-paginate'; 
import TableContentLoader from '../../../components/tableLoader';
import Advertiser_filters from '../../../components/advertiser/advertiser_filters';
import { useRouter } from 'next/router'

function orders({userAgent})
{
  const router = useRouter()
    const advertiser_full_name = userAgent.advertiser_full_name
    const advertiser_token = userAgent.advertiser_token
    const [API_BASE_URL] = useState(constants.API_BASE_URL)
    const [ordersList, setOrdersList] = useState([]) 
    const [allordersList, setAllOrdersList] = useState([]) 
    const [token]=useState(advertiser_token)

    const [offset, setOffset] = useState(0);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
    const [selected_page, set_selected_page] = useState(0)
    const [dataLoaderStatus, setDataLoaderStatus] = useState(true)
    const [activeTr, setActiveTr] =useState('');

    const orderList = () => {
        const config = {
            headers: {
              "X-API-KEY": "123123",
              token: token,
            }
        }

        Axios.get(API_BASE_URL+"user/orders/list", config)
        .then(response => { 
          console.log(response)
          setDataLoaderStatus(false)
          if (response.data.status) 
          { 
            setAllOrdersList(response.data.message);
            setOrdersList(response.data.message.slice(offset, offset + perPage))
            setPageCount(Math.ceil(response.data.message.length / perPage))
          }
        })
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

  const navigateFunction=(id)=>{
    ordersList.map((e, i) => {
      router.push('/user/orders/discussion/'+e.id);
      setActiveTr(id)
    })
  }


  // ordersList.map((item, i) =>{
  //   console.log(i.length)
  // })

    useEffect(()=>{
        orderList()
    },[offset]) 

return(
<div>
<Head>
    <meta charset="utf-8" />
    <title>My Orders</title>
</Head>
<div className="page">
<MenuBar />
<div className=" container-dash">
<TopMenuBar  full_name={advertiser_full_name} />

  <div className="container__body">
    <div className='panel_title_block'>
      <h2>My Orders</h2>
      <p>Manage all your orders here.</p>
    </div>

    {/* <Advertiser_filters /> */}

      <div className="panel-table">
        {
          dataLoaderStatus === false ?
          ordersList.length > 0
          ?
          <>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Order id</th>
                    <th>Order title</th>
                    <th className="table_fields_hide">Price range</th>
                    <th className="table_fields_hide">Created on</th>
                    <th className="table_fields_hide">Ends on</th>
                    {/* <th>Platform</th> */}
                    <th>Publishers</th>
                    <th>Status</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                {
                dataLoaderStatus === false ?
                ordersList.length > 0 ?
                ordersList.map((item, i) =>{
                  const id=item.id
                return <tr key={i} onClick={()=>navigateFunction(id)} className={ activeTr === id ? "active_table_tr" : ""}>
                    <td>{i+1}</td>
                    <td className="table_ad_order_id">{item.order_id}</td>
                    <td className="table_ad_order_title">{item.title.length > 20 ? (item.title).slice(0, 15)+"..." : item.title}</td>
                    <td className="table_price_range table_fields_hide">
                      ${item.min_price} - ${item.max_price}
                    </td>
                    <td className="table_fields_hide">{moment(item.date_n_time).format("DD MMM YYYY")}</td>
                    <td className="table_fields_hide">{moment(item.end_date_n_time).format("DD MMM YYYY")}</td>
                    {/* <td></td> */}
                    <td>{item.no_of_publisher}</td>
                    <td className="table_status">
                      {
                          parseInt(item.order_status)  === 0 
                          ?
                          <><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Approval Pending</span></>
                        
                          : parseInt(item.order_status) === 1 
                          ? 
                          <><span className="span_status_two status_hire_people"></span><span className="span_status status_hire_people_text">Hire People</span></>

                          : 
                          parseInt(item.order_status) === 2 
                          ? 
                          <><span className="span_status_two status_rejected"></span><span className="span_status status_rejected_text">Rejected</span></>
                          
                          :
                          parseInt(item.order_status) === 3 
                          ? 
                          <><span className="span_status_two status_work_process"></span><span className="span_status status_work_process_text">Work Process</span></>
                          :
                          parseInt(item.order_status) === 4 
                          ? 
                          <><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Completed</span></>
                          :
                          null
                      }
                    </td>

                    {
                      parseInt(item.order_status)  === 0 ? 
                      <td>
                        <Link href={'/user/orders/discussion/'+item.id}><a title='view'>
                          <img src="/assets/images/eye.png" class="ad_orders_view" />
                        </a></Link>
                      </td>
                      : parseInt(item.order_status) === 1 ? 
                      <td>
                        <Link href={'/user/orders/hire-people/'+item.id}><a title='view'>
                          <img src="/assets/images/eye.png" class="ad_orders_view" />
                        </a></Link>
                      </td>
                      : 
                      parseInt(item.order_status) === 2 ? 
                      <td>
                        <Link href={'/user/orders/discussion/'+item.id}><a title='view'>
                          <img src="/assets/images/eye.png" class="ad_orders_view" />
                        </a></Link>
                      </td>
                      : 
                      parseInt(item.order_status) === 3 ? 
                      <td>
                        <Link href={'/user/orders/work-process/'+item.id}><a title='view'>
                          <img src="/assets/images/eye.png" class="ad_orders_view" />
                        </a></Link>
                      </td>
                      : 
                      parseInt(item.order_status) === 4 ? 
                      <td>
                        <Link href={'/user/orders/completed/'+item.id}><a title='view'>
                          <img src="/assets/images/eye.png" class="ad_orders_view" />
                        </a></Link>
                      </td>
                      :
                      null
                    }
                    
                    
                    {/* <td>{item.title.length > 25 ? (item.title).slice(0, 25)+"..." : item.title}</td>
                    <td>${parseFloat(item.min_price)} to ${parseFloat(item.max_price)}</td> */}
                    
                  </tr>
                        
                    }
                    )
                    :
                    <p className="data__item text-center">
                      <strong>Sorry, No Releated data found.</strong>
                    </p>
                    :
                    <TableLoader row="5" col="9" /> 
                
              }
                </tbody>
              </table>
            </div>
           </>
          :
          <div className="data__item text-center">
            <strong>Sorry, No Releated data found.</strong>
          </div>
          :
          <TableContentLoader row="5" col="9" />
        }


        {
          allordersList.length > 10
          ?
          <div className="panel__foot new_panel_footer">
            <div className="pager new_pager">
              <div className="pager__list pagination_element">
                <ReactPaginate
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  forcePage={selected_page}
                  pageCount={pageCount}
                  marginPagesDisplayed={10}
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
    var headers = constants.headers
    headers['token'] = userAgent.advertiser_token
    return {props: {userAgent:userAgent, headers:headers}}

  }
}

export default orders
 