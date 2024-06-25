import React, { useState } from 'react'
import { usePosts } from '../../hooks/usePosts'
import { useParams } from 'react-router-dom'
import { SortTabs } from '../../components/SortTabs'
import { PostsList } from '../../components/PostsList'
import { useSelector } from 'react-redux'
import { SideBar } from '../../components/SideBar'
import { useTags } from '../../hooks/useTags'
import { Grid } from '@mui/material'

export const TagPosts = () => {
    const userData = useSelector((state) => state.auth.data)
    const [sort, setSort] = useState('createdAt')
    const { name } = useParams()

    const { filteredAndSortedPosts, isPostsLoading } = usePosts(sort, name)
    const { tags, isTagsLoading } = useTags()

    return (
        <>
            <h1>{`#${name}`}</h1>
            <SortTabs sort={sort} setSort={setSort} />
            <Grid container spacing={4}>
                <PostsList
                    filteredAndSortedPosts={filteredAndSortedPosts}
                    isPostsLoading={isPostsLoading}
                    userData={userData}
                />
                <SideBar tags={tags} isTagsLoading={isTagsLoading} />
            </Grid>
        </>
    )
}
