import { Grid } from '@mui/material'
import React from 'react'
import { TagsBlock } from '../TagsBlock'
import { CommentsBlock } from '../CommentsBlock'

export const SideBar = ({
    tags,
    isTagsLoading,
    comments,
    isCommentsLoading,
}) => {
    return (
        <Grid xs={4} item>
            <TagsBlock items={tags.items} isLoading={isTagsLoading} />
            <CommentsBlock
                items={comments.items}
                isLoading={isCommentsLoading}
            />
        </Grid>
    )
}
