const  mongoose = require('mongoose');

const dbMongo = async() =>{
    try {
        await mongoose.connect('mongodb+srv://stagoace:123@cluster0.zcpe23d.mongodb.net/EventosPoli?retryWrites=true&w=majority' );
        
        console.log('DB MONGO ONLINE');
    } catch (error) {
        const errormsg = (error as Error).message;
        console.error('Error de coneccion de MONGO: '+errormsg);
        
    }
}
export default dbMongo