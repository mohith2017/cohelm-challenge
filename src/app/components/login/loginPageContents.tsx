import LoginForm from './loginForm';
import Image from 'next/image';

export default function LoginPageContents() {
    return (
        <>
            <div className='login-content'>
                <div className='form'>
                    <LoginForm></LoginForm>
                </div>
            </div>
        </>
    )
}
