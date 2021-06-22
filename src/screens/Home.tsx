import React from 'react';
import { View, Text } from 'react-native';

import ListOfCategories from '../components/ListOfCategories';

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

  return (
    <View>
      <ListOfCategories loading={false} categories={categories} />
      <Text>This is the Home</Text>
    </View>
  );
};

export default Home;
