import mongoose from 'mongoose';

/**
 * Article Schema
 */
const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// TODO: Validator plugin for Id ref is not used with bravery

/**
 * Statics
 */
ArticleSchema.statics = {

  /**
   * List articles in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of articles to be skipped.
   * @param {number} limit - Limit number of articles to be returned.
   * @returns {Promise<Article[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Article
 */
const Article = mongoose.models['Article'] || // eslint-disable-line dot-notation
  mongoose.model('Article', ArticleSchema);

export default Article;
