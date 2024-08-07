import dotenv from "dotenv";
import { Pool } from "pg";
import { Trigger } from "../trigger";
dotenv.config();

class TransactionDeleteTrigger extends Trigger {
  constructor() {
    super(
      new Pool({
        connectionString: process.env.DATABASE_URL,
      }),
      "transactions",
      "delete_balances",
      "delete_balances_trigger"
    );
  }

  async create() {
    const client = await this.pool.connect();
    try {
      await client.query(`
        CREATE OR REPLACE FUNCTION ${this.functionName}()
        RETURNS TRIGGER AS $$
        BEGIN
          IF OLD.credit_card_id IS NOT NULL THEN
            IF OLD.type = 'OUTCOME' THEN
              UPDATE credit_cards
              SET invoice = invoice - OLD.value
              WHERE id = OLD.credit_card_id;
            ELSE
              UPDATE credit_cards
              SET invoice = invoice + OLD.value
              WHERE id = OLD.credit_card_id;
            END IF;
          END IF;

          IF OLD.checking_account_id IS NOT NULL THEN
            IF OLD.type = 'INCOME' THEN
              UPDATE checking_accounts
              SET balance = balance - OLD.value
              WHERE id = OLD.checking_account_id;
            ELSE
              UPDATE checking_accounts
              SET balance = balance + OLD.value
              WHERE id = OLD.checking_account_id;
            END IF;
          END IF;

          RETURN OLD;
        END;
        $$ LANGUAGE plpgsql;
      `);

      await client.query(`
        CREATE OR REPLACE TRIGGER ${this.triggerName}
        BEFORE DELETE ON ${this.tableName}
        FOR EACH ROW
        EXECUTE FUNCTION ${this.functionName}();
      `);

      this.successMessage();
    } catch (error) {
      this.errorMessage(error);
    } finally {
      client.release();
    }
  }

  async drop() {
    const client = await this.pool.connect();
    try {
      await client.query(`
        DROP TRIGGER IF EXISTS ${this.triggerName} ON ${this.tableName};
      `);
      await client.query(`
        DROP FUNCTION IF EXISTS ${this.functionName};
      `);
      this.successMessage();
    } catch (error) {
      this.errorMessage(error);
    } finally {
      client.release();
    }
  }
}

export default TransactionDeleteTrigger;
