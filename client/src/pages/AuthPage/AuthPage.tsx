import Login from "../../features/auth/Login/Login"
import styles from "./AuthPage.module.scss"
import Slider from "../../components/Slider/Slider"

import { type SlideImage } from "../../components/Slider/Slider"
import useWidth from "../../hooks/useWidth";
import { Register } from "../../features/auth/Register/Register";
import { Button } from "../../components/Button/Button";

interface props{
  type:string
}

export const AuthPage = ({type}:props) => {
  const width = useWidth()
  const myImages: SlideImage[] = [
    { url: 'https://images.unsplash.com/photo-1506744626753-edaeb5df3424?w=800', alt: 'Mountain landscape' },
    { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800', alt: 'Tropical beach' },
    { url: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=800', alt: 'Forest canopy' }
  ];
  return (
    <div className={styles['authpage']}>
      <div className={styles['authpage--container']}>
        <Button variant="text" to='/'>Logo</Button>
        {type == "login" ?<Login/> :<Register/>}
        <div></div>
      </div>
      { width>=1024 && <Slider images={myImages}/>}
    </div>
  )
}
