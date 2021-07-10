import { Animated } from 'react-native';
import styled from 'styled-components/native';

type TBar = {
  width: string;
};

type TBarsContainer = {
  width: string;
};

type TInnerBar = {
  width: string;
};

type TImage = {
  width: string;
  height: string;
};

export const SafeArea = styled.SafeAreaView`
  background-color: #000;
`;

export const Wrapper = styled.View`
  background-color: #000;
  height: 100%;
`;

export const ModalContainer = styled.View`
  width: 100%;
  height: 83%;
  top: 0;
  background-color: #464646;
  flex-direction: row;
  border-radius: 8px;
`;

export const Container = styled.View`
  padding: 0;
`;

export const Header = styled.View`
  padding: 15px 10px;
  position: absolute;
`;

export const BarsContainer = styled.View<TBarsContainer>`
  display: flex;
  height: 2px;
  margin: -7px 0 7px;
  flex-direction: row;
  width: ${({ width }) => width};
`;

export const Bar = styled.View<TBar>`
  background-color: #a0a0a0bf;
  height: 2px;
  width: ${({ width }) => width};
  margin: 0 1.5px;
  border-radius: 2px;
`;

export const InnerBar = styled(Animated.View)<TInnerBar>`
  background-color: #fff;
  height: 2px;
  border-radius: 2px;
  width: 0;
`;

export const UserWrapper = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

export const SecondSection = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const NameText = styled.Text`
  text-decoration: none;
  margin-left: 7px;
  color: #fff;
`;

export const ImageWrapper = styled.View`
  position: absolute;
  top: 0;
  z-index: -1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Image = styled.Image<TImage>`
  width: ${({ width }) => width};
  height: 1000px;
`;

export const Controls = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  position: absolute;
  flex-direction: row;
`;

export const GoBack = styled.Pressable`
  width: 25%;
  height: 100%;
`;

export const Next = styled.Pressable`
  width: 75%;
  height: 100%;
`;

export const Close = styled.Image`
  width: 24px;
  height: 24px;
`;
