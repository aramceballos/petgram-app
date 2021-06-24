import React, { useState } from 'react';
import { Dimensions, Text } from 'react-native';
import Image from 'react-native-scalable-image';

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
  image_url = DEFAULT_IMAGE,
  username,
  likes,
  description,
  post_date,
}: IPost) => {
  const [liked] = useState(false);
  const [userInfo] = useState<IUser>();

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
        <Pressable>
          {liked ? (
            <HeartButton source={heart_filled_red} />
          ) : (
            <HeartButton source={heart} />
          )}
        </Pressable>
        {userInfo && (
          <LikedBy>
            <Text>Liked by</Text>
            <UserLink>{userInfo?.username}</UserLink>
            {likes && likes.length > 1 && <Text> and others</Text>}
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
