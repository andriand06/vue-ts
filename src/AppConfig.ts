import { type GridConfig } from '@bryntum/grid'
export const useGridConfig = (): Partial<GridConfig> => {
  return {
    width: '1280px',
    height: '100vh',
    columns: [
      {
        field: 'username',
        text: 'Username'
      },
      {
        field: 'email',
        text: 'Email'
      }
    ],
    store: {}
  }
}
