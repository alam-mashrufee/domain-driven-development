
import React, { useState } from 'react'
import { Post } from '../../../../modules/forum/models/Post';
import { IPostService } from '../services/postService';

export function usePosts (postService: IPostService) {

  const [_recentPosts, _setRecentPosts] = useState<Post[]>([]);
  const [_popularPosts, _setPopularPosts] = useState<Post[]>([]);
  
  const getRecentPosts = async () => {
    const result = await postService.getRecentPosts();
    if (result.isRight()) {
      _setRecentPosts(result.value.getValue())
    } 

    if (result.isLeft()) {
      // TODO: Handle failure
    }
  };

  const getPopularPosts = async () => {
    const result = await postService.getPopularPosts();

    if (result.isRight()) {
      _setPopularPosts(result.value.getValue())  
    } 

    if (result.isLeft()) {
      // TODO: Handle failure
    }
  };
  
  const upvotePost = (str: string) => {};
  const downvotePost = (str: string) => {}

  return {
    operations: { 
      getRecentPosts, 
      getPopularPosts, 
      upvotePost, 
      downvotePost 
    },
    state: { 
      recentPosts: _recentPosts,
      popularPosts: _popularPosts
    }
  }
}

