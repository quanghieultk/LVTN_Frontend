import React,{useState} from 'react';
import ImageIcon from '@material-ui/icons/Image';
import PeopleIcon from '@material-ui/icons/People';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import RoomIcon from '@material-ui/icons/Room';
// import "./StatusForm.css";
function StatusForm() {
  return (
    <div className="panel">
        <div className="panel-heading">
        <h3 className="panel-title">Activity Feed</h3>
        </div>
        <div className="panel-content panel-activity">
        <form action="#" className="panel-activity__status">
            <textarea name="content" placeholder="Share what you've been up to..." className="form-control" defaultValue={""} />
            <div className="actions">
            <div className="btn-group">
                <button type="button" className="btn-link" data-toggle="tooltip" data-original-title="Post an Image">
                <ImageIcon></ImageIcon>
                </button>
                <button type="button" className="btn-link"  data-toggle="tooltip" data-original-title="Post an Video">
                <PeopleIcon></PeopleIcon>
                </button>
                <button type="button" className="btn-link"  data-toggle="tooltip" data-original-title="Post an Idea">
                <InsertEmoticonIcon></InsertEmoticonIcon>
                </button>
                <button type="button" className="btn-link"  data-toggle="tooltip" data-original-title="Post an Question">
                <RoomIcon></RoomIcon>
                </button>
            </div>
            <button  type="submit" className="btn btn-sm btn-rounded btn-info">
                Post
            </button>
            </div>
        </form>
        </div>
    </div>
  );
}

export { StatusForm};