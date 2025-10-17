import { createRouter } from "next-connect";
import migrator from "models/migrator.js";
import controller from "infra/controller.js";
const router = createRouter();

async function getHandler(request, response) {
  const pendingMigrations = await migrator.listPendingMigrations();
  return response.status(200).json(pendingMigrations);
}

async function postHandler(request, response) {
  const migratedMigrations = await migrator.runPedingMigrations();

  if (migratedMigrations.length > 0) {
    return response.status(201).json(migratedMigrations);
  }

  return response.status(200).json(migratedMigrations);
}

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);
