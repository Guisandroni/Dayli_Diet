import { FastifyInstance } from "fastify";
import { listDiet } from "./services/diet/list-diet";
import { registerDiet } from "./services/diet/register-diet";
import { onlyDiet } from "./services/diet/only-diet";
import { updateDiet } from "./services/diet/update-diet";
import { deleteDiet } from "./services/diet/delet-Diet";
import { SimDiet, NaoDiet, AllDiet } from "./services/diet/Quantidade-diet";
import {
  getInDietSequence,
  getNotInDietSequence,
  OrderByDate,
} from "./services/diet/sequencia-Diet";
import { registerUser } from "./services/user/registerUser";
import { userId } from "./services/user/userId";
import { users } from "./services/user/users";
import { login } from "./services/user/login";
import { userDiet } from "./services/user-diet/user-diet";
import { dietsUser } from "./services/user-diet/diets-user";

export const appRoutes = (app: FastifyInstance) => {
  // Rotas principais de CRUD
  app.get("/diets", listDiet); // Lista todas as refeições
  app.post("/diets", registerDiet); // Cria nova refeição
  app.get("/diets/:userId/:id", onlyDiet); // Busca refeição por ID
  app.put("/diets/:userId/:id", updateDiet); // Atualiza refeição
  app.delete("/diets/:userId/:id", deleteDiet); // Remove refeição

  // Rotas de análise e estatísticas
  app.get("/diets/stats/in-diet/:userId", SimDiet); // Refeições dentro da dieta
  app.get("/diets/stats/out-diet/:userId", NaoDiet); // Refeições fora da dieta
  app.get("/diets/stats/total/:userId", AllDiet); // Total de refeições

  // Rotas de sequência e ordenação
  app.get("/diets/sequence/in-diet/:userId", getInDietSequence); // Sequência na dieta
  app.get("/diets/sequence/out-diet/:userId", getNotInDietSequence); // Sequência fora da dieta
  app.get("/diets/ordered/:userId", OrderByDate); // Ordenação por data

  // Rotas de usuário
  app.post("/users", registerUser); //registro usuario
  app.get("/users/:id", userId); //busca usuario por id
  app.get("/users", users); //lista todos os usuarios
  app.post("/users/login", login); //login usuario

  app.get("/users/diets/user/:id", dietsUser); //lista todas as dietas do usuario
  app.post("/users/diets/:id", userDiet); //cria uma dieta para o usuario
};
