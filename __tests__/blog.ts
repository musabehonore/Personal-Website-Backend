import { test, it, describe, expect, beforeAll, afterAll, jest } from '@jest/globals';
import superTest, { Request, Response } from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import IUser from '../src/models/User';
import { loginUser } from '../src/controllers/usersController';


beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/myBlogsDatabase');
}, 50000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Testing API", () => {
  it('/api/* for 404', async () => {
    const response = await superTest(app)
    .get('/api/*');
    expect(response.statusCode).toBe(404);
  });
  it('Getting all blogs', async () => {
    const response = await superTest(app)
    .get('/api/blogs');
    expect(response.body.message).toContain('These are the Blogs retrieved!');
  });
  it('Posting a query', async () => {
    const response = await superTest(app)
      .post('/api/queries')
      .send({
        name: 'Musanaaa',
        email: 'abc@gmail.com',
        message: 'Testing queries',
      });
    expect(response.statusCode).toBe(201);
  });
  it('Signing up', async () => {
    const response = await superTest(app)
      .post('/api/signup')
      .send({
        username: 'Musabe10',
        password: 'abcD1',
        email: 'abcdef@gmail.com',
      });
    expect(response.statusCode).toBe(400);
  });

  const token2: { token2: string } = { token2: '' };
  it('Logging in', async () => {
    const response = await superTest(app)
      .post('/api/login')
      .send({
        username: 'Musanaaabb',
        password: 'abcD1',
      });
    token2.token2 = response.body.token;
    expect(response.statusCode).toBe(200);
  });

  const token: { token: string } = { token: '' };
  it('Logging in', async () => {
    const response = await superTest(app)
      .post('/api/login')
      .send({
        username: 'Musabe10',
        password: 'abcD1',
      });
    token.token = response.body.token;
    expect(response.statusCode).toBe(200);
  });

  it('Logging in validation error', async () => {
    const response = await superTest(app)
      .post('/api/login')
      .send({
        username: 'e',
        password: 'bcD1',
      });
    expect(response.statusCode).toBe(400);
  });
  it('Logging in doesnot exist', async () => {
    const response = await superTest(app)
      .post('/api/login')
      .send({
        username: 'Doesnot exist',
        password: 'asdGe3',
      });
    expect(response.statusCode).toBe(401);
  });
  it('Logging in with server error', async () => {
    jest.spyOn(IUser, 'findOne').mockImplementation(() => {
      throw new Error('Server error');
    });

    const response = await superTest(app)
      .post('/api/login')
      .send({
        username: 'Musabe',
        password: 'abcD1',
      });
    expect(response.statusCode).toBe(500);
  });
  it('create a query', async () => {
    const response = await superTest(app)
      .post('/api/queries')
      .send({
        name: 'v',
        email: 'ddssgmail.com',
        message: 'Ok let see',
      });
    expect(response.statusCode).toBe(400);
  });

  it('editing a blog', async () => {
    const res = await superTest(app)
      .patch('/api/blogs/65dddfbcc954392f2eeda438')
      .send({
        content: "Testing 1",
      })
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.body.message).toContain('Blog updated!')
  });
  it('Posting a blog error', async () => {
    const res = await superTest(app)
      .post('/api/blogs')
      .send({
        title: "",
        content: "",
      })
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(400);
  });



  it('Posting a comment', async () => {
    const res = await superTest(app)
      .post('/api/blogs/65dddfbcc954392f2eeda438/comments')
      .send({
        name: "mudanago",
        email: "hhg@gmail.com",
        comment: "like this",
      })
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(201);
  });
  it('error Posting a comment', async () => {
    const res = await superTest(app)
      .post('/api/blogs/65dddfbcc954392f2eeda438/comments')
      .send({

        email: "hhg@gmail.com",
        comment: "like this",
      })
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(400);
  });
  it('editing a comment status', async () => {
    const res = await superTest(app)
      .patch('/api/blogs/65dddfbcc954392f2eeda438/comments/65dde57305bd8939a04b7e11')
      .send({

        status: false,
      })
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(200);
  });
  it('error editing Posting a comment', async () => {
    const res = await superTest(app)
      .patch('/api/blogs/65dddfbcc954392f2eeda438/comments')
      .send({

        status: false,
      })
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(404);
  });
  it('error editing Posting a comment', async () => {
    const res = await superTest(app)
      .patch('/api/blogs/65dddfbcc954392f2eeda438/comments/65dde57305bd8939a04b7e11')
      .send({
        status: "blogs",
      })
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(400);
  });

  it('Liking', async () => {
    const res = await superTest(app)
      .post('/api/blogs/65dddfbcc954392f2eeda438/like')
      .send({
        name: "mudanago",
        email: "hhg@gmail.com",
        comment: "like this",
      })
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(200);
  });
  it('Liking', async () => {
    const res = await superTest(app)
      .get('/api/blogs/65dddfbcc954392f2eeda438/likes')
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(200);
  });

  it('get queries', async () => {
    const res = await superTest(app)
      .get('/api/queries')
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.body.message).toContain('These are the Queries');
  });
  
  it('get a query', async () => {
    const res = await superTest(app)
      .get('/api/queries/65dafad4236b0704a5308e46')
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.body.message).toContain('This is the Query');
  });
  it('unauthorized', async () => {
    const res = await superTest(app)
      .get('/api/queries')
      .set('Authorization', 'Bearer ' + token2.token2);
    expect(res.body.message).toContain('Unauthorized access');
  });
  it('Liking error', async () => {
    const res = await superTest(app)
      .get('/api/blogs/likes')
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(500);
  });
  it('get comments', async () => {
    const res = await superTest(app)
      .get('/api/blogs/65dddfbcc954392f2eeda438/comments')
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(200);
  });
  it('get a blog', async () => {
    const res = await superTest(app)
      .get('/api/blogs/65dddfbcc954392f2eeda438')
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(200);
  });
  it('get a blog error', async () => {
    const res = await superTest(app)
      .get('/api/blogs/655ddfbcc954392f2eeda438')
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(404);
  });
  it('Liking', async () => {
    const res = await superTest(app)
      .post('/api/blogs/659ddfbcc954392f2eeda438/like')
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(404);
  });
  it('Liking', async () => {
    const res = await superTest(app)
      .get('/api/blogs/659ddfbcc954392f2eeda438/likes')
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(404);
  }); 
  it('get a query error', async () => {
    const res = await superTest(app)
      .get('/api/queries/655ddfbcc954392f2eeda438')
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(404);
  });

  it('editing a comment status', async () => {
    const res = await superTest(app)
      .patch('/api/blogs/65dddfbcc954392f2eeda438/comments/658de57305bd8939a04b7e11')
      .send({

        status: false,
      })
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(404);
  });
  it('deleting a blog', async () => {
    const res = await superTest(app)
      .delete('/api/blogs/657ddfbcc954392f2eeda438')
      .set('Authorization', 'Bearer ' + token.token);
    expect(res.statusCode).toBe(200);
  });

  // it('Posting a blog', async () => {
  //   const res = await superTest(app)
  //     .post('/api/blogs')
  //     .send({
  //       title: "Testingg12",
  //       content: "Testing one22245",
  //     })
  //     .set('Authorization', 'Bearer ' + token.token);
  //   expect(res.statusCode).toBe(201);
  // });

  
});
