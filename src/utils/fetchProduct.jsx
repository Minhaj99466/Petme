import { useEffect, useState } from 'react'
import { PRODUCT_LIST } from './constants'

function FetchProduct({proId}) {
    const [productInfo, setProductInfo] = useState(null)

    useEffect(() => {
        fetchProduct()
    }, [proId])

    const fetchProduct = async () => {
        try {
            const data = await fetch(PRODUCT_LIST+'/'+proId)
            const json = await data.json()
            setProductInfo(json)
            
        } catch (error) {
            console.log(error.message);
        }
    }
    return productInfo
}

export default FetchProduct
