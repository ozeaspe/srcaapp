import { useContext } from "react"
import avatarImg from '../../imagens/avatar.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'

export default function Header(){

    const { user }  = useContext(AuthContext);

    return(
        <div className="sidebar">
           <div>
            <img src={user.avatarUrl === null ? avatarImg : user.avatarUrl} alt="Foto do Usário"/>
           </div>
        </div>
    )
}