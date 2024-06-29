import { useEffect, useState } from 'react'
import axios from './../axios'

export const useCommentsByPostId = (id) => {
    const [comments, setComments] = useState([])
    const [isCommentsLoading, seteIsCommentsLoading] = useState(true)

    useEffect(() => {
        axios
            .get(`/posts/${id}/comments`)
            .then((res) => {
                setComments(res.data)
                seteIsCommentsLoading(false)
            })
            .catch((err) => {
                console.warn(err)

                alert('Ошибка при получении комментариев')
            })
    }, [])

    return { comments, isCommentsLoading, setComments }
}
