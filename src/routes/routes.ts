import express, { Router } from 'express';
import { BlogController } from '../controllers/blogController';
import { QueriesController } from '../controllers/queriesController';
import upload from '../middleware/multer';
import  {createUser, loginUser}  from '../controllers/usersController';
import {authenticateUser, authorizeAdmin} from '../middleware/AuthUsers';

const router: Router = express.Router();
const blogController = new BlogController();
const queriesController = new QueriesController();

//blogs......
router.get('/blogs',  blogController.getAllBlogs);
router.post('/blogs' , authenticateUser , authorizeAdmin ,upload.single("image"),  blogController.createBlog);
router.get('/blogs/:id', blogController.getBlogById);
router.patch("/blogs/:id", authenticateUser , authorizeAdmin , blogController.updateBlog);
router.delete("/blogs/:id", authenticateUser , authorizeAdmin , blogController.deleteBlog);

// comments .....
router.get('/blogs/:id/comments', blogController.getComments);
router.post('/blogs/:id/comments', authenticateUser , blogController.CreateComment);
router.patch('/blogs/:id/comments/:id', authenticateUser , authorizeAdmin , blogController.editCommentStatus);


// likes...........
router.post('/blogs/:id/like', blogController.likeBlog);
router.get('/blogs/:id/likes', blogController.getLikes);


//Queries.......
router.get('/queries', authenticateUser , authorizeAdmin , queriesController.getAllQueries);
router.post('/queries', queriesController.createQuery);
router.get('/queries/:id', authenticateUser , authorizeAdmin , queriesController.getQueryById);
router.delete('/queries/:id', authenticateUser , authorizeAdmin , queriesController.deleteQuery);


//Users routes......
router.post('/signup', createUser);
router.post('/login', loginUser);

export default router;