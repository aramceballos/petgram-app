import React, { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import axios from 'axios';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import { setToken as setTokenAction } from '../actions';
import ListOfCategories from '../components/ListOfCategories';
import ListOfPhotoCards from '../components/ListOfPhotoCards';

const Container = styled.ScrollView`
  background-color: #fff;
`;

const Home = ({ navigation, token, setToken }) => {
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [categories, setCategories] = useState<ICategory[]>();
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [posts, setPosts] = useState<IPost[]>();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getCategories();
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await axios(
        'https://petgram-api-aram.herokuapp.com/api/categories',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCategories(res.data.data);
      setLoadingCategories(false);
    } catch (error) {
      setLoadingCategories(false);
      if (
        error.response?.data?.message === 'Missing or malformed JWT' ||
        error.response?.data?.message === 'Invalid or expired JWT'
      ) {
        setToken('');
      }
    }
  };

  const getPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await axios(
        'https://petgram-api-aram.herokuapp.com/api/posts',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPosts(res.data.data);
      setLoadingPosts(false);
    } catch (error) {
      setLoadingPosts(false);
      if (
        error.response?.data?.message === 'Missing or malformed JWT' ||
        error.response?.data?.message === 'Invalid or expired JWT'
      ) {
        setToken('');
      }
    }
  };

  const handlePressName = (username: string) => {
    navigation.navigate('User', { username });
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await Promise.all([getCategories(), getPosts()]).finally(() => {
      setRefreshing(false);
    });
  };

  return (
    <Container
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }>
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

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = {
  setToken: setTokenAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
