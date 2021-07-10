/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useRef } from 'react';
import { Dimensions, Modal, Pressable, Text, Animated } from 'react-native';

import {
  SafeArea,
  Wrapper,
  ModalContainer,
  Container,
  Header,
  BarsContainer,
  Bar,
  InnerBar,
  UserWrapper,
  SecondSection,
  Avatar,
  NameText,
  ImageWrapper,
  Image,
  Controls,
  GoBack,
  Next,
  Close,
} from './styles';

import profile from '../../assets/profile_placeholder.jpeg';
import close_icon from '../../assets/close.png';

type Props = {
  open: boolean;
  loading: boolean;
  story: IPost;
  onClose: () => void;
  onBack: () => void;
  onNext: () => void;
  stories: IPost[];
  currentStoryIndex: number;
};

const Story = ({
  open,
  loading,
  story,
  onClose,
  onBack,
  onNext,
  stories,
  currentStoryIndex,
}: Props) => {
  const progressWidth = useRef(new Animated.Value(0)).current;

  const HORIZONTAL_PADDING = 20;

  useEffect(() => {
    if (open && !loading) {
      Animated.timing(progressWidth, {
        toValue: 100,
        duration: 5000,
        useNativeDriver: false,
      }).start(({ finished }) => {
        if (finished) {
          Animated.timing(progressWidth, {
            toValue: 0,
            duration: 1,
            useNativeDriver: false,
          }).reset();
          onNext();
        }
      });
    }
  });

  const handleClose = () => {
    onClose();
    Animated.timing(progressWidth, {
      toValue: 100,
      duration: 1,
      useNativeDriver: false,
    }).reset();
  };

  const handleGoBack = () => {
    onBack();
    Animated.timing(progressWidth, {
      toValue: 100,
      duration: 1,
      useNativeDriver: false,
    }).reset();
  };

  const handleGoNext = () => {
    onNext();
    Animated.timing(progressWidth, {
      toValue: 100,
      duration: 1,
      useNativeDriver: false,
    }).reset();
  };

  return (
    <>
      <Modal visible={open}>
        <SafeArea />
        <Wrapper>
          <ModalContainer>
            <Container>
              {!loading && story && (
                <>
                  <Header width={Dimensions.get('window').width}>
                    <BarsContainer
                      width={
                        Dimensions.get('window').width -
                        HORIZONTAL_PADDING -
                        stories.length * 3 +
                        'px'
                      }>
                      {stories &&
                        stories.map(({ id }, i) => (
                          <Bar key={id} width={`${100 / stories.length}%`}>
                            {currentStoryIndex > i ? (
                              <InnerBar
                                style={{
                                  width: '100%',
                                }}
                              />
                            ) : currentStoryIndex === i ? (
                              <InnerBar
                                style={{
                                  width: progressWidth.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: ['0%', '100%'],
                                  }),
                                }}
                              />
                            ) : (
                              <InnerBar />
                            )}
                          </Bar>
                        ))}
                    </BarsContainer>
                    <SecondSection>
                      <UserWrapper>
                        <Avatar
                          source={profile}
                          alt={`${story.username}-avatar`}
                        />
                        <NameText>{story.username}</NameText>
                      </UserWrapper>
                      <Pressable onPress={handleClose}>
                        <Close source={close_icon} />
                      </Pressable>
                    </SecondSection>
                  </Header>
                  <ImageWrapper>
                    {loading ? (
                      //   <Loader />
                      <Text>Loading...</Text>
                    ) : (
                      <>
                        <Image
                          width={Dimensions.get('window').width + 'px'}
                          source={{ uri: story.image_url }}
                          resizeMode="contain"
                        />
                        <Controls>
                          <GoBack onPress={handleGoBack} />
                          <Next onPress={handleGoNext} />
                        </Controls>
                      </>
                    )}
                  </ImageWrapper>
                </>
              )}
            </Container>
          </ModalContainer>
        </Wrapper>
      </Modal>
    </>
  );
};

export default Story;
