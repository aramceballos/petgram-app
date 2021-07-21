import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, Logo } from './styles';

import logo from '../../assets/logo.png';

const LoadingIndicator = () => {
  return (
    <Container>
      <Logo source={logo} />
      <ActivityIndicator size="large" color="red" />
    </Container>
  );
};

export default LoadingIndicator;
