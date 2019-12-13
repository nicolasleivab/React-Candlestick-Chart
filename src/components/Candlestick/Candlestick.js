import React, { Component } from 'react';
import ReactApexChart from "react-apexcharts";
import styles from './Candlestick.module.css';

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
        tooltip: {
            enabled: true
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

componentDidMount() {
fetch("https://api.coincap.io/v2/candles?exchange=poloniex&interval=d1&baseId=bitcoin&quoteId=tether")
    .then(res => res.json())
    .then(
        (result) => {
            
            let coinData = result.data.slice(-90);

            coinData.forEach(function (d) {
                d.open = Math.round(d.open * 100) / 100;
                d.high = Math.round(d.high * 100) / 100;;
                d.low = Math.round(d.low * 100) / 100;;
                d.close = Math.round(d.close * 100) / 100;;
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
searchCoinBTC = ()=>{

fetch("https://api.coincap.io/v2/candles?exchange=poloniex&interval=d1&baseId=bitcoin&quoteId=tether")
    .then(res => res.json())
    .then(
        (result) => {

            let coinData = result.data.slice(-90);

            coinData.forEach(function (d) {
                d.open = Math.round(d.open * 100) / 100;
                d.high = Math.round(d.high * 100) / 100;;
                d.low = Math.round(d.low * 100) / 100;;
                d.close = Math.round(d.close * 100) / 100;;
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
                options: {title:{text:'BTC-USD'}}
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
searchCoinETH = ()=>{

fetch("https://api.coincap.io/v2/candles?exchange=poloniex&interval=d1&baseId=ethereum&quoteId=tether")
    .then(res => res.json())
    .then(
        (result) => {

            let coinData = result.data.slice(-90);

            coinData.forEach(function (d) {
                d.open = Math.round(d.open * 100) / 100;
                d.high = Math.round(d.high * 100) / 100;;
                d.low = Math.round(d.low * 100) / 100;;
                d.close = Math.round(d.close * 100) / 100;;
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
                options: { title: { text: 'ETH-USD' } }
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

searchCoinXRP = ()=>{

fetch("https://api.coincap.io/v2/candles?exchange=poloniex&interval=d1&baseId=ripple&quoteId=tether")
    .then(res => res.json())
    .then(
        (result) => {

            let coinData = result.data.slice(-90);

            coinData.forEach(function (d) {
                d.open = Math.round(d.open * 100) / 100;
                d.high = Math.round(d.high * 100) / 100;;
                d.low = Math.round(d.low * 100) / 100;;
                d.close = Math.round(d.close * 100) / 100;;
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
                options: { title: { text: 'XRP-USD' } }
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

changeHandler = (e)=>{
        this.setState({ inputCoin: e.target.value });
}

keySubmit = (e)=>{
    if (e.keyCode == 13) {
        console.log('value', e.target.value);
        fetch("https://api.coincap.io/v2/candles?exchange=poloniex&interval=d1&baseId="+this.state.inputCoin+"&quoteId=tether")
            .then(res => res.json())
            .then(
                (result) => {

                    let coinData = result.data.slice(-90);

                    coinData.forEach(function (d) {
                        d.open = Math.round(d.open * 100) / 100;
                        d.high = Math.round(d.high * 100) / 100;;
                        d.low = Math.round(d.low * 100) / 100;;
                        d.close = Math.round(d.close * 100) / 100;;
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
                        options: { title: { text: this.state.inputCoin + '-USD' } }
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
}

render() {
    return (
        <div>
            <div>
                <input value={this.state.inputCoin} onKeyDown={this.keySubmit} onChange={this.changeHandler}/>
            </div>
            <div id="chart" className={styles.CandleStick}>
                <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height="500" />
                <div>
                    <button className={styles.btngray} onClick={this.searchCoinBTC}>BTC</button>
                    <button className={styles.btngray} onClick={this.searchCoinETH}>ETH</button>
                    <button className={styles.btngray} onClick={this.searchCoinXRP}>XRP</button>
                </div>
            </div>
            <div id="html-dist">
            </div>
        </div>
        );
    }
}

export default CandleStickChart