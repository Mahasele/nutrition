import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/use-auth"
import useRefreshToken from "../../hooks/useRefreshToken"
import { useState,useEffect } from "react"
import { Container, Paper, Grid } from "@mui/material"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import useFetchData from "../../hooks/useFetchData"
import Skeletons from '../minicomponents/Skeleton'


function PersistAuth() {
    
    const [loading,setLoading] = useState(true)
    const {auth,user,setUser} = useAuth()
    const matches = useMediaQuery((useTheme().breakpoints.up('sm')))
    const refresh = useRefreshToken()
    const {data} = useFetchData('/logged_user')
    
    useEffect(()=>{
        let mounted = true
        const generateNewAccess = async () =>{
            try{
                await refresh()
            } catch(err) {
                console.log(err)
            }finally{
                mounted && setLoading(false)
            }
        }

        !auth?.accessToken ?  generateNewAccess() : setLoading(false)
        setUser(data)
        return ()=>{
            mounted = false
        }
    },[])
  
  return (
    loading ? 
    <Container maxWidth="lg" style={{ marginTop: '20px',height:'100vh',overflow:'hidden' }}> 
        <Paper sx={{p:3}} >
            <Grid container spacing={3}>
               <Skeletons/>
                {
                matches 
                &&
               <Skeletons/>
                }
                
                
            </Grid>
               
        </Paper>   
    </Container> 
    : 
    auth?.accessToken 
    ? 
    <Outlet/>
    :
    <Navigate to={'/login'} replace/>
  )
}

export default PersistAuth