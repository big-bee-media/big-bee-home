import React, { Component, useEffect } from "react";
import Link from "next/link";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu";
import { FiX } from "@react-icons/all-files/fi/FiX";
import Scrollspy from "react-scrollspy";
import LOGO from "@/assets/icons/logo.png";
import Image from "next/image";

import styles from "./styles.module.scss";

const SocialShare = [
  { Social: <FaFacebookF />, link: "https://www.facebook.com/thebigbeemedia" },
];
const Header = ({ color }: { color: string }) => {
  const menuTrigger = () => {
    document.querySelector(".header-wrapper")?.classList.toggle("menu-open");
  };

  const CLoseMenuTrigger = () => {
    document.querySelector(".header-wrapper")?.classList.remove("menu-open");
  };

  return (
    <header
      className={`header-area header-style-two header--fixed sticky ${color}`}
    >
      <div className="header-wrapper">
        <div className="header-left d-flex align-items-center">
          <div className={styles.logo}>
            <a href={"/"}>
              <Image src={LOGO} alt="BigBee" height={"50"} width={"50"} />
            </a>
          </div>
          <nav className="mainmenunav d-lg-block ml--50">
            <Scrollspy
              className="mainmenu"
              items={["home", "portfolio", "service", "bigbee-app", "contact"]}
              currentClassName="is-current"
              offset={-200}
            >
              <li>
                <a className="negative-shadow" href="#home">
                  Home
                </a>
              </li>
              <li>
                <a
                  className="negative-shadow"
                  href="https://portfolio.bigbee.ltd"
                  target="_blank"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a className="negative-shadow" href="#service">
                  Service
                </a>
              </li>
              <li>
                <a
                  className="negative-shadow"
                  href="https://raceapp.bigbee.ltd"
                  target="_blank"
                >
                  Race App
                </a>
              </li>
              <li>
                <Link
                  className="negative-shadow"
                  href="/brief"
                  style={{ color: '#ffd700', fontWeight: 'bold' }}
                >
                  ★ Start A Project
                </Link>
              </li>
              <li>
                <a
                  className="negative-shadow"
                  target="_blank"
                  href="https://www.facebook.com/thebigbeemedia"
                >
                  Contact
                </a>
              </li>
            </Scrollspy>
          </nav>
        </div>
        <div className="header-right d-flex align-items-center">
          <Link
            href="/brief"
            className="d-none d-md-inline-block"
            style={{
              background: 'linear-gradient(135deg, #d4af37 0%, #f59e0b 100%)',
              color: '#000',
              fontWeight: 700,
              fontSize: '12px',
              padding: '8px 20px',
              borderRadius: '20px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              marginRight: '15px',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
            }}
          >
            START NOW
          </Link>
          <div className="social-share-inner">
            <ul className="social-share social-style--2 color-black d-flex justify-content-start liststyle">
              {SocialShare.map((val, i) => (
                <li key={i}>
                  <a href={`${val.link}`}>{val.Social}</a>
                </li>
              ))}
            </ul>
          </div>
          {/* Start Humberger Menu  */}
          <div className="humberger-menu d-block d-lg-none pl--20">
            <span onClick={menuTrigger} className="menutrigger text-white">
              <FiMenu />
            </span>
          </div>
          {/* End Humberger Menu  */}
          <div className="close-menu d-block d-lg-none">
            <span onClick={CLoseMenuTrigger} className="closeTrigger">
              <FiX />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
