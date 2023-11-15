const  mongoose = require('mongoose');

const dbMongo = async() =>{
    try {
        await mongoose.connect('mongodb+srv://luis:luis271103@cluster0.mjykr7w.mongodb.net/' );
        
        console.log('DB MONGO ONLINE');
    } catch (error) {
        const errormsg = (error as Error).message;
        console.error('Error de coneccion de MONGO: '+errormsg);
        
    }
}
export default  dbMongo