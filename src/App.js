import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { Router } from 'react-router-dom';
import { SignIn } from "./pages/signIn/signIn.js";
import { SignUp } from "./pages/signUp/signUp.js";
import { HomePage } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { Setting } from './pages/setting/setting';
import { ResetPassword } from './pages/resetPassword/resetPassword';
import { ForgotPassword } from './pages/forgotPassword/forgotPassword';
import { MessagePage } from './pages/message/messagePage';
import { Search } from './pages/search/search';
import { history } from './helpers/history';
import { PrivateRoute } from './components/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { PostStatus } from './components/postStatus/PostStatus';
import { Admin } from './pages/admin/Index';
import { Place } from './pages/place/place';
import { Wiki } from './pages/wikiFood/wiki';
import { Watch } from './pages/watch/watch';
import { Restaurant } from './pages/restaurant/Restaurant';
import { Friend } from './pages/friend/Friend';
import { ReviewRestaurant } from './pages/restaurant/ReviewRestaurant';
import { makeStyles } from "@material-ui/core/styles";

//alert
import { alertActions } from './actions/alert.actions';
import { socketActions } from './actions/socket.action.js';
import { Market } from './pages/market/market.js';
import { AdminRoute } from './components/AdminRoute.jsx';
import { RestaurantFollowByUser } from './pages/restaurant/RestaurantFollowByUser.js';
import { OnePost } from './pages/onePost/onePost.js';


const useStyles = makeStyles((theme)=>({
    '@global': {
        'body': {
            backgroundColor: "#F2F2F2"
        }
    }
}))
function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();
    const classes = useStyles();
    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            // dispatch(alertActions.clear());
        });
        if (localStorage.getItem('user')!=undefined)
            dispatch(socketActions.connect());
    }, []);
    return (
            <div>
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} />
                            <Route path="/signUp" component={SignUp} />
                            <Route path="/resetPassword/:token" component={ResetPassword} />
                            <Route path="/forgotPassword" component={ForgotPassword} />
                            <Route path="/home" component={HomePage} />
                            <Route path="/signIn" component={SignIn} />
                            <Route path="/profile/:id" render={(props) => <Profile {...props} />} />
                            <Route path="/message" component={MessagePage} />
                            <Route path="/setting" component={Setting} />
                            <Route path="/group" />
                            <AdminRoute path="/admin" component={Admin}/>
                            {/* <Route path="/post" component={PostStatus} /> */}
                            <Route path="/search/:description" render={(props) => <Search {...props} />} />
                            <Route path="/place" component={Place} />
                            <Route path="/market" component = {Market}/>
                            <Route path="/wiki" component={Wiki} />
                            <Route path="/page" component={Restaurant} />
                            
                            <Route path="/friend/:id" component={Friend} />
                            <Route path="/restaurantFollow/:idUser" render={(props) => <RestaurantFollowByUser {...props} />}/>
                            <Route path="/post/:idPost" render={(props) => <OnePost {...props} />}/>
                            {/* <Route path="/restaurant/:restaurantId" component={ManageRestaurant} /> */}
                            <Route path="/restaurant/:restaurantId" render={(props) => <ReviewRestaurant {...props} />} />
                            <Route path="/watch" component={Watch} />
                            <Redirect from="*" to="/" />
                        </Switch>
                    </Router>
            </div>
    );
}

export { App };
