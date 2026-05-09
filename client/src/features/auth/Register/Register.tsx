import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { InputEmail } from '../InputEmail/InputEmail'
import { InputPassword } from '../InputPassword/InputPassword'
import { InputText } from '../InputText/InputText';
import { Button } from '../../../components/Button/Button';
import styles from './Register.module.scss'

interface RegisterData {
    email:string
    userName: string;
    password: string;
}

export const Register = () => {
    const { register, error } = useAuth();
    const navigate = useNavigate();

    const [inputData, setInputData] = useState<RegisterData>({userName:"", email:"", password:""});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInputData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            await register(inputData.userName, inputData.email, inputData.password);
            console.log("Înregistrare realizată cu succes!");
            navigate('/welcome');
        } catch (err) {
            console.error("Eroare la înregistrare", err);
        }
    }

  return (
    <div className={styles['register']}>
        <div className={styles['register__title']}>
            <h4>Let's get started!</h4>
            <p>Create a free account to unlock everything.</p>
        </div>

        <form onSubmit={handleSubmit}>
        <InputEmail
            label='Email'
            value={inputData.email}
            handleChange={handleChange}
        />
        <InputText
            label='User Name'
            value={inputData.userName}
            handleChange={handleChange}
            placeHolder={"Enter Username"}
            name='userName'
        />
        <InputPassword
            label='Password'
            value={inputData.password}
            handleChange={handleChange}
        />
        <Button variant='solid' size='lg' type='submit'> Create My Account</Button>
        <p>
            Already with us? <Button variant="text" to="/login">Log in here</Button>
        </p>
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        </form>
    </div>
  )
}