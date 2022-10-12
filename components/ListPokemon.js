import {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {SvgUri} from 'react-native-svg';

const ListPokemon = ({data, navigation, refetch}) => {
  // useEffect(() => console.log(data), [data]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Detail', {name: item.name})}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          color: '#ECEFF1',
        }}>
        {item.name}
      </Text>
      <SvgUri
        width={100}
        height={100}
        uri={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
          item.url.split('/')[6]
        }.svg`}
      />
    </TouchableOpacity>
  );
  return (
    <FlatList
      style={styles.items}
      data={data}
      renderItem={renderItem}
      keyExtractor={(el, idx) => idx}
      refreshing={false}
      onRefresh={() => refetch()}
    />
  );
};

const styles = StyleSheet.create({
  items: {
    width: '100%',
    padding: 20,
  },
  item: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    marginVertical: 10,
    backgroundColor: 'grey',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ListPokemon;
