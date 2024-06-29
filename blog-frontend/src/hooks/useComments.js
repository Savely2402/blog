import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments } from '../redux/slices/posts'

export const useComments = () => {
    const { comments } = useSelector((state) => state.posts)
    const isCommentsLoading = comments.status === 'loading'

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchComments())
    }, [dispatch])

    return { comments, isCommentsLoading }
}
