import React from 'react';
import { FlatList } from 'react-native';

import ListItemSeparator from './ListItemSeparator';

const AppFlatList = ({ data, renderItem }) => (
  <FlatList
    // hack start: could not implement
    // top & bottom padding for the list
    ListHeaderComponent={<></>}
    ListHeaderComponentStyle={{ height: 30 }}
    ListFooterComponent={<></>}
    ListFooterComponentStyle={{ height: 30 }}
    // hack end
    data={data}
    keyExtractor={(item, index) => index.toString()}
    ItemSeparatorComponent={ListItemSeparator}
    renderItem={renderItem}
  />
);

export default AppFlatList;
