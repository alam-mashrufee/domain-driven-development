
import React, { useEffect } from 'react';
import { Layout } from '../../shared/layout';
import Header from '../../shared/components/header/components/Header';
import PostFilters from '../../modules/forum/components/posts/filters/components/PostFilters';
import { Post } from '../../modules/forum/models/Post';
import { PostRow } from '../../modules/forum/components/posts/postRow';
import { ProfileButton } from '../../modules/users/components/profileButton';
import { useIndexPage } from './useIndexPage';
import { useUsers } from '../../shared/domain/users/hooks/useUsers';
import { User } from '../../shared/domain/users/models/user';
import { usePosts } from '../../shared/domain/posts/hooks/usePosts';
import { IUsersService } from '../../shared/domain/users/services/userService';
import { IPostService } from '../../shared/domain/posts/services/postService';

interface IndexPageProps {
  userService: IUsersService;
  postService: IPostService;
}

export function IndexPage (pageProps: IndexPageProps) {
  const indexProps = useIndexPage();
  const usersProps = useUsers(pageProps.userService);
  const postsProps = usePosts(pageProps.postService);

  const getFilteredPostsFromActiveFilter = () => {
    if (indexProps.state.activeFilter === 'NEW') {
      return postsProps.state.recentPosts;
    } else {
      return postsProps.state.popularPosts;
    }
  }

  const getPostsBasedOnActiveFilter = () => {
    if (indexProps.state.activeFilter === 'NEW') {
      postsProps.operations.getRecentPosts();
    } else {
      postsProps.operations.getPopularPosts();
    }
  }

  useEffect(() => {
    getPostsBasedOnActiveFilter();
  }, [indexProps.state.activeFilter]);

  return (
    <Layout>
      <div className="header-container flex flex-row flex-center flex-even">
        <Header
          title="Domain-Driven Designers"
          subtitle="Where awesome Domain-Driven Designers are made"
        />
        <ProfileButton
          isLoggedIn={usersProps.operations.isAuthenticated()}
          username={usersProps.operations.isAuthenticated() 
            ? (usersProps.state.user as User).username 
            : ''
          }
          onLogout={() => usersProps.operations.logout()}
        />
      </div>
      <br/>
      <br/>

      <PostFilters
        activeFilter={indexProps.state.activeFilter}
        onClick={(filter) => indexProps.operations.setActiveFilter(filter)}
      />

      {getFilteredPostsFromActiveFilter().map((post: Post, i: number) => (
        <PostRow
          key={i}
          onUpvoteClicked={() => postsProps.operations.upvotePost(post.slug)}
          onDownvoteClicked={() => postsProps.operations.downvotePost(post.slug)}
          isLoggedIn={usersProps.operations.isAuthenticated()}
          {...post}
        />
      ))}

    </Layout>
  )
}

