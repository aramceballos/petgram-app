import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Article = styled.View`
  min-height: 200px;
  margin-bottom: 15px;
  border-radius: 3px;
`;

export const Header = styled.Pressable`
  padding: 12px;
  flex-direction: row;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const NameText = styled.Text`
  margin-left: 8px;
  font-weight: 500;
`;

export const HeartButton = styled.Image`
  width: 24px;
  height: 24px;
`;

export const HeartContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Heart = styled(Animated.Image)`
  opacity: 0;
  width: 100px;
  height: 100px;
`;

export const BottomSection = styled.View`
  padding: 0 16px;
`;

export const ButtonContainer = styled.Pressable`
  display: flex;
  padding: 8px 0;
`;

export const LikedBy = styled.View`
  font-size: 14px;
  margin-bottom: 8px;
  flex-direction: row;
`;

export const Description = styled.View`
  font-size: 14px;
  margin-bottom: 8px;
  flex-direction: row;
`;

export const UserLink = styled.Text`
  font-weight: 600;
  margin-right: 5px;
`;

export const PostDateText = styled.Text`
  color: #8e8e8e;
  font-size: 10px;
`;
