/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Dimensions, Text, Pressable, Animated } from 'react-native';
import Image from 'react-native-scalable-image';
import axios from 'axios';
import { connect } from 'react-redux';

import {
  Article,
  Header,
  Avatar,
  NameText,
  HeartButton,
  HeartContainer,
  Heart,
  BottomSection,
  ButtonContainer,
  LikedBy,
  UserLink,
  Description,
  PostDateText,
} from './styles';

import { setToken as setTokenAction } from '../../actions';
import heart from '../../assets/heart.png';
import heart_filled_red from '../../assets/heart_filled_red.png';
import heart_white from '../../assets/heart_white.png';
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

type Props = {
  /**
   * Executed when the name of the user is pressed
   * @param {string} username of the user to be searched
   */
  onPressName?: (username: string) => void;
  token: string;
  setToken: (token: string) => void;
  userInfo: any;
};

const PhotoCard = ({
  id,
  image_url = DEFAULT_IMAGE,
  username,
  likes,
  description,
  post_date,
  onPressName,
  token,
  setToken,
  userInfo,
}: IPost & Props) => {
  const [liked, setLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);
  const [randomUserInfo, setRandomUserInfo] = useState<IUser>();
  const [lastClick, setLastClick] = useState(0);
  const [opacity] = useState(new Animated.Value(0));
  const [scale] = useState(new Animated.Value(0.2));

  useEffect(() => {
    if (likes) {
      const like =
        likes[Math.floor(Math.random() * (likes.length - 1 - 0 + 1)) + 0];

      getUserById(like.user_id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  useEffect(() => {
    const like =
      likes &&
      likes.some((l: ILike) => l.user_id === parseInt(userInfo.id, 10));
    if (like) {
      setLiked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  useEffect(() => {
    if (showHeart) {
      setTimeout(() => {
        setShowHeart(false);
      }, 1200);
    }
  }, [showHeart]);

  //FadeIn heart animation
  useEffect(() => {
    if (showHeart) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setTimeout(() => {
            Animated.timing(opacity, {
              toValue: 0,
              duration: 250,
              useNativeDriver: true,
            }).start();
          }, 550);
        }
      });
    }
  });

  //Bounce heart animation
  useEffect(() => {
    if (showHeart) {
      Animated.timing(scale, {
        toValue: 1.1,
        duration: 200,
        useNativeDriver: true,
      }).start(({ finished: finished1 }) => {
        if (finished1) {
          Animated.timing(scale, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
          }).start(({ finished: finished2 }) => {
            if (finished2) {
              Animated.timing(scale, {
                toValue: 1.05,
                duration: 100,
                useNativeDriver: true,
              }).start(({ finished: finished3 }) => {
                if (finished3) {
                  Animated.timing(scale, {
                    toValue: 1,
                    duration: 100,
                    useNativeDriver: true,
                  }).start(({ finished: finished4 }) => {
                    if (finished4) {
                      Animated.timing(scale, {
                        toValue: 1,
                        duration: 250,
                        useNativeDriver: true,
                      }).start(({ finished: finished5 }) => {
                        if (finished5) {
                          Animated.timing(scale, {
                            toValue: 0,
                            duration: 100,
                            useNativeDriver: true,
                          }).start();
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });

  const getUserById = async (user_id: number) => {
    try {
      const res = await axios(
        `https://petgram-api-aram.herokuapp.com/api/user?id=${user_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setRandomUserInfo(res.data.data);
    } catch (error) {
      if (
        error.response?.data?.message === 'Missing or malformed JWT' ||
        error.response?.data?.message === 'Invalid or expired JWT'
      ) {
        setToken('');
      }
    }
  };

  const handlePress = async () => {
    try {
      setLiked(!liked);

      if (!liked) {
        await fetch(
          `https://petgram-api-aram.herokuapp.com/api/like?post_id=${id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
      } else {
        await fetch(
          `https://petgram-api-aram.herokuapp.com/api/unlike?post_id=${id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
    } catch (error) {}
  };

  const likePost = async () => {
    try {
      if (!liked) {
        setLiked(true);
        await fetch(
          `https://petgram-api-aram.herokuapp.com/api/like?post_id=${id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        ).then((res) => res.json());
      }
    } catch (error) {}
  };

  const handlePressName = () => {
    onPressName && onPressName(username);
  };

  return (
    <Article>
      <Header onPress={handlePressName}>
        <Avatar source={profile} />
        <NameText>{username}</NameText>
      </Header>
      <Pressable
        onPress={() => {
          setLastClick(Date.now());
          if (Date.now() - lastClick < 400) {
            setShowHeart(true);
            likePost();
          }
        }}>
        <Image
          width={Dimensions.get('window').width}
          source={{ uri: image_url }}
        />
        <HeartContainer>
          <Heart
            source={heart_white}
            style={{ opacity, transform: [{ scale }] }}
          />
        </HeartContainer>
      </Pressable>
      <BottomSection>
        <ButtonContainer onPress={handlePress}>
          {liked ? (
            <HeartButton source={heart_filled_red} />
          ) : (
            <HeartButton source={heart} />
          )}
        </ButtonContainer>
        {randomUserInfo && (
          <LikedBy>
            <Text>Liked by </Text>
            <Pressable
              onPress={() =>
                onPressName && onPressName(randomUserInfo?.username)
              }
              style={{ height: 14 }}>
              <UserLink>{randomUserInfo?.username}</UserLink>
            </Pressable>
            {likes && likes.length > 1 && <Text>and others</Text>}
          </LikedBy>
        )}

        <Description>
          <Pressable onPress={handlePressName} style={{ height: 14 }}>
            <UserLink>{username}</UserLink>
          </Pressable>{' '}
          {description}
        </Description>
        <PostDateText>{parseDate(post_date)}</PostDateText>
      </BottomSection>
    </Article>
  );
};

const mapStateToProps = (state) => ({
  token: state.token,
  userInfo: state.userInfo,
});

const mapDispatchToProps = {
  setToken: setTokenAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoCard);
