import { useRef } from 'react'
import Head from 'next/head'
import Header from '@/components/header'
import Footer from '@/components/footer'
import ServiceGrid from '@/components/service-grid'
import PortfolioGrid from '@/components/portfolio'
import { useSpring, animated } from '@react-spring/web'
import Image from 'next/image'
import OurFact from '@/components/our-fact'


export default function Home() {
  const sectionPortfolio = useRef<any>()

  const sloganStyles = useSpring({
    from: { opacity: 0, x: '1000px' },
    to: { opacity: 1, x: '0px' },
  })

  const logoStyles = useSpring({
    from: { opacity: 0, y: '-1000px' },
    to: { opacity: 1, y: '0px' },
  })

  const ctaStyles = useSpring({
    from: { opacity: 0, y: '1000px' },
    to: { opacity: 1, y: '0px' },
  })

  return (
    <>
      <Head>
        <title>BigBee Media</title>
        <meta name="description" content="BigBee media" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header color="color-black" />
        {/* Start Slider Area   */}
        <div id='home'>
          <div
            className="prv-banner-wrapper"
            style={{ backgroundImage: 'url(images/preview-bg.jpg)' }}
          >
            <div className="container-fluid">
              <div className="plr--120">
                <div className="row">
                  <div className="col-lg-8 col-xl-5">
                    <div className="inner">
                      <animated.div className="logo" style={logoStyles}>
                        <Image src="/icons/logo.png" alt="BigBee" width={'50'} height={'50'} />
                        <span>BigBee</span>
                      </animated.div>
                      <animated.div className="title" style={sloganStyles}>Embrace your moments</animated.div>
                      <animated.div className="cta-btn" style={ctaStyles}>
                        <a href="#contact" target="_blank" className="rn-button-style--2 btn-solid">Contact US</a>
                      </animated.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fullscreen empty-div gradient-overlay" />
        </div>
        {/* End Slider Area   */}

        {/* Start Portfolio  */}
        <div ref={sectionPortfolio} id="portfolio" className="poss_relative ptb--120 bg_color--1">
          <div className='container-fluid'>
            <div className="row">
              <div className="col-lg-12">
                <PortfolioGrid />
              </div>
            </div>
          </div>
        </div>
        {/* End Portfolio  */}

        {/* Our service */}
        <div id="service" className="fix">
          <div className="poss_relative ptb--120 bg_color--5" >
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center service-style--3 mb--30 mb_sm--0">
                    <h2 className="theme-gradient">Our Service</h2>
                    {/* <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.</p> */}
                  </div>
                </div>
              </div>
              <div className="row creative-service">
                <div className="col-lg-12">
                  <ServiceGrid className='col-lg-4 col-md-6 col-sm-6 col-12 text-left' />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End our service */}

        {/* Start CounterUp Area */}
        <div className="poss_relative rn-counterup-area pt--140 p pb--110 bg_color--1">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section-title text-center service-style--3 mb--30 mb_sm--0">
                  <h2 style={{ color: '#1f1f2582' }}>Our Fun Facts</h2>
                </div>
              </div>
            </div>
            <OurFact />
          </div>
        </div>
        {/* End CounterUp Area */}

        <div id='contact'>
          <Footer />
        </div>
      </main>
    </>
  )
}
