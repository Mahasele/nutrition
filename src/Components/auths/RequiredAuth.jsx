
import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/use-auth'

export default function RequiredAuth({allowedAuth}) {
    const {auth} = useAuth()
    console.log(auth?.roles?.map(role=> allowedAuth.includes(role)))
  return (
    <section>
        {
            auth?.roles?.map(role=> allowedAuth.includes(role))[0]
            ? <Outlet/>
            : <Navigate to={'/login'} replace/>
        }
    </section>
  )
}
