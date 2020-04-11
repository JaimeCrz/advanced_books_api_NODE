const models = require('../models')

const booksController = {
  async index(req, res, next) {
    const booksIndex = await models.Book.findAll()
    res.json({ books: booksIndex })
  },

  async show(req, res, next) {
    const { id } = req.params
    const book = await models.Book.findByPk(id, {
      include: [
        {
          model: models.Author,
          as: 'author'
        }
      ]
    })
    res.json({ book })
  },
}

module.exports = booksController