import { Pool } from 'pg'

const args = process.argv.slice(2)
const isDrop = args[0] === 'drop'

export abstract class Trigger {
  pool: Pool
  functionName: string
  triggerName: string
  tableName: string

  constructor(
    pool: Pool,
    tableName: string,
    functionName: string,
    triggerName: string,
  ) {
    this.pool = pool
    this.tableName = tableName
    this.functionName = functionName
    this.triggerName = triggerName
  }

  async create() {
    throw new Error('Method not implemented.')
  }

  async drop() {
    throw new Error('Method not implemented.')
  }

  successMessage() {
    if (isDrop) {
      console.log(
        `Function ${this.functionName} and trigger ${this.triggerName} dropped successfully. ✅`,
      )
      return
    }
    console.log(
      `Function ${this.functionName} and trigger ${this.triggerName} created successfully. ✅`,
    )
  }

  errorMessage(error: any) {
    console.error(error)
    if (isDrop) {
      console.log(
        `Error dropping function ${this.functionName} and trigger ${this.triggerName}. ❌`,
      )

      return
    }
    console.log(
      `Error creating function ${this.functionName} and trigger ${this.triggerName}. ❌`,
    )
  }
}
