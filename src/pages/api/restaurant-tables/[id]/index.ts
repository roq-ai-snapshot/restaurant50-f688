import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { restaurantTableValidationSchema } from 'validationSchema/restaurant-tables';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.restaurant_table
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getRestaurantTableById();
    case 'PUT':
      return updateRestaurantTableById();
    case 'DELETE':
      return deleteRestaurantTableById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRestaurantTableById() {
    const data = await prisma.restaurant_table.findFirst(convertQueryToPrismaUtil(req.query, 'restaurant_table'));
    return res.status(200).json(data);
  }

  async function updateRestaurantTableById() {
    await restaurantTableValidationSchema.validate(req.body);
    const data = await prisma.restaurant_table.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteRestaurantTableById() {
    const data = await prisma.restaurant_table.delete({
      where: { id: req.query.id as string },
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
