import styles from './InputPassword.module.scss'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {useState} from "react"

interface props {
    label?:string,
    handleChange:(e:React.ChangeEvent<HTMLInputElement>) => void,
    value:string,
    error?:string
}


export const InputPassword = ({label,value,handleChange,error}:props) => {
  const [showPassword, setShowPassword] = useState<boolean>(true)
  return (
    <div className={styles['input']}>
     {label && <label>{label}</label>}
     <div className={styles['input__icon']}>
      <input 
      type={showPassword ? "password" :"text"}
      name="password"
      value={value}
      placeholder="Enter Password"
      onChange={handleChange} 
      autoComplete="current-password"
      />
      <div onClick = {()=>setShowPassword(!showPassword)}>
      {showPassword ? <VisibilityOff /> : <Visibility />}
      </div>
     </div>
    {error && <span>Crazy Shit</span>}
    </div>
  )
}
