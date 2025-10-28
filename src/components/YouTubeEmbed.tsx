import type React from "react"

interface YouTubeEmbedProps {
  youtubeId: string
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ youtubeId }) => {
  return (
    <div className="youtube-embed__container">
      <div className="youtube-embed__frame">
        <iframe
          className="youtube-embed__iframe"
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default YouTubeEmbed
