import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'

export default function App(): React.JSX.Element {
  return <RouterProvider router={router} />
}
