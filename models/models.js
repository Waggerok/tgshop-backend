const sequelize = require('../database');
const {DataTypes} = require('sequelize');

//Models

const User = sequelize.define('user', {
    telegram_id : {type: DataTypes.STRING, primaryKey: true, unique: true},
    role : {type: DataTypes.STRING, defaultValue: 'USER'}
});

const Order = sequelize.define('order', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    total_price : {type: DataTypes.INTEGER, allowNull: false},
    address : {type: DataTypes.STRING, allowNull: false}
});

const Basket = sequelize.define('basket', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    quantity : {type: DataTypes.INTEGER, allowNull: false}
});

const BasketDevice = sequelize.define('basket_device', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}
});

const Device = sequelize.define('device', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name : {type: DataTypes.STRING, unique: true, allowNull: false},
    price : {type: DataTypes.INTEGER, allowNull: false},
    image : {type: DataTypes.STRING, allowNull: false},
    model3D : {type: DataTypes.STRING, allowNull: false},
    quantity : {type: DataTypes.INTEGER, allowNull: false}
});

const DeviceInfo = sequelize.define('device_info', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title : {type: DataTypes.STRING, allowNull: false},
    description : {type: DataTypes.STRING, allowNull: false}
});

const DeviceFilter = sequelize.define('device_filter', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    device_type : {type: DataTypes.STRING, unique: true, allowNull: false}
});

const MacbookFilter = sequelize.define('macbook_filter', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    processor : {type: DataTypes.STRING, allowNull: false},
    ram : {type: DataTypes.INTEGER, allowNull: false}
});

const IpadFilter = sequelize.define('ipad_filter', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    cellular : {type: DataTypes.BOOLEAN, allowNull: false},
    processor : {type: DataTypes.STRING, allowNull: false}
});

//Connections

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Basket);
Basket.belongsTo(Order);

Basket.hasMany(BasketDevice);
BasketDevice.belongsTo(Basket);

BasketDevice.hasMany(Device);
Device.belongsTo(BasketDevice);

Device.hasMany(DeviceInfo);
DeviceInfo.belongsTo(Device);

Device.hasMany(DeviceFilter);
DeviceFilter.belongsTo(Device);

DeviceFilter.hasOne(MacbookFilter);
MacbookFilter.belongsTo(DeviceFilter);

DeviceFilter.hasOne(IpadFilter);
IpadFilter.belongsTo(DeviceFilter);

module.exports = {
    User,
    Order,
    Basket,
    BasketDevice,
    Device,
    DeviceInfo,
    DeviceFilter,
    MacbookFilter,
    IpadFilter
}