import {Request, Response} from 'express';
import Games from '../model/GameModel';

export default{
    async create (request: Request, response: Response){
        const {
            game,
            year,
            studio,
            type
        } = request.body;
        console.log(request.body);

        await Games.create({
            game,
            year,
            studio,
            type
        }).then(function(data){
            return response.status(201).send(data)
        })
    },

    async index(request: Request, response: Response){
        await Games.find()
            .then(function(data){
                return response.status(200).send(data)
        })
    },

    async update(request: Request, response: Response){
        const dados = request.body;
        const id = request.params.id;

        await Games.findByIdAndUpdate(id, dados)
            .then(function(old_game){
                Games.findOne({_id: request.params.id})
                    .then(function(new_game){
                        return response.status(200).send(new_game);
            })
        })
    },

    async delete(request: Request, response: Response){
        return await Games.findByIdAndRemove({_id: request.params.id}).then((game)=>{
            response.send(game);
        })
    }
}