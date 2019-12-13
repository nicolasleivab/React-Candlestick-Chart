import React, { Component } from 'react';
import Auxiliar from '../hoc/Auxiliar/Auxiliar';
import CandleStickChart from "../components/Candlestick/Candlestick";
import styles from './ChartContainer.module.css';

class ChartContainer extends Component{
    state = {

    }

    render() {

        return(
            <Auxiliar>
                <div>
                <input/>
                </div>
                <CandleStickChart/>
                <div>
                    <button className={styles.btngray}></button>
                    <button className={styles.btngray}></button>
                    <button className={styles.btngray}></button>
                </div>
            </Auxiliar>
        );
    }
}

export default ChartContainer;