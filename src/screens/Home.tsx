import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ListOfCategories from '../components/ListOfCategories';
import ListOfPhotoCards from '../components/ListOfPhotoCards';

const Container = styled.ScrollView`
  background-color: #fff;
`;

const Home = ({ navigation }) => {
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>();
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [posts, setPosts] = useState<IPost[]>();

  useEffect(() => {
    AsyncStorage.getItem('token').then((token) => {
      getCategories(token as string);
      getPosts(token as string);
    });
  }, []);

  const getCategories = async (token: string) => {
    setLoadingCategories(true);
    try {
      const res = await axios('https://api.petgram.club/api/c', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(res.data.data);
      setLoadingCategories(false);
    } catch (error) {
      setLoadingCategories(false);
      if (
        error.response?.data?.message === 'Missing or malformed JWT' ||
        error.response?.data?.message === 'Invalid or expired JWT'
      ) {
        await AsyncStorage.removeItem('token');
      }
    }
  };

  const getPosts = async (token: string) => {
    setLoadingPosts(true);
    try {
      const res = await axios('https://api.petgram.club/api/p', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data.data);
      setLoadingPosts(false);
    } catch (error) {
      setLoadingPosts(false);
      if (
        error.response?.data?.message === 'Missing or malformed JWT' ||
        error.response?.data?.message === 'Invalid or expired JWT'
      ) {
        await AsyncStorage.removeItem('token');
      }
    }
  };

  const handlePressName = (username: string) => {
    navigation.navigate('User', { username });
  };

  return (
    <Container showsVerticalScrollIndicator={false}>
      <ListOfCategories
        loading={loadingCategories}
        categories={categories as ICategory[]}
      />
      <ListOfPhotoCards
        loading={loadingPosts}
        posts={posts as IPost[]}
        onPressName={handlePressName}
      />
    </Container>
  );
};

export default Home;
