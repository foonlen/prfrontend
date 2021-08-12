import React,{useState, useEffect} from 'react'
import cookie from "cookie"
import Head from 'next/head'
import Link from 'next/link'
import MenuBar from '../../../../components/publisher/dash_menu_bar'
import TopMenuBar from '../../../../components/publisher/dash_top_menu_bar'
import * as constants from '../../../../components/constants'
import Axios from 'axios'
import PopUpModal from '../../../../components/popUpModal'
import dynamic from 'next/dynamic'
import TimePicker from 'rc-time-picker'
import moment from 'moment'
import 'rc-time-picker/assets/index.css'

const Multiselect = dynamic(
  () => import('multiselect-react-dropdown').then(module => module.Multiselect),
  {
    ssr: false
  }
)

function addNewPlatform({userAgent, preData, headers, platform_row_id})
{
  const [data, setData] = useState(preData)
  const publisher_full_name = userAgent.publisher_full_name
  const [API_BASE_URL] = useState(constants.API_BASE_URL)
  const [orderServices, setOrderServices] = useState([])
  console.log('data:', data);
  
  const [modalMessage, setModalMessage] = useState({ title: "", image_name: "", description: "" })
  const [platform_name, setPlatformName] = useState(data.platform_name)
  const [website_link, setWebsiteLink] = useState(data.website_link)
  const [views_per_month, setViewsPerMonth] = useState(data.followers_per_month)
  const [platform_id, setPlatformID] = useState(data.platform_id)
  const [platform_type, setPlatformType] = useState(data.platform_type)
  const [platform_type_name, setPlatformTypeName] = useState(data.platform_type_name)
  const [services, setServices] = useState(data.services)
 
  
  
  const [service_row_id, setServiceRowId] = useState('')
  const [price, setPrice] = useState('')
  const [reference_link, setReferenceLink] = useState('')
  const [also_share_with, setAlsoShareWith] = useState([])
  const [addition, setAddition] = useState('')
  const [video_duration, setVideoDuration] = useState('')

  const [err_service_row_id, setErrServiceRowId] = useState('')
  const [err_price, setErrPrice] = useState('')
  const [err_reference_link, setErrReferenceLink] = useState('')
  const [err_also_share_with, setErrAlsoShareWith] = useState('')
  const [err_addition, setErrAddition] = useState('')
  const [err_video_duration, setErrVideoDuration] = useState('')


  const [servDelModal, setServDelModal] = useState(false)
  const [service_delete_row_id, setServiceDeleteRowId] = useState('')

  const setDeleteService = (row_id, type) =>
  {
    setServDelModal(true)
    setServiceDeleteRowId(row_id)
  }

  const subStrFun = (string) => {
    if(string.length > 12)
    {
        var substring = string.substr(-6, 6)+'..'+string.substr(0, 6)     
        return substring
    }
    else
    { 
        return string
    }
 }
  
  const delService = () =>
  {
    setServDelModal(false)
    var reqObj = {
      platform_row_id:platform_row_id,
      service_row_id:service_delete_row_id
    }
    // console.log(reqObj)
    // return
    Axios.post(API_BASE_URL + "publisher/platforms/delete_service", reqObj, headers)
      .then(res => {
        setServiceDeleteRowId('') 
        console.log(res);
        if (res.data.status == true) 
        {
          setModalMessage({title: "Service Deleted", image_name: "select.svg", description: res.data.message.alert_message })
          getOrderData()
          platformsServices()
        }
        else
        {
          if(res.data.message.alert_message)
          {
            setModalMessage({title: "Failed to Delete", image_name: "reject.svg", description: res.data.message.alert_message })
          }
        }
      })
  }

  const addToAlsoShare = (event) =>
  {  
    var isChecked = event.target.checked 
    var item = event.target.value 

    if(isChecked)
    {
      setAlsoShareWith(prev => [...prev, item]) 
    }
    else
    {
      setAlsoShareWith(also_share_with.filter((s, sindex) => item !== s))
    }
  }

  const onChange = (value)=>
  {
    setVideoDuration(value)
  }
  

  const clearErr = () =>
  {
    setErrServiceRowId('')
    setErrPrice('')
    setErrReferenceLink('')
    setErrAlsoShareWith('')
    setErrAddition('')
    setErrVideoDuration('')
  }

  const getOrderData = () =>
  {
    Axios.get(API_BASE_URL + "publisher/platforms/individual_details/"+platform_row_id, headers)
      .then(res => {
        setServices(res.data.message.services) 
      })
  }

  useEffect(() => {
    platformsServices()
  }, [])

  const platformsServices = () => 
  {
    Axios.get(API_BASE_URL + "publisher/platforms/services/"+platform_row_id, headers)
      .then(response => {
        console.log(response.data)
        setOrderServices(response.data.message)
      })
  }
  const saveService = () =>
  {
    let formIsValid = true
    clearErr()

    if(service_row_id === '') 
    {
      setErrServiceRowId('The Service field is required.')
      formIsValid = false
    } 

    if(reference_link === '') 
    {
      setErrReferenceLink('The Reference Link field is required.')
      formIsValid = false
    }
    else if(reference_link.length < 4) 
    {
      setErrReferenceLink('The Reference Link field must be at least 4 characters in length.')
      formIsValid = false
    }

    if(price === '') 
    {
      setErrPrice('The Price field is required.')
      formIsValid = false
    }
    else if(price <= 0)
    {
      flag = false
      setErrPrice("The Price field must be greater than zero.")
    } 


    if(parseInt(data.platform_type) === 2)
    { 
      if(video_duration === '' || video_duration === null) 
      {
        setErrVideoDuration('The Video Duration field is required.')
        formIsValid = false
      }
    }

    if(parseInt(data.platform_type) === 1)
    {
        if(addition === '') 
        {
          setErrAddition('The Addition field is required.')
          formIsValid = false
        }
    }

    if(!formIsValid) 
    {
      return true
    }

    var reqObj = {
      request_row_id:platform_row_id,
      service_row_id: service_row_id,
      price: price,
      reference_link: reference_link,
      also_share_with: also_share_with,
      addition: addition,
      video_duration: moment(video_duration).format('HH:mm:ss'),
    }

    // console.log(video_duration);
    // return
    Axios.post(API_BASE_URL + "publisher/platforms/create_new_step_two", reqObj, headers)
      .then(res => {
        console.log(res);
        if (res.data.status == true) 
        {
          setModalMessage({title: "New Service Added", image_name: "select.svg", description: res.data.message.alert_message })
          setServiceRowId('')
          setPrice('')
          setReferenceLink('')
          // setAddition('')
          // setAlsoShareWith([])
          getOrderData()
          platformsServices()
          
        }
      })
  }
  
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
              {
                parseInt(data.approval_status) !== 2 ?
                <title>View Services</title>
                :
                <title>Update Services</title>
              }
          
        </Head>

        <div className="page">
          <MenuBar />
          <div className="container-dash">
            <TopMenuBar full_name={publisher_full_name} />
            <div className="container__body">
              {/* .............Create Platform Code Starts Here............. */}

            <div className="panel_title_block">
              {
                parseInt(data.approval_status) !== 2 ?
                <h2>View your Services</h2>
                :
                <h2>Update your Services</h2>
              }
                  
                  <p>provide your services in detail for better findings</p>
            </div>


            <div className="services_update_blocks">
                <div className="row">
                <div className="col-lg-3 platform_overview_block">
                    <div className="platform_overview">
                    <div className="row platform_overview_row">
                        <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                        <h3>Overview</h3>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                        <div className="overview_edit">
                          {
                              parseInt(data.approval_status) !== 2 ?
                              <Link href={"/publisher/platform/edit/"+platform_row_id}><a>
                              <img src="/assets/images/edit_icon.png" />
                              </a></Link>
                              :
                              null
                          }
                        </div>
                        </div>
                    </div>
                    
                    <div className="form__col platform_form_col">
                        <div className="field form__field active">
                        <div className="field__label">Platform Type</div>
                        <div className="field__wrap update_wrap">
                            <div className="field__icon"><img src="/assets/images/youtube.png" width="22px" /></div>
                            <input className="field__input" type="text" value={platform_type_name}  />
                        </div>
                        </div>
                    </div>

                    <div className="form__col platform_form_col">
                        <div className="field form__field active">
                        <div className="field__label">Platform ID</div>
                        <div className="field__wrap update_wrap">
                            <div className="field__icon"><img src="/assets/images/channel_name.png" width="22px" /></div>
                            <input className="field__input" type="text" value={platform_id}  />
                        </div>
                        </div>
                    </div>
                
                    
                    
                    <div className="form__col platform_form_col">
                        <div className="field form__field active">
                        <div className="field__label">Platform Name</div>
                        <div className="field__wrap update_wrap">
                            <div className="field__icon"><img src="/assets/images/platform_new.png" width="22px" /></div>
                            <input className="field__input" type="text" value={platform_name}  />
                        </div>
                        </div>
                    </div>
                    <div className="form__col">
                        <div className="field form__field active">
                        <div className="field__label">Channel Link</div>
                        <div className="field__wrap update_wrap">
                            <div className="field__icon"><img src="/assets/images/channel_link.png" width="22px" /></div>
                            <input className="field__input" type="text" value={website_link} />
                        </div>
                        </div>
                    </div>
                    <div className="form__col">
                        <div className="field form__field active">
                        <div className="field__label">Channel Followers</div>
                        <div className="field__wrap update_wrap">
                            <div className="field__icon"><img src="/assets/images/follower_count.png" /></div>
                            <input className="field__input" type="text" value={views_per_month} />
                        </div>
                        </div>
                    </div>

                    <div className="form__col">
                        <div className="field form__field active">
                        <div className="field__label">Status</div>
                        <div className="field__wrap update_wrap">
                           <div className="mt-3">
                           {
                             parseInt(data.approval_status) === 0 ?
                             <><p className="services_status"><img src="/assets/images/work_process.png" />In Verification</p></>
                             :
                             parseInt(data.approval_status) === 1 ?
                             <><p className="services_status"><img src="/assets/images/ok_green.png" />Platform Approved</p></>
                             :
                             parseInt(data.approval_status) === 2 ?
                             <><p className="services_status"><img src="/assets/images/rejected.png" />Platform Rejected</p></>
                             :
                             null
                           }
                           </div>
                        </div>
                        </div>
                    </div>

                      {
                      parseInt(data.approval_status) === 2 ?
                      <div className="form__col">
                          <div className="field form__field active">
                          <div className="field__label">Rejected Reason</div>
                          <div className="field__wrap update_wrap">
                            <div className="mt-3">
                              {data.reason_for_reject}
                            </div>
                          </div>
                          </div>
                      </div>
                       :
                       null
                     }  
                    
                    

                      <div className="followers">
                        <p>Followers from </p>
                        <div className="followers_count">
                          {
                              data.country_selected_array.length > 0 ?
                              data.country_selected_array.map((item, i) =>
                              <span className="btn-sm gray platform_countries" key={i++}>{item.country_name}</span> 
                              ) 
                              :
                              null
                          }
                        </div>
                      </div>
                    </div>
                </div>
                


                <div className="col-lg-9 platform_overview_block">
                
                    <div className="services_list_block">
                    <h3 className="mb-4">Services</h3>
                    
                    {
                  parseInt(data.approval_status) !== 2 ?
                  <>
                  <h5 className="mb-2">Add New Service</h5>
                    <div className="row">
                        <div className="col-md-7 add_new_services services_edit">
                     
                        <div className="row">
                            <div className="col-lg-5 col-md-4">
                            <div className="form-group">
                                <label htmlFor="email">Service</label>
                                <select className="form-control"  onChange={(e) => setServiceRowId(e.target.value)} name='service_row_id' >
                                <option disabled="" selected="">Select Service</option>
                                {
                                    orderServices.length > 0 ?
                                    orderServices.map((item, i) =>
                                      <option value={item.id} key={item.id} > {item.service_name} </option>
                                    )
                                    : null
                                }
                                </select>
                            </div>
                            <div className="error_class">
                              {err_service_row_id}
                            </div>
                            </div>
                            




                            <div className="col-lg-3 col-md-4">
                              <div className="form-group">
                                  <label htmlFor="email">Price</label>
                                  <input className="form-control" type="text" placeholder="$ 00.00"  value={price} onChange={(e) => setPrice(e.target.value)} name='price' />
                              </div>
                              <div className="error_class">
                                {err_price}
                              </div>
                            </div>
                            

                            <div className="col-lg-4 col-md-4">
                              <div className="form-group">
                                <label htmlFor="email">Reference Link</label>
                                <input className="form-control" type="text" placeholder="https://"   value={reference_link} onChange={(e) => setReferenceLink(e.target.value)} name='reference_link' />
                              </div>
                              <div className="error_class">
                                {err_reference_link}
                              </div>
                            </div> 
                        </div>
                      </div>
                                

                    <div className="col-md-5 add_new_services services_edit">
                      <div className="row">
                        {
                            parseInt(data.platform_type) === 2 ?
                            <div className="col-lg-4 ">
                            <div className="form-group">
                                <label htmlFor="email">Video Duration</label>
                                <TimePicker className="form-control"
                                    placeholder="HH:MM:SS"
                                    value={video_duration}
                                    showSecond={true}
                                    defaultValue={0} 
                                    onChange={onChange}
                                  />  
                            </div>
                            <div className="error_class">
                              {err_video_duration}
                            </div>
                          </div>
                            :
                          null
                        }
                        
                        {
                             parseInt(data.platform_type) === 1 ?
                            <div className="col-lg-4 col-md-4 col-sm-6 col-12">
                              <div className="field form__field follow_unfollow_block">
                                <div className="field__label follow_unfollow">Addition</div>
                                <div className="pr_platform_website_share_block ">
                                  <div className="form-check form-check-inline " >
                                    <input className="form-check-input " type="radio" value="1" name="addition"  onChange={(e) => setAddition(e.target.value)} readOnly  />
                                    <label className="form-check-label ">Follow</label>
                                  </div>
                                  <div className="form-check form-check-inline"  >
                                    <input className="form-check-input" type="radio" value="2" name="addition"  onChange={(e) => setAddition(e.target.value)} readOnly />
                                    <label className="form-check-label">Unfollow</label>
                                  </div>
                                </div>
                              </div>
                              <div className="error_class">{err_addition}</div>
                            </div>
                            :
                            null
                           }

                          <div className="col-lg-5 col-md-4 col-sm-6 col-12">
                            <div className="form-group">
                              <label htmlFor="email">Also Share With</label>
                              <div className="pr_platform_website_share_block">
                                <div className="form-check"  >
                                  <input className="form-check-input" type="checkbox" value="1" onChange={e => addToAlsoShare(e)} readOnly/>
                                  <label className="form-check-label">
                                    Social Media
                                  </label>
                                </div>
                              

                                {
                                  parseInt(data.platform_type) === 1 ?
                                  <div className=''>
                                    <div className="form-check">
                                      <input className="form-check-input" type="checkbox" value="2" onChange={e => addToAlsoShare(e)} readOnly/>
                                      <label className="form-check-label">
                                        Newsletter
                                      </label>
                                    </div>
                                  </div>
                                    :
                                    null
                                }
                                
                              </div>
                            </div> 
                              <div className="error_class">
                                {err_also_share_with}
                              </div>     
                          </div> 




                            <div className="col-lg-3 col-md-4 col-sm-12 col-6 save_service">
                            <div className="form-group ">
                                <button className="btn btn-success" onClick={saveService}>Save</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </>
                    :
                      null
                  }
                           
                     {/* bootstrap table starts here */}
                        <h5 className="mb-2 mt-4">Listed Services</h5>

                          <div className="panel-table">
                            <div className="table-responsive">
                              <table className="table platform_update">
                                <thead>
                                  <tr>
                                    <th>Services</th>
                                    <th>Price</th>
                                    <th>Reference Link</th>
                                    <th>Also Share With</th>
                                      {
                                        parseInt(data.platform_type) === 2 ?
                                        <th>Duration</th>
                                        :
                                        null
                                      }

                                      {
                                        parseInt(data.platform_type) === 1 ?
                                        <th>Addition</th>
                                        :
                                        null
                                      }

                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody> 
                                  {
                                    services.length > 0 ?
                                    services.map((item2,i) => 
                                    <tr key={i}>
                                      <td className="table_service">{item2.service_name}</td>
                                      <td className="table_services_price">$ {parseFloat(item2.price)}</td>
                                      
                                      <td><a href={item2.reference_link} target="_blank">{item2.reference_link}</a></td>
                                      <td className="table_social_media">
                                        {
                                          item2.also_share_with.includes('1') ?
                                          <span className="btn-sm blue mr-1">
                                          Social Media
                                          </span>
                                          :
                                           null 
                                        } 

                                        {
                                          item2.also_share_with.includes('2') ?
                                          <span className="btn-sm blue ">
                                            Newsletter
                                          </span>
                                          :
                                          null
                                        }
                                      </td>

                                      {
                                        parseInt(data.platform_type) === 1 ?
                                        <td className="table_follow_unfollow">
                                          {
                                            parseInt(item2.addition) === 1 ?
                                            <>
                                              <span class="badge custom_badge_success">Follow</span>
                                            </>
                                            :
                                            
                                            parseInt(item2.addition) === 2 ?
                                            <>
                                              <span class="badge custom_badge_danger">UnFollow</span>
                                            </>
                                            :
                                            null  
                                          }
                                        </td>
                                        :
                                        null
                                      }

                                      {
                                        parseInt(data.platform_type) === 2 ?
                                        <td className="table_video_duration">{item2.video_duration}</td>
                                        :
                                        null
                                      }
                                      {
                                        parseInt(item2.approval_status) === 1 ?
                                        <td className="table_wallet_status"><><span className="span_status_two status_accepted"></span><span className="span_status status_accepted_text">Verified</span></></td>
                                        :
                                        <td className="table_wallet_status"><><span className="span_status_two status_pending"></span><span className="span_status status_pending_text">In Verification</span></></td>
                                      }

                                      {
                                        parseInt(data.approval_status) !== 2 ?
                                        <td>
                                          <img title="Delete" onClick={() => {setDeleteService(item2.id)}} src="/assets/images/delete.png" />
                                        </td>
                                        :
                                        <td></td>
                                      }
                                     
                                    </tr>
                                    )
                                    :
                                    null
                                  }
                                  
                                 
                                </tbody>
                              </table>
                            </div>
                            </div>
                      {/* bootstrap table ends here */} 
                   
                    </div>
                </div>
                </div>
            </div>
            </div>
          </div>
        </div>

        {
        modalMessage.title
            ?
            <PopUpModal message={modalMessage} />
            :
            null
        }

        <div className="pr_modal reject_platform_modal">
          <div className={"modal "+(servDelModal ? " show" : "")} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-sm"  role="document">
                <div className="modal-content ">
                    <div className="modal-body text-center">
                      <img className="modal_cancel_img" src="/assets/images/cancel.png" /> 
                      <h5 className="modal-description mb-2">Delete Service !</h5>
                      <p className="modal-description mb-2">Do You Really Want to Delete This Service?</p>
                        {/* <button type="button" className="btn close_modal"  onClick={() => setServDelModal(false)}>Close</button>
                        <button type="button" className="btn cp-primary-btn"  onClick={delService}>Confirm</button> */}
                      <div className="confim_action_btn">
                        <button className="btn close_modal order_accept_modal_btn" data-dismiss="modal" onClick={() => setServDelModal(false)}>Reject</button>
                        <button className="btn cp-primary-btn modal_disable " onClick={delService}>Confirm</button>
                      </div>
                    </div>
                </div>
            </div> 
          </div>
        </div>
        
      </>
    ) 
}


export async function getServerSideProps({query, req})
{ 
  const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
  const platform_row_id = query.platform_row_id

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
    const token_data = {
      headers : {
        "X-API-KEY":"123123",
        "token":userAgent.publisher_token
      }
    }
    const API_BASE_URL = constants.API_BASE_URL
    const query = await fetch(API_BASE_URL+"publisher/platforms/individual_details/"+platform_row_id, token_data)
    const query_run = await query.json()
    if(query_run.status === false)
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
      return {props: {platform_row_id:platform_row_id, userAgent:userAgent, headers:token_data, preData:query_run.message}}
    }
  }
}

export default addNewPlatform