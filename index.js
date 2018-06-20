const express = require('express');
const app = express();
const request = require("request");
const config = require('./config')
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Main page calls API for Now Playing 
app.get('/', (req, response) => {
    let url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + config.TMDB_API_KEY + "&language=en-US&page=1"
    request(url, (err, res, data)=>{
        if(err){
            console.log(err);
        }
        else {
            response.render('index', JSON.parse(data));
        }
    });
});

// Calls API for popular movies
app.get('/popular', (req, res)=>{
    let popurl = "https://api.themoviedb.org/3/movie/popular?api_key=" + config.TMDB_API_KEY + "&language=en-US&page=1";
    request(popurl, (error, response, body) => {
        if (error) {
            console.log(error);
        }
        else {
            popresults = JSON.parse(body);
            res.render('popular', JSON.parse(body));
        }
    });
});

// Calls API for specific movie >> gets movie ID from dynamic link in search.ejs and index.ejs
app.get('/movie/:movieId', (req, res) => {
    // Used append_to_response to include /videos for trailer link
    let movieurl = "https://api.themoviedb.org/3/movie/" + req.params.movieId + "?api_key=" + config.TMDB_API_KEY + "&language=en-US&append_to_response=videos";
    request(movieurl, (err, response, content) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render('movie', JSON.parse(content));
        }
    });
});

// Calls API for search terms
app.get('/search', (req, res) => {
    let searchURL = "https://api.themoviedb.org/3/search/movie?api_key=" + config.TMDB_API_KEY + "&language=en-US&query=" + req.query.searchTerm + "&page=1&include_adult=false";
    request(searchURL, (err, response, data) => {
        if(err) {
            console.log(err);
        }
        else {
            let movieData = {searchTerm: req.query.searchTerm, results: JSON.parse(data).results};
            res.render('search', movieData);
        }
    });
});

// Sends 404 Error message for any non-existent endpoint
app.get('*', (req, res) =>{
    res.status(404).send('Error: 404\nPage Not Found');
});

app.listen(8080, () => {console.log('Server started on http://localhost:8080\nPress CTRL + C to stop server');});