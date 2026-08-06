import {Tooltip} from '@mantine/core';
import {IconInfoCircle} from '@coveord/plasma-react-icons';

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

/** "Confidence level ⓘ" + meter, with the explanation on hover */
export const ConfidenceLevel = ({level}: {level?: number}) => (
    <span className="confidence-label">
        <span>Confidence level</span>
        <Tooltip
            label={
                level
                    ? 'Do this play when your confidence in the problem and solution is around this level.'
                    : 'This play works at any confidence level.'
            }
            multiline
            w={260}
            withArrow
        >
            <IconInfoCircle size={15} style={{color: 'var(--pb-text-faint)', display: 'block'}} />
        </Tooltip>
        <ConfidenceMeter level={level} />
    </span>
);
