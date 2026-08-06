interface ConfidenceMeterProps {
    /** 1–5 bars filled from the left; undefined renders all bars empty ("anytime") */
    level?: number;
    small?: boolean;
}

export const ConfidenceMeter = ({level, small}: ConfidenceMeterProps) => (
    <span
        className={`confidence-meter${small ? ' small' : ''}`}
        title={level ? `Confidence level ${level} of 5` : 'Use at any confidence level'}
    >
        {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={`bar${level && i <= level ? ' filled' : ''}`} />
        ))}
    </span>
);
