import React, { useEffect, useState } from 'react';
import { Dimensions, Text } from 'react-native';
import Image from 'react-native-scalable-image';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Article,
  Header,
  Avatar,
  NameText,
  HeartButton,
  BottomSection,
  Pressable,
  LikedBy,
  UserLink,
  Description,
  PostDateText,
} from './styles';

import heart from '../../assets/heart.png';
import heart_filled_red from '../../assets/heart_filled_red.png';
import profile from '../../assets/profile_placeholder.jpeg';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60';

const parseDate = (date: string): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const [year, month, day] = date.split(' ')[0].split('-');
  return `${months[parseInt(month, 10) - 1]} ${day}, ${year}`;
};

const PhotoCard = ({
  id,
  image_url = DEFAULT_IMAGE,
  username,
  likes,
  description,
  post_date,
}: IPost) => {
  const [liked, setLiked] = useState(false);
  const [userInfo, setUserInfo] = useState<IUser>();
  const [userId, setUserId] = useState<Number>();

  useEffect(() => {
    AsyncStorage.getItem('userInfo-id').then((user_id) => {
      setUserId(parseInt(user_id as string, 10));
    });
  }, []);

  useEffect(() => {
    if (likes) {
      const like =
        likes[Math.floor(Math.random() * (likes.length - 1 - 0 + 1)) + 0];

      AsyncStorage.getItem('token').then((token) => {
        getUserById(like.user_id, token as string);
      });
    }
  }, [likes]);

  useEffect(() => {
    const like = likes && likes.some((l: ILike) => l.user_id === userId);
    if (like) {
      setLiked(true);
    }
  }, [userId, likes]);

  const getUserById = async (user_id: number, token: string) => {
    try {
      const res = await axios(`https://api.petgram.club/api/u?id=${user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(res.data.data);
    } catch (error) {
      if (
        error.response?.data?.message === 'Missing or malformed JWT' ||
        error.response?.data?.message === 'Invalid or expired JWT'
      ) {
        await AsyncStorage.removeItem('token');
      }
    }
  };

  const handlePress = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      setLiked(!liked);

      if (!liked) {
        await fetch(`https://api.petgram.club/api/p/l?post_id=${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await fetch(`https://api.petgram.club/api/p/ul?post_id=${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {}
  };

  return (
    <Article>
      <Header>
        <Avatar source={profile} />
        <NameText>{username}</NameText>
      </Header>
      <Image
        width={Dimensions.get('window').width}
        source={{ uri: image_url }}
      />
      <BottomSection>
        <Pressable onPress={handlePress}>
          {liked ? (
            <HeartButton source={heart_filled_red} />
          ) : (
            <HeartButton source={heart} />
          )}
        </Pressable>
        {userInfo && (
          <LikedBy>
            <Text>Liked by </Text>
            <UserLink>{userInfo?.username}</UserLink>
            {likes && likes.length > 1 && <Text>and others</Text>}
          </LikedBy>
        )}

        <Description>
          <UserLink>{username}</UserLink>
          <Text>{description}</Text>
        </Description>
        <PostDateText>{parseDate(post_date)}</PostDateText>
      </BottomSection>
    </Article>
  );
};

export default PhotoCard;
