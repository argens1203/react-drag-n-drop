import { useEffect, useState } from "react";

export function useGetBlock(id: string){
    const [loading, setLoading] = useState(true);
    const [block, setBlock] = useState({});
    useEffect(()=>{
        
    }, [id])
}