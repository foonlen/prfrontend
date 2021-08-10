import React, { useState } from 'react'
import cookie from "cookie"
import jsCookie from "js-cookie"
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MenuBar from '../../components/advertiser/dash_menu_bar'
import TopMenuBar from '../../components/advertiser/dash_top_menu_bar'
import * as constants from '../../components/constants'
import Popupmodal from '../../components/popUpModal'

class profile extends React.Component 
{   
    constructor(props) {
        super(props)
        const { userAgent } = this.props
        console.log(userAgent);
        this.state = {
            API_BASE_URL: constants.API_BASE_URL,
            headers: constants.headers,
            countryList: constants.countryList,
            people_range_list: constants.people_range_list,
            tab: 1,
            showItems: false,
            token: userAgent.advertiser_token,
            advertiser_full_name: userAgent.advertiser_full_name,
            selectedItem: '',
            getAPIOutput: false,
            username: "",
            location: "",
            profile_image: "",
            email_id: "",
            mobile_number: "",
            date_n_time: "",
            about_advertiser: "",
            facebook: "",
            telegram: "",
            twitter: "",
            people_range: "",
            web_meeting_type: "",
            web_meeting_id: "",
            website_name: "",
            current_password: "",
            new_password: "",
            confirm_new_password: "",
            error_username: "",
            error_full_name: "",
            error_country_row_id: "",
            error_location: "",
            error_email_id: "",
            error_mobile_number: "",
            error_current_password: "",
            error_new_password: "",
            error_confirm_new_password: "",
            alert_message: "",
            password_alert_message: "",
            error_about_advertiser: "",
            error_people_range: "",
            modal_data:{title: "", image_name: "", description: ""} 
        }
    }

    dashboard_me() {
        var headers = this.state.headers
        headers['token'] = this.state.token

        fetch(this.state.API_BASE_URL + "user/profile/other_details", {
            method: 'GET',
            headers: this.state.headers,
        }).then(res => res.json())
            .then(
                (result) => {
                    console.warn(result);
                    if (result.status === true) {
                        this.setState({
                            getAPIOutput: true,
                            username: result.message.username,
                            country_row_id: result.message.country_id,
                            full_name: result.message.full_name,
                            email_id: result.message.email_id,
                            mobile_number: result.message.mobile_number,
                            location: result.message.location,
                            website_name: result.message.website_name,
                            date_n_time: result.message.date_n_time,
                            about_advertiser: this.changeString(result.message.about_advertiser),
                            telegram: this.changeString(result.message.telegram),
                            facebook: this.changeString(result.message.facebook),
                            twitter: this.changeString(result.message.twitter),
                            web_meeting_type: this.changeString(result.message.web_meeting_type),
                            web_meeting_id: this.changeString(result.message.web_meeting_id),
                            website_name: this.changeString(result.message.website_name),
                            people_range: this.changeString(result.message.people_range)
                        })
                    }
                    else {
                        Router.push('/login')
                    }
                });
    }

    changeString(value) {
        if (value === null || value === '') {
            return ''
        }
        else {
            return value
        }
    }

    clearMsg() 
    {
        this.setState({
            modal_data: {title: "", image_name: "", description: ""} 
        })
    }

