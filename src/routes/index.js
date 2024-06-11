import{ Routes, Route} from 'react-router-dom'

import SignIn from '../paginas/SignIn';
import SignUp from '../paginas/SignUp';
import Dashboard from '../paginas/Dashboard';
import Profile from '../paginas/Profile';
import Private from './Private';

function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={<SignIn/>} />
            <Route path='/register' element={<SignUp/>} />
            <Route path='/dashboard' element={<Private><Dashboard/></Private>}/>
            <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
    )
}

export default RoutesApp;
