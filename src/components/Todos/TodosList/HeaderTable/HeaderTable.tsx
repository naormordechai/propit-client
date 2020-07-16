import React from 'react'
import { TableHead, TableRow, TableCell } from '@material-ui/core'

const headCells = [
    { id: 'isComplete', label: 'בוצעה' },
    { id: 'name', label: 'המשימה' },
    { id: 'date', label: 'תאריך יצירה' },
    { id: 'activities', label: 'פעולות' },
];

export const HeaderTable:React.FC = () => {
    return <TableHead>
        <TableRow>
            {headCells.map((headCell) => (
                <TableCell
                    key={headCell.id}
                    align="right"
                    classes={{root: 'table-data'}}
                >
                    {headCell.label}
                </TableCell>
            ))}
        </TableRow>
    </TableHead>
}
