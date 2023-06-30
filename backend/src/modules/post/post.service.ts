import { CreatePostDto } from 'src/dto/post.dto';
import IComment from 'src/interfaces/IComment';

import IPost from 'src/interfaces/IPost';
import IToken from 'src/interfaces/IToken';

import PostsType from 'src/types/posts.type';

export interface PostService {
  createPost(
    { description }: CreatePostDto,
    filename: string,
    tokenData: IToken,
  );

  getPostById(post: IPost);

  deletePost(post: IPost);

  getPosts({ username }: IToken, postsType?: PostsType);

  getPostLikedBy(id: string, { username }: IToken);

  likePost(post: IPost, { username }: IToken);

  likeComment(comment: IComment, { username }: IToken);

  commentPost(post: IPost, content: string, { username }: IToken);

  savePost(post: IPost, tokenData: IToken);
}

export const PostService = Symbol('PostService');
