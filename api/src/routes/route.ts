import { FastifyInstance } from "fastify";
import { listDiet } from "./controllers/list-diet";
import { registerDiet } from "./controllers/register-diet";
import { onlyDiet } from "./controllers/only-diet";
import { updateDiet } from "./controllers/update-diet";
import { deleteDiet } from "./controllers/delet-Diet";
import { SimDiet, NaoDiet, AllDiet } from "./controllers/Quantidade-diet";
import { getInDietSequence, getNotInDietSequence, OrderByDate } from "./controllers/sequencia-Diet";

export const appRoutes = (app: FastifyInstance) => {
  // Rotas principais de CRUD
  app.get("/diets", listDiet);                    // Lista todas as refeições
  app.post("/diets", registerDiet);               // Cria nova refeição
  app.get("/diets/:id", onlyDiet);               // Busca refeição por ID
  app.put("/diets/:id", updateDiet);             // Atualiza refeição
  app.delete("/diets/:id", deleteDiet);          // Remove refeição

  // Rotas de análise e estatísticas
  app.get("/diets/stats/in-diet", SimDiet);      // Refeições dentro da dieta
  app.get("/diets/stats/out-diet", NaoDiet);     // Refeições fora da dieta
  app.get("/diets/stats/total", AllDiet);        // Total de refeições

  // Rotas de sequência e ordenação
  app.get("/diets/sequence/in-diet", getInDietSequence);    // Sequência na dieta
  app.get("/diets/sequence/out-diet", getNotInDietSequence); // Sequência fora da dieta
  app.get("/diets/ordered", OrderByDate);         // Ordenação por data
};
