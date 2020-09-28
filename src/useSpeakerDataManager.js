import { useEffect, useReducer } from 'react';
import SpeakerData from './SpeakerData';
import speakersReducer from './speakersReducer';
import axios from 'axios';

function useSpeakerDataManager() {
    const [{ isLoading, speakerList }, dispatch] = useReducer(speakersReducer, { isLoading: true, speakerList: [] });

    function toggleSpeakerFavorite(speakerRec) {
        const updateData = async function () {
            axios.put(`http://localhost:4000/speakers/${speakerRec.id}`, speakerRec);
            speakerRec.favorite === true
                ? dispatch({ type: 'unfavorite', id: speakerRec.id })
                : dispatch({ type: 'favorite', id: speakerRec.id });
        };
        updateData();
    }

    useEffect(() => {
        // new Promise(function (resolve) {
        //     setTimeout(function () {
        //         resolve();
        //     }, 1000);
        // }).then(() => {
        //     dispatch({ type: 'setSpeakerList', data: SpeakerData });
        // });
        const fetchData = async function () {
            let result = await axios.get('http://localhost:4000/speakers');
            dispatch({ type: 'setSpeakerList', data: result.data });
        };
        fetchData();
        return () => {
            console.log('cleanup');
        };
    }, []); // [speakingSunday, speakingSaturday]);
    return { isLoading, speakerList, toggleSpeakerFavorite };
}
export default useSpeakerDataManager;
