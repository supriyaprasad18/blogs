import { Request, Response } from 'express';
import BlogPost from '../models';

// Create a new blog post
export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const { title, content, category_id } = req.body;
    const blogPost = new BlogPost({ title, content, category_id });
    const savedBlogPost = await blogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Read all blog posts
export const getAllBlogPosts = async (req: Request, res: Response) => {
  try {
    const blogPosts = await BlogPost.find();
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Read latest blog posts
export const getLatestBlogPosts = async (req: Request, res: Response) => {
    try {
      const latestPosts = await BlogPost.aggregate([
        // Group by category and select the latest post in each category
        {
          $group: {
            _id: '$category_id',
            latestPost: { $max: '$created_at' },
          },
        },
        // Join with the BlogPost collection to get the full post details
        {
          $lookup: {
            from: 'blogposts', // The name of the BlogPost collection
            localField: 'latestPost',
            foreignField: 'created_at',
            as: 'postDetails',
          },
        },
      ]);
  
      res.json(latestPosts);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while retrieving latest posts.' });
    }
  
  };

// Read a specific blog post by ID
export const getBlogPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json(blogPost);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a blog post
export const updateBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const { title, content } = req.body;
    const updatedBlogPost = await BlogPost.findByIdAndUpdate(id, { title, content, updatedAt: new Date() }, { new: true });
    if (!updatedBlogPost) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json(updatedBlogPost);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a blog post by ID
export const deleteBlogPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedBlogPost = await BlogPost.findByIdAndRemove(id);
    if (!deletedBlogPost) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json(deletedBlogPost);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};