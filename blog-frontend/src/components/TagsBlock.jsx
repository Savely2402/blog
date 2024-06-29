import React from 'react'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import TagIcon from '@mui/icons-material/Tag'
import ListItemText from '@mui/material/ListItemText'
import Skeleton from '@mui/material/Skeleton'

import { SideBlock } from './SideBlock'
import { Link } from 'react-router-dom'

export const TagsBlock = ({ items, isLoading = true }) => {
    const renderTag = (name, index) => (
        <Link
            style={{ textDecoration: 'none', color: 'black' }}
            to={`/tags/${name}`}
        >
            <ListItem key={index} disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <TagIcon />
                    </ListItemIcon>
                    {isLoading ? (
                        <Skeleton width={100} />
                    ) : (
                        <ListItemText primary={name} />
                    )}
                </ListItemButton>
            </ListItem>
        </Link>
    )

    const tagsToRender = isLoading ? [...Array(5)] : items

    return (
        <SideBlock title="Тэги">
            {items.length ? (
                <List>
                    {tagsToRender.map((name, index) => renderTag(name, index))}
                </List>
            ) : (
                <h3 style={{ marginLeft: '12px' }}>Тегов нет</h3>
            )}
        </SideBlock>
    )
}
