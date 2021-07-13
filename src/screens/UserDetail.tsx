import React, { useState, useEffect } from 'react';
import { Dimensions, ScrollView } from 'react-native';
import { View } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  width: 77;
  height: 77;
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

const UserDetail = ({ route, navigation }) => {
  const [userInfo, setUserInfo] = useState<IUser>();
  const [userPosts, setUserPosts] = useState<IPost[]>();

  const { username } = route.params;

  useEffect(() => {
    if (username) {
      AsyncStorage.getItem('token').then((token) => {
        getUserByUsername(token as string).then((user) => {
          getPosts(user.id, token as string);
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const getUserByUsername = async (token: string): Promise<IUser> => {
    try {
      const res = await axios(
        `https://api.petgram.club/api/u?username=${username}`,
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
        await AsyncStorage.removeItem('token');
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

  const getPosts = async (userId: number, token: string) => {
    try {
      const res = await axios(
        `https://api.petgram.club/api/p?user_id=${userId}`,
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
        await AsyncStorage.removeItem('token');
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

export default UserDetail;
