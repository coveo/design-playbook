import {Alert} from '@mantine/core';
import type {BlockquoteHTMLAttributes} from 'react';

/** MDX blockquotes render as Plasma Alerts ("Before you start" notes etc.).
 * No prop overrides — Plasma's theme supplies the InfoToken icon and spacing. */
export const Callout = ({children}: BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <Alert mb="md">{children}</Alert>
);
