import prisma from "../lib/prisma";
import { Playlists } from "../models";

interface CreateUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  playlists: Playlists[];
}

export async function createUser(user: CreateUser) {
  const create = await prisma.user.create({
    data: user,
  });
  return create;
}
