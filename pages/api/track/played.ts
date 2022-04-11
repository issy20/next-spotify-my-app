import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import { getAccessToken } from '../../../lib/getAccessToken'
import { RecentlyPlayedTrackType } from '../../../type/playedDataType'

export const getRecentlyPlayedTrack = async (accessToken: string) => {
  const recentlyPlayedTrackResponse = await axios.get<RecentlyPlayedTrackType>(
    'https://api.spotify.com/v1/me/player/recently-played?limit=1',
    {
      headers: {
        'Content-Type': 'application/json',
        //prettier-ignore
        'Authorization': `Bearer ${accessToken}`,
      },
    }
  )
  return recentlyPlayedTrackResponse.data
}

const lastPlayedTrack = async (req: NextApiRequest, res: NextApiResponse) => {
  const accessToken = (await getAccessToken()) as string
  const playedTrack = await Promise.resolve(getRecentlyPlayedTrack(accessToken))

  res.status(200).json(playedTrack)
}

export default lastPlayedTrack
