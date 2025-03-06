import { FastifyInstance } from "fastify";
import { listDiet } from "./controllers/list-diet";
import { registerDiet } from "./controllers/register-diet";
import { onlyDiet } from "./controllers/only-diet";
import { updateDiet } from "./controllers/update-diet";
import { deleteDiet } from "./controllers/delet-Diet";
import { SimDiet,NaoDiet, AllDiet } from "./controllers/Quantidade-diet";
import { getInDietSequence, getNotInDietSequence ,OrderByDate} from "./controllers/sequencia-Diet";

export const appRoutes = (app: FastifyInstance) => {
  app.get("/", listDiet); //lista tudo
  app.get("/:id", onlyDiet); // id
  app.get('/Sim',SimDiet) // oque esta dentro da dieta
  app.get('/Nao',NaoDiet)   // nao esta dentro da dieta
  app.get('/all',AllDiet)  // quantidade de refeicoes
  app.get('/getInDiet',getInDietSequence) //sequencia que estao na dieta
  app.get('/getNoInDiet',getNotInDietSequence) // sequencia q  nao esta na dieta
  app.get('/order',OrderByDate) //ordenando

  app.post("/", registerDiet); //cria
  app.put('/:id',updateDiet) //edita
  app.delete('/:id',deleteDiet) //deleta

};
