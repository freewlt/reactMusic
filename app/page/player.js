/**
 * Created by Administrator on 2017/12/8.
 */
import React, {Component} from 'react';
import Progress from './../components/progress'
import '../../static/less/player.less'
import PubSub from 'pubsub-js'


let duration=null;
class Player extends Component {
    constructor(){
        super();
        this.play=this.play.bind(this)
        this.state = {
            progress:0,
            volume:0,
            isPlay:true,
            leftTime:''
        }
    }
    componentDidMount(){
        $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            duration =e.jPlayer.status.duration;
            this.setState({
                volume:e.jPlayer.options.volume*100,
                progress: e.jPlayer.status.currentPercentAbsolute,
                leftTime:this.formatTime(duration*(1-e.jPlayer.status.currentPercentAbsolute/100))
            })
        })
    }
    componentWillUnMount() {
        $("#jPlayer").unbind($.jPlayer.event.timeupdate)
    }

    progressChangeHandler(progress) {
        //console.log('from root widget',progress);
        $('#player').jPlayer('play',duration*progress)

    }
    ChangeVolumeHandler(progress){
        $('#player').jPlayer('volume',progress)
    }
    play() {
        if (!this.state.isPlay) {
            $("#player").jPlayer("pause");
            var a=$(".play").html('play');
        } else{
            $("#player").jPlayer("play");
            var a=$(".play").html('stop');
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
    }
    playPrev() {
        PubSub.publish('PLAY_PREV');
    }
    playNext() {
        PubSub.publish('PLAY_NEXT');
    }
    formatTime(time){
        time=Math.floor(time);
        let miniutes=Math.floor(time/60);
        let seconds=Math.floor(time % 60);
        seconds=seconds < 10 ? `0${seconds}`:seconds;
        return `${miniutes}:${seconds}`

    }
    render(){
        return (
            < div className="player-page">
                    <h1 className="caption">我的私人音乐坊 </h1>
               <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
            <h3 className="music-article">{this.props.currentMusicItem.artist}</h3>
                <div className="progressBar">
                    <Progress progress={this.state.progress} onProgressChange = {this.progressChangeHandler} />
                </div>
                <div className="timeBox">
                    <p className="left-time">{this.state.leftTime}</p>
                    <span className="volumeTxt">音量：</span>
                    <div className="volume">
                       <Progress progress={this.state.volume} onProgressChange={this.ChangeVolumeHandler} barColor="#AAA"/>
                    </div>
                </div>
                    <div className="soundPic cover">
                        <img src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                    </div>
                <div className="btn">
                    <i className="prev" onClick={this.playPrev}>prev</i>
                    <i className={`play ${this.state.isPlay ? 'pause' : 'play'}`} onClick={this.play}>stop</i>
                    <i className="next" onClick={this.playNext}>  next</i>
                </div>
             </div >
        )
    }
}
export default Player;