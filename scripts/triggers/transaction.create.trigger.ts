import { Pool } from "pg";
import dotenv from "dotenv";
import { Trigger } from "../trigger";
dotenv.config();

class TransactionCreateTrigger extends Trigger {
  constructor() {
    super(
      new Pool({
        connectionString: process.env.DATABASE_URL,
      }),
      "transactions",
      "create_balances",
      "create_balances_trigger"
    );
  }

  async create() {
    const client = await this.pool.connect();
    try {
      await client.query(`
        CREATE OR REPLACE FUNCTION ${this.functionName}()
        RETURNS TRIGGER AS $$
        BEGIN
          IF NEW.balance_adjustment = false THEN            
            IF NEW.type = 'INCOME' THEN
              UPDATE checking_accounts
              SET balance = balance + NEW.value
              WHERE id = NEW.checking_account_id;
              
              UPDATE credit_cards
              SET invoice = invoice - NEW.value
              WHERE id = NEW.credit_card_id;
            
            ELSIF NEW.type = 'OUTCOME' THEN
              UPDATE checking_accounts
              SET balance = balance - NEW.value
              WHERE id = NEW.checking_account_id;
              
              UPDATE credit_cards
              SET invoice = invoice + NEW.value
              WHERE id = NEW.credit_card_id;
            
            ELSIF NEW.type = 'INVOICE_PAYMENT' THEN
              UPDATE checking_accounts
              SET balance = balance - NEW.value
              WHERE id = NEW.checking_account_id;
              
              UPDATE credit_cards
              SET invoice = invoice - NEW.value
              WHERE id = NEW.credit_card_id;
            END IF;
          END IF;
          
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `);
      await client.query(`
        CREATE OR REPLACE TRIGGER ${this.triggerName}
        BEFORE INSERT ON ${this.tableName}
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

export default TransactionCreateTrigger;
