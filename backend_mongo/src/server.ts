import express from 'express';
import {connect} from 'mongoose';
import routes from './routes';
import cors from 'cors';

connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const app = express();
app.use(cors())
app.use(express.json())

app.use(routes)


app.listen(3002)