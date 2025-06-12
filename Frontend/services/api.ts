
export async function getPacient() {
  const res = await fetch("http://localhost:7172/api/Pacient/register");
  if (!res.ok) throw new Error("Erro ao buscar Pacientes");
  return res.json();
}
