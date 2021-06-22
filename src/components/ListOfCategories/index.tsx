import React from 'react';
import { Text } from 'react-native';

import Category from '../Category';
import { List, Item } from './styles';

type Props = {
  categories: ICategory[];
  loading?: boolean;
};

const ListOfCategories = ({ categories, loading }: Props) => {
  const keyExtractor = (category: ICategory) => category.id.toString();
  const renderEmpty = () =>
    !loading && (categories === undefined || categories.length < 1) ? (
      <Text>There are not categories</Text>
    ) : null;

  return (
    <>
      {loading ? (
        <Text>loading...</Text>
      ) : (
        <List
          data={categories}
          horizontal
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
