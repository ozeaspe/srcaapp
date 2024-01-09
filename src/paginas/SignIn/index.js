import { useState} from 'react'
import './signin.css'
import dtec from '../../imagens/dtec.png'
import {Link} from 'react-router-dom'

export default function SignIn(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={dtec} alt='Diretoria de Tecnologia' />
                </div>

                <form>
                    <h1>SRCA - Unidade de Infraestrutura</h1>
                    <input
                        type='email'
                        placeholder='email@email.com'
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                    />

                    <input
                        type='password'
                        placeholder='******'
                        value={senha}
                        onChange={ (e) => setSenha(e.target.value)}
                    />

                    <button type='submit'>Login</button>

                </form>

                <Link to='/register'>Criar uma conta</Link>

            </div>
        </div>
    )
}