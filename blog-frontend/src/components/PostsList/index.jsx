import React from 'react'
import Grid from '@mui/material/Grid'
import { Post } from '../Post'

export const PostsList = ({
    filteredAndSortedPosts,
    isPostsLoading,
    userData,
}) => {
    const renderPost = (obj, index) => (
        <Post
            key={index}
            id={obj._id}
            title={obj.title}
            imageUrl={
                obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ''
            }
            user={{
                avatarUrl:
                    'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                fullName: obj.user.fullName,
            }}
            createdAt={obj.createdAt}
            viewsCount={obj.viewsCount}
            commentsCount={obj.commentsCount}
            tags={obj.tags}
            isEditable={userData?._id === obj.user._id}
        />
    )

    return (
        <>
            <Grid xs={8} item>
                {isPostsLoading ? (
                    [...Array(5)].map((obj, index) => (
                        <Post key={index} isLoading={isPostsLoading} />
                    ))
                ) : filteredAndSortedPosts.length ? (
                    filteredAndSortedPosts.map((obj, index) =>
                        renderPost(obj, index)
                    )
                ) : (
                    <h1>Нет постов</h1>
                )}
            </Grid>
        </>
    )
}
