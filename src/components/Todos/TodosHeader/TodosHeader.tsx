import React from 'react';

import styles from './TodosHeader.module.scss';

interface TodosHeaderProps {
    headerTitle: string;
}

export const TodosHeader: React.FC<TodosHeaderProps> = (props) => {
    return (
        <div className={styles.headerSection}>
            <h1>{props.headerTitle}</h1>
        </div>
    )
}
