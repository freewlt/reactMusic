/**
 * Created by Administrator on 2017/12/7.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './root'

ReactDOM.render(
            <Root/>,
    document.getElementById('root')
);

if(module.hot){
    module.hot.accept('./root',() =>{
        const NewRoot =require('./root').default;
        render(
             <AppContainer>
                 <NewRoot/>
             </AppContainer>,
            document.getElementById('root')
        )
    })
}

