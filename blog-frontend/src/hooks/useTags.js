import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTags } from '../redux/slices/posts'

export const useTags = () => {
    const { tags } = useSelector((state) => state.posts)
    const isTagsLoading = tags.status === 'loading'

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch])

    return { tags, isTagsLoading }
}
