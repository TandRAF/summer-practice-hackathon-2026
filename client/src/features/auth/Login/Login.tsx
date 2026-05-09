import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/authContext';
import { InputEmail } from '../InputEmail/InputEmail'
import { InputPassword } from '../InputPassword/InputPassword'
import { Button } from '../../../components/Button/Button';
import styles from './Login.module.scss'

interface LoginData {
    email: string;
    password: string;
}

const Login = () => {
    const { login, error } = useAuth();
    const navigate = useNavigate();

    const [inputData, setInputData] = useState<LoginData>({email:"", password:""});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setInputData((prev) => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await login(inputData.email, inputData.password);
            console.log("Login realizat cu succes!");
            navigate('/welcome');
        } catch (err) {
            console.error("Eroare la trimiterea formularului", err);
        }
    }

  return (
    <div className={styles['login']}>
        <div className={styles['login__title']}>
            <h4>Great to see you again!</h4>
            <p>Log in to pick up right where you left off.</p>
        </div>
        
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
        <InputEmail
            label='Email'
            value={inputData.email}
            handleChange={handleChange}
        />
        <InputPassword
            label='Password'
            value={inputData.password}
            handleChange={handleChange}

        />
        <Button variant='solid' size='lg' type='submit'> Verify</Button>
        </form>
        <p className='center'>Need an account?  <Button variant='text' to="/register">Register here</Button></p>
    </div>
  )
}
export default Login;