import React, { useEffect, useState } from 'react';
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

            <div className="start">
                Main Page
            </div>
            

            <div className="deviceList">
                <DeviceList devices={devices}/>
            </div>

            hello world
        </>
    );
};

export default MainPage;