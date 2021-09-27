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

const Button = styled.Pressable`
  border-radius: 3px;
  height: 32px;
  width: 90%;
  border: 1px solid #c7c7c7;
  margin: 20px auto 0;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #ff0000;
  text-align: center;
`;

const User = ({ navigation, token, setToken, userInfo }) => {
  const [userPosts, setUserPosts] = useState<IPost[]>();

  useEffect(() => {
    getPosts(userInfo.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Requests posts of the user
   * @param {string} userId of the user's posts
   */
  const getPosts = async (userId: string) => {
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

  const handleLogout = async () => {
    setToken('');
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
        <Button onPress={handleLogout}>
          <ButtonText>Log out</ButtonText>
        </Button>
      </ScrollView>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
  userInfo: state.userInfo,
});

const mapDispatchToProps = {
  setToken: setTokenAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
