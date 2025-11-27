import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import user from "models/user.js";
import sessions from "models/sessions.js";

const router = createRouter();

async function getHandler(request, response) {
  const sessionToken = request.cookies.session_id;

  const sessionObject = await sessions.findOneValidByToken(sessionToken);
  const renewedSessionObject = await sessions.renew(sessionObject.id);
  controller.setSessionCookie(renewedSessionObject.token, response);

  const userFound = await user.findOneById(sessionObject.user_id);

  response.setHeader(
    "Cache-Control",
    "no-store, no-cache, max-age=0, must-revalidate",
  );
  return response.status(200).json(userFound);
}

router.get(getHandler);

export default router.handler(controller.errorHandlers);
