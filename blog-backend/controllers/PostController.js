import PostModel from '../models/Post.js'
import CommentsModel from '../models/Comments.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec()

        const tags = posts
            .map((obj) => obj.tags)
            .flat()
            .slice(0, 5)

        res.json(tags)
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: 'Не удалось получить теги',
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate({
            path: 'user',
            select: ['fullName', 'avatarUrl'],
        })

        res.json(posts)
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: 'Не удалось получить статьи',
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findByIdAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                new: true,
            }
        )
            .populate({
                path: 'user',
                select: ['fullName', 'avatarUrl'],
            })
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена',
                    })
                }

                res.json(doc)
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: 'Не удалось вернуть статью',
                })
            })
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: 'Не удалось получить статью',
        })
    }
}

export const remove = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.findByIdAndDelete(postId)
            .then((doc) => {
                if (!doc) {
                    return res.status(404).json({
                        message: 'Статья не найдена',
                    })
                }
                res.json({
                    success: true,
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(500).json({
                    message: 'Не удалось удалить статью',
                })
            })

        try {
            CommentsModel.deleteMany({ post: postId })
        } catch (err) {
            console.log(err)

            res.status(500).json({
                message: 'Не удалось удалить комментарии',
            })
        }
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: 'Не удалось получить статью',
        })
    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            tags: req.body.tags.split(','),
            imageUrl: req.body.imageUrl,
            user: req.userId,
        })

        const post = await doc.save()

        res.json(post)
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: 'Не удалось создать статью',
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id

        PostModel.updateOne(
            {
                _id: postId,
            },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                user: req.body.user,
                tags: req.body.tags,
            }
        ).exec()

        res.json({
            success: true,
        })
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: 'Не удалось обновить статью',
        })
    }
}
