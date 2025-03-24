import { PrismaClient, DietStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const db = [
    // 15/03/2025
    {
      name: "Suco detox",
      description: "Detox matinal",
      hourCreated: "06:30",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Pão integral com ovos mexidos",
      description: "Café da manhã",
      hourCreated: "08:00",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Arroz, feijão e filé de frango",
      description: "Almoço",
      hourCreated: "12:15",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Bolo de cenoura com chocolate",
      description: "Lanche da tarde",
      hourCreated: "16:00",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.NAO,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Sopa de legumes",
      description: "Jantar",
      hourCreated: "19:30",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Pipoca com manteiga",
      description: "Ceia",
      hourCreated: "22:00",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.NAO,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },

    // 18/03/2025
    {
      name: "Vitamina de morango com aveia",
      description: "Pré-treino",
      hourCreated: "06:00",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Iogurte natural com granola",
      description: "Café da manhã",
      hourCreated: "08:30",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Macarrão integral com frango",
      description: "Almoço",
      hourCreated: "12:45",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Chocolate ao leite",
      description: "Lanche da tarde",
      hourCreated: "16:15",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.NAO,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Peixe assado com arroz integral",
      description: "Jantar",
      hourCreated: "19:30",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Sorvete de creme",
      description: "Sobremesa",
      hourCreated: "21:30",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.NAO,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },

    // 21/03/2025
    {
      name: "Café preto sem açúcar",
      description: "Desjejum",
      hourCreated: "06:00",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Omelete com queijo cottage",
      description: "Café da manhã",
      hourCreated: "08:00",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Arroz, feijão e carne moída",
      description: "Almoço",
      hourCreated: "12:00",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Batata frita",
      description: "Lanche da tarde",
      hourCreated: "16:00",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.NAO,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Caldo de feijão",
      description: "Jantar",
      hourCreated: "19:45",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Chá de camomila",
      description: "Ceia",
      hourCreated: "22:15",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },

    // 24/03/2025
    {
      name: "Smoothie de banana e amêndoas",
      description: "Desjejum",
      hourCreated: "06:30",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Tapioca com queijo e presunto",
      description: "Café da manhã",
      hourCreated: "08:30",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Frango grelhado com batata doce",
      description: "Almoço",
      hourCreated: "12:45",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Pão de queijo",
      description: "Lanche da tarde",
      hourCreated: "16:30",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.NAO,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Salada de quinoa com frango",
      description: "Jantar",
      hourCreated: "19:00",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Barrinha de cereal",
      description: "Ceia",
      hourCreated: "22:00",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },

    // 27/03/2025
    {
      name: "Café com leite e pão integral",
      description: "Desjejum",
      hourCreated: "06:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Panqueca de banana",
      description: "Café da manhã",
      hourCreated: "08:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Arroz integral, feijão e filé de peixe",
      description: "Almoço",
      hourCreated: "12:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Biscoito recheado",
      description: "Lanche da tarde",
      hourCreated: "16:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.NAO,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Sopa de ervilha",
      description: "Jantar",
      hourCreated: "19:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
    },
    {
      name: "Torrada com geleia",
      description: "Ceia",
      hourCreated: "22:15",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
      userId: "4fb10431-9a07-446b-87bf-3f3a0e6d1e2e",
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
