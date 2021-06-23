import React from 'react';
import styled from 'styled-components/native';

import ListOfCategories from '../components/ListOfCategories';
import ListOfPhotoCards from '../components/ListOfPhotoCards';

const Container = styled.ScrollView`
  background-color: #fff;
`;

const Home = () => {
  const categories = [
    {
      id: 5,
      category: 'test_category',
      image_url: 'https://i.imgur.com/dJa0Hpl.jpg',
    },
    {
      id: 13,
      category: 'another_test',
      image_url:
        'https://res.cloudinary.com/midudev/image/upload/w_150/v1555671700/category_dogs.jpg',
    },
  ];

  const posts = [
    {
      id: 5,
      user_id: 3,
      category_id: 50,
      post_date: '2021-05-25 05:38:27.151523',
      image_url:
        'https://res.cloudinary.com/midudev/image/upload/w_300/q_80/v1560262103/dogs.png',
      description: 'testing description',
      name: 'testing name',
      username: 'testing.username',
      email: 'test@test.com',
      likes: [
        {
          id: 2,
          post_id: 23,
          user_id: 45,
        },
        {
          id: 456,
          post_id: 6854,
          user_id: 4876,
        },
      ],
    },
    {
      id: 4879,
      user_id: 489,
      category_id: 489,
      post_date: '2021-05-25 05:38:27.151523',
      image_url:
        'https://res.cloudinary.com/midudev/image/upload/w_300/q_80/v1560262103/dogs.png',
      description: 'another description',
      name: 'another name',
      username: 'another.username',
      email: 'test@test.com',
      likes: [
        {
          id: 2,
          post_id: 23,
          user_id: 45,
        },
        {
          id: 456,
          post_id: 6854,
          user_id: 4876,
        },
      ],
    },
  ];

  return (
    <Container showsVerticalScrollIndicator={false}>
      <ListOfCategories loading={false} categories={categories} />
      <ListOfPhotoCards loading={false} posts={posts} />
    </Container>
  );
};

export default Home;
