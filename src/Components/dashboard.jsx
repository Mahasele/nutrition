import { useState,useEffect } from "react"
import useAxiosIntercepters from "../hooks/useAxiosIntercepters"
import useAuth from "../hooks/use-auth"

function Dashboard() {
    const [user,setUser] = useState()
    const {auth,setAuth} = useAuth()
    const axios = useAxiosIntercepters()
    const handleLogout = async() =>{
        try{
            const res = await axios.get('/logout')
            setAuth(null)
        } catch(err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        let mounted = true;
        const controller = new AbortController()
        if(auth?.accessToken) {
            const getUser= async() => {
                try{
                    const res = await axios.get('/users',{
                        signal:controller.signal,
                        withCredentials:true
                    })
                    mounted && setUser(res.data)
                }catch(err) {
                    console.log(err)
                }
                
            }
            getUser()
        }
        return ()=>{
            mounted = false
            controller.abort()
        }
    },[])
  return (
    <div>{JSON.stringify(user)}<br/>
    <button onClick={()=>handleLogout()} className='buttonStyle'>Logout</button><br/><br/>
    
    </div>
  )
}

export default Dashboard