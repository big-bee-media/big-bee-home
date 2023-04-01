import style from './style.module.scss'

const Loader = () => {
    return (
        <div className={style['logo-beat']}>
            <img src="/icons/logo.png" alt="BigBee" width={'50'} height={'50'} />
        </div>
    )
}

export default Loader