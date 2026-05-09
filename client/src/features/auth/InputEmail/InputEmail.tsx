import styles from './InputEmail.module.scss'

interface props{
    label?:string,
    value:string,
    handleChange:(e:React.ChangeEvent<HTMLInputElement>)=> void,
    error?:string
}

export const InputEmail = ({label,value,handleChange,error}:props) => {
  return (
    <div className={styles['input']} >
        {label && <><label>{label}</label></>}
        <input 
        type="text" 
        name="email"
        value={value}
        onChange={handleChange}
        placeholder="Enter Email"
        autoComplete="email"
        // pattern="/^[^\s@]+@[^\s@]+\.[^\s@]+$/"
        />
        {error && <span>Crazy shit</span>}
    </div>
  )
}
