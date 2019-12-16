import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const boxStyle = {
    paddingTop: 15,
    paddingBottom: 35,
    display: 'flex',
    justifyContent: 'center',
};
// options template
const top100Coins = [];

const AutocompleteUI = (props) =>{

// Fetch Top 100 coins from CoinCap
    fetch("https://api.coincap.io/v2/assets")
        .then(res => res.json())
        .then(
            (result) => {
                const coins = result.data;
                coins.forEach(e => {
                    console.log(e.id)
                    let newObj = {id: e.id, name: e.name}
                    top100Coins.push(newObj)
                });
            },

            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )

return (
    <div style={boxStyle}>
    <Autocomplete
        id="crypto-autocomplete"
        options={top100Coins}
        getOptionLabel={option => option.id}
        style={{ width: 350 }}
        renderInput={params => (
            <TextField {...params} label="Search by ID" variant="outlined" fullWidth 
                value={props.inputCoin}
                onKeyDown={props.keySubmit}
                onChange={props.changeHandler}
            
            />
            
        )}
    />
    </div>
);
}

export default AutocompleteUI;