import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import axios from 'axios';

import { setToken as setTokenAction } from '../actions';

const PostsContainer = styled.View`
  width: ${Dimensions.get('window').width}px;
  flex-direction: row;
  flex-wrap: wrap;
`;

const PostImageWrapper = styled.Pressable`
  height: ${Dimensions.get('window').width / 3}px;
  width: ${Dimensions.get('window').width / 3}px;
`;

const PostImage = styled.Image`
  height: ${Dimensions.get('window').width / 3}px;
  width: ${Dimensions.get('window').width / 3}px;
`;

const Favorites = ({ navigation, token, setToken }) => {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPosts = async () => {
    try {
      const res = await axios('https://api.petgram.club/api/p/f', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(res.data.data);
    } catch (error) {
      if (
        error.response?.data?.message === 'Missing or malformed JWT' ||
        error.response?.data?.message === 'Invalid or expired JWT'
      ) {
        setToken('');
      }
      console.error(error.response?.data?.message);
    }
  };

  const handlePress = (postId: number) => {
    navigation.navigate('Post', { postId });
  };

  return (
    <PostsContainer scrollView>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <PostImageWrapper key={post.id} onPress={() => handlePress(post.id)}>
            <PostImage source={{ uri: post.image_url }} />
          </PostImageWrapper>
        ))}
    </PostsContainer>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = {
  setToken: setTokenAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
