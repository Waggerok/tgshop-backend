import React, { useEffect, useState } from 'react';
import DeviceList from '../components/DeviceList';
import axios from 'axios';

const devicesSource = 'http://localhost:5000/api/devices';

const MainPage = () => {

    const [devices,setDevices] = useState([]);

    useEffect(() => {
        axios
            .get(devicesSource)
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