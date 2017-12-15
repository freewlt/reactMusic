/**
 * Created by Administrator on 2017/12/7.
 */
import React, {Component} from 'react';
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import {MUSIC_LIST} from './config/musicList'
import PubSub from 'pubsub-js'


class Root extends Component {
    constructor() {
        super();
        this.state = {
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0]
        }

    }

    playMusic(musicItem) {
        $('#player').jPlayer('setMedia',{
            mp3:musicItem.file
        }).jPlayer('play');
        this.setState({
             currentMusicItem:musicItem
        })
    }
    playNext(type ="next"){
        let index =this.findMusicIndex(this.state.currentMusicItem);
        let newIndex =null;
        let musicListLength=this.state.musicList.length;
        if(type=='next'){
           newIndex = (index+1)%musicListLength;
        }else{
            newIndex = (index-1+musicListLength)%musicListLength;
        }
        this.playMusic(this.state.musicList[newIndex])
    }
    findMusicIndex(musicItem){
        return this.state.musicList.indexOf(musicItem);
    }
    componentDidMount() {
        $("#player").jPlayer({
            supplied: "mp3",
            wmode: "window"
        });
        this.playMusic(this.state.currentMusicItem);
        $("#player").bind($.jPlayer.event.ended,(e)=>{
            this.playNext();
        })
        PubSub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item => {
                    return item !== musicItem
                })
            })

        });
        PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem);
        });
        PubSub.subscribe('PLAY_NEXT', () => {
            this.playNext();
        });
        PubSub.subscribe('PLAY_PREV', () => {
            this.playNext('prev');
        });

    }

    componentwillUnMount() {
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DELETE_MUSIC');
        PubSub.subscribe('PLAY_PREV');
        PubSub.subscribe('PLAY_Next');
        $("#player").unbind($.jPlayer.event.ended);
    }

    render() {
        return (
            < div >
            < Header / >
            < Player
        currentMusicItem = {this.state.currentMusicItem
    }
    />
    <
        MusicList
        currentMusicItem = {this.state.currentMusicItem
    }
        musicList = {this.state.musicList
    }>
    </
        MusicList >
        < / div >
    )
    }
}


export default Root;