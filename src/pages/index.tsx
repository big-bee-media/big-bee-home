import { useRef } from "react";
import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ServiceGrid from "@/components/service-grid";
import PortfolioGrid from "@/components/portfolio";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import OurFact from "@/components/our-fact";
import BG from "@/assets/images/preview-bg.jpg";
import { LaptopScreen } from "@/components/lap-top";
import { firstAlbums, secondAlbums } from "@/const";

export default function Home() {
  const sectionPortfolio = useRef<any>();

  const sloganStyles = useSpring({
    delay: 400,
    from: { opacity: 0, x: "1000px" },
    to: { opacity: 1, x: "0px" },
  });

  const logoStyles = useSpring({
    delay: 400,
    from: { opacity: 0, y: "-1000px" },
    to: { opacity: 1, y: "0px" },
  });

  const ctaStyles = useSpring({
    from: { opacity: 0, y: "1000px" },
    to: { opacity: 1, y: "0px" },
  });

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
        <div id="home">
          <div
            className="prv-banner-wrapper"
            style={{ backgroundImage: `url(${BG.src})` }}
          >
            <div className="container-fluid">
              <div className="plr--120">
                <div className="row">
                  <div className="col-lg-8 col-xl-5">
                    <div className="inner">
                      <animated.div className="logo" style={logoStyles}>
                        <Image
                          src="/icons/logo.png"
                          alt="BigBee"
                          width={"50"}
                          height={"50"}
                        />
                        <div
                          style={{
                            position: "relative",
                            height: "40px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span
                            className="negative-shadow"
                            style={{ position: "absolute" }}
                          >
                            BigBee Media
                          </span>
                          <span
                            className="negative-shadow"
                            style={{ position: "absolute" }}
                          >
                            BigBee Media
                          </span>
                        </div>
                      </animated.div>
                      <animated.div className={"slogan"} style={sloganStyles}>
                        <div className="title">Embrace your moments</div>
                        <div className="title-stroke">Embrace your moments</div>
                      </animated.div>
                      <animated.div className="contact-btn" style={ctaStyles}>
                        <a
                          href="https://www.facebook.com/thebigbeemedia"
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          Contact US
                        </a>
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

        {/* Start Portfolio 1 */}
        <div
          ref={sectionPortfolio}
          className="poss_relative ptb--120 bg_color--1"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12" id="portfolio">
                <PortfolioGrid albums={firstAlbums} />
              </div>
            </div>
          </div>
        </div>
        {/* End Portfolio 1 */}

        <div className="fix" id="bigbee-app">
          <div className="poss_relative ptb--120">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center service-style--3 mb--30 mb_sm--0">
                    <a
                      href="https://raceapp.bigbee.ltd/"
                      target={"_blank"}
                      rel="noreferrer"
                    >
                      <h2 className="invert-theme-gradient">Race App</h2>
                    </a>
                    <h5 style={{ color: "whitesmoke" }}>
                      Stop scrolling, start finding - with our race photo app.
                    </h5>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <LaptopScreen />
                </div>
                <div className="col-lg-6">
                  <div className="app-desc">
                    <p>
                      The app uses computer vision algorithms to identify the
                      bib numbers worn by runners in race photos, making it
                      easier for runners to find and download their photos from
                      event photographers.
                    </p>
                    <p>
                      No more scrolling through hundreds of pictures to find the
                      ones you want - our app does the work for you, so you can
                      focus on what matters most.
                    </p>
                    <p>
                      Overall, a bib detection app that helps runners find their
                      photos after a race is a valuable tool that enhances the
                      race experience and makes it easier for runners to share
                      their achievements with others.
                    </p>
                    <div className="race-app-btn-wrapper">
                      <animated.div className="contact-btn" style={ctaStyles}>
                        <a
                          href="https://raceapp.bigbee.ltd/"
                          target={"_blank"}
                          rel="noreferrer"
                        >
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          Let&apos;s try
                        </a>
                      </animated.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Start Portfolio 2 */}
        <div
          ref={sectionPortfolio}
          className="poss_relative ptb--120 bg_color--1"
        >
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12" id="portfolio">
                <PortfolioGrid albums={secondAlbums} />
              </div>
            </div>
          </div>
        </div>
        {/* End Portfolio 2 */}

        {/* Our service */}
        <div id="service" className="fix">
          <div className="poss_relative ptb--120 bg_color--5">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title text-center service-style--3 mb--30 mb_sm--0">
                    <h2 className="theme-gradient">Our Service</h2>
                  </div>
                </div>
              </div>
              <div className="row creative-service">
                <div className="col-lg-12">
                  <ServiceGrid className="col-lg-4 col-md-6 col-sm-6 col-12 text-left" />
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
                  <h2 style={{ color: "#1f1f2582" }}>Our Fun Facts</h2>
                </div>
              </div>
            </div>
            <OurFact />
          </div>
        </div>
        {/* End CounterUp Area */}

        <div id="contact">
          <Footer />
        </div>
      </main>
    </>
  );
}
