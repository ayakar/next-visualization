import styles from './about.module.css';

export type Mock = { file: string; title: string; note?: string; adopted?: string };

/**
 * A design-mock card. The preview is a static screenshot (in public/assets/design/)
 * The whole card links to the full interactive mock.
 */
export function MockCard({ mock }: { mock: Mock }) {
    const preview = `/assets/design/${mock.file.replace('.html', '.jpg')}`;
    return (
        <a
            href={`/design/${mock.file}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mockCard}
        >
            <div className={styles.mockThumb}>
                {mock.adopted && <span className={styles.adopted}>{mock.adopted}</span>}
                {/* eslint-disable-next-line @next/next/no-img-element -- static preview, no optimization needed */}
                <img
                    src={preview}
                    alt={`${mock.title} preview`}
                    loading="lazy"
                />
            </div>
            <div className={styles.mockCaption}>
                <div className={styles.mockTitle}>
                    {mock.title} <span className={styles.mockOpen}>↗</span>
                </div>
                {mock.note && <div className={styles.mockNote}>{mock.note}</div>}
            </div>
        </a>
    );
}
