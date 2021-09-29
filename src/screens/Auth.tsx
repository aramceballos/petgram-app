/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
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

type LoginProps = {
  setIdentity: (text: string) => void;
  setPassword: (text: string) => void;
  handleSubmit: () => void;
  loading: boolean;
  setIsLogin: (text: boolean) => void;
};

type SignupProps = {
  setEmail: (text: string) => void;
  setName: (text: string) => void;
  setUsername: (text: string) => void;
  setPasswordSignup: (text: string) => void;
  handleSubmit: () => void;
  loading: boolean;
  setIsLogin: (text: boolean) => void;
};

const Login = ({
  setIdentity,
  setPassword,
  handleSubmit,
  loading,
  setIsLogin,
}: LoginProps) => {
  return (
    <>
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
          Don't have an account yet?{' '}
          <TouchableOpacity
            style={{ marginTop: -3 }}
            onPress={() => setIsLogin(false)}>
            <StyledLink>Sign up</StyledLink>
          </TouchableOpacity>
        </Text>
      </FormContainer>
    </>
  );
};

const Signup = ({
  setEmail,
  setName,
  setUsername,
  setPasswordSignup,
  handleSubmit,
  loading,
  setIsLogin,
}: SignupProps) => {
  return (
    <>
      <Title>Sign up</Title>
      <FormContainer>
        <Input
          keyboardType="email-address"
          placeholder="Email"
          placeholderTextColor="#aaa"
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize="none"
          autoCompleteType="off"
          onChangeText={(text: string) => {
            setEmail(text);
          }}
        />
        <Input
          placeholder="Full Name"
          placeholderTextColor="#aaa"
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize="none"
          autoCompleteType="off"
          onChangeText={(text: string) => {
            setName(text);
          }}
        />
        <Input
          placeholder="Username"
          placeholderTextColor="#aaa"
          spellCheck={false}
          autoCorrect={false}
          autoCapitalize="none"
          autoCompleteType="off"
          onChangeText={(text: string) => {
            setUsername(text);
          }}
        />
        <Input
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={(text: string) => {
            setPasswordSignup(text);
          }}
        />
        <Button underlayColor="#7800da" onPress={handleSubmit}>
          {loading ? <ActivityIndicator /> : <TextButton>Sign up</TextButton>}
        </Button>
        <Text>
          Already have an account?{' '}
          <TouchableOpacity
            style={{ marginTop: -3 }}
            onPress={() => setIsLogin(true)}>
            <StyledLink>Log in</StyledLink>
          </TouchableOpacity>
        </Text>
      </FormContainer>
    </>
  );
};

const Auth = ({ setToken, setUserInfo }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmitLogin = async () => {
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

  const handleSubmitSignup = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: 'https://petgram-api-aram.herokuapp.com/api/signup',
        data: {
          email,
          name,
          username,
          password: passwordSignup,
        },
      });

      if (response.data.status === 'success') {
        const responseLogin = await axios({
          method: 'post',
          url: 'https://petgram-api-aram.herokuapp.com/api/login',
          data: {
            identity: email,
            password: passwordSignup,
          },
        });

        if (responseLogin.data.status === 'success') {
          setUserInfo({
            id: responseLogin.data.data.id,
            name: responseLogin.data.data.name,
            username: responseLogin.data.data.username,
          });
          setToken(responseLogin.data.data.token);
        }
      } else {
        setErrorMessage('Error on sign up');
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage('Error on sign up');
      setLoading(false);
    }
  };

  return (
    <Container>
      {isLogin ? (
        <Login
          setIdentity={setIdentity}
          setPassword={setPassword}
          handleSubmit={handleSubmitLogin}
          loading={loading}
          setIsLogin={setIsLogin}
        />
      ) : (
        <Signup
          setEmail={setEmail}
          setName={setName}
          setUsername={setUsername}
          setPasswordSignup={setPasswordSignup}
          handleSubmit={handleSubmitSignup}
          loading={loading}
          setIsLogin={setIsLogin}
        />
      )}
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

export default connect(null, mapDispatchToProps)(Auth);
