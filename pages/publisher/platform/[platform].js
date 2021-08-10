import React, { Component } from 'react'
import cookie from "cookie"
import Link from 'next/link'
import Head from 'next/head';
import MenuBar from '../../../components/publisher/dash_menu_bar'
import TopMenuBar from '../../../components/publisher/dash_top_menu_bar'
import * as constants from '../../../components/constants'
import jsCookie from "js-cookie"
import Axios from 'axios';
import { withRouter } from 'next/router'
import Popupmodal from '../../../components/popUpModal'

import moment from 'moment' 
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import dynamic from 'next/dynamic';

const Multiselect = dynamic(
  () => import('multiselect-react-dropdown').then(module => module.Multiselect),
  {
    ssr: false
  }
)

class UpdatePlatform extends Component {

  static async getInitialProps({ req }) {
    const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
    return { userAgent }
  }

  constructor(props) {
    super(props)
    const { userAgent } = this.props
    this.state = {
      token: jsCookie.get('publisher_token'),
      publisher_full_name: userAgent.publisher_full_name,
      countryList: constants.countryList,
      api_base_url: constants.API_BASE_URL,
      valid: constants.valid,

      platform_name: '',
      platform_type: '',
      website_link: '',
      country_row_id: [],
      views_per_month: '',

      selected_country: [],

      error_platform_name: '',
      error_platform_type: '',
      error_website_link: '',
      error_country_row_id: '',
      error_views_per_month: '',
      alert_msg: "",


      error_services: '',

      error_id: 0,
      error_field: "",
      error_type: "",
      news_services: [],
      youtube_services: [],
      social_services: [],

      all_services: [],
      modal_data: {
        title: "",
        image_name: "",
        description: "",
        redirect: ""
      }
    }
    this.onRemove = this.onRemove.bind(this)
    this.onSelect = this.onSelect.bind(this)
  }

  componentDidMount() {
    this.getPlateformData()
    this.PlatformServices()
  }


  getPlateformData() {

    const config = {
      headers: {
        "X-API-KEY": "123123",
        token: jsCookie.get("publisher_token"),
      }
    }

    Axios.get(this.state.api_base_url + "publisher/platforms/individual_details/" + this.props.router.query.platform, config)
      .then(response => {
        if (response.data.status) {
          let data = response.data.message
          this.setState({
            platform_name: data.platform_name,
            platform_type: data.platform_type,
            website_link: data.website_link,
            views_per_month: data.followers_per_month,
            country_row_id: data.country_row_id,
          })

          var countries = data.country_row_id;
          countries = countries.split(",");

          this.setState({ country_row_id: countries })

          countries.map((e) => {
            this.state.countryList.map((item) => {
              if (e === item.country_id) {
                this.state.selected_country.push(item)
              }
            })
          })

          if (data.platform_type === "1") {
            this.setState({ news_services: data.service_data })
          }
          if (data.platform_type === "2") {
            this.setState({ youtube_services: data.service_data })
          }
          if (data.platform_type === "3") {
            this.setState({ social_services: data.service_data })
          }
        }
      })
  }

  PlatformServices = () => {
    const config = {
      headers: {
        "X-API-KEY": "123123",
        token: jsCookie.get("publisher_token"),
      }
    }

    Axios.get(this.state.api_base_url + "advertiser/orders/platforms", config)
      .then(response => {
        this.setState({ all_services: response.data.message })
      })
  }

