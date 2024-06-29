import { useEffect, useState } from 'react'
import axios from './../axios'
export const usePostById = (id) => {
    const [postData, setPostData] = useState()
    const [isPostLoading, setIsPostLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => {
                setPostData(res.data)
                setIsPostLoading(false)
            })
            .catch((err) => {
                console.log(err)

                alert('Ошибка при получении статьи')
            })
    }, [])

    return { postData, isPostLoading }
}
