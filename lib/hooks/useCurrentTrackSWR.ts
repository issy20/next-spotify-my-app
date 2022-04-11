import axios from 'axios'
import useSWR, { SWRResponse } from 'swr'
import { CurrentPlayingTrackType } from '../../type/playingDataType'
import { fetcher } from '../fetcher/fetcher'

export const useCurrentTrackSWR = (
  fallbackData: CurrentPlayingTrackType
): SWRResponse<CurrentPlayingTrackType, any> => {
  return useSWR('api/track/playing', fetcher, {
    fallbackData,
    refreshInterval: 500,
  })
}
