import React from 'react';
import DeviceCard from './UI/DeviceCard/DeviceCard';

const DeviceList = ({devices}) => {

    const srcForImage = 'http://localhost:5000';

    return (
        <>
           {
                devices.map((device,index) => 
                    <DeviceCard title={device.name} price={device.price} image={srcForImage+device.image} key={index}/>
                )
           }
        </>
    );
};

export default DeviceList;