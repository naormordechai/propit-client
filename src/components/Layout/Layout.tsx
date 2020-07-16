import React from 'react';
import styles from './Layout.module.scss';
import { Toolbar } from '../Navigation/Toolbar/Toolbar';

export const Layout: React.FC = (props) => {
    return (
        <>
        <Toolbar />
        <main className={styles.content}>
            {props.children}
        </main>
        </>
    )
}