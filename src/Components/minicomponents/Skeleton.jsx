import { Grid,Skeleton } from "@mui/material"


function Skeletons() {
  return (
     <Grid item xs={12} md={6}>
                    <Skeleton   height={20} sx={{width:'100%'}}></Skeleton> 
                    <Skeleton   height={20} sx={{width:'100%'}}></Skeleton> 
                    <Skeleton variant="circular"  height={30} width={30}></Skeleton> 
                    <Skeleton  height={40}  sx={{width:'100%'}}></Skeleton> 
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                    <Skeleton height={40} sx={{width:'100%'}}></Skeleton>          
                </Grid>
  )
}

export default Skeletons