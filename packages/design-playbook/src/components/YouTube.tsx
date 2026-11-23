/** `<YouTube id="…" title="…" />` in MDX: a privacy-enhanced (youtube-nocookie) embed
 * at 16:9, styled like play images. Plays never write raw <iframe>/<video> tags. */
export const YouTube = ({id, title}: {id: string; title: string}) => (
    <iframe
        className="video-embed"
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`}
        title={title}
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        loading="lazy"
    />
);
