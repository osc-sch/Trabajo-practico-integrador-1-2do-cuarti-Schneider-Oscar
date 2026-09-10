import { ArticleModel } from "../models/article.model.js"

export const ownerMiddleware = async (req, res, next) => { 
    try {
        if(!req.userData) {
            return res.status(401).json({ message: "usuario no autenticado" })
        }

        const { user_id, rol } = req.userData
        
        if (rol !== 'admin' && rol !== 'user') {
            return res.status(403).json({ message: "usuario no autorizado" })
        }

        const articleId = req.params.id ?? req.body.article_id
        if (!articleId) {
            return res.status(400).json({ message: "identificador de artículo requerido" })
        }

        const existArticle = await ArticleModel.findByPk(articleId)

        if (!existArticle) {
            return res.status(404).json({ message: "artículo no encontrado" })
        }

        if (rol !== 'admin' && existArticle.user_id !== user_id) {
            return res.status(403).json({ message: "usuario no autorizado" })
        }

        next()
    } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor", error })
    }
}