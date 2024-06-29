import CommentsModel from '../models/Comments.js'
import PostModel from '../models/Post.js'

export const create = async (req, res) => {
    try {
        const doc = new CommentsModel({
            text: req.body.text,
            user: req.userId,
            post: req.body.post,
        })

        await doc.save()

        await PostModel.findByIdAndUpdate(
            { _id: req.body.post },
            { $inc: { commentsCount: 1 } },
            { new: true }
        ).exec()

        const populatedComment = await doc.populate({
            path: 'user',
            select: ['fullName', 'avatarUrl'],
        })

        res.json(populatedComment)
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: 'Не удалось добавить комментарий',
        })
    }
}

export const getCommentsByPostId = async (req, res) => {
    const postId = req.params.id

    try {
        const comments = await CommentsModel.find({ post: postId }).populate({
            path: 'user',
            select: ['fullName', 'avatarUrl'],
        })

        res.json(comments)
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: 'Не удалось загрузить комментарии!',
        })
    }
}

export const getAll = async (req, res) => {
    try {
        const comments = await CommentsModel.find().populate({
            path: 'user',
            select: ['fullName', 'avatarUrl'],
        })

        res.json(comments)
    } catch (err) {
        console.log(err)

        res.status(500).json({
            message: 'Не удалось загрузить комментарии!',
        })
    }
}
