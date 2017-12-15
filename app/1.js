/**
 * Created by Administrator on 2017/12/7.
 */
import React, {Component} from 'react';
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import { MUSIC_LIST } from './config/musicList'
import {Router,Route,IndexRouter,browserHistory, hashHistory,Link} from  'react-router'


class App extends Component{
    constructor(){
        super();
        this.state = {
            musicList:MUSIC_LIST,
            currentMusicItem:MUSIC_LIST[2]
        }

    }
    componentDidMount() {
        $("#player").jPlayer({
            ready: function () {
                $(this).jPlayer("setMedia", {
                    mp3: "http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3"
                }).jPlayer('play');
            },
            supplied: "mp3",
            wmode: "window"
        });

    }
    render() {
        return (
            < div >
            < Header />
            {React.cloneElement(this.props.children, this.state)}
    </div >
    )
    }
}


class Root extends Component {
    render(){
        return(
            <Router history={hashHistory}>
            <Route path="/list" component={App}>
            <IndexRouter component={player}/>

            </Route>
            </Router>
    )
    }
}


export default Root;