import {Document, Schema, model} from 'mongoose';

interface Game extends Document{
    game: string,
    studio: [string],
    year: number,
    type: string,
}

const GameSchema = new Schema({
    game: {
        type: String,
        required: [true, 'Name field is required']
    },

    type:{
        type: Array,
        required: [true, 'Type field is required']
    },

    year:{
        type: Number,
        required: [true, 'Year field is required']  
    },

    studio:{
        type: String,
        required: [true, 'Director field is required']
    }
})

export default model<Game>('Game', GameSchema);