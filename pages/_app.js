import Head from 'next/head'
import App from 'next/app'

class MyApp extends App 
{
  
  constructor(props) {
    super(props)
  }

  render() 
  {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui" />

          {/*  google font links  */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100;300;400;500;700&display=swap" rel="stylesheet" /> 

          {/* stylesheet links   */}
          <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.css" />
          <link rel="stylesheet" type="text/css" href="/assets/css/app.css" />
          <link rel="stylesheet" type="text/css" href="/assets/css/stylesheet.css" />
          <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />

          {/* script links */}
          <script src="https://kit.fontawesome.com/dd0d781807.js" crossorigin="anonymous"></script>
          <script src="/assets/js/lib/jquery.min.js"></script>
          <script src="/assets/bootstrap/js/popper.min.js"></script>
          <script src="/assets/bootstrap/js/bootstrap.min.js"></script>
         </Head>
        <Component {...pageProps} />
      </>
    )
  }
}

export default MyApp
