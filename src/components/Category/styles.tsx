/* eslint-disable prettier/prettier */
import styled from 'styled-components/native';

type TContainer = {
  sonClick: () => void;
};

export const Container = styled.Pressable<TContainer>`
  border-radius: 36px;
  /* background: linear-gradient(45deg, orange, #962b96); */
  padding: 2px;
  width: 72px;
  height: 72px;
`;

export const Image = styled.Image`
  background-color: #fff;
  /* border: 2px solid #fff; */
  border-radius: 34px;
  height: auto;
  resize-mode: cover;
  height: 68px;
  width: 68px;
`;
