import styles from "./TextBanner.module.scss"

interface props {
    headding:string,
    imageSrc: string,
    headerText?: string,
    footerText?:string
}

export const TextBanner = ({headding,imageSrc,headerText,footerText}:props) => {
  return (
    <div className={styles['banner-container']}>
        <header>
            <h2 className={styles['banner-container--headding']}>{headding}</h2>
            {headerText && <p>{headerText}</p>}
        </header>
        <img 
        src={imageSrc} 
        className={styles['banner-container--banner']}
        loading="lazy"
        />
         {footerText && <p>{footerText}</p>}
    </div>
  )
}
