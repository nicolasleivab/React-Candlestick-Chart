import React, { Component } from 'react';
import Auxiliar from '../hoc/Auxiliar/Auxiliar';
import CandleStickChart from "../components/Candlestick/Candlestick";

class ChartContainer extends Component{
    state = {

    }

    render() {

        return(
            <Auxiliar>
                <CandleStickChart/>
            </Auxiliar>
        );
    }
}

export default ChartContainer;