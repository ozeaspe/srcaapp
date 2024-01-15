import { useContext, useState} from 'react'
import dtec from '../../imagens/dtec.png'
import {Link} from 'react-router-dom'
import { AuthContext } from '../../contexts/auth';

export default function SignUp(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { signUp } = useContext(AuthContext)

    function handleSignUp(e){
        e.preventDefault();

        signUp()
    }

    return(
        <div className='container-center'>
            <div className='login'>
                <div className='login-area'>
                    <img src={dtec} alt='Diretoria de Tecnologia' />
                </div>

                <form onSubmit={handleSignUp}>
                    <h1>Novo Usuário</h1>

                    <input
                        type='text'
                        placeholder='Digite seu nome'
                        value={nome}
                        onChange={ (e) => setNome(e.target.value)}
                    />

                    <input
                        type='email'
                        placeholder='Digite seu email'
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                    />

                    <input
                        type='password'
                        placeholder='Digite uma senha'
                        value={senha}
                        onChange={ (e) => setSenha(e.target.value)}
                    />

                    <button type='submit'>Cadastrar</button>

                </form>

                <Link to='/'>Já possui uma conta? Faça login</Link>

            </div>
        </div>
    )
}