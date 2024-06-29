import React from 'react'

import styles from './CommentsBlock.module.scss'
import { SideBlock } from '../SideBlock'
import List from '@mui/material/List'

import { CommentsList } from './../CommentsList/CommentsList'

export const CommentsBlock = ({ items, children, isLoading = true }) => {
    return (
        <SideBlock title="Комментарии">
            <List className={styles.commentsList}>
                <CommentsList items={items} isLoading={isLoading} />
            </List>
            {children}
        </SideBlock>
    )
}
