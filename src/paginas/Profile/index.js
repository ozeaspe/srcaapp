import { useContext, useState } from 'react';

import Header from '../../components/Header';
import Title from '../../components/Title';

import { FiSettings, FiUpload } from 'react-icons/fi';
import avatar from '../../imagens/avatar.png';

import './profile.css';
import { AuthContext } from '../../contexts/auth';

import { db, storage } from '../../services/firebaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage'

import { toast } from 'react-toastify'

export default function Profile(){
    
    const { user, storageUser, setUser, logout } = useContext(AuthContext)

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imagemAvatar, setImageAvatar] = useState(null)
    const [nome, setNome] = useState(user && user.nome)
    const [email, setEmail] = useState(user && user.email)

    function handleFile(e){
        if(e.target.files[0]){
            const image = e.target.files[0];

            if(image.type === 'image/jpeg' || 'image.type' === 'image/png') {
                setImageAvatar(image)
                setAvatarUrl(URL.createObjectURL(image))
            }else{
                alert("Envie uma imagem do tipo PNG ou JPEG")
                setImageAvatar(null);
                return;
            }
        }
    }

    async function handleUpload(){
        const currentUid = user.uid;
    
        const uploadRef = ref(storage, `images/${currentUid}/${imagemAvatar.name}`)
    
        const uploadTask = uploadBytes(uploadRef, imagemAvatar)
        .then((snapshot) => {
          
          getDownloadURL(snapshot.ref).then( async (downLoadURL) => {
            let urlFoto = downLoadURL;
    
            const docRef = doc(db, "users", user.uid)
            await updateDoc(docRef, {
              avatarUrl: urlFoto,
              nome: nome,
            })
            .then(() => {
              let data = {
                ...user, 
                nome: nome,
                avatarUrl: urlFoto,
              }
              setUser(data);
              storageUser(data);
              toast.success("Atualizado com sucesso!")
            })
          })
        })
      }

    async function handleSubmit(e){
        //Utilizado para não ficar atualizando a página 
        e.preventDefault();

        if(imagemAvatar === null && nome !== ''){
            //Atualizar apenas o nome do user
            const docRef = doc(db, "users", user.uid)
            await updateDoc(docRef, {
              nome: nome,
            })
            .then(() => {
              let data = {
                ...user, nome: nome,
              }
              setUser(data);
              storageUser(data);
              toast.success("Atualizado com sucesso!")
      
            })
          }else if(nome !== '' && imagemAvatar !== null) {
            //Atualizar tanto nome quanto a foto
            handleUpload();
          }
    }

    return(

        <div>
            <Header/>

            <div className='content'>
                <Title name="Minha conta">
                    <FiSettings size={25} />
                </Title>

                <div className='container'>
                    <form className='form-profile'>
                        <label className='label-avatar'>
                            <span>
                                <FiUpload color='#fff' size={25} />
                            </span>

                            <input type='file' accept='image/*' onChange={handleFile}/> <br/>
                            {avatarUrl === null ? (
                                <img src={avatar} alt='Foto de Perfil' width={250} height={250} />
                            ) : (
                                <img src={avatarUrl} alt='Foto de Perfil' width={250} height={250} />
                            )}
                        </label>

                        <label>Nome</label>
                        <input type='text' value={nome} onChange={(e) => setNome(e.target.value)} />

                        <label>Email</label>
                        <input type='text' value={email} disabled={true}/>

                        <button type='submit' onClick={handleSubmit}>Salvar</button>

                    </form>                    

                </div>
                <div className='container-btn'>
                        <button className='logout-btn' onClick={() => logout() }>Sair</button>
                    </div>
            </div>
            
        </div>
    )
}