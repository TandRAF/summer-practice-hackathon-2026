import styles from './InputText.module.scss'

interface props{
    label?:string,
    value:string,
    handleChange:(e:React.ChangeEvent<HTMLInputElement>)=> void,
    error?:string,
    placeHolder:string,
    name:string
}

export const InputText = ({label,value,handleChange,error,placeHolder,name}:props) => {
  return (
    <div className={styles['input']} >
        {label && <><label>{label}</label></>}
        <input 
        type="text" 
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeHolder}
        />
        {error && <span>Crazy shit</span>}
    </div>
  )
}
