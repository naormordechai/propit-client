import React from 'react';
import styles from './TodosCountDisplay.module.scss';

interface TodosCountDisplayProps {
    count: number;
}

export const TodosCountDisplay:React.FC<TodosCountDisplayProps> = (props) => {
    return <h3 className={styles.countText}>רשימת המשימות שלך ({props.count})</h3>
}
