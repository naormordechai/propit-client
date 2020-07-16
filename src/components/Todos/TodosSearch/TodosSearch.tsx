import React, { useState } from 'react';

import { FormControl, InputAdornment, OutlinedInput } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

interface TodosSearchProps {
    onSearch: (term: string) => void;
}

export const TodosSearch: React.FC<TodosSearchProps> = (props) => {
    const [searchVal, setSearchVal] = useState('');

    const onChangeHandler = (val:string) => {
        setSearchVal(val);
        props.onSearch(val);
    }
    
    return <FormControl variant="outlined" size="small" fullWidth>
        <OutlinedInput
            placeholder="חיפוש משימה"
            value={searchVal}
            onChange={e => onChangeHandler(e.target.value)}
            endAdornment={<InputAdornment position="end"><SearchIcon className="icon-opacity" /></InputAdornment>}
        />
    </FormControl>
}
