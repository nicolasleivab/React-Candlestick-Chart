import React from 'react';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import styles from './Layout.module.css';
import ChartContainer from '../../containers/ChartContainer'

const layout = ( props ) =>(
    <Auxiliar>
        <main className={styles.Layout}>
            <ChartContainer/>
        </main>
    </Auxiliar> 
);

export default layout;