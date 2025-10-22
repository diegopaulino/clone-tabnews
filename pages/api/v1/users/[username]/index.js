import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "models/user.js";
const router = createRouter();

async function getHandler(request, response) {
  const username = request.query.username;
  const userFound = await user.findOneByUsername(username);
  return response.status(200).json(userFound);
}

router.get(getHandler);

export default router.handler(controller.errorHandlers);
