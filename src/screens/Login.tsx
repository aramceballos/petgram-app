import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';
import { connect } from 'react-redux';

import {
  setToken as setTokenAction,
  setUserInfo as setUserInfoAction,
} from '../actions';

const Container = styled.SafeAreaView`
  background-color: #fff;
  height: 100%;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 500;
  padding: 6px 15px;
`;

const FormContainer = styled.View`
  padding: 14px 15px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-bottom: 8px;
  padding: 8px 4px;
  width: 100%;
  color: #000;
`;

const Button = styled.TouchableHighlight`
  background: #8d00ff;
  border-radius: 3px;
  height: 32px;
  align-items: center;
  justify-content: center;
`;

const TextButton = styled.Text`
  color: #fff;
`;

const Text = styled.Text`
  text-align: center;
  font-size: 14px;
  margin-top: 30px;
`;

const StyledLink = styled.Text`
  color: #0095f6;
  font-weight: 600;
`;

const ErrorMessageContainer = styled.View`
  width: 100%;
  align-items: center;
`;

const ErrorMessageWrapper = styled.View`
  background-color: #fdecea;
  width: 90%;
  border-radius: 3px;
  justify-content: center;
  align-items: center;
  height: 45px;
`;

const ErrorMessage = styled.Text``;

const Login = ({ setToken, setUserInfo }) => {
  const [loading, setLoading] = useState(false);
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: 'https://petgram-api-aram.herokuapp.com/api/login',
        data: {
          identity,
          password,
        },
      });

      if (response.data.status === 'success') {
        setUserInfo({
          id: response.data.data.id,
          name: response.data.data.name,
          username: response.data.data.username,
        });
        setToken(response.data.data.token);
      } else {
        setErrorMessage('Incorrect username or password');
      }
      setLoading(false);
    } catch (error) {
      setErrorMessage('Error on login');
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Log in</Title>
      <FormContainer>
        <Input
          keyboardType="email-address"
          placeholder="Type email or username"
          placeholderTextColor="#aaa"
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize="none"
          autoCompleteType="off"
          onChangeText={(text: string) => {
            setIdentity(text);
          }}
        />
        <Input
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={(text: string) => {
            setPassword(text);
          }}
        />
        <Button underlayColor="#7800da" onPress={handleSubmit}>
          {loading ? <ActivityIndicator /> : <TextButton>Log In</TextButton>}
        </Button>
        <Text>
          Don't have an account yet? <StyledLink>Sign up</StyledLink>
        </Text>
      </FormContainer>
      {errorMessage !== '' && (
        <ErrorMessageContainer>
          <ErrorMessageWrapper>
            <ErrorMessage>{errorMessage}</ErrorMessage>
          </ErrorMessageWrapper>
        </ErrorMessageContainer>
      )}
    </Container>
  );
};

const mapDispatchToProps = {
  setToken: setTokenAction,
  setUserInfo: setUserInfoAction,
};

export default connect(null, mapDispatchToProps)(Login);
