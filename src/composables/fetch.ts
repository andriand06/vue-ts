export async function useFetch(url: string, option: RequestInit): Promise<any> {
  let data: [] | {} = (await fetch(url, { mode: 'cors', ...option })).json()
  return data
}
