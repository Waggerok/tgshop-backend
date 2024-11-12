import React from 'react';
import styles from './DeviceCard.module.css';
import mac from '../../../img/macbook.jpg'

const DeviceCard = () => {
    return (
        <div className={styles.card}>
            <div className={styles.card__items}>
                <div className={styles.card__items_image}>
                    <img src={mac} alt="mac"/>
                </div>
                <div className={styles.card__items_title}>
                    <p>Macbook Pro M2 14` 16gb / 512 GB</p>
                </div>
                <div className={styles.card__items_price}>
                    <p>
                        <b>123098 РУБ.</b>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DeviceCard;