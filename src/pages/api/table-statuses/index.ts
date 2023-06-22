import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { tableStatusValidationSchema } from 'validationSchema/table-statuses';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTableStatuses();
    case 'POST':
      return createTableStatus();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTableStatuses() {
    const data = await prisma.table_status
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'table_status'));
    return res.status(200).json(data);
  }

  async function createTableStatus() {
    await tableStatusValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.restaurant_table?.length > 0) {
      const create_restaurant_table = body.restaurant_table;
      body.restaurant_table = {
        create: create_restaurant_table,
      };
    } else {
      delete body.restaurant_table;
    }
    const data = await prisma.table_status.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
