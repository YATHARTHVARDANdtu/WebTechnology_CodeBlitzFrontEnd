import React from 'react'
import { useStateValue } from '../stateProvider'

function Page() {
    const [{user},dispatch] = useStateValue();
    useEffect(() => {
        
    },[])

    return (
        <div className = "user">
            
        </div>
    )
}

export default Page
