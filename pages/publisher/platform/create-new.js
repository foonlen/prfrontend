import React,{useState, useEffect} from 'react'
import cookie from "cookie"
import Link from 'next/link'
import Head from 'next/head'
import MenuBar from '../../../components/publisher/dash_menu_bar'
import TopMenuBar from '../../../components/publisher/dash_top_menu_bar'
import * as constants from '../../../components/constants'
import Axios from 'axios'
import PopUpModal from '../../../components/popUpModal'
import dynamic from 'next/dynamic'

const Multiselect = dynamic(
  () => import('multiselect-react-dropdown').then(module => module.Multiselect),
  {
    ssr: false
  }
)

function addNewPlatform({userAgent, data, headers})
{
  const publisher_full_name = userAgent.publisher_full_name
  const publisher_token = userAgent.publisher_token

  const [API_BASE_URL] = useState(constants.API_BASE_URL)
  const [countryList] = useState(constants.countryList)
  const [orderPlatforms] = useState(data)
  console.log(data);
  
  const [modalMessage, setModalMessage] = useState({ title: "", image_name: "", description: "" })
  const [platform_name, setPlatformName] = useState('')
  const [website_link, setWebsiteLink] = useState('')
  const [country_row_id, setCountryRowId] = useState([])
  const [views_per_month, setViewsPerMonth] = useState('')
  const [platform_type, setPlatformType] = useState('')
  const [platform_type_image, setPlatformTypeImage] = useState('')
  const [error_platform_name, setErrPlatformName] = useState('')
  const [error_platform_type, setErrPlatformType] = useState('')
  const [error_website_link, setErrWebsiteLink] = useState('')
  const [error_country_row_id, setErrCountryRowId] = useState('')
  const [error_views_per_month, setErrViewsPerMonth] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [redirect_service_link, setRedirectServiceLink] = useState('')
  
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

  const setFunPlatformType = (type) =>
  {
    //alert(type)
    setPlatformType(type)
    if(type === '')
    {
      setPlatformTypeImage('')
    }
    else
    {
      
      for (const item of orderPlatforms)
      {
        if(item.id === type)
        {
          setPlatformTypeImage(API_BASE_URL+'assets/images/platforms/'+item.platform_image)
        }
      }
    }
    
    // orderPlatforms.map(item => {
      
    // })
    // setPlatformTypeImage
    // platform_type_image
  }

  const savePlatformDetails = () => 
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
      platform_name: platform_name,
      website_link: website_link,
      country_row_id: country_row_id,
      views_per_month: views_per_month,
      platform_type: platform_type
    }
    
    Axios.post(API_BASE_URL + "publisher/platforms/create_new_step_one", reqObj, headers)
      .then(res => {
        console.log(res);
        if (res.data.status == true) 
        {
          setShowModal(true)
          setRedirectServiceLink('/publisher/platform/service/'+res.data.message.platform_row_id)
          // setModalMessage({redirect:, title: "Order Details Submitted", image_name: "select.svg", description: res.data.message.alert_message })
        }
      })
  }
  
  
    return (
      <>
        <Head>
          <meta charSet="utf-8" />
          <title>Add New Platform</title>
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
                        <h2>Add new platform</h2>
                        <p>Create, verify and list your platform, open for opportunities.</p>
                      </div>

                      <div className="fields_block">
                        
                          
                          <div className=" create_platform_fields">
                            <div className="field auth__field select_platform">
                              <div className="field__label platform_field_label ">Select platform <span className="validation_asteris">*</span></div>
                              <div className="field__wrap platform_field_wrap create_platform_select">
                                  <div className="field__icon">
                                    {
                                      platform_type_image ?
                                      <img src={platform_type_image} width="22px" />
                                      :
                                      null
                                    }
                                  
                                  </div>
                                <div className="field__icon custom_dropdown_icon">
                                  {/* <img className="create_platform_img" src="/assets/images/verified.png" />  */}
                                <i className="la la-angle-down"></i></div>
                                <select className="field__select" value={platform_type} onChange={(e) => setFunPlatformType(e.target.value)} name='platform_type'>
                                  <option value="" selected="">Select your platform</option>
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
                       
                          <div className="create_platform_fields">
                            <div className="field auth__field">
                              <div className="field__label platform_field_label">
                                {
                                  platform_type === '2'
                                    ?
                                    <div className="platform_field_label">Name of channel or account <span className="validation_asteris">*</span></div>
                                    :
                                    <div className="platform_field_label">Platform name*</div>
                                }
                              </div>
                              <div className="field__wrap platform_field_wrap">
                              <div className="field__icon"><img src="/assets/images/channel_name.png"  /></div>
                                <input autoComplete="off" value={platform_name} onChange={(e) => { setPlatformName(e.target.value) }} className="field__input" type="text" placeholder="Platform Name" name='platform_name' />
                              </div>
                            </div>
                            <div className="error_class" >{error_platform_name}</div>
                          </div>

                          <div className="create_platform_fields">
                            <div className="field auth__field">
                              {/* <div className="field__label platform_field_label">{platform_type == 2 ? "Channel link*" : platform_type == 3 ? "Social Media link*" : "Link*"}</div> */}
                              <div className="field__label platform_field_label">{platform_type == 2 ? "Youtube channel link " :  platform_type==3 ? "Twitter account link" : platform_type==4 ? "Facebook account link" : platform_type==5 ? "Telegram account link" : platform_type== 6 ? "Instragram account Link"  : "Link"} <span className="validation_asteris">*</span></div>
                              
                              <div className="field__wrap platform_field_wrap">
                                <div className="field__icon"><img src="/assets/images/channel_link.png" width="22px" /></div>
                                <input autoComplete="off" className="field__input" type="email" placeholder="Eg: www.demo.com" name='website_link' value={website_link} onChange={(e) => {setWebsiteLink(e.target.value)}} />
                              </div>
                            </div>
                            <div className="error_class" >{error_website_link}</div>
                          </div>
                          
                          <div className="create_platform_fields">
                            <div className="field auth__field">
                              <div className="field__label platform_field_label">{platform_type == 2 ? "Select Major followers  from Countries" : platform_type == 3 ? "Select Major followers  from Countries" : "Major visitors  from Countries"} <span className="validation_asteris">*</span></div>
                              <div className="field__wrap platform_field_wrap">
                              <div className="field__icon "><img src="/assets/images/followers.png"  /></div>
                                <div className="pr_platform_country_list">
                                  <Multiselect className="field__input" placeholder=""
                                    options={countryList} // Options to display in the dropdown
                                    onSelect={onSelect} // Function will trigger on select event
                                    onRemove={onRemove} // Function will trigger on remove event
                                    displayValue="country_name" // Property name to display in the dropdown options
                                    placeholder='Select Visitors'
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="error_class" >{error_country_row_id}</div>
                          </div>
                          <div className="create_platform_fields">
                            <div className="field auth__field ">
                              <div className="field__label platform_field_label">{platform_type == 2 ? "Followers" : platform_type == 3 ? "Followers" : "Views per month"} <span className="validation_asteris">*</span></div>
                              <div className="field__wrap platform_field_wrap">
                              <div className="field__icon"><img src="/assets/images/follower_count.png"  /></div>
                                <input autoComplete="off" min="0" className="field__input" type="number" placeholder={100} name='views_per_month' value={views_per_month} onChange={(e) => { setViewsPerMonth(e.target.value)}} />
                              </div>
                            </div>
                            <div className="error_class" >{error_views_per_month}</div>
                          </div>
                          
                        

                      </div>
                      <div className="create_platform">
                        <button className="btn cp-primary-btn" onClick={() => {savePlatformDetails() }}>Create platform <i className="la la-arrow-right"></i></button>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-3"></div>
                </div>

               
                  
                {/* new modal design code ends here */}
              
            </div>
          </div>
        </div>
        {/* new modal design code starts here */}
        <div class="platform_create_modal">
            <div class={"modal "+(showModal ? " show": null)} id="thats_great">
              <div class="modal-dialog modal-md">
                <div class="modal-content">
                  <div class="modal-body">
                    <h3>That's Great !</h3>
                    <p className="platform_create_status">Your platform has been submitted for verification.</p>
                    <p className="platform_create_notice">You will recieve an email within 24 hours <br></br>about the review.</p>
                    <div className="guide_block">
                      <Link href={redirect_service_link}><a  className="btn cp-primary-btn mr-1">Add services</a></Link>
                      <Link href="/publisher/platform"><a  className="btn custom_secondary_button">Close</a></Link>
                    </div>
                    <img src="/assets/images/thats_great.png" />
                  </div>
                </div>
              </div>
            </div>
        </div>
        {/* new modal design code ends here */}  
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
    const token_data = {
      headers : {
        "X-API-KEY":"123123",
        "token":userAgent.publisher_token
      }
    }
    const API_BASE_URL = constants.API_BASE_URL
    const query = await fetch(API_BASE_URL+"publisher/platforms/types", token_data)
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
      return {props: {userAgent:userAgent, headers:token_data, data:query_run.message}}
    }
  }
}

export default addNewPlatform