/**
 * Created by Administrator on 2017/12/14.
 */
import React, {Component} from 'react';
import '../../static/less/musiclistitem.less'
import PubSub from 'pubsub-js'

class MusicListenItem extends Component {
    playMusic(musicItem){
        PubSub.publish('PLAY_MUSIC',musicItem);
    }
    deleteMusic(musicItem,e){
        e.stopPropagation();
        PubSub.publish('DELETE_MUSIC',musicItem);
    }
    render() {
        let musicItem = this.props.musicItem;
        return (
            <li onClick={this.playMusic.bind(this,musicItem)} className={`components-listitem${this.props.focus ? ' focus' : ''}`}>
                < p > < strong > {musicItem.title}</strong > -{musicItem.artist}</p >
                < p onClick={this.deleteMusic.bind(this,musicItem)} className = "delete" > < / p >
            < / li >
    )
    }
}
export  default MusicListenItem;