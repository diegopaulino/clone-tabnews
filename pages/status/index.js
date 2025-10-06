import useSwr from "swr";
async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { data, isLoading } = useSwr("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  const loadingText = "Carregando...";
  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <>
      <div>
        VERSÃO DB:
        {isLoading ? loadingText : data?.dependencies.database.version}
      </div>
      <div>
        CONEXÕES ABERTAS:{" "}
        {isLoading
          ? loadingText
          : data?.dependencies.database.opened_connections}
      </div>
      <div>
        LIMITE DE CONEXÕES:{" "}
        {isLoading ? loadingText : data?.dependencies.database.max_connections}
      </div>
      <div>ÚLTIMA ATUALIZAÇÃO: {updatedAtText}</div>
    </>
  );
}
