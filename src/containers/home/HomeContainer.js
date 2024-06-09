import Home from "../../components/main/Home"
import { useSelector, useDispatch } from 'react-redux';

const HomeContainer = () => {

    const { user } = useSelector(({user}) => ({
        user: user.user
    }));

    
    return (
        <Home user={user} />
    );
};

export default HomeContainer;