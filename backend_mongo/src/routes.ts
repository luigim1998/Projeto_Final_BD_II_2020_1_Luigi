import {Router} from 'express'
import GamesController from './Controllers/GamesController';

const routes = Router();

routes.post("/mongo/create", GamesController.create)
routes.get("/mongo/show", GamesController.index)
routes.put("/mongoedit/:id", GamesController.update)
routes.delete("/mongodel/:id", GamesController.delete)

export default routes;