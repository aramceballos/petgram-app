/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Story from '../Story';
import { Container, Image } from './styles';

const DEFAULT_IMAGE = 'https://i.imgur.com/dJa0Hpl.jpg';

const Category = ({ image_url = DEFAULT_IMAGE, id }: ICategory) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [stories, setStories] = useState<IPost[]>([]);

  const handlePress = async () => {
    setModalOpen(true);
    StatusBar.setBarStyle('light-content');

    try {
      const token = await AsyncStorage.getItem('token');
      setLoading(true);
      const res = await axios('https://api.petgram.club/api/p', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const filteredResults = res.data.data.filter(
        (item: IPost) => item.category_id === id,
      );
      setStories(filteredResults);
      setLoading(false);
    } catch (error) {
      if (
        error.response?.data?.message === 'Missing or malformed JWT' ||
        error.response?.data?.message === 'Invalid or expired JWT'
      ) {
        await AsyncStorage.removeItem('token');
      }
    }
    setLoading(false);
  };

  const handleClose = () => {
    setModalOpen(false);
    StatusBar.setBarStyle('dark-content');
  };

  const handleNext = () => {
    if (currentStoryIndex === stories.length - 1) {
      handleClose();
    } else {
      setCurrentStoryIndex(currentStoryIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentStoryIndex === 0) {
      handleClose();
    } else {
      setCurrentStoryIndex(currentStoryIndex - 1);
    }
  };

  return (
    <>
      <Container onPress={handlePress}>
        <Image source={{ uri: image_url }} alt="category image" />
      </Container>
      <Story
        open={modalOpen}
        loading={loading}
        story={stories[currentStoryIndex]}
        onClose={handleClose}
        onNext={handleNext}
        onBack={handleBack}
        stories={stories}
        currentStoryIndex={currentStoryIndex}
      />
    </>
  );
};

export default Category;
