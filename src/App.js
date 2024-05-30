import './index.css';
import LoginConatiner from './containers/auth/LoginConatiner';
import { Routes, Route, Link } from 'react-router-dom';
import RegisterContainer from './containers/auth/RegisterContainer';
import HomeContainer from './containers/home/HomeContainer';
import UserInfoContainer from './containers/home/UserInfoContainer';

const App = () => {
    return(
        <div>
            <Routes>
                <Route path='/' element={<HomeContainer />} />
                <Route path='user-info' element={<UserInfoContainer />} />
                <Route path='/login'  >
                        <Route index element={<LoginConatiner />} />
                </Route>
                <Route path='/register' element={<RegisterContainer/>} />
            </Routes>
        </div>
    );
};

export default App;