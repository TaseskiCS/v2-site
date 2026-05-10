type ProfilePhotoProps = {
  src?: string
  alt?: string
  className?: string
}

const frame =
  'aspect-square shrink-0 overflow-hidden rounded-full border border-zinc-200/90 bg-white dark:border-white/[0.08] dark:bg-[#121214]'

/**
 * Sits in the projects grid (top-right). Circle scales to roughly match a project card height.
 */
export function ProfilePhoto({
  src = '/profile.jpeg',
  alt = 'Antonio Taseski',
  className,
}: ProfilePhotoProps) {
  return (
    <div
      className={`flex w-full items-start justify-center ${className ?? ''}`}
    >
      <div
        className={`${frame} size-[12rem] `}
      >
        <img
          src={src}
          alt={alt}
          width={256}
          height={256}
          className="h-full w-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}
