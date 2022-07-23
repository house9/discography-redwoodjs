// See https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/constructor
// for options.

import { PrismaClient, Prisma } from '@prisma/client'

import { emitLogLevels, handlePrismaLogging } from '@redwoodjs/api/logger'

import { logger } from './logger'

/*
 * Instance of the Prisma Client
 */
export const db = new PrismaClient<
  Prisma.PrismaClientOptions,
  'info' | 'warn' | 'error' | 'query'
>({
  log: emitLogLevels(['info', 'warn', 'error', 'query']),
})

handlePrismaLogging({
  db,
  logger,
  logLevels: ['info', 'warn', 'error', 'query'],
})

db.$on('query', (e: Prisma.QueryEvent) => {
  console.log(' ')
  console.log('----------------------------')
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
  console.log('----------------------------')
  console.log(' ')
})
