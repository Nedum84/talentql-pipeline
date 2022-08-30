# Backend Api to calculate age from a timestamp with a rate limiter of 3 request per 1 second

The API was developed with NodeJs & express

### Implemenetation approach

- I created an endpoint(`/howold?dob=timestamp`) where `timestamp` is a valid date
- If `timestamp` is invalid or future date, `0` will be returned
- Also, there's express rate limiter middleware that limits attemps to 3 resquest per second
- When valid `timestamp` is passed, a sample response of `{ "age": 12 }` is returned

### Deployment

The Node app is hosted on heroku with BASEURL of `https://thenelson-app.herokuapp.com`
