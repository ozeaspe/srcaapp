import{ Routes, Route} from 'react-router-dom'

import SignIn from '../paginas/SignIn';
import SignUp from '../paginas/SignUp';
import Dashboard from '../paginas/Dashboard';

function RoutesApp(){
    return(
        <Routes>
            <Route path='/' element={<SignIn/>} />
            <Route path='/register' element={<SignUp/>} />
            <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
    )
}

export default RoutesApp;
