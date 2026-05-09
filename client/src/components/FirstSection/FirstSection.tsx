import styles from "./FirstSection.module.scss"
import { Button } from "../Button/Button"

interface props{
    title:string,
    imageSrc:string,
    headingTitle?:string,
    headerText?:string,
    footerTitle?:string,
    footerText?:string
}

export const FirstSection = ({title,imageSrc,headerText,footerText,headingTitle,footerTitle}:props) => {
  return (
    <div className={styles['first-container']}>
        <div className={styles['first-container__text']}>
            {headingTitle && <h5>{headingTitle}</h5>}
            <p> {headerText}</p>
            <Button size="lg" className={styles['first-container__button']} to="login" variant="solid">Try Now</Button>
        </div>
        <main>
            <h1 className={styles['first-container__heading']}>
                {title}
            </h1>
            <img src={imageSrc}/>
        </main>
        <div className={styles['first-container__text']}>
            {footerTitle && <h5>{footerTitle}</h5>}
            <p>{footerText}</p>
        </div>
    </div>
  )
}
