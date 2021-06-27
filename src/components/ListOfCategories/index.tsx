import React from 'react';
import { Text } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import Category from '../Category';
import { FlatList, Item } from './styles';

type Props = {
  categories: ICategory[];
  loading?: boolean;
};

const ListOfCategories = ({ categories, loading }: Props) => {
  const keyExtractor = (category: ICategory) => category.id.toString();
  const renderEmpty = () =>
    !loading && (categories === undefined || categories.length === 0) ? (
      <Text>There are not categories</Text>
    ) : null;

  return (
    <>
      {loading ? (
        <SkeletonPlaceholder speed={1200}>
          <SkeletonPlaceholder.Item
            flexDirection="row"
            alignItems="center"
            paddingTop={16}
            paddingBottom={16}
            paddingLeft={10}>
            <SkeletonPlaceholder.Item
              width={72}
              height={72}
              borderRadius={50}
            />
            <SkeletonPlaceholder.Item
              width={72}
              height={72}
              borderRadius={50}
              marginLeft={20}
            />
            <SkeletonPlaceholder.Item
              width={72}
              height={72}
              borderRadius={50}
              marginLeft={20}
            />
            <SkeletonPlaceholder.Item
              width={72}
              height={72}
              borderRadius={50}
              marginLeft={20}
            />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      ) : (
        <FlatList
          data={categories}
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          keyExtractor={keyExtractor}
          ListEmptyComponent={renderEmpty}
          renderItem={({ item }: { item: ICategory }) => (
            <Item>
              <Category {...item} />
            </Item>
          )}
        />
      )}
    </>
  );
};

export default ListOfCategories;
