import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.deleteAllEmails();

    await email.send({
      from: "Diego <contato@diegodev.com>",
      to: "diego.paulino.sva@gmail.com",
      subject: "Teste de assunto",
      text: "Teste de corpo",
    });

    await email.send({
      from: "Diego <contato@diegodev.com>",
      to: "diego.paulino.sva@gmail.com",
      subject: "Último email enviado",
      text: "Último email",
    });

    const lastEmail = await orchestrator.getLastEmail();
    expect(lastEmail.sender).toBe("<contato@diegodev.com>");
    expect(lastEmail.recipients[0]).toBe("<diego.paulino.sva@gmail.com>");
    expect(lastEmail.subject).toBe("Último email enviado");
    expect(lastEmail.text).toBe("Último email\r\n");
  });
});
