import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import PhotoCard from '../PhotoCard';

type Props = {
  posts: IPost[];
  loading: boolean;
  /**
   * Executed when the name of the user is pressed
   * @param {string} username of the user to be searched
   */
  onPressName: (username: string) => void;
};

const ListOfPhotoCards = ({ posts, loading, onPressName }: Props) => {
  return (
    <>
      {loading ? (
        <>
          <SkeletonPlaceholder speed={1200}>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              alignItems="center"
              marginTop={15}
              marginLeft={15}>
              <SkeletonPlaceholder.Item
                width={45}
                height={45}
                borderRadius={50}
              />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item
                  width={120}
                  height={20}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={1200}>
            <SkeletonPlaceholder.Item width={500} height={300} marginTop={20} />
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={1200}>
            <SkeletonPlaceholder.Item
              flexDirection="row"
              alignItems="center"
              marginTop={15}
              marginLeft={15}>
              <SkeletonPlaceholder.Item
                width={45}
                height={45}
                borderRadius={50}
              />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item
                  width={120}
                  height={20}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
          <SkeletonPlaceholder speed={1200}>
            <SkeletonPlaceholder.Item width={500} height={300} marginTop={20} />
          </SkeletonPlaceholder>
        </>
      ) : (
        posts &&
        posts.map((post) => (
          <PhotoCard key={post.id} {...post} onPressName={onPressName} />
        ))
      )}
    </>
  );
};

export default ListOfPhotoCards;
