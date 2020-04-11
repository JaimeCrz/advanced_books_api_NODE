const app = require('../app')
const supertest = require('supertest')
const { factory, expect } = require('../test_helpers')

let server, request, response

before((done) => {
  server = app.listen(done)
  request = supertest.agent(server)
})

after((done) => {
  server.close(done)
})

beforeEach(async () => {
   const author = await factory.create('Author', { 
    id: 10, 
    firstName: 'Jaime',
    lastName: 'Cruz' } );
  await factory.createMany('Book', 2, [
    { id: 100, title: 'Learning NodeJS for dummies', AuthorId: author.id },
    { id: 900, title: 'Learning Angular for noobies', AuthorId: author.id }
  ])
});

afterEach( async () => {
  await factory.cleanUp();
});

describe('GET /api/v1/books', () => {
  beforeEach(async () => {
    response = await request.get('/api/v1/books')
  });

  it('responds with status 200', () => {
    expect(response.status).to.equal(200)
  });

  it('responds with list of books', () => {
    expect(response.body.books)
      .to.be.an("array")
  });
})

describe('GET /api/v1/books/:id', () => {

  it('responds with status 200', async () => {
    response = await request.get('/api/v1/books/100')
    expect(response.status).to.equal(200)
  });

  it('responds a single book', async () => {
    response = await request.get('/api/v1/books/900')
    expect(response.body.book.id).to.equal(900)
  });

  it('returns title for book', async () => {
    response = await request.get('/api/v1/books/900')
    expect(response.body.book.AuthorId).to.equal(10)
  });

  it('returns title for book', async () => {
    response = await request.get('/api/v1/books/900')
    expect(response.body.book.author.firstName).to.equal('Jaime')
  });
});
