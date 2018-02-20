import Twitter from 'twitter'
import { chunk, flatten, fromPairs, mapKeys } from 'tiny-fns'

let twitterClient

export default function init(creds) {
  twitterClient = new Twitter(creds)
  return getTwitterFollowerCounts
}

async function getTwitterFollowerCounts(screenNames) {
  const chunkedScreenNames = chunk(screenNames, 100)
  const chunkedFollowers = await Promise.all(chunkedScreenNames.map(requestFollowerCountForChunk))
  const followerCounts = fromPairs(flatten(chunkedFollowers))
  return setReturnCase(followerCounts, screenNames)
}

/**
 * Request users using the `screen_name` param, which can be a list of comma
 * separated Twitter screen names.
 */
function requestUsers(screen_name) {
  return twitterClient.post('users/lookup', { screen_name })
}

async function requestFollowerCountForChunk(screenNames) {
  const users = await requestUsers(screenNames.join(','))
  return users.map(user => [ user.screen_name, user.followers_count ])
}

/**
 * Map the followers object back to the originally received screen names,
 * because the Twitter API recognizers a screen name regardless of case, but
 * returns it in the proper case.
 */
function setReturnCase(followerCounts, screenNames) {
  return mapKeys(followerCounts, name => {
    return screenNames.find(screenName => screenName.toLowerCase() === name.toLowerCase())
  })
}
