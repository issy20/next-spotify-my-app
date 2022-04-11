import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { getAccessToken } from '../../../lib/getAccessToken'
import { CurrentPlayingTrackType } from '../../../type/playingDataType'

export const getCurrentlyPlayingTrack = async (accessToken: string) => {
  const currentlyPlayingTrackResponse =
    await axios.get<CurrentPlayingTrackType>(
      'https://api.spotify.com/v1/me/player/currently-playing',
      {
        headers: {
          'Content-Type': 'application/json',
          //prettier-ignore
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    )
  return currentlyPlayingTrackResponse.data
}

const currentlyPlayingTrack = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const accessToken = (await getAccessToken()) as string
  const playingTrack = await Promise.resolve(
    getCurrentlyPlayingTrack(accessToken)
  )
  res.status(200).json(playingTrack)
}

export default currentlyPlayingTrack
