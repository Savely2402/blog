import React, { useState } from 'react'

import styles from './AddComment.module.scss'
import axios from '../../axios'

import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export const AddComment = ({ comments, setComments }) => {
    const [text, setText] = useState('')
    const { id } = useParams()

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: {
            text: '',
        },
        mode: 'onChange',
    })

    const onSubmit = async () => {
        if (text.trim().length > 0) {
            axios
                .post(`posts/${id}/comments`, { text: text, post: id })
                .then((res) => {
                    const updatedComments = [...comments]
                    updatedComments.push(res.data)
                    setText('')
                    setComments(updatedComments)
                })
                .catch((err) => {
                    console.warn(err)
                    alert('Не удалось отправить комментарий')
                })
        }
    }

    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{ root: styles.avatar }}
                    src="https://mui.com/static/images/avatar/5.jpg"
                />
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register('text', {
                            required: 'Поле не должно быть пустым',
                            validate: (value) =>
                                value.trim().length > 0 ||
                                'Поле не должно быть пустым',
                        })}
                        helperText={errors.text?.message}
                        error={Boolean(errors.text?.message)}
                        value={text}
                        onChange={(e) => {
                            setText(e.target.value)
                            clearErrors('text')
                        }}
                        label="Написать комментарий"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        fullWidth
                    />

                    <Button type="submit" variant="contained">
                        Отправить
                    </Button>
                </form>
            </div>
        </>
    )
}
