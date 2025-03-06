import { PrismaClient, DietStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const db = [
    {
      name: "Pão com ovo",
      description: "Refeição da manhã",
      hourCreated: "08:00",
      dateCreated: "2023/12/10",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Arroz, feijão e frango",
      description: "Almoço",
      hourCreated: "12:30",
      dateCreated: "2023/12/10",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Bolo de chocolate",
      description: "Lanche da tarde",
      hourCreated: "15:00",
      dateCreated: "2023/12/10",
      inDiet: DietStatus.NAO,
    },
    {
      name: "Salada de frutas",
      description: "Lanche saudável",
      hourCreated: "16:30",
      dateCreated: "2023/12/10",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Omelete com queijo",
      description: "Jantar leve",
      hourCreated: "19:00",
      dateCreated: "2023/12/10",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Pizza de calabresa",
      description: "Jantar",
      hourCreated: "21:00",
      dateCreated: "2023/12/10",
      inDiet: DietStatus.NAO,
    },
    {
      name: "Suco verde",
      description: "Detox matinal",
      hourCreated: "07:00",
      dateCreated: "2023/12/10",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Macarrão à bolonhesa",
      description: "Almoço reforçado",
      hourCreated: "12:45",
      dateCreated: "2023/12/10",
      inDiet: DietStatus.NAO,
    },
    {
      name: "Iogurte natural com granola",
      description: "Lanche saudável",
      hourCreated: "16:00",
      dateCreated: "2023/12/10",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Peito de frango grelhado e legumes",
      description: "Jantar saudável",
      hourCreated: "20:00",
      dateCreated: "2023/12/10",
      inDiet: DietStatus.SIM,
    },
  ];

  // Inserir os dados no banco de dados
  await prisma.diet.createMany({
    data: db,
  });

  console.log("Seeds criadas com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
