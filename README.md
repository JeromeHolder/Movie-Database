# Movie-Database
OVERVIEW
A movie database site that displays a dynamic list of movies and details by utilizing APIs.

MAIN FEATURES
On load the TMDB API is hit to grab a list of current popular movies which are displayed in a bootstrap carousel.  Search again hits the api using the search params and renders a list of results.  Image placeholders are used for movies without posters.  Clicking on a movie from anywhere in the app renders a details page that includes an iframe with the trailer.

TECHNOLOGIES
Express and request are used for getting data from the TMDB API, and ejs for HTML templating.  Bootstrap and vanilla CSS are used for styling.
