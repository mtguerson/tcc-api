import { Trigger } from "./trigger";
import TransactionCreateTrigger from "./triggers/transaction.create.trigger";
import TransactionUpdateTrigger from "./triggers/transaction.update.trigger";
import { readdirSync } from "fs";

class DBTriggers {
  constructor() {
    this.runMigrations();
  }

  async runMigrations() {
    console.log("Creating triggers...");
    const triggersPath = `${__dirname}/triggers`;
    const triggerFiles = readdirSync(triggersPath).filter((file) =>
      file.endsWith(".trigger.ts")
    );

    for (const file of triggerFiles) {
      const filePath = `${triggersPath}/${file}`;
      const triggerModule = await import(filePath);
      const trigger: Trigger = new triggerModule.default();
      const isDrop = process.argv.slice(2)[0] === "drop";

      if (typeof trigger.drop === "function" && isDrop) {
        await trigger.drop();
        continue;
      }

      if (typeof trigger.create === "function") {
        await trigger.create();
      }
    }
  }
}

new DBTriggers();
