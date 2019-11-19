# twitter-followers-count

Get the follower count for a list of Twitter screen names.

## Usage

```bash
npm install twitter-followers-count
```

```js
import twitterFollowersCount from 'twitter-followers-count'

const getTwitterFollowers = twitterFollowersCount({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
})

getTwitterFollowers(['jack', 'unitedpursuit', 'historyinpics'])

// -> { jack: 4152869, unitedpursuit: 29632, historyinpics: 4143792 }
```

Twitter screen names are generally retrievable, whether through their UI or the
API, in a case-insensitive manner, but the API will return the properly cased
screen name. To ensure against confusion from this, the exact screen name
strings passed in are used as the keys for the return object.

## Authentication

Get your Twitter keys here: https://apps.twitter.com/app/new

In the usage example above, the four keys are stored in `process.env` as
environment variables, which is the generally recommended approach. If you don't
know much about environment variables, here's a [blog
post](https://davidwalsh.name/node-environment-variables). You can use
[dotenv](https://www.npmjs.com/package/dotenv) to store environment variables in
a `.env` file and have them read in when your script runs if you're on a system
that doesn't handle this automatically.
