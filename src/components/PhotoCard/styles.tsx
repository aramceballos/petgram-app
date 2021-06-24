import styled from 'styled-components/native';

// const fadeInKeyframes = keyframes`
// from {
//   filter: blur(5px);
//   opacity: 0;
// };
// to {
//   filter: blur(0);
//   opacity: 1;
// }
// `;

// const appearListKeyframes = keyframes`
//   from {
//     top: -150px
//   };
//   to {
//     top: -20px
//   }
// `;

// const bounceKeyFrames = keyframes`
//   0% {
//     transform: scale(0.2);
//     opacity: 0
//   }
//   20%{
//     transform: scale(1.1);
//     opacity: 1
//   }
//   30%{
//     transform: scale(1);
//     opacity: 1
//   }
//   40%{
//     transform: scale(1.05);
//     opacity: 1
//   }
//   50%{
//     transform: scale(1);
//     opacity: 1
//   }
//   75%{
//     transform: scale(1);
//     opacity: 1
//   }
//   100%{
//     transform: scale(0);
//     opacity: 0
//   }
// `;

// export const fadeIn = ({ time = '1s', type = 'ease' } = {}) =>
//   css`
//     animation: ${time} ${fadeInKeyframes} ${type};
//   `;

// export const appearList = ({ time = '1s', type = 'ease' } = {}) =>
//   css`
//     animation: ${time} ${appearListKeyframes} ${type};
//   `;

// export const bounce = ({
//   time = '1.2s',
//   type = 'cubic-bezier(0.03, 0.48, 0.76, 1.56)',
// } = {}) => css`
//   animation: ${time} ${bounceKeyFrames} ${type};
// `;

export const Article = styled.View`
  min-height: 200px;
  margin-bottom: 15px;
  border-radius: 3px;
`;

export const Header = styled.View`
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

export const BottomSection = styled.View`
  padding: 0 16px;
`;

export const Pressable = styled.Pressable`
  display: flex;
  padding: 8px 0;
`;

export const HeartButton = styled.Image`
  width: 24px;
  height: 24px;
`;

export const LikedBy = styled.View`
  font-size: 14px;
  margin-bottom: 8px;
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
