import {createContext, useContext, useMemo, useState} from 'react';
import type {ReactNode} from 'react';
import {ContributeModal} from './components/ContributeModal';

/** One shared Contribute a Play modal, openable from anywhere (the ⌘K
 * Options panel, coming-soon placeholders, …). */
const ContributeContext = createContext<() => void>(() => {});

export const useContribute = () => useContext(ContributeContext);

export const ContributeProvider = ({children}: {children: ReactNode}) => {
    const [opened, setOpened] = useState(false);
    const open = useMemo(() => () => setOpened(true), []);
    return (
        <ContributeContext.Provider value={open}>
            {children}
            <ContributeModal opened={opened} onClose={() => setOpened(false)} />
        </ContributeContext.Provider>
    );
};
