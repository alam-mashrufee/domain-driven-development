
import React from 'react';
import { IndexPage } from './index.page';
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../../shared/infra/router/RouterTestUtils';
import { MockUserService } from '../../shared/domain/users/mocks/mockUsersService';
import { MockPostService } from '../../shared/domain/posts/mocks/mockPostsService';

describe('Home page', () => {
  describe('Scenario: Fetching popular posts', () => {
    describe('Given there are 4 posts', () => {
      describe('When the user lands on the index page', () => {
        test('Then they should see all four posts ranked by popularity', async () => {
          const usersService = new MockUserService(null);
          const postsService = new MockPostService(
            [
              {
                slug: '/',
                title: 'ddd',
                createdAt: new Date(),
                postAuthor: '@khalil',
                numComments: 4,
                points: 2,
                type: 'text',
                text: 'hello',
                link: '',
                wasUpvotedByMe: true,
                wasDownvotedByMe: false
              },
              {
                slug: '/',
                title: 'First post',
                createdAt: new Date(),
                postAuthor: '@khalil',
                numComments: 4,
                points: 2,
                type: 'text',
                text: 'hello',
                link: '',
                wasUpvotedByMe: true,
                wasDownvotedByMe: false
              },
              {
                slug: '/',
                title: 'ddd',
                createdAt: new Date(),
                postAuthor: '@khalil',
                numComments: 4,
                points: 2,
                type: 'text',
                text: 'hello',
                link: '',
                wasUpvotedByMe: true,
                wasDownvotedByMe: false
              },
              {
                slug: '/',
                title: 'ddd',
                createdAt: new Date(),
                postAuthor: '@khalil',
                numComments: 4,
                points: 2,
                type: 'text',
                text: 'hello',
                link: '',
                wasUpvotedByMe: true,
                wasDownvotedByMe: false
              }
            ]
          );
          
          // Act
          const result = renderWithRouter(
            <IndexPage 
              userService={usersService} 
              postService={postsService}
            />
          );
  
          await result.findAllByTestId('post-row')
  
          // Assert 
          let elements;        
  
          elements = screen.getAllByTestId('post-row');
          
          expect(elements).toHaveLength(4)
        });
      });
    });
  })

  describe('Scenario: Fetching new posts', () => {
    
  })
  

  

  /**
   * Scenario: Seeing the most popular posts by default
   * 
   * Scenario: Seeing the newest posts 
   * 
   * Scenario: Shows my username when I'm logged in
   * 
   * Scenario: Presents an option to join when I'm not logged in
   * 
   */
  
})