  savePlatformDetails = () => {
    let time_exp = /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/i

    let flag = true

    this.setState({
      error_platform_name: '',
      error_platform_type: '',
      error_website_link: '',
      error_country_row_id: '',
      error_views_per_month: '',
      error_id: "",
      error_field: "",
      error_type: "",
      modal_data: {
        title: "",
        image_name: "",
        description: "",
        redirect: ""
      }
    })

    const { platform_type, news_services, api_base_url, youtube_services, social_services, platform_name, website_link, country_row_id, views_per_month, valid } = this.state

    const config = {
      headers: {
        "X-API-KEY": "123123",
        token: jsCookie.get("publisher_token"),
      }
    }

    let data;

    if (platform_type === "1") {

      data = {
        platform_name: platform_name,
        platform_type: platform_type,
        website_link: website_link,
        country_row_id: country_row_id,
        views_per_month: views_per_month,
        services: news_services,
        request_row_id: this.props.router.query.platform
      }
      news_services.map((e, i) => {
        if (!e.service_row_id) {
          flag = false
          this.setState({ error_id: i, error_type: "service_row_id", error_field: "service field is required" })
        }
        else if (Number.parseFloat(e.price) <= 0 || !e.price) {
          flag = false
          this.setState({ error_id: i, error_type: "price", error_field: "Prices must be greater then 0" })
        }
        else if (!e.reference_link || e.reference_link.length < 4) {
          flag = false
          this.setState({ error_id: i, error_type: "reference_link", error_field: "The reference link must be at least 4 characters." })
        }
        else if (!e.also_share_with || e.also_share_with.length <= 0) {
          flag = false
          this.setState({ error_id: i, error_type: "also_share_with", error_field: "Also share with field is required" })
        }
        else if (!e.addition) {
          flag = false
          this.setState({ error_id: i, error_type: "addition", error_field: "Addition field is required" })
        }
      })
    }
    else if (platform_type === "2") {
      data = {
        platform_name: platform_name,
        platform_type: platform_type,
        website_link: website_link,
        country_row_id: country_row_id,
        views_per_month: views_per_month,
        services: youtube_services,
        request_row_id: this.props.router.query.platform
      }

      youtube_services.map((e, i) => {

        if (!e.service_row_id) {
          flag = false
          this.setState({ error_id: i, error_type: "service_row_id", error_field: "service field is required" })
        }
        else if (!(time_exp.test(e.video_duration))) {
          flag = false
          this.setState({ error_id: i, error_type: "video_duration", error_field: "Video duration field is must be HH:MM:SS format and valid time" })
        }
        else if (Number.parseFloat(e.price) <= 0 || !e.price) {
          flag = false
          this.setState({ error_id: i, error_type: "price", error_field: "Prices must be greater then 0" })
        }
        else if (!e.reference_link || e.reference_link.length < 4) {
          flag = false
          this.setState({ error_id: i, error_type: "reference_link", error_field: "The reference link must be at least 4 characters." })
        }
      })

    }
    else {
      data = {
        platform_name: platform_name,
        platform_type: platform_type,
        website_link: website_link,
        country_row_id: country_row_id,
        views_per_month: views_per_month,
        services: social_services,
        request_row_id: this.props.router.query.platform
      }
      social_services.map((e, i) => {
        if (!e.service_row_id) {
          flag = false
          this.setState({ error_id: i, error_type: "service_row_id", error_field: "service field is required" })
        }
        else if (Number.parseFloat(e.price) <= 0 || !e.price) {
          flag = false
          this.setState({ error_id: i, error_type: "price", error_field: "Prices must be greater then 0" })
        }
        else if (!e.reference_link || e.reference_link.length < 4) {
          flag = false
          this.setState({ error_id: i, error_type: "reference_link", error_field: "The reference link must be at least 4 characters." })
        }
      })
    }

    if (!platform_name) {
      flag = false
      this.setState({ error_platform_name: "Platform name field must be required" })
    }
    else if (!((valid.name).test(platform_name))) {
      flag = false
      this.setState({ error_platform_name: "Platform name must be min 4 characters length and only accepts alphabets" })
    }

    if (!website_link) {
      flag = false
      this.setState({ error_website_link: "Website name field must be required" })
    }
    else if (website_link.length < 4) {
      flag = false
      this.setState({ error_website_link: "Website name must be at least 4 characters" })
    }

    if (country_row_id.length < 1) {
      flag = false
      this.setState({ error_country_row_id: "Country field must be required" })
    }

    if (!views_per_month) {
      flag = false
      this.setState({ error_views_per_month: "Views per month must be required" })
    }
    else if (views_per_month < 0) {
      flag = false
      this.setState({ error_views_per_month: "Views per month must be greater then 0" })
    }

    if (flag) {
      Axios.post(api_base_url + "publisher/platforms/edit", data, config)
        .then(response => {
          if (response.data.status) {
            this.setState({ modal_data: { title: 'Platform created successfully', image_name: "check.png", description: response.data.message.alert_message, redirect: "/publisher/platform" } })
          }
        })
    }

  }

  onSelect(selectedList, selectedItem) {
    this.state.country_row_id.push(selectedItem.country_id)
  }

  onRemove(selectedList, removedItem) {
    this.state.country_row_id.splice(this.state.country_row_id.indexOf(removedItem.country_id), 1);
  }

  Repeat = () => {

    const { platform_type } = this.state

    if (platform_type === "1") {

      this.setState(prevState => ({
        news_services: prevState.news_services.concat({
          "service_row_id": "",
          "price": "",
          "reference_link": "",
          "also_share_with": [],
          "addition": ""
        })
      }));
    }
    else if (platform_type === "2") {
      this.setState(prevState => ({
        youtube_services: prevState.youtube_services.concat({
          "service_row_id": "",
          "price": "",
          "video_duration": "00:00:00",
          "reference_link": "",
          "also_share_with": []
        })
      }));
    }
    else {
      this.setState(prevState => ({
        social_services: prevState.social_services.concat({
          "service_row_id": "",
          "price": "",
          "reference_link": "",
          "also_share_with": []
        })
      }));
    }
  };

