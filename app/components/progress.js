/**
 * Created by Administrator on 2017/12/8.
 */
import React,{Component} from 'react'
import '../../static/less/progress.less'

class Progress extends Component{
    constructor() {
        super();
        this.changeProgress = this.changeProgress.bind(this);
    }
    changeProgress(e){
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
       // console.log(progress);
        this.props.onProgressChange && this.props.onProgressChange(progress)
    }

    render(){
        return(
            <div className="componentProgress"  ref="progressBar"  onClick={this.changeProgress}>
                <div className="progress" style={{width:`${this.props.progress}%`,background:this.props.barColor}}></div>
            </div>
    )}
}

export default Progress;