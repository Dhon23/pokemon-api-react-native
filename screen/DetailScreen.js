import {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import LoadingAnimate from '../components/LoadingAnimate';
import {
  useGetPokemonByNameQuery,
  useGetPokemonEvoChainQuery,
  useGetPokemonSpeciesQuery,
} from '../services/pokemon';

const typeColor = type => {
  const list = {
    normal: {backgroundColor: '#9E9E9E', color: '#424242'},
    grass: {backgroundColor: '#A5D6A7', color: '#2E7D32'},
    poison: {backgroundColor: '#F48FB1', color: '#AD1457'},
    fire: {backgroundColor: '#FFAB91', color: '#D84315'},
    water: {backgroundColor: '#90CAF9', color: '#1565C0'},
    bug: {backgroundColor: '#C5E1A5', color: '#558B2F'},
    flying: {backgroundColor: '#80DEEA', color: '#00838F'},
  };

  return list[type];
};

const DetailScreen = ({route, navigation}) => {
  const [nextEvo, setNextEvo] = useState();
  const dark = useColorScheme() === 'dark';

  const {name} = route.params;
  const {
    data: pokemon,
    isLoading: isLoadingPokemon,
    isFetching,
  } = useGetPokemonByNameQuery(name);
  const {data: pokemonSpecies, isLoading: isLoadingPokemonSpecies} =
    useGetPokemonSpeciesQuery(name);

  const {data: pokemonEvoChain, isLoading: isLoadingPokemonEvoChain} =
    useGetPokemonEvoChainQuery(
      !isLoadingPokemonSpecies &&
        pokemonSpecies?.evolution_chain.url.split('/')[6],
    );
  // useEffect(() => console.log(pokemonEvoChain), [pokemonEvoChain]);
  useEffect(() => {
    if (pokemonEvoChain) {
      const evoChain = [];
      let evoData = pokemonEvoChain.chain;

      do {
        const evoDetails = evoData['evolution_details'][0];

        evoChain.push({
          name: evoData.species.name,
          min_level: !evoDetails ? 1 : evoDetails.min_level,
          trigger_name: !evoDetails ? null : evoDetails.trigger.name,
          item: !evoDetails ? null : evoDetails.item,
        });

        evoData = evoData['evolves_to'][0];
      } while (!!evoData && evoData.hasOwnProperty('evolves_to'));
      const idx = evoChain.map(el => el.name).indexOf(name);
      if (idx === evoChain.length - 1) {
        setNextEvo();
      } else {
        setNextEvo(evoChain[idx + 1].name);
      }
    }
  }, [pokemonEvoChain, name]);

  return !isLoadingPokemon && !isLoadingPokemonSpecies && !isFetching ? (
    <ScrollView
      style={{
        backgroundColor: dark ? 'black' : 'white',
      }}>
      <View style={{alignItems: 'center', paddingHorizontal: 40}}>
        <SvgUri
          width={300}
          height={300}
          uri={pokemon.sprites.other.dream_world.front_default}
        />
        <View style={styles.container}>
          <View>
            {['Name', 'Height', 'Weight', 'Color', 'Habitat'].map((el, idx) => (
              <Text style={styles.desc} key={idx}>
                {el} :
              </Text>
            ))}
          </View>
          <View>
            <Text style={styles.desc}>{pokemon.name}</Text>
            <Text style={styles.desc}>{pokemon.height}</Text>
            <Text style={styles.desc}>{pokemon.weight}</Text>
            <Text style={styles.desc}>{pokemonSpecies.color.name}</Text>
            <Text style={styles.desc}>{pokemonSpecies.habitat.name}</Text>
          </View>
        </View>
        <View style={styles.types}>
          {pokemon.types.map((el, idx) => (
            <Text key={idx} style={[styles.type, typeColor(el.type.name)]}>
              {el.type.name}
            </Text>
          ))}
        </View>
        <View style={styles.stats}>
          <View
            style={[
              styles.stat,
              {borderBottomWidth: 1, borderColor: '#424242'},
            ]}>
            {['HP', 'Atk', 'Def', 'Sp.Atk', 'Sp.Def', 'Spd'].map((el, idx) => (
              <Text
                style={{flex: 1, textAlign: 'center', fontWeight: 'bold'}}
                key={idx}>
                {el}
              </Text>
            ))}
          </View>
          <View style={styles.stat}>
            {pokemon.stats.map((el, idx) => (
              <Text key={idx} style={{flex: 1, textAlign: 'center'}}>
                {el.base_stat}
              </Text>
            ))}
          </View>
        </View>
        {nextEvo && (
          <TouchableOpacity
            style={styles.evolve}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Detail', {name: nextEvo})}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Evolve</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  ) : (
    <LoadingAnimate />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'gray',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },

  desc: {fontSize: 20, fontWeight: 'bold', marginVertical: 5, color: '#ECEFF1'},
  types: {
    width: '100%',
    marginVertical: 10,
    flexDirection: 'row',
  },
  type: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  stats: {
    width: '100%',
  },
  stat: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  evolve: {
    width: '100%',
    marginTop: 20,
    backgroundColor: 'orange',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 5,
    color: '#FFE0B2',
  },
});

export default DetailScreen;
