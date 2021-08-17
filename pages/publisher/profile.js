import React from 'react'
import cookie from "cookie"
import Link from 'next/link';
import Head from 'next/head';
import Router from 'next/router'
import jsCookie from "js-cookie"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MenuBar from '../../components/publisher/dash_menu_bar'
import TopMenuBar from '../../components/publisher/dash_top_menu_bar'
import * as constants from '../../components/constants'
import Popupmodal from '../../components/popUpModal' 

class profile extends React.Component {
    constructor(props) 
    {
        super(props)
        const { userAgent } = this.props

        this.state = {
            API_BASE_URL: constants.API_BASE_URL,
            headers: constants.headers,
            countryList: constants.countryList,
            people_range_list: constants.people_range_list,
            token: userAgent.publisher_token,
            full_name: userAgent.publisher_full_name,
            selectedItem: '',
            getAPIOutput: false,
            username: "",
            location: "",
            profile_image: "",
            email_id: "",
            mobile_number: "",
            date_n_time: "",
            about_advertiser: "",
            btc_address: "",
            eth_address: "",
            bnb_address: "",
            error_about_publisher: "",
            about_publisher: "",
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
            web_meeting_type: "1",
            web_meeting_id: "",
            error_web_meeting_id: "",
            people_range_id: "",
            error_people_range_id: "",
            modal_data: {
                title: "",
                image_name: "",
                description: ""
            } 
        }
    }

