import React from 'react';
import styles from './DeviceCard.module.css';

const DeviceCard = (props) => {

    return (
        <div className={styles.card}>
            <div className={styles.card__items}>
                <div className={styles.card__items_image}>
                    <img src={props.image} alt={props.title}/>
                </div>
                <div className={styles.card__items_title}>
                    <p>{props.title}</p>
                </div>
                <div className={styles.card__items_price}>
                    <p>
                        <b>{props.price}РУБ.</b>
                    </p>
                </div>
            </div>
        </div>        
    );
};

export default DeviceCard;