  newsclickOnDelete = (id) => {
    let services
    if (this.state.platform_type === "1") {
      services = this.state.news_services
    }
    else if (this.state.platform_type === "2") {
      services = this.state.youtube_services
    }
    else if (this.state.platform_type === "3") {
      services = this.state.social_services
    }
    services.splice(id, 1);

    if (this.state.platform_type === "1") {
      this.setState({ news_services: services })
    }
    else if (this.state.platform_type === "2") {
      this.setState({ youtube_services: services })
      services = this.state.youtube_services
    }
    else if (this.state.platform_type === "3") {
      this.setState({ social_services: services })
    }
  }

  onChangePlatform = (id) => {
    this.setState({
      platform_name: '',
      platform_type: id,
      website_link: '',
      country_row_id: [],
      views_per_month: ''
    })

    if (id === "1") {
      this.setState({
        news_services: [
          {
            "service_row_id": "",
            "price": "",
            "reference_link": "",
            "also_share_with": [],
            "addition": ""
          }
        ]
      })
    }
    else if (id === "2") {
      this.setState({
        youtube_services: [
          {
            "service_row_id": "",
            "price": "",
            "video_duration": "",
            "reference_link": "",
            "also_share_with": []
          }
        ]
      })
    }
    else {
      this.setState({
        social_services: [
          {
            "service_row_id": "",
            "price": "",
            "reference_link": "",
            "also_share_with": []
          }
        ]
      })
    }
  }

  add_service = (id, field_name, data) => {

    let services

    if (this.state.platform_type === "1") {
      services = this.state.news_services
    }
    else if (this.state.platform_type === "2") {
      services = this.state.youtube_services
    }
    else if (this.state.platform_type === "3") {
      services = this.state.social_services
    }


    if (field_name === "service_row_id") {
      services[id].service_row_id = data
    }

    if (field_name === "price") {
      services[id].price = data
    }

    if (field_name === "also_share_with") {
      const also_share_with = services[id].also_share_with;
      console.log(also_share_with);
      if (also_share_with.indexOf(data) === -1) {
        also_share_with.push(data)
      }
      else {
        also_share_with.splice(services[id].also_share_with.indexOf(data), 1)
      }

      console.log(also_share_with);
    }

    if (field_name === "addition") {
      services[id].addition = data
    }

    if (field_name === "reference_link") {
      services[id].reference_link = data
    }

    if (field_name === "video_duration") {   
      services[id].video_duration = moment(data).format('HH:mm:ss') 
    }
    if (field_name === "price") {
      services[id].price = data
    }

    this.setState({ services: services }) 
  }
 
