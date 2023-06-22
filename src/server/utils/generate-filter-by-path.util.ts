import { Prisma } from '@prisma/client';

export function generateFilterByPathUtil(path: string[], targetId: string) {
  const models = Prisma.dmmf.datamodel.models;

  const recursiveFiltering = (path: string[], models: Prisma.DMMF.Model[]): any => {
    if (path.length === 0) return;

    const current = path[0];
    const rest = path.slice(1);

    const model = models.find((m) => m.name.toLowerCase() === current);
    if (!model) throw new Error(`Model ${current} not found`);

    const relationFields = model.fields.filter((f: any) => f.relationName);

    if (rest.length === 0) {
      return { some: { id: targetId } };
    }

    const nextModelName = rest[0];

    const nextField = relationFields.find((rf: any) => rf.type.toLowerCase() === nextModelName);

    if (!nextField) throw new Error(`Relation ${nextModelName} not found`);

    const filter: any = {};
    filter[nextModelName] = recursiveFiltering(rest, models);

    return { some: filter };
  };

  const filter = recursiveFiltering(path, models);

  return filter;
}
