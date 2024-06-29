import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { useSelector } from 'react-redux'

import { usePosts } from '../hooks/usePosts'
import { useTags } from '../hooks/useTags'

import { SortTabs } from '../components/SortTabs'
import { PostsList } from '../components/PostsList'
import { SideBar } from '../components/SideBar'
import { useComments } from '../hooks/useComments'

export const Home = () => {
    const userData = useSelector((state) => state.auth.data)
    const [sort, setSort] = useState('createdAt')

    const { filteredAndSortedPosts, isPostsLoading } = usePosts(sort)
    const { tags, isTagsLoading } = useTags()
    const { comments, isCommentsLoading } = useComments()

    return (
        <>
            <SortTabs sort={sort} setSort={setSort} />
            <Grid container spacing={4}>
                <PostsList
                    filteredAndSortedPosts={filteredAndSortedPosts}
                    isPostsLoading={isPostsLoading}
                    userData={userData}
                />
                <SideBar
                    tags={tags}
                    isTagsLoading={isTagsLoading}
                    comments={comments}
                    isCommentsLoading={isCommentsLoading}
                />
            </Grid>
        </>
    )
}