  render() {
    const { platform_type, social_services, news_services, youtube_services, publisher_full_name, platform_name, countryList, website_link, views_per_month,
      error_platform_name, error_platform_type, error_website_link, error_country_row_id, error_views_per_month,
      error_also_share_with, all_services, error_id, error_field, error_type, alert_msg, modal_data, selected_country } = this.state
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
              {/***** Update Platform Code Starts Here *****/}
                <div className="panel_title_block">
                  <h2>View your Platforms</h2>
                  <p>provide your services in detail for better findings</p>
                </div>
                <div className="platform_update_blocks">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="platform_overview">
                        <div className="row">
                          <div className="col-lg-8">
                            <h3>Overview</h3>
                          </div>
                          <div className="col-lg-4">
                            <div className="overview_edit"><img src="/assets/images/edit_icon.png" /></div>
                          </div>
                        </div>
                        <div classname="form__col platform_form_col">
                          <div classname="field form__field active">
                            <div classname="field__label">Platform</div>
                            <div className="field__wrap update_wrap">
                              <div className="field__icon"><img src="/assets/images/youtube.png" width="22px" /></div>
                              <input className="field__input" type="text" placeholder="Youtube CoinPedia News" />
                            </div>
                          </div>
                        </div>
                        <div classname="form__col">
                          <div classname="field form__field active">
                            <div classname="field__label">Channel Link</div>
                            <div className="field__wrap update_wrap">
                              <div className="field__icon"><img src="/assets/images/channel_link.png" width="22px" /></div>
                              <input className="field__input" type="text" placeholder="www.youtube.com/coinpedia" />
                            </div>
                          </div>
                        </div>
                        <div classname="form__col">
                          <div classname="field form__field active">
                            <div classname="field__label">Channel Followers</div>
                            <div className="field__wrap update_wrap">
                              <div className="field__icon"><img src="/assets/images/follower_count.png" /></div>
                              <input className="field__input" type="text" placeholder="423.5 K" />
                            </div>
                          </div>
                        </div>
                        <div className="followers">
                          <p>Followers from </p>
                          <div className="followers_count">
                            <span classname="btn-sm gray platform_countries">India</span>
                            <span classname="btn-sm gray platform_countries">Russia</span>
                            <span classname="btn-sm gray platform_countries">USA</span>
                            <span classname="btn-sm gray platform_countries">United Kingdom</span>
                            <span classname="btn-sm gray platform_countries">Singapore</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                    <div className="col-lg-9">
                      <div className="platform_overview">
                        <div className="row">
                          <div className="col-lg-8">
                            <h3 className="mb-3">Services</h3>
                          </div>
                          <div className="col-lg-4">
                            <div className="addMoreServices"><i className="la la-plus"></i> Add More Services</div>
                          </div>
                        </div>
                        {/* bootstrap table starts here */}
                          <div className="panel-table">
                            <div classname="table-responsive">
                              <table classname="table platform_update">
                                <thead>
                                  <tr>
                                    <th>Services</th>
                                    <th>Price</th>
                                    <th>Duration</th>
                                    <th>Reference Link</th>
                                    <th>Also Share With</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>Mixed sponsored ads</td>
                                    <td>$ 350</td>
                                    <td>01:30 Min</td>
                                    <td>Https://youtube.com</td>
                                    <td>Social Media</td>
                                    <td><i className="la la-trash-o"></i></td>
                                  </tr>
                                  <tr>
                                    <td>Mixed sponsored ads</td>
                                    <td>$ 350</td>
                                    <td>01:30 Min</td>
                                    <td>Https://youtube.com</td>
                                    <td>Social Media</td>
                                    <td><i className="la la-trash-o"></i></td>
                                  </tr>
                                  <tr>
                                    <td>Mixed sponsored ads</td>
                                    <td>$ 350</td>
                                    <td>01:30 Min</td>
                                    <td>Https://youtube.com</td>
                                    <td>Social Media</td>
                                    <td><i className="la la-trash-o"></i></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            </div>
                      {/* bootstrap table ends here */}
                      </div>
                      
                    </div>
                  </div>
                </div>
              {/***** Update Platform Code Ends Here *****/}

              {/***** Update Services Code Starts Here *****/}

              <div className="panel_title_block">
                  <h2>Update your Services</h2>
                  <p>provide your services in detail for better findings</p>
                </div>
                <div className="services_update_blocks">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="platform_overview">
                        <div className="row">
                          <div className="col-lg-8">
                            <h3 >Overview</h3>
                          </div>
                          <div className="col-lg-4">
                            <div className="overview_edit"><img src="/assets/images/edit_icon.png" /></div>
                          </div>
                        </div>
                        <div classname="form__col platform_form_col">
                          <div classname="field form__field active">
                            <div classname="field__label">Platform</div>
                            <div className="field__wrap update_wrap">
                              <div className="field__icon"><img src="/assets/images/youtube.png" width="22px" /></div>
                              <input className="field__input" type="text" placeholder="Youtube CoinPedia News" />
                            </div>
                          </div>
                        </div>
                        <div classname="form__col">
                          <div classname="field form__field active">
                            <div classname="field__label">Channel Link</div>
                            <div className="field__wrap update_wrap">
                              <div className="field__icon"><img src="/assets/images/channel_link.png" width="22px" /></div>
                              <input className="field__input" type="text" placeholder="www.youtube.com/coinpedia" />
                            </div>
                          </div>
                        </div>
                        <div classname="form__col">
                          <div classname="field form__field active">
                            <div classname="field__label">Channel Followers</div>
                            <div className="field__wrap update_wrap">
                              <div className="field__icon"><img src="/assets/images/follower_count.png" /></div>
                              <input className="field__input" type="text" placeholder="423.5 K" />
                            </div>
                          </div>
                        </div>
                        <div className="followers">
                          <p>Followers from </p>
                          <div className="followers_count">
                            <span classname="btn-sm gray platform_countries">India</span>
                            <span classname="btn-sm gray platform_countries">Russia</span>
                            <span classname="btn-sm gray platform_countries">USA</span>
                            <span classname="btn-sm gray platform_countries">United Kingdom</span>
                            <span classname="btn-sm gray platform_countries">Singapore</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  
                    <div className="col-lg-9">
                      <div className="services_list_block">
                        <div className="row">
                          <div className="col-md-5">
                            <div className="row">
                              <div className="col-lg-6">
                                <div classname="form-group">
                                  <label for="email">Service</label>
                                  <select classname="form-control" id="sel1">
                                    <option>Service 1</option>
                                    <option>Service 2</option>
                                    <option>Service 3</option>
                                    <option>Service 4</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div classname="form-group">
                                  <label for="email">Price</label>
                                  <input type="email" classname="form-control" type="text" placeholder="$ 00.00" />
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div classname="form-group">
                                  <label for="email">Duration</label>
                                  <input type="email" classname="form-control" type="text" placeholder="HH:MM:SS" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-7">
                            <div className="row">
                              <div className="col-lg-5">
                                <div classname="form-group">
                                  <label for="email">Reference Link</label>
                                  <input type="email" classname="form-control" type="text" placeholder="Https://" />
                                </div>
                              </div>
                              <div className="col-lg-4">
                                <div classname="form-group">
                                  <label for="email">Share with</label>
                                  <select classname="form-control" id="sel1">
                                    <option>Social Media</option>
                                    <option>Newsletter</option>
                                  </select>
                                </div>
                              </div>
                              <div className="col-lg-3">
                                <div classname="form-group mt-1">
                                  <button classname="btn btn-success">Save</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        
                        <div className="row">
                          <div className="col-lg-12"><div className="update_services"><i className="la la-plus"></i> Add More Services</div></div>
                        </div>

                        <div className="row">
                          
                          <div className="col-lg-12"><button className="btn btn-primary submit_services">Submit and Verify<i className="la la-arrow-right"></i></button></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              {/***** Update Services Code Ends Here *****/}
              <div className="panel js-panel addNewPlatformPanel">
                <div className="settings addNewPlatformFormSettings">
                  <div className="settings__container">
                    <div className="settings__inner">
                      <div className="settings__tab" data-tabs-group="settings" >
                        <div className="form form_settings">
                          <div className="form__row">

                            <div className="form__col">
                              <div className="field form__field">
                                <div className="field__label">Select Platform</div>
                                <div className="field__wrap  ">
                                  <select className="field__select" value={platform_type} onChange={(e) => this.onChangePlatform(e.target.value)} style={{ display: 'flex', justifyContent: 'space-between' }} name='platform_type'>
                                    <option value='1'>News Portal or Blog</option>
                                    <option value="2">Youtbe Channel </option>
                                    <option value="3">Social Media</option>
                                  </select>
                                  <div className="error_class">{error_platform_type}</div>
                                </div>
                              </div>
                            </div>

                            <div className="form__col">
                              <div className="field form__field">
                                {
                                  platform_type === '2'
                                    ?
                                    <div className="field__label">Name of channel or account *</div>
                                    :
                                    <div className="field__label">Platform name*</div>
                                }
                                <div className="field__wrap"><input autoComplete="off" value={platform_name} onChange={(e) => { this.setState({ platform_name: e.target.value }) }} className="field__input" type="text" placeholder="Platform title" name='platform_name' /></div>
                                <div className="error_class" >{error_platform_name}</div>
                              </div>
                            </div>

                          </div>
                          <div className="form__row">
                            <div className="form__col">
                              <div className="field form__field">
                                <div className="field__label">{platform_type == 2 ? "Channel link*" : platform_type == 3 ? "Social Media link*" : "Webiste/Blog link*"}</div>
                                <div className="field__wrap"><input autoComplete="off" className="field__input" type="email" placeholder="Eg: www.demo.com" name='website_link' value={website_link} onChange={(e) => { this.setState({ website_link: e.target.value }) }} /></div>
                                <div className="error_class">{error_website_link}</div>
                              </div>
                            </div>

                            <div className="form__col">
                              <div className="field form__field">
                                <div className="field__label">{platform_type == 2 ? "Select Major followers  from Countries*" : platform_type == 3 ? "Select Major followers  from Countries*" : "Major visitors  from Countries*"}</div>
                                <div className="field__wrap">
                                  {
                                    selected_country.length > 0
                                      ?
                                      <div className='pr_platform_country_list_edit'>
                                        <Multiselect className="field__input" placeholder=""
                                          options={countryList} // Options to display in the dropdown
                                          selectedValues={selected_country}
                                          onSelect={this.onSelect} // Function will trigger on select event
                                          onRemove={this.onRemove} // Function will trigger on remove event
                                          displayValue="country_name" // Property name to display in the dropdown options
                                        />
                                      </div>
                                      :
                                      null
                                  }

                                  <div className="error_class">{error_country_row_id}</div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form__row ">
                            <div className="form__col">
                              <div className="field form__field">
                                <div className="field__label">{platform_type == 2 ? "Followers*" : platform_type == 3 ? "Followers*" : "Views per Month*"}</div>
                                <div className="field__wrap"><input autoComplete="off" className="field__input" type="number" placeholder={100} name='views_per_month' value={views_per_month} onChange={(e) => { this.setState({ views_per_month: e.target.value }) }} /></div>
                                <div className="error_class">{error_views_per_month}</div>
                              </div>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/***** Services Block Starts Here *****/}

