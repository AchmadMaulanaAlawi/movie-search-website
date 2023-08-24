export async function request(value) {
  const apiUrl = import.meta.env.VITE_SEARCH_API_URL
  const res = await fetch(`${apiUrl}${value}`)
    .then((response) => response.json())
    .catch((err) => err)
  return res.Response ? res : { Error: `${res}` }
}
