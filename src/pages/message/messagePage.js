import React, { useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Header } from '../../components/header/Header';
import { Container } from '@material-ui/core';
import { MessengerSidePanel } from './messengerSidePanel';
import { MessContent } from './messegerContent';
import {
    MainContainer,
} from "@chatscope/chat-ui-kit-react";
import { useSelector } from 'react-redux';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({
    formMessage: {
        height: "85vh",
        position: "relative"
    },
    nonePadding: {
        padding: "0!important"
    }
}));

export function MessagePage() {
    const classes = useStyles();
    const roomId = useSelector(state => state.chat.roomId);
    const chat = useSelector(state => state.chat);

    useEffect(() => {

    }, [roomId])
    return (
        <Container>
            <Grid container spacing={3} >
                <Grid item xs={12} className={classes.nonePadding}>
                    <Header></Header>
                </Grid>
                <Grid className={classes.formMessage} item xs={12} style={{ marginTop: "80px" }}>
                    <MainContainer responsive>
                        <MessengerSidePanel></MessengerSidePanel>
                        {
                            chat.currentRoom ? (
                                <Fragment>
                                    <MessContent
                                        content={chat[roomId]}
                                        key={roomId}
                                    >

                                    </MessContent>
                                </Fragment>
                            ) : null

                        }

                    </MainContainer>
                </Grid>
            </Grid>
        </Container >
    );
}
