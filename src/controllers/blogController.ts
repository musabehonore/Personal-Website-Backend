import { Request, Response } from 'express';
import Blog from '../models/Blog';
import { Error } from "mongoose";
import Comments from '../models/comments';
import CustomResponse from '../utilities/response';
import { blogVal } from '../validations/blogValidation';
import { commentVal } from '../validations/commentValidation';
import cloudinary from '../middleware/cloudinary';


interface IReqComment extends Request {
  params: {
    id: string;
  };
}

interface IReqBodyComment extends Request {
  body: {
    name: string;
    email: string;
    comment: string;
  };
  params: {
    id: string;
  };
}

class BlogController {
  public async getAllBlogs(req: Request, res: Response) {
    try {
      const blogs = await Blog.find();
      res.send({ blogs, message: 'These are the Blogs retrieved!' });
    } catch (error: any) {
      res.status(500).send({ message: (error as Error).message });
    }
  }

  public async getBlogById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);
      const comments = await Comments.find({ blogId: id });
      const finalBlog = {
        blog,
        comments,
      };
      if (!blog) {
        return res.status(404).send({ message: 'Blog not found' });
      }
      res.send({ finalBlog, message: 'This is the Blog!' });
    } catch (error: any) {
      res.status(500).send({ message: (error as Error).message });
    }
  }

  public async createBlog(req: Request, res: Response) {
    try {
      let image = null;

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        image = result ? result.secure_url : null;
      }

      const { title, content } = req.body;
      const { error } = blogVal.validate(req.body);
      if (error) {
        return res.status(400).send({ error: error.details[0].message });
      }

      const blog = new Blog({
        title,
        content,
        image,
        date: new Date(),
      });

      const savedBlog = await blog.save();
      res.status(201).send({ savedBlog, message: 'Blog created successfully!!' });

    } catch (error) {
      res.status(500).send({ message: (error as Error).message });
    }
  }

  public async updateBlog(req: Request, res: Response) {
    try {
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.send({ updatedBlog, message: 'Blog updated!' });
    } catch (err: any) {
      return res.status(500).send({ message: (err as Error).message });
    }
  }

  public async deleteBlog(req: Request, res: Response) {
    try {
      await Blog.findByIdAndDelete(req.params.id);
      res.send({ message: "Blog deleted" });
    } catch (err: any) {
      return res.status(500).send({ message: (err as Error).message });
    }
  }

  // comments functions

  public async CreateComment(req: IReqBodyComment, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const { name, email, comment } = req.body;
      const { id: blogId } = req.params;
      // comments validations......
      const { error } = commentVal.validate(req.body);
      if (error) {
        return res.status(400).send({ error: error.details[0].message });
      }

      const newComment = new Comments({
        name,
        email,
        comment,
        blogId,
        date: new Date(),
      });
      const savedComment = await newComment.save();
      response.send<typeof savedComment>(
        savedComment,
        'Created a Comment !!',
        201,
      );
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }
  public async getComments(req: Request, res: Response) {
    const response = new CustomResponse(req, res);
    try {
      const { id: blogId } = req.params;
      const comments = await Comments.find({ blogId, status: true });

      response.send<typeof comments>(
        comments,
        'Here are the retrieved Comments',
        200,
      );
    } catch (error) {
      const errorMessage = error as string;
      response.send(null, errorMessage as string, 500);
    }
  }
  public async editCommentStatus(req: Request, res: Response) {
    try {
      const { id: commentId } = req.params;
      const { status } = req.body;

      if (typeof status !== 'boolean') {
        return res.status(400).json({ error: 'Invalid status value. Status must be a boolean.' });
      }

      const updatedComment = await Comments.findByIdAndUpdate(commentId, { status }, { new: true });

      if (!updatedComment) {
        return res.status(404).json({ error: 'Comment not found.' });
      }

      res.status(200).json({ updatedComment, message: 'Comment status updated successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

    // likes........

  public async likeBlog(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).send({ message: 'Blog not found' });
      }
      blog.likes++; // here i Incremented likes..
      await blog.save();
      res.status(200).send({ likes: blog.likes, message: 'You liked!!' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }

  public async getLikes(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).send({ message: 'Blog not found' });
      }
      const likes = blog.likes;
      res.status(200).send({ likes, message: 'These are the likes!' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  }


}

export { BlogController };
