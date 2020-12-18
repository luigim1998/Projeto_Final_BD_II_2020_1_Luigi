import {Router} from 'express';
import multer from 'multer';

//import uploadConfig from './config/upload';
import LoginController from './controllers/LoginController';
import HistoryController from './controllers/HistoryController';

const routes = Router();
//const upload = multer(uploadConfig);

//Rota
//Recurso(users)
//Params:
    //Query params (enviados através da url e.g. algimacoisa?_param_&_param)
    //Route params (usado para identificar recurso na url e.g. ID)
    //Body (corpo da requisição)

//routes.get('/orphanages', OrphanagesController.index);
routes.get('/user/:name', LoginController.show);
routes.post('/user',LoginController.create);
routes.post('/hist',HistoryController.create);

export default routes;