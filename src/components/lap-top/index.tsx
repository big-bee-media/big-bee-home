import Image from 'next/image'
import LaptopFrame from '@/assets/images/laptop-frame-s1.png'
import Screen1 from '@/assets/images/s2-done.png'
import Screen2 from '@/assets/images/s3-done.png'
import styles from './style.module.scss'
import { useSpring, animated, useInView, useSpringRef } from '@react-spring/web'
import { useEffect } from 'react'


export const LaptopScreen = () => {
    const [laptopFrameRef, isLaptopInView] = useInView()

    const screen1ApiRef = useSpringRef()
    const screenOneStyle = useSpring({
        ref: screen1ApiRef,
        from: { opacity: 0, x: '-150px' },
        to: { opacity: 1, x: '0px' },
        delay: 400
    })

    const screen2ApiRef = useSpringRef()
    const screenTwoStyle = useSpring({
        ref: screen2ApiRef,
        from: { opacity: 0, x: '-300px' },
        to: { opacity: 1, x: '0px' },
        delay: 400
    })

    useEffect(() => {
        if (isLaptopInView) {
            screen1ApiRef.start()
            screen2ApiRef.start()
        }
    }, [isLaptopInView, screen1ApiRef, screen2ApiRef])

    return (
        <div style={{
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div ref={laptopFrameRef} className={styles['laptop-frame']}>
                <Image className={styles['main-frame']} src={LaptopFrame} alt="" height='400' />
                <animated.img style={screenOneStyle} className={styles['screen-1']} src={Screen1.src} alt="" height='300' />
                <animated.img style={screenTwoStyle} className={styles['screen-2']} src={Screen2.src} alt="" height='300' />
            </div>
        </div>
    )
}

