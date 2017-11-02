import Article from '../models/article.model';

function createArticle(req, res, next) {
  const article = new Article(req.body);

  article.save()
    .then(articleObj => res.json({ _id: articleObj._id }))
    .catch(e => next(e));
}

function getArticles(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Article.list({ limit, skip })
    .then(articles => res.json(articles))
    .catch(e => next(e));
}

export { createArticle, getArticles };
