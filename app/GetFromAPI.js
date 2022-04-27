import { useState, useEffect } from 'react';
import { create } from 'apisauce';

function getData () {

    const [data, setData] = useState([]);
    const api = create({
        baseURL: 'https://api.coinstats.app/public/v1/charts?period=1m&coinId=ethereum',
    });

    const fetchData = async () => {
        const response = await api.get();
        setData(response.data);

    };

    useEffect(() => {
        fetchData();
        const dataInterval = setInterval(() => fetchData(), 5 * 1000);
        return () => clearInterval(dataInterval);
    }, []);


    return data;

}

export default getData;