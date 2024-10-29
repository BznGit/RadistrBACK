const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        default: 'noname'
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    variants:[
        {
            hashrate:{
                type: Array
            },
            power:{
                type: Array
            },
            tariff:{
                type: Array
            },
            capex:{
                type: Array
            },
            opex:{
                type: Array
            },
            rate:{
                type: Array
            },
            diffbtc:{
                type: Array
            },
            hashbtc:{
                type: Array
            }
        }
    ]
});

userSchema.pre('save',  function(next) {
    if (this.isModified('password')) {
        this.password =  bcrypt.hashSync(this.password, 10);
    }
    next();
});

userSchema.pre('updateOne', async function(next) { 
    const data = this.getUpdate(); 



    if (data['$set'] && data['$set'].password) { 
        // Получаем текущий пользовательский документ
        const user = await this.model.findOne(this.getQuery());
        
        // Сравниваем старый и новый пароли
        const isMatch = await bcrypt.compare(data['$set'].password, user.password);
        
        if (!isMatch) {
            // Если пароли не совпадают, хэшируем новый пароль
            data['$set'].password = await bcrypt.hash(data['$set'].password, 10); 
        } else {
            // Если пароли совпадают, удаляем новое значение пароля из обновления
            delete data['$set'].password;
        }
    } 

    next(); 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
