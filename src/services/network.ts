import { useFetch } from '../composables/fetch'
export class NetworkService {
  private options = {
    method: 'GET'
  }
  public async getUsers(size?: string | null): Promise<any> {
    let url = 'https://random-data-api.com/api/v2/users'
    if (size) url += `?size=${size}`
    const data = useFetch(url, this.options)
    return data
  }
}
