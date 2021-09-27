import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { View } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { connect } from 'react-redux';

import { setToken as setTokenAction } from '../actions';
import profile_icon from '../assets/profile_placeholder.jpeg';

const Container = styled.View`
  background-color: #fff;
  height: 100%;
`;

const InnerTopContainer = styled.View`
  margin: 16px;
  flex-direction: row;
`;

const ImageContainer = styled.View`
  margin-right: 20px;
`;

const ProfileImage = styled.Image`
  width: 77px;
  height: 77px;
`;

const Username = styled.Text`
  font-size: 20px;
  font-weight: 300;
  line-height: 32px;
`;

const Name = styled.Text`
  font-size: 15px;
  line-height: 32px;
  margin: -5px 16px 6px;
  font-weight: bold;
`;

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

const UserDetail = ({ route, navigation, token, setToken }) => {
  const [userInfo, setUserInfo] = useState<IUser>();
  const [userPosts, setUserPosts] = useState<IPost[]>();

  const { username } = route.params;

  useEffect(() => {
    if (username) {
      getUserByUsername().then((user) => {
        getPosts(user.id);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const getUserByUsername = async (): Promise<IUser> => {
    try {
      const res = await axios(
        `https://petgram-api-aram.herokuapp.com/api/user?username=${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUserInfo(res.data.data);
      return res.data.data;
    } catch (error) {
      if (
        error.response?.data?.message === 'Missing or malformed JWT' ||
        error.response?.data?.message === 'Invalid or expired JWT'
      ) {
        setToken('');
      }
      console.error(error.response?.data?.message);
      return {
        id: 0,
        email: '',
        name: '',
        username: '',
      };
    }
  };

  const getPosts = async (userId: number) => {
    try {
      const res = await axios(
        `https://petgram-api-aram.herokuapp.com/api/posts?user_id=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUserPosts(res.data.data);
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
    <Container>
      <ScrollView>
        <InnerTopContainer>
          <ImageContainer>
            <ProfileImage source={profile_icon} />
          </ImageContainer>
          <Username>{userInfo?.username}</Username>
        </InnerTopContainer>
        <View>
          <Name>{userInfo?.name}</Name>
        </View>
        <PostsContainer scrollView>
          {userPosts &&
            userPosts.length > 0 &&
            userPosts.map((post) => (
              <PostImageWrapper
                key={post.id}
                onPress={() => handlePress(post.id)}>
                <PostImage source={{ uri: post.image_url }} />
              </PostImageWrapper>
            ))}
        </PostsContainer>
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
});

const mapDispatchToProps = {
  setToken: setTokenAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
