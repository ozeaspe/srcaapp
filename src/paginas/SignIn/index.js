import { useState, useContext} from 'react'
import './signin.css'
import dtec from '../../imagens/dtec.png'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { toast } from 'react-toastify'

export default function SignIn(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { signIn } = useContext(AuthContext)

    function handleSignIn(e){
        e.preventDefault();

        if(email !== ''  && senha !== ''){
            signIn(email, senha);

        }if(email === '' && senha !== ''){
            toast.error("Digite o email!")
        }if(senha === '' && email !== ''){
            toast.error("Digite a senha!")
        }
        if(email === '' && senha === ''){
            toast.error("É necessário criar uma conta!")
        }
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={dtec} alt='Diretoria de Tecnologia' />
                </div>

                <form onSubmit={handleSignIn}>
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