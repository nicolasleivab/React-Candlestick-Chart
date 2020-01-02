import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import styles from './Candlestick.module.css';
import AutocompleteUI from '../Autocomplete/Autocomplete';

// options template
const top100Coins = [];

class CandleStickChart extends Component {

state = {
// options template
top100Coins: [],
//error message
errorMsg: '',
//chart settings
options: {
    title: {
        text: 'BTC-USDT',
        align: 'left'
    },
    xaxis: {
        type: 'datetime'
    },
    yaxis: {
        labels: {
            formatter: function (y) {
                return '$' + (y).toLocaleString('en');
        },
        tooltip: {
            enabled: true,
            y: {
                formatter: function (y) {
                return '$' + (y).toLocaleString('en');
            }
        }
        },
        
    }
}
},
style: {
    background: '#000',
    color: '#777',
    fontSize: '12px',
    padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
    }
},
series: [{data:[{}]

}]
}

// Fetch Top 100 coins from CoinCap
componentWillMount(){
    fetch("https://api.coincap.io/v2/assets")
        .then(res => res.json())
        .then(
            (result) => {
                const coins = result.data;
                coins.forEach(e => {
                    //exclude tether
                    if(e.id != 'tether'){
                    let newObj = {id: e.id, name: e.name, symbol: e.symbol}
                    top100Coins.push(newObj)
                    }
                });
                let updatedCoins = [...top100Coins] // copy array to set state in an immutable fashion

                this.setState({
                    top100Coins: updatedCoins
                })
            },

            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        
}

// Default first render (bitcoin)
componentDidMount() {
this.setState({
        errorMsg: 'Loading...'
});
fetch("https://api.coincap.io/v2/candles?exchange=poloniex&interval=d1&baseId=bitcoin&quoteId=tether")
    .then(res => res.json())
    .then(
        (result) => {
            
            let coinData = result.data.slice(-90);

            coinData.forEach(function (d) {
                d.open = Math.round(d.open * 10000) / 10000;
                d.high = Math.round(d.high * 10000) / 10000;
                d.low = Math.round(d.low * 10000) / 10000;
                d.close = Math.round(d.close * 10000) / 10000;
            });

            let candlestickFormat = coinData.map(function (d) {
                return {
                    x: new Date(d.period),
                    y: [d.open, d.high, d.low, d.close]
                }
            })
            console.log(candlestickFormat);
            this.setState({
                isLoaded: true,
                series: [{data:candlestickFormat}],
                errorMsg: ''
            });
        },

        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
    )
}

//onkey handler for the input 
keySubmit = (e)=>{
    if (e.keyCode == 13) {
        
        let inputName = document.getElementById("crypto-autocomplete").value;
        //check if the input is a valid crypto name
        if (top100Coins.some(e => e.name == inputName)){
        this.setState({
                errorMsg: 'Loading...'
        });
        let inputFilter = top100Coins.filter(e => e.name == inputName);
        let inputSearch = inputFilter[0]['id'];
        console.log('value', inputFilter);
        console.log('value', inputSearch);
        fetch("https://api.coincap.io/v2/candles?exchange=binance&interval=d1&baseId="+inputSearch+"&quoteId=tether")
            .then(res => res.json())
            .then(
                (result) => {

                    let coinData = result.data.slice(-90);
                    //restart errorMsg
                    this.setState({
                        errorMsg: ''
                    });
                    if(coinData[0] != undefined){

                    coinData.forEach(function (d) {
                        d.open = Math.round(d.open * 10000) / 10000;
                        d.high = Math.round(d.high * 10000) / 10000;
                        d.low = Math.round(d.low * 10000) / 10000;
                        d.close = Math.round(d.close * 10000) / 10000;
                    });

                    let candlestickFormat = coinData.map(function (d) {
                        return {
                            x: new Date(d.period),
                            y: [d.open, d.high, d.low, d.close]
                        }
                    })
                    console.log(candlestickFormat);
                    // set state to render chart with new data
                    this.setState({
                        isLoaded: true,
                        series: [{ data: candlestickFormat }],
                        options: { title: { text: inputFilter[0]['symbol'] + '-USDT' } }
                    });
                }else{ // use another exchange if the coin is not listed in the first one
                        fetch("https://api.coincap.io/v2/candles?exchange=okex&interval=d1&baseId="+inputSearch+"&quoteId=tether")
                            .then(res => res.json())
                            .then(
                                (result) => {

                                    let coinData = result.data.slice(-90);
                                    this.setState({
                                        errorMsg: ''
                                    });
                                    if (coinData[0] == undefined) {
                                        this.setState({
                                            errorMsg: 'No data available for the time being'
                                        });
                                    }
                                    //Format data
                                    coinData.forEach(function (d) {
                                        d.open = Math.round(d.open * 10000) / 10000;
                                        d.high = Math.round(d.high * 10000) / 10000;
                                        d.low = Math.round(d.low * 10000) / 10000;
                                        d.close = Math.round(d.close * 10000) / 10000;
                                    });

                                    let candlestickFormat = coinData.map(function (d) {
                                        return {
                                            x: new Date(d.period),
                                            y: [d.open, d.high, d.low, d.close]
                                        }
                                    })
                                    console.log(candlestickFormat);
                                    // set state to render chart with new data
                                    this.setState({
                                        isLoaded: true,
                                        series: [{ data: candlestickFormat }],
                                        options: { title: { text: inputFilter[0]['symbol'] + '-USDT'  } }
                                    });
                                },
                                
                                (error) => {
                                    this.setState({
                                        isLoaded: true,
                                        error
                                    });
                                }
                            )
                }
                },
            

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
        }else{
            this.setState({
                errorMsg: 'Please input a valid name'
            });
        }
    }
}

render() {
    return (
        <div>
            <div>
                <AutocompleteUI keySubmit={this.keySubmit} top100Coins={this.state.top100Coins}/>
                <i>{this.state.errorMsg}</i>
            </div>
            <div id="chart" className={styles.CandleStick}>
                <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height="500" />
            </div>
            <div id="html-dist">
            </div>
        </div>
        );
    }
}

export default CandleStickChart