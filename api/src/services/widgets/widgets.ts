import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const widgets: QueryResolvers['widgets'] = () => {
  return db.widget.findMany()
}

export const widget: QueryResolvers['widget'] = ({ id }) => {
  return db.widget.findUnique({
    where: { id },
  })
}

export const createWidget: MutationResolvers['createWidget'] = ({ input }) => {
  return db.widget.create({
    data: input,
  })
}

export const updateWidget: MutationResolvers['updateWidget'] = ({
  id,
  input,
}) => {
  return db.widget.update({
    data: input,
    where: { id },
  })
}

export const deleteWidget: MutationResolvers['deleteWidget'] = ({ id }) => {
  return db.widget.delete({
    where: { id },
  })
}
