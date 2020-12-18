import {Request, Response} from 'express';
import {getRepository} from 'typeorm';

//import orphanageView from '../views/orphanages_view';
import History from '../models/History';

import * as Yup from 'yup';

export default{
  /*
  async index(request:Request, response:Response){
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request:Request, response:Response){
    const {name} = request.params;

    const histRepository = getRepository(History);

    const login = await histRepository.find( {where: {name: name} } );

    console.log(login);

    return response.json(login);
  },*/

  async create(request:Request, response:Response){
    const {
      userid,
      username, 
      time
    } = request.body;

    const histRepository = getRepository(History);

    const data = {
      userid,
      username,
      time
    }

    const schema = Yup.object().shape({
      userid : Yup.number().required(),
      username : Yup.string().required(),
      time : Yup.string().required()
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const hist = histRepository.create(data);

    await histRepository.save(hist);

    return response.status(201).json(hist);
  }
}