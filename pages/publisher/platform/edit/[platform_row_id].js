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

const Multiselect = dynamic(
  () => import('multiselect-react-dropdown').then(module => module.Multiselect),
  {
    ssr: false
  }
)

function addNewPlatform({userAgent, data, headers, platform_row_id})
{
  const publisher_full_name = userAgent.publisher_full_name
  const publisher_token = userAgent.publisher_token

  const [API_BASE_URL] = useState(constants.API_BASE_URL)
  const [countryList] = useState(constants.countryList)
  const [orderPlatforms, setOrderPlatforms] = useState([])
  console.log(data)
  

  const [modalMessage, setModalMessage] = useState({ title: "", image_name: "", description: "" })
  const [platform_name, setPlatformName] = useState(data.platform_name)
  const [website_link, setWebsiteLink] = useState(data.website_link)
  const [country_row_id, setCountryRowId] = useState(data.country_row_id_array)
  const [views_per_month, setViewsPerMonth] = useState(data.followers_per_month)
  const [platform_type, setPlatformType] = useState(data.platform_type)
  const [error_platform_name, setErrPlatformName] = useState('')
  const [error_platform_type, setErrPlatformType] = useState('')
  const [error_website_link, setErrWebsiteLink] = useState('')
  const [error_country_row_id, setErrCountryRowId] = useState('')
  const [error_views_per_month, setErrViewsPerMonth] = useState('')
  
  const onSelect = (selectedList, selectedItem) => {
    country_row_id.push(selectedItem.country_id)
  }

  const onRemove = (selectedList, removedItem) => {
    country_row_id.splice(country_row_id.indexOf(removedItem.country_id), 1)
  }

  const clearErr = () =>
  {
    setErrPlatformName('')
    setErrPlatformType('')
    setErrWebsiteLink('')
    setErrCountryRowId('')
    setErrViewsPerMonth('')
  }

  useEffect(() => {
    platformsServices()
  }, [])

  const platformsServices = () => 
  {
    Axios.get(API_BASE_URL + "publisher/platforms/types", headers)
      .then(response => {
        setOrderPlatforms(response.data.message)
      })
  }

  const updatePlatformDetails = () => 
  {
    let formIsValid = true
    clearErr()
    if(platform_name === '') 
    {
      setErrPlatformName('Required.')
      formIsValid = false
    }
    else if(platform_name.length < 4) 
    {
      setErrPlatformName('The Platform Name field must be at least 4 characters in length.')
      formIsValid = false
    }

    if(platform_type === '') 
    {
      setErrPlatformType('Required.')
      formIsValid = false
    }

    if (website_link === '') 
    {
      setErrWebsiteLink('Required.')
      formIsValid = false
    }
    else if(website_link.length < 4) 
    {
      setErrWebsiteLink('The Website Link field must be at least 4 characters in length.')
      formIsValid = false
    }

    if(country_row_id.length === 0) 
    {
      setErrCountryRowId('Required.')
      formIsValid = false
    }


    if(views_per_month === '') 
    {
      setErrViewsPerMonth('Required.')
      formIsValid = false
    }

    if(!formIsValid) 
    {
      return true
    }

    var reqObj = {
      request_row_id:platform_row_id,
      platform_name: platform_name,
      website_link: website_link,
      country_row_id: country_row_id,
      views_per_month: views_per_month,
      platform_type: platform_type
    }
    
    Axios.post(API_BASE_URL + "publisher/platforms/update_platform_step_one", reqObj, headers)
      .then(res => {
        console.log(res);
        if (res.data.status == true) 
        {
          setModalMessage({redirect:'/publisher/platform/service/'+platform_row_id, title: "Order Details Submitted", image_name: "select.svg", description: res.data.message.alert_message })
        }
      })
  }
  
  

    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <title>Update your Platform</title>
        </Head>

        <div className="page">
          <MenuBar />
          <div className="container-dash">
            <TopMenuBar full_name={publisher_full_name} />
            <div className="container__body">
              {/* .............Create Platform Code Starts Here............. */}
                <div className="row">
                  <div className="col-xl-4 col-lg-3"></div>
                  <div className="col-xl-4 col-lg-6">
                    <div className="addNewPlatform">
                      <div className="panel_title_block">
                        <h2>Update platforms details</h2>
                        <p>Create, verify and list your platform, open for opportunities.</p>
                      </div>

                      <div className="fields_block">
                        {/* <div className="field auth__field select_platform">
                          <div className="field__label platform_field_label">Select Platform</div>
                          <div className="field__wrap platform_field_wrap">
                            <div className="field__icon"><img src="/assets/images/youtube.png" width="22px" /></div>
                            <div className="field__icon custom_dropdown_icon"><i className="la la-angle-down"></i></div>
                            <select disabled="true" className="field__select" value={platform_type} onChange={(e) => setPlatformType(e.target.value)} name='platform_type'>
                              <option disabled="" selected="">Select Platform</option>
                              {
                                  orderPlatforms ?
                                  orderPlatforms.map((item, i) =>
                                    <option value={item.id} key={item.id} > {item.platform_name} </option>
                                  )
                                  : null
                              }
                            </select>
                          </div>
                          <div className="error_class">
                            {error_platform_type}
                          </div>
                        </div> */}


                        <div className=" create_platform_fields">
                          <div className="field auth__field select_platform">
                            <div className="field__label platform_field_label ">Select Platform <span className="validation_asteris">*</span></div>
                            <div className="field__wrap platform_field_wrap create_platform_select">
                              <div className="field__icon"><img src="/assets/images/youtube.png" width="22px" /></div>
                              <div className="field__icon custom_dropdown_icon"><img className="create_platform_img" src="/assets/images/verified.png" /> <i className="la la-angle-down"></i></div>
                              <select disabled="true" className="field__select" value={platform_type} onChange={(e) => setPlatformType(e.target.value)} name='platform_type'>
                                <option disabled="" selected="">Select Platform</option>
                                {
                                    orderPlatforms ?
                                    orderPlatforms.map((item, i) =>
                                      <option value={item.id} key={item.id} > {item.platform_name} </option>
                                    )
                                    : null
                                }
                              </select>
                            </div>
                            <div className="error_class">
                              {error_platform_type}
                            </div>
                          </div>
                        </div>
                          
                        <div className="field auth__field">
                          <div className="field__label platform_field_label">
                            {
                              platform_type === '2'
                                ?
                                <div className="platform_field_label">Name of channel or account <span className="validation_asteris">*</span></div>
                                :
                                <div className="platform_field_label">Platform Name <span className="validation_asteris">*</span></div>
                            }
                          </div>
                          <div className="field__wrap platform_field_wrap">
                          <div className="field__icon"><img src="/assets/images/channel_name.png"  /></div>
                            <input autoComplete="off" value={platform_name} onChange={(e) => { setPlatformName(e.target.value) }} className="field__input" type="text" placeholder="Platform Name" name='platform_name' />
                          </div>
                        </div>
                        <div className="error_class" >{error_platform_name}</div>
                          
                        <div className="field auth__field">
                          {/* <div className="field__label platform_field_label">{platform_type == 2 ? "Channel link" : platform_type == 3 ? "Social Media link" : "Webiste/Blog link"} <span className="validation_asteris">*</span></div> */}
                          <div className="field__label platform_field_label">{platform_type == 2 ? "Youtube channel link " :  platform_type==3 ? "Twitter account link" : platform_type==4 ? "Facebook account link" : platform_type==5 ? "Telegram account link" : platform_type== 6 ? "Instragram account Link"  : "Link"} <span className="validation_asteris">*</span></div>
                          <div className="field__wrap platform_field_wrap">
                            <div className="field__icon"><img src="/assets/images/channel_link.png" width="22px" /></div>
                            <input autoComplete="off" className="field__input" type="email" placeholder="Eg: www.demo.com" name='website_link' value={website_link} onChange={(e) => {setWebsiteLink(e.target.value)}} />
                          </div>
                        </div>
                        <div className="error_class" >{error_website_link}</div>
                          
                        <div className="field auth__field">
                          <div className="field__label platform_field_label">{platform_type == 2 ? "Select Major followers  from Countries" : platform_type == 3 ? "Select Major followers  from Countries" : "Major visitors  from Countries"} <span className="validation_asteris">*</span></div>
                          <div className="field__wrap platform_field_wrap">
                          <div className="field__icon "><img src="/assets/images/followers.png"  /></div>
                            <div className="pr_platform_country_list">
                              <Multiselect className="field__input" placeholder=""
                                options={countryList} // Options to display in the dropdown
                                selectedValues={data.country_selected_array}
                                onSelect={onSelect} // Function will trigger on select event
                                onRemove={onRemove} // Function will trigger on remove event
                                displayValue="country_name" // Property name to display in the dropdown options
                                placeholder='Select Visitors'
                              />
                            </div>
                          </div>
                        </div>
                        <div className="error_class" >{error_country_row_id}</div>
                          
                          
                        <div className="field auth__field">
                          <div className="field__label platform_field_label">{platform_type == 2 ? "Followers" : platform_type == 3 ? "Followers" : "Views per Month"} <span className="validation_asteris">*</span></div>
                          <div className="field__wrap platform_field_wrap">
                          <div className="field__icon"><img src="/assets/images/follower_count.png"  /></div>
                            <input autoComplete="off" min="0" className="field__input" type="number" placeholder={100} name='views_per_month' value={views_per_month} onChange={(e) => { setViewsPerMonth(e.target.value)}} />
                          </div>
                        </div>
                        <div className="error_class" >{error_views_per_month}</div>
                      </div>
                      <div className="text-center">
                        <Link  href={"/publisher/platform/service/"+platform_row_id}><a className="btn go_back_btn"> Go Back </a></Link>
                        <button className="btn cp-primary-btn" onClick={updatePlatformDetails}>Update Platform <i className="la la-arrow-right"></i></button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-3"></div>
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
      </>
    ) 
}


export async function getServerSideProps({query,req})
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
      return {props: {platform_row_id:platform_row_id, userAgent:userAgent, headers:token_data, data:query_run.message}}
    }
  }
}

export default addNewPlatform