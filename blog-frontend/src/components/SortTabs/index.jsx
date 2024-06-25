import { Tab, Tabs } from '@mui/material'
import React from 'react'

export const SortTabs = ({ sort, setSort }) => {
    return (
        <Tabs
            style={{ marginBottom: 15 }}
            value={sort === 'createdAt' ? 0 : 1}
            aria-label="basic tabs example"
        >
            <Tab label="Новые" onClick={() => setSort('createdAt')} />
            <Tab label="Популярные" onClick={() => setSort('viewsCount')} />
        </Tabs>
    )
}
