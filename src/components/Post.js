import React, { useState } from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import VisibilityIcon from '@material-ui/icons/Visibility';
// import style from './Post.module.scss';
function Post() {
    const showForm = () => {
        // if (this.props.isEdit) {
        //     return (
        //         <ul className="ed-options">
        //             <li><a href="#" title>Edit Post</a></li>
        //             <li><a href="#" title>Unsaved</a></li>
        //             <li><a href="#" title>Unbid</a></li>
        //             <li><a href="#" title>Close</a></li>
        //             <li><a href="#" title>Hide</a></li>
        //         </ul>)
        // }
    }
    return (
        <div >
            <div className="post-bar">
                <div className="post_topbar">
                    <div className="usy-dt">
                        <img src="images/resources/us-pic.png" alt="" />
                        <div className="usy-name">
                            <h3>John Doe</h3>
                            <span><img src="images/clock.png" alt="" />3 min ago</span>
                        </div>
                    </div>
                    <div className="ed-opts">
                        <a href="#" title className="ed-opts-open"><MoreVertIcon></MoreVertIcon></a>
                        {/* {
                            this.showForm()
                        } */}
                    </div>
                </div>
                <div className="epi-sec">
                    <ul className="descp">
                        <li><img src="images/icon8.png" alt="" /><span>Epic Coder</span></li>
                        <li><img src="images/icon9.png" alt="" /><span>India</span></li>
                    </ul>
                    <ul className="bk-links">
                        <li><a href="#" title><i className="la la-bookmark" /></a></li>
                        <li><a href="#" title><i className="la la-envelope" /></a></li>
                    </ul>
                </div>
                <div className="job_descp">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam luctus hendrerit metus, ut ullamcorper quam finibus at. Etiam id magna sit amet... <a href="#" title>view more</a></p>
                </div>
                <div>
                    <img src="./images/background.jpg"></img>
                </div>
                <div className="job-status-bar">
                    <ul className="like-com">
                        <li>
                            <a href="#"><FavoriteIcon></FavoriteIcon> Like 25</a>
                        </li>
                        <li><a href="#"><ChatBubbleIcon></ChatBubbleIcon> Comment 15</a></li>
                    </ul>
                    <a href="#"><VisibilityIcon></VisibilityIcon>Views 50</a>
                </div>
            </div>{/*post-bar end*/}
        </div>

    );
}

export { Post };