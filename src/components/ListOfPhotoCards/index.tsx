import React from 'react';
import { Text } from 'react-native';

import PhotoCard from '../PhotoCard';

type Props = {
  posts: IPost[];
  loading: boolean;
};

const ListOfPhotoCards = ({ posts, loading }: Props) => {
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        posts && posts.map((post) => <PhotoCard key={post.id} {...post} />)
      )}
    </>
  );
};

export default ListOfPhotoCards;
