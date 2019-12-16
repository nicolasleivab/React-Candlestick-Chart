import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import styles from './Candlestick.module.css';
import AutocompleteUI from '../Autocomplete/Autocomplete';

class CandleStickChart extends Component {

state = {
inputCoin:'',
options: {
    title: {
        text: 'BTC-USD',
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

// Default first render (bitcoin)
componentDidMount() {
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
                series: [{data:candlestickFormat}]
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


keySubmit = (e)=>{
    if (e.keyCode == 13) {
        
        let inputSearch = document.getElementById("crypto-autocomplete").value;
        console.log('value', e.target.value);
        console.log('value', inputSearch);
        fetch("https://api.coincap.io/v2/candles?exchange=binance&interval=d1&baseId="+inputSearch+"&quoteId=tether")
            .then(res => res.json())
            .then(
                (result) => {

                    let coinData = result.data.slice(-90);
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
                    this.setState({
                        isLoaded: true,
                        series: [{ data: candlestickFormat }],
                        options: { title: { text: inputSearch + '-USD' } }
                    });
                }else{
                        fetch("https://api.coincap.io/v2/candles?exchange=bittrex&interval=d1&baseId="+inputSearch+"&quoteId=tether")
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
                                        series: [{ data: candlestickFormat }],
                                        options: { title: { text: inputSearch + '-USD'  } }
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
            
    }
}

render() {
    return (
        <div>
            <div>
                <AutocompleteUI keySubmit={this.keySubmit}/>
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