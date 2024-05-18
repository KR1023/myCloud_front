import './index.css';
import LoginConatiner from './containers/login/LoginConatiner';
import { Routes, Route, Link } from 'react-router-dom';

const App = () => {
    return(
        <div>
            <Routes>
                <Route path='/' element={<LoginConatiner />} />
                <Route path='/login' element={<LoginConatiner />} />
                <Route path='/register' />
            </Routes>
        </div>
    );
};

export default App;