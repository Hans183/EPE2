import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'GET':
      // Obtener todos los todos
      const todos = await prisma.todo.findMany();
      res.status(200).json(todos);
      break;
    case 'POST':
      // Crear un nuevo todo
      const { title, description } = req.body;
      const newTodo = await prisma.todo.create({
        data: {
          title,
          description,
        },
      });
      res.status(201).json(newTodo);
      break;
    case 'PUT':
      // Actualizar un todo
      const { id, title: updateTitle, description: updateDescription, completed } = req.body;
      const updatedTodo = await prisma.todo.update({
        where: { id: Number(id) },
        data: {
          title: updateTitle,
          description: updateDescription,
          completed,
        },
      });
      res.status(200).json(updatedTodo);
      break;
    case 'DELETE':
      // Eliminar un todo
      const { id: deleteId } = req.body;
      await prisma.todo.delete({
        where: { id: Number(deleteId) },
      });
      res.status(204).end();
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
