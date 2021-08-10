import React,{useState, useEffect} from 'react'
import Link from 'next/link'
import Head from 'next/head'
import cookie from "cookie"

export default function welcome_screen() 
{
    const [menu_toggle, setMenu_toggle] = useState(false)
    return (
    <>
        <Head>
            <title>Advertiser Register Success</title>
        </Head>
        <div className="ad_register_success">
            

            <div className="welcome_title">
                <h2>The Tool is Ready !</h2>
                <p>Start Finding Publishers & influencers for your Campaign</p>
            </div>


            <div className="welcome_steps_block">
            <div className="object_one"></div>
            <div className="object_two"></div>
            <div className="object_three"></div>
                <div className="row">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-10">
                        <div className="welcome_steps">
                            <ul>
                                <li>
                                    <img src="/assets/images/step1.png" />
                                    <p className="welcome_step">Step 1</p>
                                    <p className="welcome_step_title">Load Your Wallet</p>
                                </li>
                                <li>
                                    <img src="/assets/images/step2.png" />
                                    <p className="welcome_step">Step 2</p>
                                    <p className="welcome_step_title">Create Campaign</p>
                                </li>
                                <li>
                                    <img src="/assets/images/step3.png" />
                                    <p className="welcome_step">Step 3</p>
                                    <p className="welcome_step_title">Choose from best suitable influencers</p>
                                </li>
                                <li>
                                    <img src="/assets/images/step4.png" />
                                    <p className="welcome_step">Step 4</p>
                                    <p className="welcome_step_title">Review Work Submissions</p>
                                </li>
                                <li>
                                    <img src="/assets/images/step5.png" />
                                    <p className="welcome_step">Step 5</p>
                                    <p className="welcome_step_title">Job Done !</p>
                                </li>
                            </ul>
                        </div>
                        <div className="welcome_action">
                            <p><Link href="/user/orders/create-new"><a className="btn cp-primary-btn start_campaign">Start With New Order</a></Link></p>
                            <p className="load_wallet_first"><Link href="#"><a className="">Or Load Wallet First</a></Link></p>
                        </div>
                    </div>
                    <div className="col-lg-1"></div>
                </div>
            </div>
        </div>
        
    </>
    )
}
 
export async function getServerSideProps({req}) 
{
    const userAgent = cookie.parse(req ? req.headers.cookie || "" : document.cookie)
    if(userAgent.advertiser_token)
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
