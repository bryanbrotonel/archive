export type spotifyListeningProps = {
  isPlaying: boolean
  timestamp?: string
  track?: {
    title: string
    album: string
    albumImageUrl: string
    artists: string
    spotifyUrl: string
  }
}


export type spotifyApiError = {
  error: {
    status: number
    message: string
  }
}

interface Image {
  url: string
  height: number
  width: number
}

export interface Artist {
  id: string
  name: string
  externalUrl: string
  genres: string[]
  images?: Image[]
}

export interface Track {
  id: string
  album: Album
  trackName: string
  artists: Artist[]
  trackNumber: number
  externalUrl: string
  previewUrl: string
}

export interface Album {
  id: string
  name: string
  artists: Artist[]
  images: Image[]
  releaseDate: string
  totalTracks: number
  externalUrl: string
}
