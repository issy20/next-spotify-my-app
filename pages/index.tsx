import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { VFC } from 'react'
import { Layout } from '../components/Layout'
import { getAccessToken } from '../lib/getAccessToken'
import { useCurrentTrackSWR } from '../lib/hooks/useCurrentTrackSWR'
import { useRecentlyTrackSWR } from '../lib/hooks/useRecentlyTrackSWR'
import { CurrentPlayingTrackType } from '../type/playingDataType'
import { getCurrentlyPlayingTrack } from './api/track/playing'

interface Props {
  fallbackData: CurrentPlayingTrackType
}

const Home: VFC<Props> = ({ fallbackData }) => {
  const { data: playingData, error: playingError } =
    useCurrentTrackSWR(fallbackData)
  const { data: playedData, error: playedError } = useRecentlyTrackSWR()
  const _playedData = playedData && playedData!.items[0]

  const dt = new Date(`${_playedData?.played_at}`)
  const playedAt = dt.toLocaleString()

  return (
    <Layout>
      <p className="text-2xl mb-3">🤗</p>
      {playingData?.is_playing && (
        <>
          <p className="font-semibold">Now Playing</p>
          <br />
          <a href={playingData.item.uri}>
            <Image
              src={playingData.item.album.images[2].url}
              width={playingData.item.album.images[2].width}
              height={playingData.item.album.images[2].height}
              alt="now playing track jacket"
            />
          </a>
          <p className="mt-2">{playingData.item.artists[0].name}</p>
          <p>{playingData.item.name}</p>
        </>
      )}
      {!playingData?.is_playing && _playedData?.track.id && (
        <>
          <p>Last Played</p>
          <br />
          <a href={_playedData?.track.uri}>
            <Image
              src={_playedData.track.album.images[2].url}
              width={_playedData.track.album.images[2].width}
              height={_playedData.track.album.images[2].height}
              alt="last played track jacket"
            />
          </a>
          <p className="mt-2">{_playedData.track.artists[0].name}</p>
          <p>{_playedData.track.name}</p>
          <br />
          <p>{playedAt}</p>
        </>
      )}
      <br />
      <br />
      {/* <div className="flex">
        <Link href="/api/track/playing">
          <button className="border-b mr-7">NOW PLAYING</button>
        </Link>
        <Link href="/api/track/played">
          <button className="border-b">LAST PLAYED</button>
        </Link>
      </div> */}
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const accessToken = (await getAccessToken()) as string
  const data = await getCurrentlyPlayingTrack(accessToken)

  return {
    props: {
      fallbackData: data,
    },
  }
}
