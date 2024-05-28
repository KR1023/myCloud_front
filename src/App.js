import './index.css';
import LoginConatiner from './containers/auth/LoginConatiner';
import { Routes, Route, Link } from 'react-router-dom';
import RegisterContainer from './containers/auth/RegisterContainer';
import HomeContainer from './containers/home/HomeContainer';

const App = () => {
    return(
        <div>
            <Routes>
                <Route path='/' element={<HomeContainer />} />
                <Route path='/login' element={<LoginConatiner />} />
                <Route path='/register' element={<RegisterContainer/>} />
            </Routes>
        </div>
    );
};

export default App;