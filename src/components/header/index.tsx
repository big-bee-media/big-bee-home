import React, { Component, useEffect } from "react";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FiMenu } from "@react-icons/all-files/fi/FiMenu";
import { FiX } from "@react-icons/all-files/fi/FiX";
import Scrollspy from 'react-scrollspy'
import LOGO from '@/assets/icons/logo.png'
import Image from 'next/image';

import styles from './styles.module.scss';

const SocialShare = [
    { Social: <FaFacebookF />, link: 'https://www.facebook.com/thebigbeemedia' },
]
const Header = ({ color }: { color: string }) => {
    const menuTrigger = () => {
        document.querySelector('.header-wrapper')?.classList.toggle('menu-open')
    }

    const CLoseMenuTrigger = () => {
        document.querySelector('.header-wrapper')?.classList.remove('menu-open')
    }

    return (
        <header className={`header-area header-style-two header--fixed sticky ${color}`}>
            <div className="header-wrapper">
                <div className="header-left d-flex align-items-center">
                    <div className={styles.logo}>
                        <a href={'/'}>
                            <Image src={LOGO} alt='BigBee' height={'50'} width={'50'} />
                        </a>
                    </div>
                    <nav className="mainmenunav d-lg-block ml--50">
                        <Scrollspy className="mainmenu" items={['home', 'portfolio', 'service', 'contact']} currentClassName="is-current" offset={-200}>
                            <li><a className='negative-shadow' href="#home">Home</a></li>
                            <li><a className='negative-shadow' href="#portfolio">Portfolio</a></li>
                            <li><a className='negative-shadow' href="#service">Service</a></li>
                            <li><a className='negative-shadow' target='_blank' href="https://www.facebook.com/thebigbeemedia">Contact</a></li>
                            <li><a className='negative-shadow' target='_blank' href="https://www.bigbee.media">BIB Detection</a></li>
                        </Scrollspy>
                    </nav>
                </div>
                <div className="header-right">
                    <div className="social-share-inner">
                        <ul className="social-share social-style--2 color-black d-flex justify-content-start liststyle">
                            {SocialShare.map((val, i) => (
                                <li key={i}><a href={`${val.link}`}>{val.Social}</a></li>
                            ))}
                        </ul>
                    </div>
                    {/* Start Humberger Menu  */}
                    <div className="humberger-menu d-block d-lg-none pl--20">
                        <span onClick={menuTrigger} className="menutrigger text-white"><FiMenu /></span>
                    </div>
                    {/* End Humberger Menu  */}
                    <div className="close-menu d-block d-lg-none">
                        <span onClick={CLoseMenuTrigger} className="closeTrigger"><FiX /></span>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;