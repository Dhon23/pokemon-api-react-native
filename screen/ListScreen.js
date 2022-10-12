import {StyleSheet, Text, TextInput, useColorScheme, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListPokemon from '../components/ListPokemon';
import LoadingAnimate from '../components/LoadingAnimate';
import {useGetPokemonQuery} from '../services/pokemon';

const ListScreen = ({navigation}) => {
  const dark = useColorScheme() === 'dark';

  const {data, error, isLoading, refetch} = useGetPokemonQuery();

  return !isLoading ? (
    <View style={[styles.body, {backgroundColor: dark ? 'black' : 'white'}]}>
      <View style={styles.inputBar}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: dark ? '#424242' : '#EEEEEE',
              color: dark ? 'white' : 'black',
            },
          ]}
          placeholder="Search here"
          placeholderTextColor={dark ? 'white' : 'black'}
        />
        <View style={styles.searchIcon}>
          <Icon name="search" size={20} color="#fff" />
        </View>
      </View>
      <ListPokemon
        data={data.results}
        navigation={navigation}
        refetch={refetch}
      />
    </View>
  ) : (
    <LoadingAnimate />
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
  },
  inputBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  searchIcon: {
    backgroundColor: '#424242',
    padding: 14,
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default ListScreen;
