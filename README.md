# weather-api

## Endpoint list

1. POST /auth/login - takes Basic token (login and password) and returns JWT token for user
2. GET /favorite-locations - verify user and return list of favorite cities
3. GET /locations - verify user and return list of available cities
4. POST /location/:id/favorite - verify user and add city to favorites for given user
5. GET /weather - fetch and return weather for user favorited cities
