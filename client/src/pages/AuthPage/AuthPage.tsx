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
    { 
      url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800', 
      alt: 'Oameni jucând baschet pe un teren urban' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800', 
      alt: 'Meci de fotbal în nocturnă' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800', 
      alt: 'Jucător de tenis pregătindu-se de serviciu' 
    },
    { 
      url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800', 
      alt: 'Grup de oameni la antrenament fitness' 
    }
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
