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
    },
    {
      name: "Pão integral com ovos mexidos",
      description: "Café da manhã",
      hourCreated: "08:00",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Arroz, feijão e filé de frango",
      description: "Almoço",
      hourCreated: "12:15",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Bolo de cenoura com chocolate",
      description: "Lanche da tarde",
      hourCreated: "16:00",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.NAO,
    },
    {
      name: "Sopa de legumes",
      description: "Jantar",
      hourCreated: "19:30",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Pipoca com manteiga",
      description: "Ceia",
      hourCreated: "22:00",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.NAO,
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
    },
    {
      name: "Macarrão integral com frango",
      description: "Almoço",
      hourCreated: "12:45",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Chocolate ao leite",
      description: "Lanche da tarde",
      hourCreated: "16:15",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.NAO,
    },
    {
      name: "Peixe assado com arroz integral",
      description: "Jantar",
      hourCreated: "19:30",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Sorvete de creme",
      description: "Sobremesa",
      hourCreated: "21:30",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.NAO,
    },

    // 21/03/2025
    {
      name: "Café preto sem açúcar",
      description: "Desjejum",
      hourCreated: "06:00",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Omelete com queijo cottage",
      description: "Café da manhã",
      hourCreated: "08:00",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Arroz, feijão e carne moída",
      description: "Almoço",
      hourCreated: "12:00",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Batata frita",
      description: "Lanche da tarde",
      hourCreated: "16:00",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.NAO,
    },
    {
      name: "Caldo de feijão",
      description: "Jantar",
      hourCreated: "19:45",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Chá de camomila",
      description: "Ceia",
      hourCreated: "22:15",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
    },

    // 24/03/2025
    {
      name: "Smoothie de banana e amêndoas",
      description: "Desjejum",
      hourCreated: "06:30",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Tapioca com queijo e presunto",
      description: "Café da manhã",
      hourCreated: "08:30",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Frango grelhado com batata doce",
      description: "Almoço",
      hourCreated: "12:45",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Pão de queijo",
      description: "Lanche da tarde",
      hourCreated: "16:30",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.NAO,
    },
    {
      name: "Salada de quinoa com frango",
      description: "Jantar",
      hourCreated: "19:00",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Barrinha de cereal",
      description: "Ceia",
      hourCreated: "22:00",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
    },

    // 27/03/2025
    {
      name: "Café com leite e pão integral",
      description: "Desjejum",
      hourCreated: "06:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Panqueca de banana",
      description: "Café da manhã",
      hourCreated: "08:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Arroz integral, feijão e filé de peixe",
      description: "Almoço",
      hourCreated: "12:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Biscoito recheado",
      description: "Lanche da tarde",
      hourCreated: "16:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.NAO,
    },
    {
      name: "Sopa de ervilha",
      description: "Jantar",
      hourCreated: "19:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
    },
    {
      name: "Torrada com geleia",
      description: "Ceia",
      hourCreated: "22:15",
      dateCreated: "27/03/2025",
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
