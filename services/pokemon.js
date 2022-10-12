import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://pokeapi.co/api/v2'}),
  endpoints: builder => ({
    getPokemon: builder.query({
      query: () => '/pokemon',
    }),
    getPokemonByName: builder.query({
      query: name => '/pokemon/' + name,
    }),
    getPokemonSpecies: builder.query({
      query: name => '/pokemon-species/' + name,
    }),
    getPokemonEvoChain: builder.query({
      query: id => '/evolution-chain/' + id,
    }),
  }),
});

export const {
  useGetPokemonQuery,
  useGetPokemonByNameQuery,
  useGetPokemonSpeciesQuery,
  useGetPokemonEvoChainQuery,
} = pokemonApi;
