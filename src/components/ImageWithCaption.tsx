import { tw } from "twind"

export const ImageWithCaption = ({
  src,
  alt,
  caption,
  className,
}: { src: string; alt?: string; caption?: string; className?: string }) => {
  alt ??= caption
  return (
    <div className={tw("mx-16 my-4 mb-8", className)}>
      <div
        className={tw(
          "flex flex-col items-center border border-gray-200 rounded-lg overflow-hidden shadow-md",
        )}
      >
        <img src={src} alt={alt} className={tw("max-w-full h-auto")} />
      </div>
      {caption && (
        <div className={tw("text-sm text-gray-600 my-2 text-center")}>
          {caption}
        </div>
      )}
    </div>
  )
}

export default ImageWithCaption
