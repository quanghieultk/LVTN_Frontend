import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Rate } from 'antd';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    '@global': {
        '#listRestFavorite .MuiListItem-gutters': {
            display: "block"
        }
    }
}));


export function FavouriteRestaurant(props) {

    return (
        <List id="listRestFavorite">
            <ListItem>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                ABC restaurant
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                301 Phạm Văn Đồng
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Chúng tôi là nhà hàng xịn nhất Việt Nam
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Nhà hàng 5 sao
                            </Typography>
                            <Rate disabled allowHalf defaultValue={2.5}/>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </ListItem>
        </List>
    );
}
