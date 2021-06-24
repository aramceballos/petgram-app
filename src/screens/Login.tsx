import React, { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.petgram.club/api/login',
        data: {
          identity,
          password,
        },
      });

      if (response.data.status === 'success') {
        await AsyncStorage.setItem('token', response.data.data.token);
        await AsyncStorage.setItem('userInfo-id', response.data.data.id + '');
        await AsyncStorage.setItem('userInfo-name', response.data.data.name);
        await AsyncStorage.setItem(
          'userInfo-username',
          response.data.data.username,
        );
      }
      setLoading(false);
    } catch (error) {
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
            console.log(text);
            setIdentity(text);
          }}
        />
        <Input
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={(text: string) => {
            console.log(text);
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
    </Container>
  );
};

export default Login;
