/* eslint-disable prettier/prettier */
import React from 'react';
import { Container, Image } from './styles';

const DEFAULT_IMAGE = 'https://i.imgur.com/dJa0Hpl.jpg';

const Category = ({ image_url = DEFAULT_IMAGE }: ICategory) => {
  return (
    <Container>
      <Image source={{ uri: image_url }} alt="category image" />
    </Container>
  );
};

export default Category;
