import axios from 'axios'
import { SpotifyAuthApiResponse } from '../type/spotifyAuthApiResponse'

export const getAccessToken = async () => {
  const params = new URLSearchParams()
  params.append('grant_type', 'refresh_token')
  params.append('refresh_token', process.env.NEXT_PUBLIC_REFRESH_TOKEN || '')

  const response = await axios.post<SpotifyAuthApiResponse>(
    'https://accounts.spotify.com/api/token',
    params,
    {
      headers: {
        //prettier-ignore
        'Authorization': `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.NEXT_PUBLIC_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
    }
  )
  return response.data.access_token
}
