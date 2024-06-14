import Photo from "../../components/photo/Photo"
import { useSelector } from 'react-redux';
import { useEffect, useCallback} from 'react';

const PhotoContainer = () => {
    const { user } = useSelector(({user}) => ({
        user: user.user
    }));


    return(
        <Photo user={user} />
    );
};

export default PhotoContainer;