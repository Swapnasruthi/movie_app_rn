import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { Link, useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
import Search from "../components/SearchBar";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "../components/MovieCard";
import { getTrendingMovies } from "@/services/appwrite";
import TrendingCard from "../components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data:trendingmovies,
    loading:trendingloading,
    error:trendingerror

  } = useFetch(getTrendingMovies);


  const {
    data:movies, 
    loading: moviesLoading, 
    error: moviesError
  } = useFetch(() => fetchMovies({query:""}));
  const swap = ["swap", "sruthi"];
  return (
    <View
      className="flex-1 bg-primary"
    >
     <Image source={images.bg} className="absolute w-full z-0"/>

    <ScrollView className="flex-1 px-5" nestedScrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight:"100%", paddingBottom:10}}>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto"/>
        
        {

              moviesLoading || trendingloading ? (
                <ActivityIndicator 
                  size="large"
                  color="#0000ff"
                  className="mt-10 self-center"
                />
              ): moviesError || trendingerror ? (
                <Text> Error: {moviesError?.message || trendingerror?.message}</Text>
              ):(
                <View className="flex-1 mt-5">
                  <Search
                        onPress = {() => router.push("./Search")}
                        placeHolder="Search for any movie"
                  />

                  { trendingmovies && (
                      <View className="mt-10">
                          <Text className="text-lg text-white font-bold mb-3">Trending Movies</Text>

                          <FlatList 
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          ItemSeparatorComponent={() => <View className="w-2"/>}
                          data={trendingmovies} 
                          className="mt-3 mb-4"
                          renderItem={({item, index}) => 
                            (
                              <TrendingCard movie={item} index={index}/>
                          )}
                          keyExtractor={(item) => item.movie_id.toString()}
                          />

                      </View>
                  )}

                  <>
                  <Text className="text-white text-2xl font-bold mt-5 mb-3 "> Latest Movies </Text>
                      <FlatList
                      data = {movies}
                      renderItem = {({item}) => (
                        <MovieCard
                            {...item}
                        />
                   
                          )}
                        
                      keyExtractor={(item) => item.id.toString()}
                      numColumns={3}
                      columnWrapperStyle={{
                        justifyContent:"flex-start",
                        gap:20,
                        paddingRight:5,
                        marginBottom:10

                      }}
                      className="mt-2 pb-32"
                      scrollEnabled={false}

                      />
                  </>
              </View>
              )
         }   
          
          
        
      </ScrollView>

           
    </View>
  )
}
