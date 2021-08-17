import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Head from 'next/head';
import MenuBar from '../../../components/publisher/dash_menu_bar'
import TopMenuBar from '../../../components/publisher/dash_top_menu_bar'
import * as constants from '../../../components/constants'
import Axios from 'axios'
import ReactPaginate from 'react-paginate';
import cookie from "cookie"
import moment from 'moment'
import Popupmodal from '../../../components/popUpModal'
import TableContentLoader from '../../../components/tableLoader'
import Publisher_filters from '../../../components/publisher/publisher_filters';
import { useRouter } from 'next/router'

function platform({ userAgent }) {

  const router = useRouter()
  const publisher_full_name = userAgent.publisher_full_name
  const publisher_token = userAgent.publisher_token

  const [API_BASE_URL] = useState(constants.API_BASE_URL)
  const [platform_list, set_platform_list] = useState([])
  const [allplatformList, setAllplatformList] = useState([])
  const [offset, setOffset] = useState(0);
  const [perPage] = useState(10);
  const [pageCount, setPageCount] = useState(0)
  const [selected_page, set_selected_page] = useState(0)
  const [modalId, setModalId] = useState({});
  const [platformAction, setPlatformAction] = useState(false)
  const [dataLoaderStatus, setDataLoaderStatus] = useState(true)
  const [actionType, setActionType] = useState(0)
  const [actionID, setActionID] = useState(0)
  const [actionData, setActionData] = useState({
    title: "",
    content: ""
  })
  const [modalData, setModalData] = useState({
    title: "",
    image_name: "",
    description: ""
  })
  const [pr_plat_status,setPr_plat_status]=useState(0);
  const [activeTr, setActiveTr] =useState('');

  useEffect(() => {
    get_platform_list()

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
      token: publisher_token,
    }
  }

  Axios.get(API_BASE_URL+"publisher/dashboard/overview", config)
  .then(response=>
    setPr_plat_status(response.data.message.platform_added_status)
  )
  
  const get_platform_list = () => {
    Axios.get(API_BASE_URL + "publisher/platforms/platforms_list", config)
      .then(response => {

        console.log(response)
        setDataLoaderStatus(false)
        if (response.data.status) {
          setAllplatformList(response.data.message)
          set_platform_list(response.data.message.slice(offset, offset + perPage))
          setPageCount(Math.ceil(response.data.message.length / perPage))
        }
      })

  }

  const convertvalue = (labelValue) => {
    return Math.abs(Number(labelValue)) >= 1.0e+9

      /* eslint-disable-next-line prefer-template */
      ? Math.trunc(Math.abs(Number(labelValue)) / 1.0e+9 * 100) / 100 + "B"

      : Math.abs(Number(labelValue)) >= 1.0e+6

        /* eslint-disable-next-line prefer-template */
        ? Math.trunc(Math.abs(Number(labelValue)) / 1.0e+6 * 100) / 100 + "M"

        : Math.abs(Number(labelValue)) >= 1.0e+3

          /* eslint-disable-next-line prefer-template */
          ? Math.trunc(Math.abs(Number(labelValue)) / 1.0e+3 * 100) / 100 + "K"

          : Math.abs(Number(labelValue));

  }

  const ActionPlatform = (id, type) => {

    setModalData({
      title: "",
      image_name: "",
      description: ""
    }) 
    setActionType(type)
    setPlatformAction(true)
    setActionID(id)
    if (type === 1) 
    {
      setActionData({ title: "Enable", content: "Do you realy want to enable this Platform" })
    }
    else if (type === 2) 
    {
      setActionData({ title: "Disable", content: "Do you realy want to disable this Platform" })
    }
  }

  const enable_platform = () => {
    const config = {
      headers: {
        "X-API-KEY": "123123",
        token: publisher_token,
      }
    }

    const data = {
      request_row_id: actionID
    }

    Axios.post(API_BASE_URL + "publisher/platforms/enable", data, config)
      .then(response => {
        if (response.data.status) {
          setPlatformAction(false)
          setModalData({
            title: "Platform enabled",
            image_name: "check.png",
            description: response.data.message.alert_message
          })
          get_platform_list()
        }
      })
      .catch(error => console.log(error))
  }

  const disable_platform = () => {
    const config = {
      headers: {
        "X-API-KEY": "123123",
        token: publisher_token,
      }
    }

    const data = {
      request_row_id: actionID
    }

    Axios.post(API_BASE_URL + "publisher/platforms/disable", data, config)
      .then(response => {
        if (response.data.status) {
          setPlatformAction(false)
          setModalData({
            title: "Platform disabled",
            image_name: "check.png",
            description: response.data.message.alert_message
          })
          get_platform_list()
        }
      })
      .catch(error => console.log(error))
  }


  const subStrFun = (string) => {
    if (string.length > 15) {
      var substring = string.substr(0, 15) + ".."
      return substring
    }
    else {
      return string
    }
  }

  const navigateFunction=(id)=>{
    platform_list.map((e, i) => {
      router.push('/publisher/platform/service/' + e.id);
      setActiveTr(id)
    })
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Publisher Platforms</title>
        <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <div className="page">
        <MenuBar />

        <div className="container-dash">
          <TopMenuBar full_name={publisher_full_name} />
          <div className="container__body">
            <div className="panel_title_block">
              <h2>Manage your Platforms</h2>
              <p> Add, Edit or Remove your platforms from the tool</p>
            </div>

            {/* <Publisher_filters /> */}
              
            <div className="panel-table">
              
                <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th >#</th>
                      <th className="table_platform">Platform</th>
                      <th className="table_platform_name">Platform Name</th>
                      <th className="table_fields_hide">Services</th>
                      <th className="table_order_ends_on table_fields_hide">Listed On</th>
                      <th className="table_status">Status</th>
                      <th className="table_platform_action">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                  dataLoaderStatus === false ?
                  platform_list.length > 0 ?
                  <>
                    {
                      platform_list.map((e, i) => {
                        const id=e.id
                        return <tr onClick={()=>navigateFunction(id)} id={e.id} key={i} className={ activeTr === id ? "active_table_tr" : ""} >
                          <td>{i+1}</td>
                          <td className="text-capitalize">
                            {e.platform_type_name}
                           </td>
                          <td className="text-capitalize">{subStrFun(e.platform_name)}</td>
                          <td className="table_fields_hide">
                          {
                            e.service_data.length > 0 ?
                            e.service_data.length <= 2 ?
                              e.service_data.map((item, i) => {
                                return <span key={i} className="badges">{e.service_data.length - 1 === i ? item.service_name : item.service_name + ", "}</span>
                              })
                              :
                              <>
                              {
                                e.service_data.map((item, i) => 
                                i <= 1 ?
                                <span key={i} className="badges">{e.service_data.length - 1 === i ? item.service_name : item.service_name + ","}</span>
                                    :
                                    null 
                                )
                              }
                              <span className="one_plus_more">+{e.service_data.length-2} More..</span>
                              </>
                            :
                            <>Not Updated</>
                          }</td>
                          <td className="table_fields_hide">{moment(e.date_n_time).format("DD MMM YYYY")}</td>
                          <td>
                          {
                            parseInt(e.approval_status) === 0 ?
                              <><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">Under Verification</span></>
                            :
                            parseInt(e.approval_status) === 1 ?
                            <><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Platform Approved</span></>
                            :
                            parseInt(e.approval_status) === 2 ?
                            <><span className="span_status_two status_rejected"></span><span className="span_status status_rejected_text">Platform Rejected</span></>
                            :
                            null
                          }
                          </td>
                          
                          <td>
                            {
                              parseInt(e.approval_status) !== 2 ? 
                              <Link href={"/publisher/platform/service/" + e.id}>
                                <a>
                                  <button className="action_stroke table-primary-btn dashboard_table_btn" title='Edit'><i className="la la-edit" /></button>
                                </a>
                              </Link>  
                              :
                              <Link href={"/publisher/platform/service/" + e.id}>
                                <a>
                                  <button className="action_stroke table-primary-btn dashboard_table_btn" title='View'><i className="la la-eye" /></button>
                                </a>
                              </Link>
                            }
                            {
                              parseInt(e.approval_status) === 0 ? 
                              <>
                              {
                                parseInt(e.active_status) === 0 ?
                                <button className="green btn-sm custom_table_button dashboard_table_btn" onClick={() => ActionPlatform(e.id, 1)}>Enable</button>
                                :
                                <button className="red btn-sm custom_table_button dashboard_table_btn" onClick={() => ActionPlatform(e.id, 2)}>Disable</button>
                              }
                              </>
                              :
                              null
                            }
                            
                          
                          </td>
                          </tr>
                        })
                    }
                    </>
                    :
                    <tr>
                      <td  colspan="6">
                      <div className="text-center">
                        Sorry, No Releated data found.
                        <Link href='/publisher/platform/create-new'>
                        <a style={{color:"#5e81f4"}}>Click to create new platform</a>
                        </Link>
                      </div>
                      </td>
                    
                    </tr> 
                      :
                      <TableContentLoader row="5" col="7" />
                    } 
                  </tbody>
                </table>
              </div>
              

              {
                allplatformList.length > 10
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
                          forcePage={selected_page}
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
       
              {/* ....... */}
            </div>



           
          </div>
        </div>
      </div>
      

      {/* .....new modal design starts here........ */}
        <div className="pr_modal" >
          <div className={"modal " + (platformAction ? " show" : "")} style={platformAction ? {display: "block"} : {display: "none"}} id="platform_disable">
            <div className="modal-dialog modal-sm">
              <div className="modal-content">
                <div className="modal-body">
                  <h4>{actionData.title}</h4>
                  <p>{actionData.content}</p>
                  <div className="modal_action_buttons">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        {
                          actionType === 1
                            ?
                            <button type="button" className="btn btn-success" onClick={() => enable_platform()}>Enable</button>
                            :
                            <button type="button" className="btn custom_danger_btn" onClick={() => disable_platform()}>Disable</button>
                        }
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <button className="btn cp-primary-btn modal_close_btn" onClick={() =>setPlatformAction(false)} >Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* .....new modal design ends here........ */}


      {
        modalData.title
          ?
          <Popupmodal message={modalData} />
          :
          null
      }
    </>
  )
}

export default platform;


platform.getInitialProps = async ({ req }) => {
  const userAgent = await cookie.parse(req ? req.headers.cookie || "" : document.cookie)
  return { userAgent }
}
