import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../redux/slices/posts'

const sortFunc = (a, b, sort) => {
    switch (sort) {
        case 'createdAt':
            return new Date(b.createdAt) - new Date(a.createdAt)
        case 'viewsCount':
            return b.viewsCount - a.viewsCount
        default:
            return 0
    }
}

const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => {
        if (sort) {
            return [...posts.items].sort((a, b) => sortFunc(a, b, sort))
        }
        return posts
    }, [posts, sort])

    return sortedPosts
}

export const usePosts = (sort, tag) => {
    const { posts } = useSelector((state) => state.posts)
    const isPostsLoading = posts.status === 'loading'

    const dispatch = useDispatch()

    const sortedPosts = useSortedPosts(posts, sort)

    const filteredAndSortedPosts = useMemo(() => {
        if (!tag) {
            return sortedPosts
        }

        return sortedPosts.filter((post) => post.tags.includes(tag))
    }, [sortedPosts, tag])

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch])

    return { filteredAndSortedPosts, isPostsLoading }
}
