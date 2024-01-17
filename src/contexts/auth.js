import { useState, createContext, useEffect } from 'react';
//fazendo a conexão com o firebase
import{ auth, db } from '../services/firebaseConnection'
/*Importando do firebase para criar um usuário, importando signInWithEmailAndPassword
para criar o login do usuário, importando signOut para deslogar o usuário*/
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
/*Importando do banco doc==>para acessar os documentos
                      getDoc==> para pegar os documentos
                      setDoc==> para passa os dados para o documento
*/
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider ({ children }){
    const [user, setUser] = useState(null)
    
    //Criando um spinner, para controlar quando o usuário estiver cadastrando
    const[loadingAuth, setLoadingAuth] = useState(false);

    const navigate = useNavigate();


    async function signIn(email, senha){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, senha)
        .then( async (value)=> {
            let uid = value.user.uid;

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl,
            }

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success("Bem-vindo(a)!");
            navigate("/dashboard");
        })
        .catch((error)=> {
            setLoadingAuth(false);
            toast.error("Ops aconteceu algum problema!");
            navigate("/");
        })
        
    }

    //Criando um novo usuário
    async function signUp(email, password, nome){
        setLoadingAuth(true);

         await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid

            await setDoc(doc(db, "users", uid), {
                nome: nome,
                avatarUrl: null
            })
            .then( () => {
               
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success("Seja bem-vindo(a)!")
                navigate("/dashboard");
            })
        })
        .catch((error) => {
            console.log(error);
            setLoadingAuth(false);
        })
    }

     //Método para adicionar os dados do usuário ao localStorage
     function storageUser(data){
        localStorage.setItem('@ticketsPro', JSON.stringify(data))
    } 

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                signIn,
                signUp,
                loadingAuth,
                storageUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider