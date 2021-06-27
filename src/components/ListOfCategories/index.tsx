import React from 'react';
import { Text } from 'react-native';

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
        <Text>loading...</Text>
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
