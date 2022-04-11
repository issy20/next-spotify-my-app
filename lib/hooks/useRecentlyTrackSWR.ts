import useSWR, { SWRResponse } from 'swr'
import { RecentlyPlayedTrackType } from '../../type/playedDataType'
import { fetcher } from '../fetcher/fetcher'

export const useRecentlyTrackSWR = (): SWRResponse<
  RecentlyPlayedTrackType,
  any
> => {
  return useSWR('api/track/played', fetcher, { refreshInterval: 10000 })
}
