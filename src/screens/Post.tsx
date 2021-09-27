import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { connect } from 'react-redux';

import { setToken as setTokenAction } from '../actions';
import PhotoCard from '../components/PhotoCard';

const Container = styled.View`
  background-color: #fff;
  height: ${Dimensions.get('window').height}px;
`;

const Post = ({ navigation, route, token, setToken }) => {
  const [post, setPost] = useState<IPost>();
  const [loading, setLoading] = useState(true);

  const { postId } = route.params;

  useEffect(() => {
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPost = async () => {
    setLoading(true);
    try {
      const res = await axios(
        `https://petgram-api-aram.herokuapp.com/api/post/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setPost(res.data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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

  return (
    <Container>
      {loading ? (
        <>
          <SkeletonPlaceholder speed={1200}>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              alignItems="center"
              marginTop={15}
              marginLeft={15}>
              <SkeletonPlaceholder.Item
                width={45}
                height={45}
                borderRadius={50}
              />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item
                  width={120}
                  height={20}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={1200}>
            <SkeletonPlaceholder.Item width={500} height={300} marginTop={20} />
          </SkeletonPlaceholder>
        </>
      ) : (
        <PhotoCard {...(post as IPost)} onPressName={handlePressName} />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = {
  setToken: setTokenAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
