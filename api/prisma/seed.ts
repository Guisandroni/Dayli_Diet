import { PrismaClient, DietStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a user first
  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: "hashed_password_here", // In a real app, this should be properly hashed
    },
  });

  const db = [
    // 15/03/2025
    {
      name: "Suco detox",
      description: "Detox matinal",
      hourCreated: "06:30",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Pão integral com ovos mexidos",
      description: "Café da manhã",
      hourCreated: "08:00",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Arroz, feijão e filé de frango",
      description: "Almoço",
      hourCreated: "12:15",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Bolo de cenoura com chocolate",
      description: "Lanche da tarde",
      hourCreated: "16:00",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.NAO,
      userId: user.id,
    },
    {
      name: "Sopa de legumes",
      description: "Jantar",
      hourCreated: "19:30",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Pipoca com manteiga",
      description: "Ceia",
      hourCreated: "22:00",
      dateCreated: "15/03/2025",
      inDiet: DietStatus.NAO,
      userId: user.id,
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
      userId: user.id,
    },
    {
      name: "Macarrão integral com frango",
      description: "Almoço",
      hourCreated: "12:45",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Chocolate ao leite",
      description: "Lanche da tarde",
      hourCreated: "16:15",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.NAO,
      userId: user.id,
    },
    {
      name: "Peixe assado com arroz integral",
      description: "Jantar",
      hourCreated: "19:30",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Sorvete de creme",
      description: "Sobremesa",
      hourCreated: "21:30",
      dateCreated: "18/03/2025",
      inDiet: DietStatus.NAO,
      userId: user.id,
    },

    // 21/03/2025
    {
      name: "Café preto sem açúcar",
      description: "Desjejum",
      hourCreated: "06:00",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Omelete com queijo cottage",
      description: "Café da manhã",
      hourCreated: "08:00",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Arroz, feijão e carne moída",
      description: "Almoço",
      hourCreated: "12:00",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Batata frita",
      description: "Lanche da tarde",
      hourCreated: "16:00",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.NAO,
      userId: user.id,
    },
    {
      name: "Caldo de feijão",
      description: "Jantar",
      hourCreated: "19:45",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Chá de camomila",
      description: "Ceia",
      hourCreated: "22:15",
      dateCreated: "21/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },

    // 24/03/2025
    {
      name: "Smoothie de banana e amêndoas",
      description: "Desjejum",
      hourCreated: "06:30",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Tapioca com queijo e presunto",
      description: "Café da manhã",
      hourCreated: "08:30",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Frango grelhado com batata doce",
      description: "Almoço",
      hourCreated: "12:45",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Pão de queijo",
      description: "Lanche da tarde",
      hourCreated: "16:30",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.NAO,
      userId: user.id,
    },
    {
      name: "Salada de quinoa com frango",
      description: "Jantar",
      hourCreated: "19:00",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Barrinha de cereal",
      description: "Ceia",
      hourCreated: "22:00",
      dateCreated: "24/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },

    // 27/03/2025
    {
      name: "Café com leite e pão integral",
      description: "Desjejum",
      hourCreated: "06:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Panqueca de banana",
      description: "Café da manhã",
      hourCreated: "08:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Arroz integral, feijão e filé de peixe",
      description: "Almoço",
      hourCreated: "12:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Biscoito recheado",
      description: "Lanche da tarde",
      hourCreated: "16:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.NAO,
      userId: user.id,
    },
    {
      name: "Sopa de ervilha",
      description: "Jantar",
      hourCreated: "19:30",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
    },
    {
      name: "Torrada com geleia",
      description: "Ceia",
      hourCreated: "22:15",
      dateCreated: "27/03/2025",
      inDiet: DietStatus.SIM,
      userId: user.id,
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
