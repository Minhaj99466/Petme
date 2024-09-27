import { useEffect, useState } from 'react'

function FetchList(api) {
    const [list, setList] = useState(null)
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            let data = await fetch(api)
            let json = await data.json()
            
            setList(json)
        } catch (error) {
            console.log(error.message);
        }
    }
    return list
}

export default FetchList
