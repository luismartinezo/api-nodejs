const supertest = require('supertest');
const comment = require('../routes/comments');

const api = supertest(comment);

test('comment are returned as json',()=>{
    api.get('/list')
    .expect(200)
    .expect('Content-Type', /application\/json/)
});

test('comment are returned as json',()=>{
    api.get('/:id')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})