                <div className="panel__head platform_panel_head">
                  <div className="container__title title service_block_title">{platform_type == 2 ? "Youtube Channel Services" : platform_type == 3 ? "Social Media Services" : "Add Services type"}</div>
                </div>

                {
                  platform_type === "1"
                    ?
                    news_services.map((e, i) => {
                      return (
                        <div className="layout mainAddServicesPanel" key={i}>
                          <div className="row pr-platform-row">
                            {/* ............................ */}
                              <div className='col-lg-5 col-md-12 col-sm-12 col-12'>
                                <div className='row'>
                                  <div className="col-lg-4 col-md-6">
                                    <div className="field form__field">
                                      <div className="field__label">Services</div>
                                      <div className="field__wrap  ">
                                        <select className="field__select" value={e.service_row_id} onChange={(e) => this.add_service(i, 'service_row_id', e.target.value)} name='service_row_id' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                          <option value="" disabled>News Services</option>
                                          {
                                            all_services[0]
                                              ?
                                              all_services[0].services.map((service, index) => {
                                                return <option key={i + index} value={service.id}>{service.service_name}</option>
                                              })
                                              :
                                              null
                                          }
                                        </select>
                                        {
                                          i === error_id && error_type === "service_row_id"
                                            ?
                                            <div className="error_class">{error_field}</div>
                                            :
                                            null
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6">
                                    <div className="field form__field">
                                      <div className="field__label">Price ($)</div>
                                      <div className="field__wrap">
                                        <input autoComplete="off" min="0" className="field__input" type="number" placeholder="Price" name='price' value={e.price} onChange={(e) => this.add_service(i, 'price', e.target.value)} /></div>
                                      {
                                        i === error_id && error_type === "price"
                                          ?
                                          <div className="error_class">{error_field}</div>
                                          :
                                          null
                                      }
                                    </div>
                                  </div>
                                  <div className="col-lg-5 col-md-12">
                                    <div className="field form__field"> 
                                      <div className="field__label">Reference Link</div>
                                      <div className="field__wrap">
                                        <input type="text" className="field__input" name='reference_link' value={e.reference_link} onChange={(e) => this.add_service(i, 'reference_link', e.target.value)} placeholder="Reference Link" /></div>
                                        {
                                          i === error_id && error_type === "reference_link"
                                            ?
                                            <div className="error_class" >{error_field}</div>
                                            :
                                            null
                                        }  
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-lg-7 col-md-12 col-sm-12 col-12'>
                                <div className='row'>
                                  <div className="col-lg-5 col-md-5 col-sm-5 col-12">
                                  <div className="field form__field">
                                  <div className="field__label">Also Share With</div>
                                  <div className="pr_platform_website_share_block">
                                    <div className='pr_platform_website_share_block_indi'>
                                      <div className="form-check" onClick={() => this.add_service(i, 'also_share_with', "1")} >
                                        <input className="form-check-input" type="checkbox" value="1" readOnly checked={e.also_share_with.indexOf("1") !== -1 ? true : false}  />
                                        <label className="form-check-label">
                                          Social Media
                                        </label>
                                      </div>
                                    </div>
                                    <div className='pr_platform_website_share_block_indi'>
                                      <div className="form-check" onClick={() => this.add_service(i, 'also_share_with', "2")} >
                                        <input className="form-check-input" type="checkbox" value="2" readOnly checked={e.also_share_with.indexOf("2") !== -1 ? true : false}  />
                                        <label className="form-check-label">
                                          Newsletter
                                        </label>
                                      </div>
                                    </div>
                                    {
                                      i === error_id && error_type === "also_share_with"
                                        ?
                                        <div className="error_class">{error_field}</div>
                                        :
                                        null
                                    }
                                  </div>
                                </div>   
                                  </div>    
                                  <div className="col-lg-5 col-md-5 col-sm-5 col-12">
                                      <div className="field form__field">
                                        <div className="field__label">Addition</div>
                                        <div className="pr_platform_website_share_block">

                                        <div className='pr_platform_website_share_block_indi'>
                                          <div className="form-check form-check-inline custom_form_check_inline" onClick={() => this.add_service(i, 'addition', "1")}>
                                            <input className="form-check-input custom_form_check_input" type="radio" name={"Addition" + i} value="1" checked={e.addition === "1" ? true : false} readOnly  />
                                            <label className="form-check-label">Do Follow</label>
                                          </div>
                                        </div>

                                        <div className='pr_platform_website_share_block_indi'>
                                          <div className="form-check form-check-inline" onClick={() => this.add_service(i, 'addition', "2")} >
                                            <input className="form-check-input custom_form_check_input" type="radio" name={"Addition" + i} checked={e.addition === "2" ? true : false} value="2" readOnly />
                                            <label className="form-check-label">No Follow</label>
                                          </div>
                                        </div>

                                        {
                                          i === error_id && error_type === "addition"
                                          ?
                                          <div className="error_class">{error_field}</div>
                                          :
                                          null
                                        }
                                      </div>
                                    </div> 
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-sm-2 col-2 pr_remove_btn_block">
                                    { 
                                      i > 0
                                        ?
                                        <button className="btn btn-danger pr_paltform_remove_btn" onClick={(e => { this.newsclickOnDelete(i) })}><i className="fa fa-minus-circle"></i></button>
                                        :
                                        null
                                    }
                                  </div>
                                </div>
                              </div>
                            {/* ............................. */}
                            </div>   
                        </div>
                      )
                    })
                    :
                    platform_type === "2"
                      ?
                      youtube_services.map((e, i) => {
                        return (

                          <div className="layout mainAddServicesPanel" key={i}>
                            <div className="row pr-platform-row">
                              {/* ............................................... */}
                              <div className='col-lg-8'>
                                <div className="row">
                                  <div className='col-lg-3 col-md-6'>
                                    <div className="field form__field">
                                      <div className="field__label">Services</div>
                                      <div className="field__wrap  ">
                                        <select className="field__select" value={e.service_row_id} onChange={(e) => this.add_service(i, 'service_row_id', e.target.value)} name='service_row_id' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                          <option value="" disabled>News Services</option>
                                          {
                                            all_services[1]
                                              ?
                                              all_services[1].services.map((service, index) => {
                                                return <option key={i + index} value={service.id}>{service.service_name}</option>
                                              })
                                              :
                                              null
                                          }
                                        </select>
                                        {
                                          i === error_id && error_type === "service_row_id"
                                            ?
                                            <div className="error_class">{error_field}</div>
                                            :
                                            null
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className='col-lg-4 col-md-6'>
                                    <div className="field form__field">
                                      <div className="field__label">Video Duration (HH:mm:ss)</div>
                                      <div className="field__wrap">
                                      <TimePicker
                                        style={{ width: 100 }}
                                        value={moment(('2014-11-11 '+e.video_duration))}
                                        showSecond={true}
                                        defaultValue={0} 
                                        onChange={(item) => this.add_service(i, 'video_duration', item)} 
                                      /></div>
                                      {
                                          i === error_id && error_type === "video_duration"
                                            ?
                                            <div className="error_class">{error_field}</div>
                                            :
                                            null
                                        }
                                    </div> 
                                  </div>
                                  <div className='col-lg-2 col-md-6'>
                                    <div className="field form__field">
                                      <div className="field__label">Price ($)</div>
                                      <div className="field__wrap">
                                        <input autoComplete="off" min="0" className="field__input" type="number" placeholder="Price" name='price' value={e.price} onChange={(e) => this.add_service(i, 'price', e.target.value)} /></div>
                                      {
                                        i === error_id && error_type === "price"
                                          ?
                                          <div className="error_class">{error_field}</div>
                                          :
                                          null
                                      }
                                    </div>
                                  </div>
                                  <div className='col-lg-3 col-md-6'>
                                      <div className="field form__field"> 
                                        <div className="field__label">Reference Link</div>
                                        <div className="field__wrap">
                                          <input type="text" className="field__input" name='reference_link' value={e.reference_link} onChange={(e) => this.add_service(i, 'reference_link', e.target.value)} placeholder="Reference Link" /></div>
                                        {
                                          i === error_id && error_type === "reference_link"
                                            ?
                                            <div className="error_class" >{error_field}</div>
                                            :
                                            null
                                        }  
                                      </div>
                                  </div>
                                </div>
                              </div>
                              <div className='col-lg-4'>
                                <div className='row'>
                                  <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                                    <div className="field form__field">
                                      <div className="field__label">Also Share With</div>
                                      <div className="pr_platform_website_share_block">
                                        <div className='pr_platform_website_share_block_indi'>
                                          <div className="form-check" onClick={() => this.add_service(i, 'also_share_with', "1")} >
                                            <input className="form-check-input" type="checkbox" value="1" readOnly checked={e.also_share_with.indexOf("1") !== -1 ? true : false}  />
                                            <label className="form-check-label">
                                              Social Media
                                            </label>
                                          </div>
                                        </div> 
                                        {
                                          i === error_id && error_type === "also_share_with"
                                            ?
                                            <div className="error_class">{error_field}</div>
                                            :
                                            null
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2 col-md-2 col-sm-2 col-2 pr_remove_btn_block">
                                    {
                                      i > 0
                                        ?
                                        <button className="btn btn-danger pr_paltform_remove_btn" onClick={(e => { this.newsclickOnDelete(i) })}><i className="fa fa-minus-circle"></i></button>
                                        :
                                        null
                                    }
                                  </div>
                                </div>
                              </div>
                              {/* ................................................. */}
                            </div>   
                        </div> 
                        )
                      })
                      :
                      social_services.map((e, i) => {
                        return <div className="layout mainAddServicesPanel" key={i}>
                              <div className="row pr-platform-row">
                                {/* ................................... */}
                                <div className='col-lg-8'>
                                  <div className='row'>
                                    <div className='col-lg-3 col-md-6'>
                                      <div className="field form__field">
                                        <div className="field__label">Services</div>
                                        <div className="field__wrap  ">
                                          <select className="field__select" value={e.service_row_id} onChange={(e) => this.add_service(i, 'service_row_id', e.target.value)} name='service_row_id' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <option value="" disabled>News Services</option>
                                            {
                                              all_services[2]
                                                ?
                                                all_services[2].services.map((service, index) => {
                                                  return <option key={i + index} value={service.id}>{service.service_name}</option>
                                                })
                                                :
                                                null
                                            }
                                          </select>
                                          {
                                            i === error_id && error_type === "service_row_id"
                                              ?
                                              <div className="error_class">{error_field}</div>
                                              :
                                              null
                                          }
                                        </div>
                                      </div> 
                                    </div>
                                    <div className='col-lg-3 col-md-6'>
                                      <div className="field form__field">
                                        <div className="field__label">Price ($)</div>
                                        <div className="field__wrap">
                                          <input autoComplete="off" min="0" className="field__input" type="number" placeholder="Price" name='price' value={e.price} onChange={(e) => this.add_service(i, 'price', e.target.value)} /></div>
                                        {
                                          i === error_id && error_type === "price"
                                            ?
                                            <div className="error_class">{error_field}</div>
                                            :
                                            null
                                        }
                                      </div>
                                    </div>
                                    <div className='col-lg-3 col-md-6'>
                                        <div className="field form__field">
                                          <div className="field__label">Reference Link</div>
                                          <div className="field__wrap">
                                          <input type="text" className="field__input" name='reference_link' value={e.reference_link} onChange={(e) => this.add_service(i, 'reference_link', e.target.value)} placeholder="Reference Link" /></div>
                                          {
                                            i === error_id && error_type === "reference_link"
                                              ?
                                              <div className="error_class" >{error_field}</div>
                                              :
                                              null
                                          }  
                                        </div>
                                        
                                    </div>
                                  </div>
                                </div>
                                <div className='col-lg-4'>
                                  <div className='row'>
                                    <div className='col-lg-8 col-md-8 col-sm-8 col-8'>
                                        <div className="field form__field">
                                          <div className="field__label">Also Share With</div>
                                          <div className="pr_platform_website_share_block">
                                            <div className='pr_platform_website_share_block_indi'>
                                              <div className="form-check" onClick={() => this.add_service(i, 'also_share_with', "1")} >
                                                <input className="form-check-input" type="checkbox" value="1" readOnly checked={e.also_share_with.indexOf("1") !== -1 ? true : false}  />
                                                <label className="form-check-label">
                                                  Social Media
                                                </label>
                                              </div>
                                            </div> 
                                            {
                                              i === error_id && error_type === "also_share_with"
                                                ?
                                                <div className="error_class">{error_field}</div>
                                                :
                                                null
                                            }
                                          </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-2 col-md-2 col-sm-2 col-2 pr_remove_btn_block'>
                                      {
                                        i > 0
                                          ?
                                          <button className="btn btn-danger pr_paltform_remove_btn" onClick={(e => { this.newsclickOnDelete(i) })}><i className="fa fa-minus-circle"></i></button>
                                          :
                                          null
                                      }
                                    </div>
                                  </div>
                                </div>
                                {/* ...................................... */}
                          </div>   
                      </div>  
                      })

                }
                <div className='share_block_buttons'>
                  <p onClick={() => { this.Repeat() }} className="add_more_services"><span><i className="la la-plus" style={{ marginRight: '10px' }} />Add More Services</span></p>
                </div>

                <div className='share_block_buttons pr_share_block_buttons'>
                  <button onClick={() => { this.savePlatformDetails() }} className="btn btn-primary">Update This Platform &amp; Services</button>
                </div>

                {/***** Service Block Ends Here *****/}

              </div>
            </div>
            {/* ...........Modal.................. */}
              <div className="container">
                <div className={alert_msg ? "modal show" : "modal"} id="myModal">
                  <div className="modal-dialog modal-lg">
                    <div className="modal-content platform_modal_content">
                      <div className="modal-header">
                        <button type="button" className="close" onClick={() => this.setState({ alert_msg: "" })} data-dismiss="modal">&times;</button>
                      </div>
                      <div className="modal-body">
                        <p>{alert_msg}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            {/* .... */}



          </div>
        </div>
        {
          modal_data.title
            ?
            <Popupmodal message={modal_data} />
            :
            null
        }
      </>
    )
  }
}

export default withRouter(UpdatePlatform)