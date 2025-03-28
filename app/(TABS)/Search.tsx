import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { images } from '@/constants/images'
import MovieCard from '../components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '../components/SearchBar'
import { updateSearchCount } from '@/services/appwrite'

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {data:movies, loading: moviesLoading, error: moviesError, refetch: loadMovies, reset} = useFetch(() => fetchMovies({query:searchQuery}));

  useEffect(()=>{
    const timeOutId = setTimeout(async () => {
      if(searchQuery.trim()){
        await loadMovies();
        
      }else{
        reset();
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  },[searchQuery]);

  useEffect(() => {
    if(movies?.length>0 && movies?.[0]){
      updateSearchCount(searchQuery, movies[0]);  
   }
  }, movies);

  return (
    <View className='flex-1 bg-primary'>
      <Image 
        source={images.bg}
        className='flex-1 absolute z-0 w-full'
        resizeMode='cover'
       />
       <FlatList
          data={movies}
          renderItem = {({item}) => <MovieCard {...item}/>}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          className=' px-5 py-10'
          columnWrapperStyle={{
              justifyContent:"center",
              gap:16,
              marginVertical:16,
          }}
          ListHeaderComponent={
            <>
              <View className='w-full flex-row justify-center items-center py-5'>
                  <Image 
                    source={icons.logo}
                    className='w-12 h-10'
                  />
              </View>
              <View>
                <SearchBar 
                    placeHolder='Search Movies...'
                    value={searchQuery}
                    onChangeText = {(text : string) => setSearchQuery(text)}
                  />
              </View>
              {
              searchQuery.length>0 && <View className='flex justify-content my-5 mx-5'>
                  <Text className='text-white font-bold text-xl'>Search results for <Text className='text-yellow-500 text-2xl'>"{searchQuery}"</Text></Text>
              </View>
              }
              { moviesLoading && (
                <ActivityIndicator 
                    size="large" 
                    color="#0000ff"
                    className='my-3'
                  />
              )
              }
              {
                moviesError && (
                  <Text className='text-red-600 my-3 px-5'>Something went wront!</Text>
                )
              }
              {
                (movies && searchQuery.length>0 && movies.length === 0) && (
                  <View className='flex-1 justify-center items-center my-20'>
                      <Text className='text-white text-xl font-bold'>No Movies Found</Text>
                  </View>
                )

                
              }
            </>
          }
       />

       
    </View>
  )
}

export default Search