import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ChangeInfomationModal from './../changeInfomationModal/changeInfomationModal'
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
const useStyles = makeStyles({
  table: {
    width: 1000
  },
  widthTitle: {
    width: "25%"
  },
});

export default function InfomationTab() {
  const classes = useStyles();
  const userInfo = useSelector(state => state.authentication.user.data.user);
  console.log(userInfo);
  return (
    <TableContainer style={{ boxShadow: "none" }} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableCell align="left"><h2>Thông tin cá nhân</h2></TableCell>
          <TableCell align="right"><ChangeInfomationModal></ChangeInfomationModal></TableCell>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.widthTitle} component="th" scope="row">
              Tên
              </TableCell>
            <TableCell align="left">{userInfo ? userInfo.firstname : ''} {userInfo ? userInfo.lastname : ''}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.widthTitle} component="th" scope="row">
              Ngày sinh
              </TableCell>
            <TableCell align="left">{userInfo ? (userInfo.birthday?<Moment format="DD/MM/YYYY">{userInfo.birthday}</Moment>:'') : ''}</TableCell>
            {/* <TableCell align="right"><a href="#">Chỉnh sửa</a></TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell className={classes.widthTitle} component="th" scope="row">
              Địa chỉ
              </TableCell>
            <TableCell align="left">{userInfo ? userInfo.address : ''}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.widthTitle} component="th" scope="row">
              Email
              </TableCell>
            <TableCell align="left">{userInfo ? userInfo.email : ''}</TableCell>
            {/* <TableCell align="right"><a href="#">Chỉnh sửa</a></TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Số điện thoại
              </TableCell>
            <TableCell align="left">{userInfo ? userInfo.phoneNumber : ''}</TableCell>
            {/* <TableCell align="right"><a href="#">Chỉnh sửa</a></TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Sở thích
              </TableCell>
            <TableCell align="left">{userInfo ? userInfo.interests.map(ele=>ele.name+ ', '): ''}</TableCell>
            {/* <TableCell align="right"><a href="#">Chỉnh sửa</a></TableCell> */}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
