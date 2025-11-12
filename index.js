// routes/index.js
const express = require('express');
const router = express.Router();

// простое "хранилище" для теста
const posts = new Map();

function makeSlug() {
  return Date.now().toString(36);
}

// форма
router.get('/', (req, res) => {
  res.render('home', { error: null });
});

// обработка отправки формы
router.post('/publish', (req, res) => {
  const { title, author, content } = req.body || {};
  if (!title || !content) {
    return res.status(400).render('home', { error: 'Введите заголовок и текст' });
  }
  const slug = makeSlug();
  const createdAt = new Date().toISOString();
  posts.set(slug, { title, author, content, createdAt });
  return res.redirect(`/p/${slug}`);
});

// страница статьи
router.get('/p/:slug', (req, res, next) => {
  const post = posts.get(req.params.slug);
  if (!post) return next(); // 404
  res.render('post', { post });
});

module.exports = router;
