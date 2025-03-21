export const TMDB_CONFIG = {
    BASE_URL:"https://api.themoviedb.org/3",
    API_KEY:"f8028b5fec83579b17b9448ab3e3e1d9",
    headers:{
        accept: 'application/json',
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODAyOGI1ZmVjODM1NzliMTdiOTQ0OGFiM2UzZTFkOSIsIm5iZiI6MTc0MjQ2MDY5NS4zNCwic3ViIjoiNjdkYmQ3MTcwODc0OWVmZTM0ZTc5Y2FjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.t1nQn6Gsj7yfrKN7lGtdZxgLgg6_2Uiq78HA9joWOBA"

    }
}

// /discover/movie
export const fetchMovies = async ({query} : {query:string}) => {
    const endPoints = query ? 
                    `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&include_adult=true&with_original_language=te&page=1`;
    const response = await fetch(endPoints, {
        method:'GET',
        headers:TMDB_CONFIG.headers

    });

    if(!response.ok){
        throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.results;

};



// const url = 'https://api.themoviedb.org/3/discover/movies?include_adult=false&language=en-US&page=1';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmODAyOGI1ZmVjODM1NzliMTdiOTQ0OGFiM2UzZTFkOSIsIm5iZiI6MTc0MjQ2MDY5NS4zNCwic3ViIjoiNjdkYmQ3MTcwODc0OWVmZTM0ZTc5Y2FjIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.t1nQn6Gsj7yfrKN7lGtdZxgLgg6_2Uiq78HA9joWOBA'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));