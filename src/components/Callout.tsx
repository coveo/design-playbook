import {Alert} from '@mantine/core';
import {IconBulb} from '@coveord/plasma-react-icons';
import type {BlockquoteHTMLAttributes} from 'react';

/** MDX blockquotes render as Mantine callouts ("Before you start" notes etc.) */
export const Callout = ({children}: BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <Alert
        variant="light"
        color="violet"
        icon={<IconBulb size={18} />}
        radius="md"
        mb="md"
        styles={{message: {fontSize: 14.5}}}
    >
        {children}
    </Alert>
);
