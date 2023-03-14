import mongoose, { ConnectOptions } from "mongoose";

type InputDB = {
    db: string
}

export default ({ db }: InputDB) => {
    const connect = () => {
        mongoose
            .connect(db,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                } as ConnectOptions)
            .then(() => {
                return console.log(`Successfully connected to ${db}`)
            })
            .catch((err) => {
                console.error(`Error connecting to database: ${err}`);
                console.error(`Database: ${db}`);
                return process.exit(1);
            })
    };

    connect();

    mongoose.connection.on('disconnected', connect);
}