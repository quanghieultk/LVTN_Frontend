import React,{useState} from 'react';
import AddIcon from '@material-ui/icons/Add';
function BestRestaurant() {

  return (
    <div className="widget suggestions full-width">
        <div className="sd-title">
            <h3>Best restaurant</h3>
            <i className="la la-ellipsis-v" />
        </div>{/*sd-title end*/}
        <div className="suggestions-list">
            <div className="suggestion-usd">
            <img src="images/resources/s1.png" alt="" />
            <div className="sgt-text">
                <h4>Jessica William</h4>
                <span>Graphic Designer</span>
            </div>
            <span><AddIcon></AddIcon></span>
            </div>
            <div className="suggestion-usd">
            <img src="images/resources/s1.png" alt="" />
            <div className="sgt-text">
                <h4>Jessica William</h4>
                <span>Graphic Designer</span>
            </div>
            <span><AddIcon></AddIcon></span>
            </div><div className="suggestion-usd">
            <img src="images/resources/s1.png" alt="" />
            <div className="sgt-text">
                <h4>Jessica William</h4>
                <span>Graphic Designer</span>
            </div>
            <span><AddIcon></AddIcon></span>
            </div><div className="suggestion-usd">
            <img src="images/resources/s1.png" alt="" />
            <div className="sgt-text">
                <h4>Jessica William</h4>
                <span>Graphic Designer</span>
            </div>
            <span><AddIcon></AddIcon></span>
            </div>
            <div className="view-more">
            <a href="#" title>View More</a>
            </div>
        </div>{/*suggestions-list end*/}
    </div>
  );
}

export { BestRestaurant};