import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAllUsers = async () => {
  return await prisma.users.findMany({
    orderBy: { username: "asc" },
  });
};

export const findOneUser = async (id) => {
  return await prisma.users.findUnique({
    where: { id: Number(id) },
  });
};


export const createUser = async (data) => {
  return await prisma.users.create({
    data: {
      username: data.username,
      email: data.email,
      password: data.password,
      anonymous: data.anonymous
    }
  })
};

export const deleteUser = async (id) => {
  return await prisma.users.delete({
    where: { id:Number(id) }
  });
}