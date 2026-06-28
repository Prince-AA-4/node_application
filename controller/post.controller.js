import Post from '../database/models/post.model.js';



export const createPost = async(req, res) => {
    try {
        const { title, content } = req.body
        const userId = req.user.id

        const newPost = await Post.create({
            title,
            content,
            userId
        })
        return res.status(200).json({message: "Post created Sucessfully", newPost})
    } catch (error) {
        console.error('Error making post: ', error)
        return res.status(500).json({message: 'Internal Server error!!'})
    }
}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.findAll()
        return res.status(200).json({message:'Posts fetched successfully', posts})
        
    } catch (error) {
        console.error("error fetching posts:", error)
        return res.status(500).json({message: 'Internal Server error!!'})
    }
}


export const getASinglePost = async (req, res) => { 
    try {
        const postId = req.params.id
        const post = await Post.findByPk(postId)
        if (!post) {
            return res.status(404).json({message: 'Post not found'})
        }
        return res.status(200).json({message: 'Post fetched successfully', post})
    } catch (error) {
        console.error("error fetching post:", error)
        return res.status(500).json({message: 'Internal Server error!!'})
    }
}

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, content } = req.body
        const post = await Post.findByPk(postId)

        if (!post) {
            return res.status(404).json({message: "Post not found"})
        }
        post.title = title ?? post.title
        post.content = content ?? post.content

        await post.save()
        return res.status(200).json({message: "Post updated successfully", post})

    } catch (error) {
        console.error("error updating post:", error)
        return res.status(500).json({message: 'Internal Server error!!'})
    }
}


export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = Post.findByPk(postId)
        if (!postId) {
            return res.status(404).json({ message: 'Post not found' })
        }
        await post.destroy()
        return res.status(200).json({ message: "Post deleted successfully" })
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' })
    }
};