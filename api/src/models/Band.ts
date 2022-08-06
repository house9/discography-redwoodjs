import { RedwoodRecord } from '@redwoodjs/record'

export default class Band extends RedwoodRecord {
  static validates = {
    name: { presence: true }, // doesn't work against a blank string :(
  }
}
