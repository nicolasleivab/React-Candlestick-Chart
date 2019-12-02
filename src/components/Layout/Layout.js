import React from 'react';
import Auxiliar from '../../hoc/Auxiliar/Auxiliar';
import styles from './Layout.module.css';

const layout = ( props ) =>(
    <Auxiliar>
        <main className={styles.Layout}>
            <div>Controls</div>
            {props.children}
            <div>Chart</div>
        </main>
    </Auxiliar> 
);

export default layout;