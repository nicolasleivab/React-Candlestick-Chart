import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const ComboBox = (props)=>{
    return (
        <Autocomplete
            id="crypto autocomplete"
            options={top100Coins}
            getOptionLabel={option => option.id}
            style={{ width: 300 }}
            renderInput={params => (
                <TextField {...params} label="Search by name" variant="outlined" fullWidth 
                    value={props.inputCoin}
                    onKeyDown={props.keySubmit}
                    onChange={props.changeHandler}
                
                />
            )}
        />
    );
}

// Top 100 coins from CoinCap
const top100Coins = [
    { id: 'bitcoin', name: 'Bitcoin' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'ripple', name: 'XRP' },
];

export default ComboBox;