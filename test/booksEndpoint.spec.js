const app = require('../app')
const supertest = require('supertest')
const expect = require('chai').expect
const jsonResponse = require('./jsonResponse')
const { factory, Models } = require('../test_helpers')

let server, request, response

before((done) => {
  server = app.listen(done)
  request = supertest.agent(server)
})

after((done) => {
  server.close(done)
})

beforeEach(async () => {
  await factory.createMany('Book', 2, [
    { id: 100, title: 'Learning NodeJS for dummies' },
    { id: 900, title: 'Learning Angular for noobies' }
  ])
});

afterEach(() => {
  factory.cleanUp();
});

describe('GET /api/v1/books', () => {
  before(async () => {
    response = await request.get('/api/v1/books')
  });

  it('responds with status 200', () => {
    expect(response.status).to.equal(200)
  });

  it('responds with list of books', () => {
    expect(response.body.books)
      .to.be.an("array")
  });

  it('returns title for book', () => {
    expect(response.body.books[1].title).to.equal('Learning Angular for noobies')
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
    expect(response.body.book.authoer.fullName).to.equal('Jamie Cruz')
  });
});