    updatePersonalData() {

        let formIsValid = true
        this.clearMsg()

        if (this.state.full_name.length < 4) {
            this.setState({
                error_full_name: "The Full_name field must be at least 4 characters in length."
            });
            formIsValid = false;
        }
        else {
            this.setState({
                error_full_name: ""
            });
        }

        if (!this.state.email_id.includes('@')) {
            this.setState({
                error_email_id: "The Email ID field must be contain valid email."
            });
            formIsValid = false;
        }
        else {
            this.setState({
                error_email_id: ""
            });
        }

        if (this.state.mobile_number.length < 5) {
            this.setState({
                error_mobile_number: "The Mobile Number field must be at least 5 characters in length."
            });
            formIsValid = false;
        }
        else {
            this.setState({
                error_mobile_number: ""
            });
        }


        if (this.state.country_row_id === '') {
            this.setState({
                error_country_row_id: "The Country ID field is required."
            });
            formIsValid = false;
        }
        else {
            this.setState({
                error_country_row_id: ""
            });
        }

        if (!formIsValid) {
            return true;
        }

        var headers = this.state.headers
        headers['token'] = this.state.token
        var reqObj = {
            full_name: this.state.full_name,
            email_id: this.state.email_id,
            country_row_id: this.state.country_row_id,
            mobile_number: this.state.mobile_number,
            location: this.state.location
        }

        fetch(this.state.API_BASE_URL + "user/profile/update_profile", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(reqObj)
        }).then(res => res.json())
            .then(
                (result) => {
                console.warn(result);
                if (result.status === true) {
                    this.setState({
                        modal_data: {title:'Profile Updated', image_name: "select.svg", description: result.message.alert_message},
                        error_username: "",
                        error_full_name: "",
                        error_mobile_number: "",
                        error_email_id: ""
                    });

                    jsCookie.set('advertiser_full_name', this.state.full_name)
                }
                else {

                    //error_full_name
                    if (result.message.email_id) {
                        var error_full_name = result.message.full_name;
                    }
                    else {
                        var error_full_name = "";
                    }

                    //error_email_id
                    if (result.message.email_id) {
                        var error_email_id = result.message.email_id;
                    }
                    else {
                        var error_email_id = "";
                    }

                    //error_mobile_number
                    if (result.message.mobile_number) {
                        var error_mobile_number = result.message.mobile_number;
                    }
                    else {
                        var error_mobile_number = "";
                    }
                    this.setState({
                        error_full_name: error_full_name,
                        error_email_id: error_email_id,
                        error_mobile_number: error_mobile_number
                    });
                }
            })
    }

    updateSecurityData() 
    {
        let formIsValid = true
        this.clearMsg()
        if (this.state.current_password === '') {
            this.setState({
                error_current_password: "The Old Password field is required."
            });
            formIsValid = false
        }
        else {
            this.setState({
                error_current_password: ""
            });
        }

        if (this.state.new_password === '') {
            this.setState({
                error_new_password: "The New Password field is required."
            });
            formIsValid = false;
        }
        else if (this.state.new_password.length < 6) {
            this.setState({
                error_new_password: "The New password field must be at least 6 characters in length."
            });
            formIsValid = false;
        }
        else {
            this.setState({
                error_new_password: ""
            });
        }


        if (this.state.confirm_new_password === '') {
            this.setState({
                error_confirm_new_password: "The Confirm Password field is required."
            });
            formIsValid = false;
        }
        else if (this.state.confirm_new_password !== this.state.new_password) {
            this.setState({
                error_confirm_new_password: "The Confirm password is not matching with New password."
            });
            formIsValid = false;
        }
        else {
            this.setState({
                error_confirm_new_password: ""
            });
        }

        if (!formIsValid) {
            return true;
        }

        console.warn("state ", this.state);
        var headers = this.state.headers
        headers['token'] = this.state.token

        var reqObj = {
            current_password: this.state.current_password,
            new_password: this.state.new_password
        }

        fetch(this.state.API_BASE_URL + "user/profile/security_details", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(reqObj)
        }).then(res => res.json())
            .then(
                (result) => {
                    console.warn(result);
                    if (result.status === true) {
                        this.setState({
                            modal_data: {title:'Password Updated', image_name: "select.svg", description: result.message.alert_message},
                            current_password: "",
                            new_password: "",
                            error_current_password: "",
                            error_new_password: "",
                            error_confirm_new_password: "",
                            confirm_new_password: ""
                        })
                    }
                    else {
                        //error_current_password
                        if (result.message.current_password) {
                            var error_current_password = result.message.current_password;
                        }
                        else {
                            var error_current_password = "";
                        }

                        //error_full_name
                        if (result.message.new_password) {
                            var error_new_password = result.message.new_password;
                        }
                        else {
                            var error_new_password = "";
                        }

                        this.setState({
                            error_current_password: error_current_password,
                            error_new_password: error_new_password
                        });
                    }

                });

    }


    updateOtherData() 
    {
        let formIsValid = true
        this.clearMsg()
        if (this.state.about_advertiser == '') {
            this.setState({
                error_about_advertiser: "The About Advertiser field is required."
            });
            formIsValid = false;
        }
        else if (this.state.about_advertiser.length < 4) {
            this.setState({
                error_about_advertiser: "The About Advertiser field must be at least 4 characters in length."
            });
            formIsValid = false;
        }
        else {
            this.setState({
                error_about_advertiser: ""
            });
        }

        if (this.state.people_range == '') {
            this.setState({
                error_people_range: "The People Range field is required."
            });
            formIsValid = false;
        }
        if(this.state.web_meeting_type  == '')
            {
                this.setState({
                    web_meeting_type: 1
                })
                var web_meeting_type = 1
            }
            else
            {
            var web_meeting_type = this.state.web_meeting_type
            }

        if (!formIsValid) {
            return true;
        }

        var headers = this.state.headers
        headers['token'] = this.state.token

        var reqObj = {
            about_advertiser: this.state.about_advertiser,
            people_range: this.state.people_range,
            web_meeting_type: web_meeting_type,
            web_meeting_id: this.state.web_meeting_id,
            website_name: this.state.website_name
        }
        console.log(reqObj)

        fetch(this.state.API_BASE_URL + "user/profile/update_other_details", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(reqObj)
        }).then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    if (result.status === true) {
                        this.setState({
                            modal_data: {title:'Other Info Updated', image_name: "select.svg", description: result.message.alert_message},
                            error_about_advertiser: "",
                            error_people_range: "",
                            error_web_meeting_id: ""
                        })
                    }
                    else {

                        //error_full_name
                        if (result.message.about_advertiser) {
                            var error_about_advertiser = result.message.about_advertiser;
                        }
                        else {
                            var error_about_advertiser = "";
                        }

                        //error_email_id
                        if (result.message.people_range) {
                            var error_people_range = result.message.people_range;
                        }
                        else {
                            var error_people_range = "";
                        }

                        //error_mobile_number
                        if (result.message.web_meeting_id) {
                            var error_web_meeting_id = result.message.web_meeting_id;
                        }
                        else {
                            var error_web_meeting_id = "";
                        }
                        this.setState({
                            error_about_advertiser: error_about_advertiser,
                            error_people_range: error_people_range,
                            error_web_meeting_id: error_web_meeting_id
                        })
                    }
                })
    }


    componentDidMount() 
    {
        this.dashboard_me() 
    }

    render() {
        return (
            <div>
                <Head>
                    <meta charset="utf-8" />
                    <title>Profile</title>
                </Head>

                <div className='page'>
                    <MenuBar />
                    <div className="container-dash">
                        <TopMenuBar full_name={this.state.advertiser_full_name} />
                        <div className="container__body">
                            <div className="panel_title_block">
                                <h2>My Profile</h2>
                                <p>Manage your profile here</p>
                            </div>
                            <div>
                                {
                                    this.state.alert_message ?
                                        <div className="alert alert-info">
                                            <span className="alert-close" onClick={() => { this.clearMsg() }}>&times;</span>
                                            {this.state.alert_message}
                                        </div>
                                        :
                                        null
                                }
                            </div>


                            {/* code from publisher panel starts here */}
                                <div className="layout my_profile">
                                    <div className="layout__row js-panel">
                                        {/* panel*/}
                                        <div className="layout__panel panel profilehead">

                                            <div className="panel__group">
                                                <div className="panel__title title">Main Info</div>
                                                <div >

                                                    <div className="profile_col">
                                                        <div className="field form__field">
                                                            <div className="field__label">Username</div>
                                                            <div className="field__wrap">
                                                                <input type="text" className="field__input" placeholder="Username" defaultValue={this.state.username} name="username" disabled />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="profile_col">
                                                        <div className="field form__field">
                                                            <div className="field__label">Full name</div>
                                                            <div className="field__wrap">
                                                                <input autoComplete="off" type="text" className="field__input" placeholder="Username" value={this.state.full_name} onChange={(e) => { this.setState({ full_name: e.target.value }) }} name="full_name" ref="full_name" />
                                                            </div>
                                                            <div className="error_class">
                                                                {this.state.error_full_name}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="profile_col">
                                                        <div className="field form__field">
                                                            <div className="field__label">Email ID</div>
                                                            <div className="field__wrap">
                                                                <input autoComplete="off" type="text" className="field__input" placeholder="Email ID" value={this.state.email_id} onChange={(e) => { this.setState({ email_id: e.target.value }) }} name="email_id" ref="email_id" />
                                                            </div>
                                                            <div className="error_class">
                                                                {this.state.error_email_id}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="profile_col">
                                                        <div className="field form__field">
                                                            <div className="field__label">Location</div>
                                                            <div className="field__wrap">
                                                                <input autoComplete="off" type="text" className="field__input" placeholder="Location" value={this.state.location} onChange={(e) => { this.setState({ location: e.target.value }) }} name="location" ref="location" />
                                                                <div className="field__icon"><i className="la la-map-marker"></i></div>
                                                            </div>
                                                            <div className="error_class">
                                                                {this.state.error_location}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="profile_col">
                                                        <div className="field form__field">
                                                            <div className="field__label">Select Country</div>
                                                            <div className="field__wrap">
                                                                <select className="field__select" name="country_row_id" onChange={(e) => { this.setState({ country_row_id: e.target.value }) }} useref="country_row_id" >
                                                                    <option value="">Select Country</option>
                                                                    {
                                                                        this.state.countryList ?
                                                                            this.state.countryList.map((item, i) =>
                                                                                <option value={item.country_id} key={item.country_id} selected={this.state.country_row_id == item.country_id}> {item.country_name} ({item.country_code} )</option>
                                                                            )
                                                                            : null
                                                                    }
                                                                </select>
                                                                <div className="field__icon"><i className="la la-angle-down "></i></div>
                                                            </div>
                                                            <div className="error_class">
                                                                {this.state.error_country_row_id}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="profile_col">
                                                        <div className="field form__field">
                                                            <div className="field__label">Mobile Number</div>
                                                            <div className="field__wrap">
                                                                <input autoComplete="off" type="text" className="field__input" placeholder="Mobile Number" value={this.state.mobile_number} onChange={(e) => { this.setState({ mobile_number: e.target.value }) }} name="mobile_number" ref="mobile_number" />
                                                            </div>
                                                            <div className="error_class">
                                                                {this.state.error_mobile_number}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="field auth__field">
                                                        <button className="btn cp-primary-btn" type="submit" name="update_password" onClick={() => { this.updatePersonalData() }}>
                                                            {this.state.loader ? (
                                                                <span className="spinner-border spinner-border-sm mr-1 text-light"></span>
                                                            ) : (
                                                                <>Update Profile</>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="layout__panel layout__panel_x2 panel profiledetails_tabs">
                                            <Tabs>
                                                <TabList>
                                                    <Tab className="btn custom_button btn_light btn_icon js-panel-btn "><i className="la la-user"></i> Profile Info</Tab>
                                                    <Tab className="btn custom_button btn_light btn_icon js-panel-btn "><i className="la la-key "></i> Security</Tab>
                                                    <Tab className="btn custom_button btn_light btn_icon js-panel-btn "><i className="la la-wallet"></i> Wallet</Tab>
                                                </TabList>
                                                <TabPanel>
                                                    <div className="panel__tab js-panel-tab" >
                                                        <div className="panel__body">
                                                            {/* desk*/}
                                                            <div className="row">
                                                                <div className="col-md-12 col-lg-10">
                                                                    <div className=" profile_auth">
                                                                        <div className='container__title title profile_tab_titles'>Profile Info</div>
                                                                        <div className='profile_textarea_block'>
                                                                            <div className="field__label">About</div>
                                                                            <textarea value={this.state.about_advertiser} onChange={(e) => { this.setState({ about_advertiser: e.target.value }) }} name="about_publisher" ref="about_publisher"></textarea>
                                                                            <div className="error_class">
                                                                                {this.state.error_about_advertiser}
                                                                            </div>

                                                                            

                                                                            <div className="row">
                                                                                <div className="col-md-6">
                                                                                    <div className="field__label">Web Meeting Type</div>
                                                                                    <div className="input-group mb-3">
                                                                                        <div className="input-group-prepend custom_input_group">
                                                                                            <span className="input-group-text">
                                                                                                <select name="web_meeting_type" onChange={(e) => { this.setState({ web_meeting_type: e.target.value }) }} useref="web_meeting_type">
                                                                                                    <option value="1" selected={parseInt(this.state.web_meeting_type) === 1}>Google Meet</option>
                                                                                                    <option value="2" selected={parseInt(this.state.web_meeting_type) === 2}>Jio Meet</option>
                                                                                                    <option value="3" selected={parseInt(this.state.web_meeting_type) === 3}>Slack Meet</option>
                                                                                                    <option value="4" selected={parseInt(this.state.web_meeting_type) === 4}>Skype Meet</option>
                                                                                                </select>
                                                                                            </span>
                                                                                        </div>
                                                                                        <input type="text" className="form-control web_meet_id" placeholder="Web Meeting Id" value={this.state.web_meeting_id} onChange={(e) => { this.setState({ web_meeting_id: e.target.value }) }} name="web_meeting_id" ref="web_meeting_id" />

                                                                                    </div>
                                                                                    <div className="error_class">
                                                                                        {this.state.error_web_meeting_id}
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-md-6">
                                                                                    <div className="field form__field">
                                                                                        <div className="field__label">People Range</div>
                                                                                        <div className="field__wrap">
                                                                                            <select className="field__select people_range_select" name="people_range" onChange={(e) => { this.setState({ people_range: e.target.value }) }} useref="people_range">
                                                                                                <option disabled="" selected="">People Range</option>
                                                                                                {
                                                                                                    this.state.people_range_list ?
                                                                                                        this.state.people_range_list.map((item, i) =>
                                                                                                            <option value={item.id} key={item.id} selected={this.state.people_range == item.id}> {item.people_range}</option>
                                                                                                        )
                                                                                                        : null
                                                                                                }
                                                                                            </select>
                                                                                            <div className="field__icon"><i className="la la-angle-down "></i></div>
                                                                                        </div>
                                                                                        <div className="error_class">
                                                                                            {this.state.error_people_range}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        

                                                                            
                                                                        </div>
                                                                        <div className="auth__btns profile_tab_buttons">
                                                                            <button className="btn  cp-primary-btn" type="button" onClick={() => { this.updateOtherData() }}>
                                                                                {this.state.loader ? (
                                                                                    <div className="loader"></div>
                                                                                ) : (
                                                                                    <>Update Details</>
                                                                                )}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                                <TabPanel>
                                                    <div className="security_details profile_auth" >
                                                        <div className="row">
                                                            <div className="col-md-10 col-lg-6">
                                                                <div className='container__title title profile_tab_titles'>Security Details</div>
                                                                    <div className="field auth__field">
                                                                        <div className="field__label">Old Password</div>
                                                                        <div className="field__wrap">
                                                                            <div className="field__icon"><i className="la la-key "></i> </div>
                                                                            <input autoComplete="off" className="field__input" type="password" value={this.state.current_password} onChange={(e) => { this.setState({ current_password: e.target.value }) }} name="current_password" useref="current_password" />
                                                                        </div>
                                                                        <div className="error_class">
                                                                            {this.state.error_current_password}
                                                                        </div>
                                                                    </div>
                                                                    <div className="field auth__field">
                                                                        <div className="field__label">New Password</div>
                                                                        <div className="field__wrap">
                                                                            <div className="field__icon"><i className="la la-key "></i> </div>
                                                                            <input autoComplete="off" type="password" className="field__input" value={this.state.new_password} onChange={(e) => { this.setState({ new_password: e.target.value }) }} name="new_password" useref="new_password" />
                                                                        </div>
                                                                        <div className="error_class">
                                                                            {this.state.error_new_password}
                                                                        </div>
                                                                    </div>
                                                                    <div className="field auth__field">
                                                                        <div className="field__label">Confirm Password</div>
                                                                        <div className="field__wrap">
                                                                            <div className="field__icon"><i className="la la-key "></i> </div>
                                                                            <input autoComplete="off" className="field__input" type="password" value={this.state.confirm_new_password} onChange={(e) => { this.setState({ confirm_new_password: e.target.value }) }} name="confirm_new_password" useref="confirm_new_password" />
                                                                        </div>
                                                                        <div className="error_class">
                                                                            {this.state.error_confirm_new_password}
                                                                        </div>
                                                                    </div>

                                                                    <div className="auth__btns profile_tab_buttons">
                                                                        <button className="btn cp-primary-btn" name="update_password" type="submit" onClick={() => { this.updateSecurityData() }}>
                                                                            {this.state.loader ? (
                                                                                <div className="loader"></div>
                                                                            ) : (
                                                                                <>Change Password</>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel>




                                                <TabPanel>
                                                    <div className="panel__tab js-panel-tab">

                                                        <div className="panel__body">
                                                            <div className="profile_auth crypto_details">
                                                                <div className='container__title title profile_tab_titles'>Crypto Details</div>
                                                                <div className="row">
                                                                    <div className="col-md-12 col-lg-7">

                                                                    
                                                                        <div className="field auth__field">
                                                                            <div className="field__label">BTC Address</div>
                                                                            <div className="field__wrap">
                                                                                <input autoComplete="off" className="field__input" type="text" value={this.state.btc_address} onChange={(e) => { this.setState({ btc_address: e.target.value }) }} name="btc_address" useref="btc_address" />
                                                                                <div className="field__icon"><i className="la la-border-all " /></div>
                                                                            </div>
                                                                            <div className="error_class">
                                                                                {this.state.error_btc_address}
                                                                            </div>
                                                                        </div>
                                                                        <div className="field auth__field">
                                                                            <div className="field__label">ETH Address</div>
                                                                            <div className="field__wrap">
                                                                                <input autoComplete="off" className="field__input" type="text" value={this.state.eth_address} onChange={(e) => { this.setState({ eth_address: e.target.value }) }} name="eth_address" useref="eth_address" />
                                                                                <div className="field__icon"><i className="la la-border-all " /></div>
                                                                            </div>
                                                                            <div className="error_class">
                                                                                {this.state.error_eth_address}
                                                                            </div>
                                                                        </div>
                                                                        <div className="field auth__field">
                                                                            <div className="field__label">BNB Address</div>
                                                                            <div className="field__wrap">
                                                                                <input autoComplete="off" className="field__input" type="text" value={this.state.bnb_address} onChange={(e) => { this.setState({ bnb_address: e.target.value }) }} name="bnb_address" useref="bnb_address" />
                                                                                <div className="field__icon"><i className="la la-border-all " /></div>
                                                                            </div>
                                                                            <div className="error_class">
                                                                                {this.state.error_bnb_address}
                                                                            </div>
                                                                        </div>
                                                                        <div className="auth__btns profile_tab_buttons">
                                                                            <button className="btn cp-primary-btn" type="submit" name="update_password" onClick={() => { this.updateWalletTokenAddress() }}>
                                                                                {this.state.loader ? (
                                                                                    <div className="loader"></div>
                                                                                ) : (
                                                                                    <>Update Wallet Address</>
                                                                                )}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TabPanel>
                                            </Tabs>
                                        </div>
                                    </div>
                                </div>
                            {/* code from publisher panel ends here */}




                            {/* <div className="layout my_profile">
                                <div className="layout__row js-panel">
                                    <div className="layout__panel panel profilehead">

                                        <div className="sidebar__inner profile_inner">
                                            <div className="sidebar__section">
                                                <div className="form form_settings profile_main_info">
                                                    <p>Main Info</p>

                                                    <div className="form__col profile_col">
                                                        <div className="field form__field">
                                                            <div className="field__label">Username</div>
                                                            <div className="field__wrap">
                                                                <input type="text" className="field__input" placeholder="Username" defaultValue={this.state.username} name="username" disabled />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="form__col profile_col">
                                                        <div className="field form__field">
                                                            <div className="field__label">Full name</div>
                                                            <div className="field__wrap">
                                                                <input autoComplete="off" type="text" className="field__input" placeholder="Username" value={this.state.full_name} onChange={(e) => { this.setState({ full_name: e.target.value }) }} name="full_name" ref="full_name" />
                                                            </div>
                                                            <div style={{ color: "red" }}>
                                                                {this.state.error_full_name}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form__col profile_col">
                                                        <div className="field form__field">
                                                            <div className="field__label">Email ID</div>
                                                            <div className="field__wrap">
                                                                <input autoComplete="off" type="text" className="field__input" placeholder="Email ID" value={this.state.email_id} onChange={(e) => { this.setState({ email_id: e.target.value }) }} name="email_id" ref="email_id" />
                                                            </div>
                                                            <div style={{ color: "red" }}>
                                                                {this.state.error_email_id}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="form__col profile_col">
                                                        <div className="field form__field">
                                                            <div className="field__label">Location</div>
                                                            <div className="field__wrap">
                                                                <input autoComplete="off" type="text" className="field__input" placeholder="Location" value={this.state.location} onChange={(e) => { this.setState({ location: e.target.value }) }} name="location" ref="location" />
                                                                <div className="field__icon"><i className="la la-map-marker"></i></div>
                                                            </div>
                                                            <div style={{ color: "red" }}>
                                                                {this.state.error_location}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form__col profile_col">
                                                        <div className="field form__field">
                                                            <div className="field__label">Select Country</div>
                                                            <div className="field__wrap">
                                                                <select className="field__select" name="country_row_id" onChange={(e) => { this.setState({ country_row_id: e.target.value }) }} useref="country_row_id" >
                                                                    <option value="">Select Country</option>
                                                                    {
                                                                        this.state.countryList ?
                                                                            this.state.countryList.map((item, i) =>
                                                                                <option value={item.country_id} key={item.country_id} selected={this.state.country_row_id == item.country_id}> {item.country_name} ({item.country_code} )</option>
                                                                            )
                                                                            : null
                                                                    }
                                                                </select>
                                                                <div className="field__icon"><i className="la la-angle-down "></i></div>
                                                            </div>
                                                            <div style={{ color: "red" }}>
                                                                {this.state.error_country_row_id}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form__col profile_col">
                                                        <div className="field form__field">
                                                            <div className="field__label">Mobile Number</div>
                                                            <div className="field__wrap">
                                                                <input autoComplete="off" type="text" className="field__input" placeholder="Mobile Number" value={this.state.mobile_number} onChange={(e) => { this.setState({ mobile_number: e.target.value }) }} name="mobile_number" ref="mobile_number" />
                                                            </div>
                                                            <div style={{ color: "red" }}>
                                                                {this.state.error_mobile_number}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <button type="button" onClick={() => { this.updatePersonalData() }} className='btn btn-primary update_profile'>Update Profile</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="layout__panel layout__panel_x2 panel profiledetails_tabs">
                                        <Tabs>
                                            <TabList>
                                                <Tab className="btn custom_button btn_light btn_icon js-panel-btn"><i className="la la-user"></i> Profile Info</Tab>
                                                <Tab className="btn custom_button btn_light btn_icon js-panel-btn"><i className="la la-key "></i> Security</Tab>
                                            </TabList>

                                            <TabPanel>
                                                <div className="auth__form profile_auth">
                                                    <div className='container__title title profile_tab_titles'>Profile Info</div>
                                                    <div className='profile_textarea_block'>
                                                        <p>About</p>
                                                        <textarea value={this.state.about_advertiser} onChange={(e) => { this.setState({ about_advertiser: e.target.value }) }} name="about_advertiser" ref="about_advertiser"></textarea>
                                                        <div className="error">
                                                            {this.state.error_about_advertiser}
                                                        </div>
                                                    </div>



                                                    <div className="form__row">
                                                        <div className="form__col">
                                                            <div className="field form__field">
                                                                <div className="field__label">Business Website</div>
                                                                <div className="field__wrap">
                                                                    <input className="field__input" type="text" placeholder="Business Website" value={this.state.website_name} onChange={(e) => { this.setState({ website_name: e.target.value }) }} name="website_name" ref="website_name" />
                                                                    <div className="field__icon"><i className="la la-user "></i></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form__col">
                                                            <div className="field form__field">
                                                                <div className="field__label">People Strength</div>
                                                                <div className="field__wrap">
                                                                    <select className="field__select" onChange={(e) => { this.setState({ people_range: e.target.value }) }} name="people_range" ref="people_range" >
                                                                        <option value="">People Strength</option>
                                                                        {
                                                                            this.state.people_range_list ?
                                                                                this.state.people_range_list.map((item, i) =>
                                                                                    <option value={item.id} key={item.id} selected={this.state.people_range == item.id}> {item.people_range}</option>
                                                                                )
                                                                                : null
                                                                        }
                                                                    </select>
                                                                    <div className="field__icon"><i className="la la-angle-down "></i></div>
                                                                </div>
                                                            </div>
                                                            <div className="error">
                                                                {this.state.error_people_range}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p>Web Meeting Type</p>
                                                                <div className="input-group mb-3">
                                                                    <div className="input-group-prepend custom_input_group">
                                                                        <span className="input-group-text">
                                                                            <select name="web_meeting_type" onChange={(e) => { this.setState({ web_meeting_type: e.target.value }) }} useref="web_meeting_type">
                                                                                <option value="1" selected={this.state.web_meeting_type == 1}>Google Meet</option>
                                                                                <option value="2" selected={this.state.web_meeting_type == 2}>Jio Meet</option>
                                                                                <option value="3" selected={this.state.web_meeting_type == 3}>Slack Meet</option>
                                                                                <option value="4" selected={this.state.web_meeting_type == 4}>Skype Meet</option>
                                                                            </select>
                                                                        </span>
                                                                    </div>
                                                                    <input type="text" className="form-control" placeholder="Web Meeting Id" value={this.state.web_meeting_id} onChange={(e) => { this.setState({ web_meeting_id: e.target.value }) }} name="web_meeting_id" ref="web_meeting_id" />

                                                                </div>
                                                                <div className="error">
                                                                    {this.state.error_web_meeting_id}
                                                                </div>

                                                    <div className="form__row">
                                                        <div className="form__col">
                                                            <div className="field form__field">
                                                                <div className="field__label">Telegram</div>
                                                                <div className="field__wrap">
                                                                    <input className="field__input" type="text" placeholder="Telegram/ evjk5656" value={this.state.telegram} onChange={(e) => { this.setState({ telegram: e.target.value }) }} name="telegram" ref="telegram" />
                                                                    <div className="field__icon"><i className="la la-fax "></i></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="form__col">
                                                            <div className="field form__field">
                                                                <div className="field__label">Twitter</div>
                                                                <div className="field__wrap">
                                                                    <input className="field__input" type="text" placeholder="Twitter/evanyates" value={this.state.twitter} onChange={(e) => { this.setState({ twitter: e.target.value }) }} name="twitter" ref="twitter" />
                                                                    <div className="field__icon"><i className="la la-twitter"></i></div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="form__row">
                                                        <div className="form__col">
                                                            <div className="field form__field">
                                                                <div className="field__label">Facebook</div>
                                                                <div className="field__wrap">
                                                                    <input className="field__input" type="text" placeholder="Facebook/evanyates" value={this.state.facebook} onChange={(e) => { this.setState({ facebook: e.target.value }) }} name="facebook" ref="facebook" />
                                                                    <div className="field__icon"><i className="la la-facebook"></i></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </div>
                                                    <button className="btn btn-primary update_profile_info" type="submit" onClick={() => { this.updateOtherData() }}>
                                                        {this.state.loader ? (
                                                            <div className="loader"></div>
                                                        ) : (
                                                            <>Update Other Details</>
                                                        )}
                                                    </button>
                                                    <div className="auth__btns profile_tab_buttons">
                                                        <button className="btn btn-primary  auth__btn" type="submit" name="update_password" onClick={() => { this.updateOtherData() }}>
                                                            {this.state.loader ? (
                                                                <div className="loader"></div>
                                                            ) : (
                                                                <>Update Other Details</>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </TabPanel>

                                            <TabPanel>
                                                <div className="auth__form profile_auth" >
                                                    <div className='container__title title profile_tab_titles'>Security Details</div>
                                                    <div className="field auth__field">
                                                        <div className="field__label">Old Password</div>
                                                        <div className="field__wrap">
                                                            <input autoComplete="off" className="field__input" value={this.state.current_password} type="password" onChange={(e) => { this.setState({ current_password: e.target.value }) }} name="current_password" useref="current_password" />
                                                            <div className="field__icon"><i className="la la-key "></i> </div>
                                                        </div>
                                                        <div className="error">
                                                            {this.state.error_current_password}
                                                        </div>
                                                    </div>
                                                    <div className="field auth__field">
                                                        <div className="field__label">New Password</div>
                                                        <div className="field__wrap">
                                                            <input autoComplete="off" type="password" className="field__input" value={this.state.new_password} onChange={(e) => { this.setState({ new_password: e.target.value }) }} name="new_password" useref="new_password" />
                                                            <div className="field__icon"><i className="la la-key "></i> </div>
                                                        </div>
                                                        <div className="error">
                                                            {this.state.error_new_password}
                                                        </div>
                                                    </div>
                                                    <div className="field auth__field">
                                                        <div className="field__label">Confirm Password</div>
                                                        <div className="field__wrap">
                                                            <input autoComplete="off" className="field__input" type="password" value={this.state.confirm_new_password} onChange={(e) => { this.setState({ confirm_new_password: e.target.value }) }} name="confirm_new_password" useref="confirm_new_password" />
                                                            <div className="field__icon"><i className="la la-key "></i> </div>
                                                        </div>
                                                        <div className="error">
                                                            {this.state.error_confirm_new_password}
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-primary auth__btn" type="submit" name="update_password" onClick={() => { this.updateSecurityData() }}>
                                                        {this.state.loader ? (
                                                            <div className="loader"></div>
                                                        ) : (
                                                            <>Change Password</>
                                                        )}
                                                    </button>
                                                    <div className="auth__btns profile_tab_buttons">
                                                        <button className="btn btn-primary  auth__btn" type="submit" name="update_password" onClick={() => { this.updateSecurityData() }}>
                                                            {this.state.loader ? (
                                                                <div className="loader"></div>
                                                            ) : (
                                                                <>Change Password</>
                                                            )}
                                                        </button>
                                                    </div>
                                                </div>
                                            </TabPanel>
                                        </Tabs>

                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {/* container body ends */}
                    </div>
                </div>

                {
                    this.state.modal_data.title
                    ? 
                    <Popupmodal message={this.state.modal_data} /> 
                    :
                    null
                } 
            </div>
        )

    }
}

export async function getServerSideProps({req}) 
{
    const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
    if(parseInt(userAgent.login_user_email_status) === 1)
    {
        if(!userAgent.advertiser_token)
        {
            return {redirect: { destination: '/login', permanent: false }}
        }
        return {props: {userAgent:userAgent}}
    }
    else
    {
        return {redirect: { destination: '/verify-email', permanent: false }}
    }
    
}

export default profile