    dashboard_me() 
    {
        var headers = this.state.headers
        headers['token'] = this.state.token

        fetch(this.state.API_BASE_URL + "publisher/profile/other_details", {
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
                            date_n_time: result.message.date_n_time,
                            web_meeting_type: this.changeString(result.message.web_meeting_type),
                            web_meeting_id: this.changeString(result.message.web_meeting_id),
                            people_range_id: this.changeString(result.message.people_range_id),
                            about_publisher: this.changeString(result.message.about_publisher),
                            eth_address: this.changeString(result.message.eth_address),
                            bnb_address: this.changeString(result.message.bnb_address),
                            btc_address: this.changeString(result.message.btc_address)
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


    updatePersonalData() 
    {

        let formIsValid = true
        this.clearMsg()
       
        if (this.state.full_name.length < 4) {
            this.setState({
                error_full_name: "Use atleast 6 characters."
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
                error_email_id: "Invalid Email."
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
                error_mobile_number: "Use atleast 10 characters."
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
                error_country_row_id: "Required."
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

        fetch(this.state.API_BASE_URL + "publisher/profile/update_profile", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(reqObj)
        }).then(res => res.json())
            .then(
                (result) => {
                    console.warn(result);
                    if (result.status === true) 
                    {
                        this.setState({
                            modal_data: {title:'Profile Updated', image_name: "select.svg", description: result.message.alert_message},
                            error_username: "",
                            error_full_name: "",
                            error_mobile_number: "",
                            error_email_id: ""
                        })

                        jsCookie.set('publisher_full_name', this.state.full_name)
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
            error_current_password: "Required."
        })
        formIsValid = false
    }
    else {
        this.setState({
            error_current_password: ""
        })
    }

    if (this.state.new_password === '') {
        this.setState({
            error_new_password: "Required."
        })
        formIsValid = false
    }
    else if (this.state.new_password.length < 6) {
        this.setState({
            error_new_password: "Use atleast 6 characters."
        })
        formIsValid = false
    }
    else {
        this.setState({
            error_new_password: ""
        })
    }


    if (this.state.confirm_new_password === '') {
        this.setState({
            error_confirm_new_password: "Required."
        });
        formIsValid = false
    }
    else if (this.state.confirm_new_password !== this.state.new_password) {
        this.setState({
            error_confirm_new_password: "Invalid"
        });
        formIsValid = false
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

    fetch(this.state.API_BASE_URL + "publisher/profile/security_details", {
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

    if (this.state.people_range_id == '') {
        this.setState({
            error_people_range_id: "Required."
        });
        formIsValid = false;
    }
    else {
        this.setState({
            error_people_range_id: ""
        });
    }

    if (this.state.about_publisher == '') {
        this.setState({
            error_about_publisher: "Required."
        });
        formIsValid = false;
    }
    else if (this.state.about_publisher.length < 4) {
        this.setState({
            error_about_publisher: "Use atleast 4 characters."
        });
        formIsValid = false;
    }
    else {
        this.setState({
            error_about_publisher: ""
        });
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
        about_publisher: this.state.about_publisher,
        web_meeting_id: this.state.web_meeting_id,
        web_meeting_type: web_meeting_type,
        people_range: this.state.people_range_id
    }

    console.log(reqObj)

    fetch(this.state.API_BASE_URL + "publisher/profile/update_other_details", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(reqObj)
    }).then(res => res.json())
        .then(
        (result) => {
            console.warn(result);
            if (result.status === true) {
                this.setState({
                    modal_data: {title:'Other Details Updated', image_name: "select.svg", description: result.message.alert_message},
                    error_about_publisher:"",
                    error_web_meeting_id:"",
                    error_people_range_id:""
                })
            }
            else 
            {
                if(result.message.about_publisher) 
                {
                    this.setState({
                        error_about_publisher: result.message.about_publisher
                    })
                }
            }
        })
}

updateWalletTokenAddress() 
{
    let formIsValid = true
    this.clearMsg()

    if (!formIsValid) {
        return true;
    }

    var headers = this.state.headers
    headers['token'] = this.state.token

    var reqObj = {
        btc_address: this.state.btc_address,
        eth_address: this.state.eth_address,
        bnb_address: this.state.bnb_address
    }
    console.log(reqObj)

    fetch(this.state.API_BASE_URL + "publisher/profile/update_token_wallet_address", {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(reqObj)
    }).then(res => res.json())
        .then(
            (result) => {
                console.warn(result);
                if (result.status === true) {
                    this.setState({
                        modal_data: {title:'Wallet Updated', image_name: "select.svg", description: result.message.alert_message}
                    })
                }
                else {
                    if (result.message.alert_message) {
                        this.setState({
                            modal_data: {title:'Wallet Update Failed', image_name: "reject.svg", description: result.message.alert_message}
                        })
                    }
                }
            })
}


    componentDidMount() {
        this.dashboard_me()
        if (!this.state.token) {
            Router.push('/login')
        }
    }

    render() {

        return (
            <>
                <Head>
                    <meta charSet="utf-8" />
                    <title>My Profile</title>
                </Head>
                <div className="page">
                    <MenuBar />
                    <div className="container-dash">
                        <TopMenuBar full_name={this.state.full_name} />

                        <div className="container__body">
                            <div className="panel_title_block">
                                <h2>My Profile</h2>
                                <p>Manage your profile here</p>
                            </div>

                            <div className="layout my_profile">
                                <div className="layout__row js-panel">
                                    {/* panel*/}
                                    <div className="layout__panel panel profilehead">

                                        <div className="panel__group">
                                            <div className="panel__title title">Main Info</div>
                                            <div >

                                                {/* <div className="profile_col">
                                                    <div className="field form__field">
                                                        <div className="field__label">Username</div>
                                                        <div className="field__wrap">
                                                            <input type="text" className="field__input" placeholder="Username" defaultValue={this.state.username} name="username" disabled />
                                                            <img src="/assets/images/username.png" />
                                                        </div>
                                                    </div>
                                                </div> 
                                                <div className="profile_col">
                                                    <div className="field form__field">
                                                        <div className="field__label">Full name</div>
                                                        <div className="field__wrap">
                                                            <input autoComplete="off" type="text" className="field__input" placeholder="Username" value={this.state.full_name} onChange={(e) => { this.setState({ full_name: e.target.value }) }} name="full_name" ref="full_name" />
                                                            <img src="/assets/images/login.png" />
                                                        </div>
                                                        <div style={{ color: "red" }}>
                                                            {this.state.error_full_name}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="profile_col">
                                                    <div className="field form__field">
                                                        <div className="field__label">Email ID</div>
                                                        <div className="field__wrap">
                                                            <input autoComplete="off" type="text" className="field__input" placeholder="Email ID" value={this.state.email_id} onChange={(e) => { this.setState({ email_id: e.target.value }) }} name="email_id" ref="email_id" />
                                                            <img src="/assets/images/email.png" />
                                                        </div>
                                                        <div style={{ color: "red" }}>
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
                                                        <div style={{ color: "red" }}>
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
                                                            <div className="field__icon"><img src="/assets/images/down_arrow_grey.png" /></div>
                                                        </div>
                                                        <div style={{ color: "red" }}>
                                                            {this.state.error_country_row_id}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="profile_col">
                                                    <div className="field form__field">
                                                        <div className="field__label">Mobile Number</div>
                                                        <div className="field__wrap">
                                                            <input autoComplete="off" type="text" className="field__input" placeholder="Mobile Number" value={this.state.mobile_number} onChange={(e) => { this.setState({ mobile_number: e.target.value }) }} name="mobile_number" ref="mobile_number" />
                                                            <img src="/assets/images/mobile.png" />
                                                        </div>
                                                        <div style={{ color: "red" }}>
                                                            {this.state.error_mobile_number}
                                                        </div>
                                                    </div>
                                                </div> */}



                                                <div className="profile_col">
                                                    <div className="field form__field">
                                                        <div className="field__label">Username <span className="validation_asteris">*</span></div>
                                                        <div className="field__wrap">
                                                            <input type="text" className="field__input" placeholder="Username" defaultValue={this.state.username} name="username" disabled />
                                                            <div className="field__icon"><img src="/assets/images/login.png" /></div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="profile_col">
                                                    <div className="field form__field">
                                                        <div className="field__label">Full name <span className="validation_asteris">*</span></div>
                                                        <div className="field__wrap">
                                                            <input autoComplete="off" type="text" className="field__input" placeholder="Username" value={this.state.full_name} onChange={(e) => { this.setState({ full_name: e.target.value }) }} name="full_name" ref="full_name" />
                                                            <div className="field__icon"><img src="/assets/images/user.png" /></div>
                                                        </div>
                                                        <div className="error_class">
                                                            {this.state.error_full_name}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="profile_col">
                                                    <div className="field form__field">
                                                        <div className="field__label">Email id <span className="validation_asteris">*</span></div>
                                                        <div className="field__wrap">
                                                            <input autoComplete="off" type="text" className="field__input" placeholder="Email ID" value={this.state.email_id} onChange={(e) => { this.setState({ email_id: e.target.value }) }} name="email_id" ref="email_id" />
                                                            <div className="field__icon"><img src="/assets/images/email.png" /></div>
                                                        </div>
                                                        <div className="error_class">
                                                            {this.state.error_email_id}
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="profile_col">
                                                    <div className="field form__field">
                                                        <div className="field__label">Location <span className="validation_asteris">*</span></div>
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
                                                        <div className="field__label">Select country <span className="validation_asteris">*</span></div>
                                                        <div className="field__wrap">
                                                            <select className="field__select" name="country_row_id" onChange={(e) => { this.setState({ country_row_id: e.target.value }) }} useref="country_row_id" >
                                                                <option value="">Select country</option>
                                                                {
                                                                    this.state.countryList ?
                                                                    this.state.countryList.map((item, i) =>
                                                                        <option value={item.country_id} key={item.country_id} selected={this.state.country_row_id == item.country_id}> {item.country_name} ({item.country_code} )</option>
                                                                    )
                                                                    : null
                                                                }
                                                            </select>
                                                            <div className="field__icon"><img src="/assets/images/down_arrow_grey.png " /></div>
                                                        </div>
                                                        <div className="error_class">
                                                            {this.state.error_country_row_id}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="profile_col">
                                                    <div className="field form__field">
                                                        <div className="field__label">Mobile number <span className="validation_asteris">*</span></div>
                                                        <div className="field__wrap">
                                                            <input autoComplete="off" type="text" className="field__input" placeholder="Mobile Number" value={this.state.mobile_number} onChange={(e) => { this.setState({ mobile_number: e.target.value }) }} name="mobile_number" ref="mobile_number" />
                                                            <div className="field__icon"><img src="/assets/images/mobile.png" /></div>
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
                                                                        <div className="profile_text_area">
                                                                            <div className="field__label">About <span className="validation_asteris">*</span></div>
                                                                            <textarea value={this.state.about_publisher} onChange={(e) => { this.setState({ about_publisher: e.target.value }) }} name="about_publisher" ref="about_publisher"></textarea>
                                                                            <div className="error_class">
                                                                                {this.state.error_about_publisher}
                                                                            </div>
                                                                        </div>
                                                                       

                                                                        

                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="field__label">Web meeting type <span className="validation_asteris">*</span></div>
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
                                                                                    <div className="field__label">People range <span className="validation_asteris">*</span></div>
                                                                                    <div className="field__wrap">
                                                                                        <select className="field__select people_range_select" name="people_range_id" onChange={(e) => { this.setState({ people_range_id: e.target.value }) }} useref="people_range_id">
                                                                                            <option disabled="" selected="">People Range</option>
                                                                                            {
                                                                                                this.state.people_range_list ?
                                                                                                    this.state.people_range_list.map((item, i) =>
                                                                                                        <option value={item.id} key={item.id} selected={this.state.people_range_id == item.id}> {item.people_range}</option>
                                                                                                    )
                                                                                                    : null
                                                                                            }
                                                                                        </select>
                                                                                        <div className="field__icon"><i className="la la-angle-down "></i></div>
                                                                                    </div>
                                                                                    <div className="error_class">
                                                                                        {this.state.error_people_range_id}
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
                                                                                <>Update details</>
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
                                                            <div className='container__title title profile_tab_titles'>Security details</div>
                                                                <div className="field auth__field">
                                                                    <div className="field__label">Old password <span className="validation_asteris">*</span></div>
                                                                    <div className="field__wrap">
                                                                        <div className="field__icon"><img src="/assets/images/lock.png" /> </div>
                                                                        <input autoComplete="off" className="field__input" type="password" value={this.state.current_password} onChange={(e) => { this.setState({ current_password: e.target.value }) }} name="current_password" useref="current_password" />
                                                                    </div>
                                                                    <div className="error_class">
                                                                        {this.state.error_current_password}
                                                                    </div>
                                                                </div>
                                                                <div className="field auth__field">
                                                                    <div className="field__label">New password <span className="validation_asteris">*</span></div>
                                                                    <div className="field__wrap">
                                                                        <div className="field__icon"><img src="/assets/images/lock.png" /> </div>
                                                                        <input autoComplete="off" type="password" className="field__input" value={this.state.new_password} onChange={(e) => { this.setState({ new_password: e.target.value }) }} name="new_password" useref="new_password" />
                                                                    </div>
                                                                    <div className="error_class">
                                                                        {this.state.error_new_password}
                                                                    </div>
                                                                </div>
                                                                <div className="field auth__field">
                                                                    <div className="field__label">Confirm password <span className="validation_asteris">*</span></div>
                                                                    <div className="field__wrap">
                                                                        <div className="field__icon"><img src="/assets/images/lock.png" /> </div>
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
                                                                            <>Change password</>
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
                                                            <div className='container__title title profile_tab_titles'>Crypto details</div>
                                                            <div className="row">
                                                                <div className="col-md-12 col-lg-7">

                                                                
                                                                    <div className="field auth__field">
                                                                        <div className="field__label">BTC address</div>
                                                                        <div className="field__wrap">
                                                                            <input autoComplete="off" className="field__input" type="text" value={this.state.btc_address} onChange={(e) => { this.setState({ btc_address: e.target.value }) }} name="btc_address" useref="btc_address" />
                                                                            <div className="field__icon"><img className="crypto_img" src="/assets/images/btc.png" /></div>
                                                                        </div>
                                                                        <div className="error_class">
                                                                            {this.state.error_btc_address}
                                                                        </div>
                                                                    </div>
                                                                    <div className="field auth__field">
                                                                        <div className="field__label">ETH address</div>
                                                                        <div className="field__wrap">
                                                                            <input autoComplete="off" className="field__input" type="text" value={this.state.eth_address} onChange={(e) => { this.setState({ eth_address: e.target.value }) }} name="eth_address" useref="eth_address" />
                                                                            <div className="field__icon"><img className="crypto_img" src="/assets/images/eth.png" /></div>
                                                                        </div>
                                                                        <div className="error_class">
                                                                            {this.state.error_eth_address}
                                                                        </div>
                                                                    </div>
                                                                    <div className="field auth__field">
                                                                        <div className="field__label">BNB address</div>
                                                                        <div className="field__wrap">
                                                                            <input autoComplete="off" className="field__input" type="text" value={this.state.bnb_address} onChange={(e) => { this.setState({ bnb_address: e.target.value }) }} name="bnb_address" useref="bnb_address" />
                                                                            <div className="field__icon"><img className="crypto_img" src="/assets/images/bnb.png" /></div>
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
                                                                                <>Update wallet address</>
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
                        </div>
                    </div>
                </div>
                {
                this.state.modal_data.title
                ? 
                <Popupmodal message={this.state.modal_data} /> 
                :
                null
                }                                                         
            </>
        )
    }
}

export default profile

export async function getServerSideProps({req}) 
{
    const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
    if(userAgent.publisher_full_name)
    {   
        if(parseInt(userAgent.login_user_email_status) === 1)
        {
            return {props: {userAgent:userAgent}}
        }
        else
        {
            return {redirect: { destination: '/verify-email', permanent: false }}
        }
    }
    else
    {
        return {redirect: { destination: '/login', permanent: false }} 
        
    }
}