import { Pool } from "pg";
import dotenv from "dotenv";
import { Trigger } from "../trigger";
dotenv.config();

class TransactionUpdateTrigger extends Trigger {
  constructor() {
    super(
      new Pool({
        connectionString: process.env.DATABASE_URL,
      }),
      "transactions",
      "update_balances",
      "update_balances_trigger"
    );
  }

  async create() {
    const client = await this.pool.connect();
    try {
      await client.query(`
        CREATE OR REPLACE FUNCTION ${this.functionName}()
        RETURNS TRIGGER AS $$
        DECLARE
          difference FLOAT;
        BEGIN

          IF OLD.type <> NEW.type THEN
            IF OLD.type = 'OUTCOME' OR OLD.type = 'INVOICE_PAYMENT' THEN
              UPDATE credit_cards
              SET invoice = invoice - OLD.value
              WHERE id = OLD.credit_card_id;
            ELSE
              UPDATE credit_cards
              SET invoice = invoice + OLD.value
              WHERE id = OLD.credit_card_id;
            END IF;
            
            IF OLD.type = 'OUTCOME' OR OLD.type = 'INVOICE_PAYMENT' THEN
              UPDATE checking_accounts
              SET balance = balance + OLD.value
              WHERE id = OLD.checking_account_id;
            ELSE
              UPDATE checking_accounts
              SET balance = balance - OLD.value
              WHERE id = OLD.checking_account_id;
            END IF;
          END IF;

          IF NEW.value = OLD.value THEN
            difference = NEW.value;
          ELSE
            difference = NEW.value - OLD.value;
          END IF;
          
          IF NEW.type = 'INCOME' THEN
            UPDATE checking_accounts
            SET balance = balance + difference
            WHERE id = NEW.checking_account_id;
            
            UPDATE credit_cards
            SET invoice = invoice - difference
            WHERE id = NEW.credit_card_id;
          
          ELSIF NEW.type = 'OUTCOME' THEN
            UPDATE checking_accounts
            SET balance = balance - difference
            WHERE id = NEW.checking_account_id;
            
            UPDATE credit_cards
            SET invoice = invoice + difference
            WHERE id = NEW.credit_card_id;
          
          ELSIF NEW.type = 'INVOICE_PAYMENT' THEN
            UPDATE checking_accounts
            SET balance = balance - difference
            WHERE id = NEW.checking_account_id;
            
            UPDATE credit_cards
            SET invoice = invoice - difference
            WHERE id = NEW.credit_card_id;
          END IF;
    
          RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
      `);
      await client.query(`
        CREATE OR REPLACE TRIGGER ${this.triggerName}
        BEFORE UPDATE ON ${this.tableName}
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

export default TransactionUpdateTrigger;
