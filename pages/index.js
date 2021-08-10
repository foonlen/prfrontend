import React ,{useState, useEffect} from 'react'
import Head from 'next/head' 
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper,faMoneyBill, faBullhorn, faStarHalfAlt, faPencilAlt, faFilePdf, faPodcast, faCreditCard, faExchangeAlt, faCircleNotch } from '@fortawesome/free-solid-svg-icons';
 
import ItemsCarousel from 'react-items-carousel';
import { faAdversal, faBtc, faFacebookSquare, faInstagramSquare, faTwitterSquare } from '@fortawesome/free-brands-svg-icons'; 
 
export default function Home() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const [carouselitems, setCarouselitems] = useState(0) 

  useEffect(() => {
    console.log(window.innerWidth)

    if(window.innerWidth > 768){
      setCarouselitems(5)
    }
    else if(window.innerWidth > 468){
      setCarouselitems(3)
    }
    else if(window.innerWidth > 200){
      setCarouselitems(2)
    } 
  }, []);
 
  return (
    <>
    <Head>
 
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
    <meta name="theme-color" content="#3ed2a7"/>
    <link rel="shortcut icon" href="./favicon.png" />
    <link rel="stylesheet" href="/assets/css/theme-vendors.min.css" />
    <link rel="stylesheet" href="/assets/css/theme.min.css" />
    <link rel="stylesheet" href="/assets/css/seo.css" /> 
    <script src="https://pr.coinpedia.org/assets/webiste/js/theme-vendors.js"></script>
    <script src="https://pr.coinpedia.org/assets/webiste/js/theme.min.js"></script> 
    <title>Best PR Agency for Fintech Services | Professionals at work</title>

    </Head>
           

    <header className="main-header main-header-overlay">
        <div className="mainbar-wrap">
          <div className="megamenu-hover-bg" />
          <div className="row d-flex flex-wrap">
            <div className="col-md-12">
              <div className="mainbar container">
                <div className="row mainbar-row align-items-lg-stretch">
                  <div className="col-auto">
                    <div className="navbar-header">
                    <Link href="/">
                      <a className="navbar-brand" >
                        <span className="navbar-brand-inner">
                          <img className="logo-dark" src="/assets/img/logo-white.png" alt="Pr Coinpedia" />
                          <img className="logo-sticky" src="/assets/img/logo-white.png" alt="Pr Coinpedia" />
                          <img className="mobile-logo-default" src="/assets/img/logo-white.png" alt="Pr Coinpedia" />
                          <img className="logo-default" src="/assets/img/logo-white.png" alt="Pr Coinpedia" />
                        </span>
                      </a>
                    </Link>

                      <button type="button" className="navbar-toggle collapsed nav-trigger style-mobile " data-toggle="collapse" data-target="#main-header-collapse" aria-expanded="false" data-changeclassnames="{ &quot;html&quot;: &quot;mobile-nav-activated overflow-hidden&quot; }">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="bars">
                          <span className="bar" />
                          <span className="bar" />
                          <span className="bar" />
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="col">
                  </div>
                  <div className="col text-right">
                    <div className="collapse navbar-collapse custom_toggle" id="main-header-collapse">
                      <ul id="primary-nav" className="main-nav" data-submenu-options="{ &quot;toggleType&quot;:&quot;fade&quot;, &quot;handler&quot;:&quot;mouse-in-out&quot; }" data-localscroll="true">
                        <li>
                        <Link href="/">
                          <a>
                            <span className="link-icon" />
                            <span className="link-txt">
                              <span className="link-ext" />
                              <span className="txt">
                                Home
                                <span className="submenu-expander">
                                  <i className="fa fa-angle-down" />
                                </span>
                              </span>
                            </span>
                          </a>
                        </Link>
                        </li>
                        <li>
                        <Link href="/publisher/r">
                          <a>
                            <span className="link-icon" />
                            <span className="link-txt">
                              <span className="link-ext" />
                              <span className="txt">
                                Publisher Register
                                <span className="submenu-expander">
                                  <i className="fa fa-angle-down" />
                                </span>
                              </span>
                            </span>
                          </a>
                        </Link>
                        </li>
                        <li>
                        <Link href="/user/r">
                          <a>
                            <span className="link-icon" />
                            <span className="link-txt">
                              <span className="link-ext" />
                              <span className="txt">
                                Advertiser Register
                                <span className="submenu-expander">
                                  <i className="fa fa-angle-down" />
                                </span>
                              </span>
                            </span>
                          </a>
                          </Link>
                        </li>
                        <li>
                        <Link href="/login">
                          <a>
                            <span className="link-icon" />
                            <span className="link-txt login_btn">
                              <span className="link-ext" />
                              <span className="txt">
                                Log In
                                <span className="submenu-expander">
                                  <i className="fa fa-angle-down" />
                                </span>
                              </span>
                            </span>
                          </a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

    <div id="content" className="content">
        <section className="vc_row bg-no-repeat main_banner d-flex align-items-center">
          <div className="lqd-particles-bg-wrap">
            <div className="ld-particles-container">
              <div className="ld-particles-inner" id="particles-1559739661542-e9d04c39-a9eb" data-particles="true" data-particles-options="{&quot;particles&quot;:{&quot;number&quot;:{&quot;value&quot;:4}, &quot;color&quot;:{&quot;value&quot;:[&quot;#fdc14c&quot;, &quot;#fd5c4c&quot;, &quot;#48bb0f&quot;]}, &quot;shape&quot;:{&quot;type&quot;:[&quot;circle&quot;]}, &quot;opacity&quot;:{&quot;random&quot;:true, &quot;anim&quot;:{&quot;enable&quot;:true, &quot;opacity_min&quot;:0.80000000000000004, &quot;speed&quot;:1, &quot;sync&quot;:true}}, &quot;size&quot;:{&quot;value&quot;:5, &quot;random&quot;:true, &quot;anim&quot;:{&quot;enable&quot;:true, &quot;size_min&quot;:52}}, &quot;move&quot;:{&quot;enable&quot;:true, &quot;direction&quot;:&quot;none&quot;, &quot;speed&quot;:1, &quot;random&quot;:true, &quot;out_mode&quot;:&quot;out&quot;}}, &quot;interactivity&quot;:[]}" />
            </div>
          </div>
          <div style={{width: '100%'}}>
            <div className="row d-flex flex-wrap">
              <div className="lqd-column col-lg-12 col-md-12">
                <div className="row">
                  <div className="lqd-column col-lg-1 col-md-1" />
                  <div className="lqd-column col-lg-6 col-md-6 banner_text_block">
                    <div className="ld-fancy-heading mask-text text-uppercase" />
                    <div className="ld-fancy-heading mask-text">
                      <h2>
                        <span className="ld-fh-txt">PR &amp; Media Campaigns For Fintech &amp; Crypto Business, Globally</span>
                      </h2>
                    </div>
                    <div className="ld-fancy-heading mask-text mb-4">
                      <p>
                        <span className="ld-fh-txt">Find the Perfect Platform to Boom Your Project </span>
                      </p>
                    </div>
                    <form id="msform" method="post" >
                      <input type="hidden" className="form-control" name="hiddensfsadf" id="hiddensfsadf" defaultValue={1} />
                      <div className="row">
                        <div className="col-md-12">
                          <div className="input-group mb-3" style={{display:'block'}}>
                            <input type="text" className="frm_ctr" autoComplete="off" id="email_id" name="email_id" placeholder="Enter Email ID" aria-describedby="basic-addon2" />
                            <div className="input-group-append">
                              <span className="input-group-text" id="basic-addon2" style={{padding:'0px'}}>
                                <span>
                                  <button type="submit" name="save_n_get_started">Get Started</button>
                                </span>
                              </span>
                            </div>
                          </div>
                        </div> 
                      </div>
                    </form>
                    <p style={{marginTop: '30px', display: 'none', marginBottom: '30px'}}>If you are a Brand/Advertiser then <a href="https://pr.coinpedia.org/r/brand" style={{color: '#333', fontWeight: 600, textDecoration: 'underline'}}>Signup here</a></p>
                  </div>
                  <div className="lqd-column col-lg-4 col-md-4 visible-md visible-lg text-right banner_img">
                    <img src="/assets/img/banner.png" alt="Banner Image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="benefits">
          <div className="container">
            <div className="col-md-12" style={{padding:'0px'}}>
              <header className="fancy-title mb-40">
                <h2><strong>It's 2020</strong> and it should be <strong>more than</strong> just PR &amp; Sponsored tags. It's time to curate content that <strong>impacts hard.</strong> </h2>
              </header>
            </div>
 

            <div className="customer-logos slider">

            <div >
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={carouselitems}
        gutter={20}  
        chevronWidth={chevronWidth} 
      >
        <div className="slide bg_one">
                <FontAwesomeIcon icon={faNewspaper} />
                <h3>Press Release</h3>
                <p>Distribute to Press release among 8K+ media outlets globally with maximum content, hyperlinks and images.</p>
              </div>
              <div className="slide bg_two">
              <FontAwesomeIcon icon={faMoneyBill} />
                <h3>Paid News</h3>
                <p>Get the Best Paid News Service to launch your News out to a Mass audience ans increase your traffic. </p>
              </div>
              <div className="slide bg_three">
              <FontAwesomeIcon icon={faBullhorn} />
                <h3>Advertorial</h3>
                <p>We will find Best Suitable and Affordable Advertorial Copywriters and editors for your services. </p>
              </div>
              <div className="slide bg_four">
              <FontAwesomeIcon icon={faStarHalfAlt} />
                <i className="fa fa-star-half-o" aria-hidden="true" />
                <h3>Sponsored Review </h3>
                <p>Depending on your product or service, budget, schedule we find best sponsored reviews for you. </p>
              </div>
              <div className="slide bg_five">
              <FontAwesomeIcon icon={faPencilAlt} />
                
                <h3>Interview</h3>
                <p>Arrange Interviews, training sessions and webinars from top faces of your product Industry.</p>
              </div>
              <div className="slide bg_one">
              <FontAwesomeIcon icon={faFilePdf} />
                <i className="fa fa-file-pdf-o" aria-hidden="true" />
                <h3>Sponsored Post </h3>
                <p>Get SItes to publish sponsored articles, guest posts &amp; dominate online. Social Platforms are trending. </p>
              </div>
              <div className="slide bg_two">
              <FontAwesomeIcon icon={faAdversal} />
                <h3>Native Advertising </h3>
                <p>Find people who Create and Promote your content Organically with non-invasive and unique content placement.</p>
              </div>
              <div className="slide bg_three">
              <FontAwesomeIcon icon={faPodcast} />
                <h3>Contributor Post </h3>
                <p>We only work with real sites that have verified organic traffic. Your guest posts are guaranteed. </p>
              </div>
              <div className="slide bg_five">
              <FontAwesomeIcon icon={faCreditCard} />
               
                <h3>Wallet Listing </h3>
                <p>Get the Best sites and Plaforms to list your Crypto wallets and get maximum downloads in lesser time. </p>
              </div>
              <div className="slide bg_one">
              <FontAwesomeIcon icon={faExchangeAlt} />
                
                <h3>Exchange Listing </h3>
                <p>List your Trading / Exchange Platforms among top visited and review websites of Crypto and finance. </p>
              </div>
              <div className="slide bg_two">
              <FontAwesomeIcon icon={faBtc} />
               
                <h3>Listing Crypto Tool</h3>
                <p>Let your Crypto tool/plugin/product reach the Crypto audience and grab high enrollements. </p>
              </div>
              <div className="slide bg_one">
              <FontAwesomeIcon icon={faFacebookSquare} />
                <h3>Facebook Post</h3>
                <p>Promote your post or Make Sponsored and Contributary posts on facebook for your area and target audience. </p>
              </div>
              <div className="slide bg_two">
              <FontAwesomeIcon icon={faTwitterSquare} />
                <h3>Twitter Post</h3>
                <p>Tweets , Re-Tweets and Comments Get everythong to your Posts also make influencers posting. </p>
              </div>
              <div className="slide bg_three">
              <FontAwesomeIcon icon={faInstagramSquare} />
                <h3>Instagram Post</h3>
                <p>Promote your Post organically or Find best Influencer of your category and are for your services. </p>
              </div>
      </ItemsCarousel>

      <ul className="home_slides">
        <li className={activeItemIndex == 0 ? "home_page_slide_active" : "home_page_slide"} onClick={()=> setActiveItemIndex(0)}><FontAwesomeIcon icon={faCircleNotch}/></li>
        <li className={activeItemIndex == 1 ? "home_page_slide_active" : "home_page_slide"} onClick={()=> setActiveItemIndex(1)}><FontAwesomeIcon icon={faCircleNotch}/></li>
        <li className={activeItemIndex == 2 ? "home_page_slide_active" : "home_page_slide"} onClick={()=> setActiveItemIndex(2)}><FontAwesomeIcon icon={faCircleNotch}/></li>
        <li className={activeItemIndex == 3 ? "home_page_slide_active" : "home_page_slide"} onClick={()=> setActiveItemIndex(3)}><FontAwesomeIcon icon={faCircleNotch}/></li>
        <li className={activeItemIndex == 4 ? "home_page_slide_active" : "home_page_slide"} onClick={()=> setActiveItemIndex(4)}><FontAwesomeIcon icon={faCircleNotch}/></li> 
        <li className={activeItemIndex == 5 ? "home_page_slide_active" : "home_page_slide"} onClick={()=> setActiveItemIndex(5)}><FontAwesomeIcon icon={faCircleNotch}/></li>
        <li className={activeItemIndex == 6 ? "home_page_slide_active" : "home_page_slide"} onClick={()=> setActiveItemIndex(6)}><FontAwesomeIcon icon={faCircleNotch}/></li>
        <li className={activeItemIndex == 7 ? "home_page_slide_active" : "home_page_slide"} onClick={()=> setActiveItemIndex(7)}><FontAwesomeIcon icon={faCircleNotch}/></li>
        <li className={activeItemIndex == 8 ? "home_page_slide_active" : "home_page_slide"} onClick={()=> setActiveItemIndex(8)}><FontAwesomeIcon icon={faCircleNotch}/></li> 
        <li className={activeItemIndex == 9 ? "home_page_slide_active" : "home_page_slide"} onClick={()=> setActiveItemIndex(9)}><FontAwesomeIcon icon={faCircleNotch}/></li> 
      </ul>
 
    </div>

           
            </div>
          </div>
        </section>
        <section id="influencer" style={{background: '#fff7ed'}}>
          <div className="container">
            <div className="row d-flex flex-wrap align-items-center home-advertizer" id="influencer">
              <div className="lqd-column col-md-6">
                <img src="/assets/img/influencer.png" alt="Mobile Phone" />
              </div>
              <div className="lqd-column advertisercol col-md-6">
                <header className="fancy-title mb-20">
                  <h2 className="lh-1 mb-0"><strong>Are you an Advertizer?</strong> 
                   &nbsp; We’re by your Side
                  </h2>
                </header>
                <p className="font-size-20 lh-105">We’ve the best team at your service to manage your PR Campaigns with the finest reach and no hassle.</p>
                <div className="media">
                  <div className="media-left">
                    <img src="https://pr.coinpedia.org/assets/webiste/images/one.svg" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">Start with your need</h4>
                    <p>Share your PR requirements in terms of Content, Region, category, and reach estimate </p>
                  </div>
                </div>
                <div className="media">
                  <div className="media-left">
                    <img src="https://pr.coinpedia.org/assets/webiste/images/two.svg" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">Experts Begin here </h4>
                    <p>Get Instant Smart quotes on your requirement from our PR experts and dedicated PR executives. </p>
                  </div>
                </div>
                <div className="media">
                  <div className="media-left">
                    <img src="https://pr.coinpedia.org/assets/webiste/images/three.svg" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">Review and Start </h4>
                    <p>Review your Campaign quotation and initiate the payment to kick start the process. </p>
                  </div>
                </div>
                <div className="media">
                  <div className="media-left">
                    <img src="https://pr.coinpedia.org/assets/webiste/images/four.svg" />
                  </div>
                  <div className="media-body">
                    <h4 className="media-heading">Get going</h4>
                    <p>It takes just 48 hours to make your campaign live and running, get insights &amp; reports.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="vc_row home-advertizer bg-no-repeat" style={{background: 'rgba(203, 237, 221, 0.36)'}}>
          <div className="container">
            <div className="row d-flex flex-wrap align-items-center">
              <div className="lqd-column col-md-5 mb-30">
                <header className="fancy-title pr-md-4">
                  <h2><strong>We Perform Smart </strong> PR Strategies</h2>
                </header>
                <p className="font-size-18 lh-15">‘PR Project’ is a team of qualified journalists, content creators, columnists and Fintech Marketing Professionals. Our Agency offers Smart PR Collaboration with top News Portals and Plan Organic strategies that Boost your reach and hold your readers. </p>
              </div>
              <div className="lqd-column col-md-5 col-md-offset-1">
                <div className="lqd-column-inner">
                  <img src="/assets/img/all-logos.png" alt="All Logos" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="main-footer home-advertizer">
        <section className="vc_row">
          <div className="container">
            <div className="row align-items-center indexFooter">
              <div className="lqd-column col-md-3 col-xs-6 mb-30">
                <a href="/"><img src="/assets/img/logo-white.png" alt="Coinpedia logo" style={{width: '200px', marginBottom: '15px'}} /></a>
                <p>We Understand the Needs of brands and We're to Fill the Gap. </p>
              </div>
              <div className="lqd-column col-md-3 col-xs-6 mb-30">
                <h3 className="widget-title">Main Navigation</h3>
                <ul className="lqd-custom-menu reset-ul font-size-14 lh-2">
                  <li><a href="/">Home</a></li>
                  <li><a href="/publisher/r">Publisher Register</a></li>
                  <li><a href="/user/r">Advertiser Register</a></li>
                  <li><a href="/login">Login</a></li>
                </ul>
              </div>
              <div className="lqd-column col-md-3 col-xs-6 mb-30">
                <h3 className="widget-title">Others</h3>
                <ul className="lqd-custom-menu reset-ul font-size-14 lh-2">
                  <li><a href="#">Support</a></li>
                  <li><a href="#">Terms &amp; Condition</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                </ul>
              </div>
              <div className="lqd-column col-md-3 col-xs-6 mb-30">
                <h3 className="widget-title">Social</h3>
                <p className="social_main_footer">
                  <a href="#" target="_blank"><img src="https://pr.coinpedia.org/assets/webiste/images/f-fb.svg" alt="facebook" /></a>
                  <a href="#" target="_blank"><img src="https://pr.coinpedia.org/assets/webiste/images/f-tw.svg" alt="twitter" /></a>
                  <a href="#" target="_blank"><img src="https://pr.coinpedia.org/assets/webiste/images/f-li.svg" alt="linkedin" /></a>
                  <a href="#" target="_blank"><img src="https://pr.coinpedia.org/assets/webiste/images/f-in.svg" alt="instagram" /></a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="vc_row">
          <div className="container">
            <div className="row d-flex flex-wrap align-items-center">
              <div className="lqd-column col-md-12 text-center flex-wrap align-items-center">
                <p className="font-size-16 my-0 text-center">Copyright 2020 <span className="text-secondary font-weight-bold">PR Coinpedia</span>. All Rights Reserved.</p>
              </div>
            </div>
          </div>
        </section>
      </footer>
      </div>


    </>


  
  )
}
