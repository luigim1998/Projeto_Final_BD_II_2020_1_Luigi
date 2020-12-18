import {Request, Response} from 'express';
import {getRepository} from 'typeorm';

//import orphanageView from '../views/orphanages_view';
import Login from '../models/Login';

import * as Yup from 'yup';

export default{
  /*
  async index(request:Request, response:Response){
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return response.json(orphanageView.renderMany(orphanages));
  },*/

  async show(request:Request, response:Response){
    const {name} = request.params;

    const loginRepository = getRepository(Login);

    const login = await loginRepository.find( {where: {name: name} } );

    console.log(login);

    return response.json(login);
  },

  async create(request:Request, response:Response){
    const {
      name, 
      senha
    } = request.body;

    const loginRepository = getRepository(Login);

    const data = {
      name,
      senha
    }

    const schema = Yup.object().shape({
      name : Yup.string().required(),
      senha : Yup.string().required()
    });

    await schema.validate(data, {
      abortEarly: false,
    });

    const login = loginRepository.create(data);

    await loginRepository.save(login);

    return response.status(201).json(login);
  }
}