import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import axios from './../axios'

import { Post } from '../components/Post'
import { AddComment } from '../components/AddComment'
import { CommentsBlock } from '../components/CommentsBlock/index'

export const FullPost = () => {
    const [comments, setComments] = useState([])
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`/posts/${id}`)
            .then((res) => {
                setData(res.data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)

                alert('Ошибка при получении статьи')
            })
    }, [])

    useEffect(() => {
        console.log(comments.length)
        axios
            .get(`/posts/${id}/comments`)
            .then((res) => {
                setComments(res.data)
            })
            .catch((err) => {
                console.warn(err)

                alert('Ошибка при получении комментариев')
            })
    }, [])

    if (isLoading) {
        return <Post isLoading={isLoading} isFullPost />
    }

    return (
        <>
            <Post
                id={data._id}
                title={data.title}
                imageUrl={
                    data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''
                }
                user={data.user}
                createdAt={data.createdAt}
                viewsCount={data.viewsCount}
                commentsCount={comments.length}
                tags={data.tags}
                isFullPost
            >
                <ReactMarkdown children={data.text}></ReactMarkdown>
            </Post>
            <CommentsBlock items={comments} isLoading={false}>
                <AddComment comments={comments} setComments={setComments} />
            </CommentsBlock>
        </>
    )
}
