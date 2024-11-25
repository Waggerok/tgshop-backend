import React, { useEffect, useState } from 'react';
import DeviceCard from '../components/UI/DeviceCard/DeviceCard';
import DeviceList from '../components/DeviceList';
import axios from 'axios';

const src = 'http://localhost:5000/api/devices';

const MainPage = () => {

    const [devices,setDevices] = useState([]);

    useEffect(() => {
        axios
            .get(src)
            .then((data) => {
                console.log(data.data)
                setDevices(data.data)
            })
    },[])
    return (
        <>
            Main Page

            <div className="deviceList">
                <DeviceList devices={devices}/>
            </div>
        </>
    );
};

export default MainPage;