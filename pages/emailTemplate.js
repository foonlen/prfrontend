import React from 'react'
import Head from 'next/head'
import Link from 'next/link'


function emailTemplate() {
  return (
    <div>
      <Head>
      <meta charSet="utf-8" />
      <title>Email Template- Ad Register</title>
      </Head>
      
      <div style={{background:'#fff',padding:'40px 50px 30px',fontsize:'14px',lineheight:'1.4', borderRadius: '5px',}}>
        <h3 style={{margin:0,color:'#000 ',fontWeight:'400',fontSize:'18px', color:'#8181a5'}}>Subject : Welcome to BrandsNeed Advertiser Tool </h3>
        <h5>Hello Advertiser</h5>
        <p>Thanks for Joining BrandsNeed, You are one step closer to experiencing the best marketing resource for your business.</p>
        <p><span>12345</span>is your OTP to Verify your email.</p>
        <p>Get Verified and Get Started with Placing your order requirement.</p>

        
        
      </div>

    </div>
  )
}

export default emailTemplate
