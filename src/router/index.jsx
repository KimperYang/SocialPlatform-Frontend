import App from '../App.jsx'
import Auth from '../auth/auth'
import Registeration from '../auth/registeration/registeration'
import Main from '../main/main.jsx'
import Profile from '../profile/profile.jsx'
import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const BaseRouter = () =>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<App />}>
                    <Route path='/auth' element={<Auth />} />
                    <Route path='/registeration' element={<Registeration />}/>
                </Route>
                <Route path='/main' element={<Main />}/>
                <Route path="/profile" element={<Profile/>} />
            </Routes>
        </Router>)
}

export default BaseRouter