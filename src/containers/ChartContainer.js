import React, { Component } from 'react';
import Auxiliar from '../../hoc/Auxiliar';
import CandleStickChart from "react-apexcharts";

class ChartContainer extends Component{
    state = {

    }

    render() {

        return(
            <Auxiliar>
                <Controls/>
                <CandleStickChart/>
            </Auxiliar>
        );
    }
}

export default ChartContainer;