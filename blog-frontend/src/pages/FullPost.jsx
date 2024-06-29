import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import axios from './../axios'

import { Post } from '../components/Post'
import { AddComment } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock/index'
import { usePostById } from '../hooks/usePostById'
import { useCommentsByPostId } from '../hooks/useCommentsByPostId'

export const FullPost = () => {
    const { id } = useParams()
    const { postData, isPostLoading } = usePostById(id)
    const { comments, isCommentsLoading, setComments } = useCommentsByPostId(id)

    if (isPostLoading) {
        return <Post isLoading={isPostLoading} isFullPost />
    }

    return (
        <>
            <Post
                id={postData._id}
                title={postData.title}
                imageUrl={
                    postData.imageUrl
                        ? `http://localhost:4444${postData.imageUrl}`
                        : ''
                }
                user={postData.user}
                createdAt={postData.createdAt}
                viewsCount={postData.viewsCount}
                commentsCount={comments.length}
                tags={postData.tags}
                isFullPost
            >
                <ReactMarkdown children={postData.text}></ReactMarkdown>
            </Post>
            <CommentsBlock items={comments} isLoading={isCommentsLoading}>
                <AddComment comments={comments} setComments={setComments} />
            </CommentsBlock>
        </>
    )
}
