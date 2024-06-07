import { useContext } from "react"
import avatarImg from '../../imagens/avatar.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { FiLayers, FiUser, FiSettings} from 'react-icons/fi'

import './header.css';

export default function Header(){

    const { user }  = useContext(AuthContext);

    return(
        <div className="sidebar">
            <div>
                {/*<img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="Foto do Usário"/>*/}
            </div>
            

           <Link to="/dashboard">
            <FiLayers size={24} className="icon"/>
            Chamados
            </Link>
            <Link to="/customers">
            <FiUser className="icon" size={24}/>
            Almoxarifado
            </Link>
            <Link to="/profile">
            <FiSettings className="icon" size={24}/>
            Perfil
            </Link>
           
        
        </div>
    )
}