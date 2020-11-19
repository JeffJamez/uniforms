import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function ProfilePage(props) {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const handleLogout = () => {
    dispatch(logout());
    props.history.push("/signin");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name, password }))
  }
  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const myOrderList = useSelector(state => state.myOrderList);
  const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo.name)
      setEmail(userInfo.email);
      setName(userInfo.name);
      setPassword(userInfo.password);
    }
    dispatch(listMyOrders());
    return () => {

    };
  }, [userInfo])

  return <div className="profile">
    <div className="profile-info">
      <div className="form">
        <form onSubmit={submitHandler} >
          <ul className="form-container">
            <li>
              <h2>My Profile</h2>
            </li>
            <li>
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
              {success && <div>Profile Saved Successfully.</div>}
            </li>
            <li>
              <label htmlFor="name">
                My UserName
          </label>
              <input value={name} type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="email">
                My Email
          </label>
              <input value={email} type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
              </input>
            </li>
            <li>
              <label htmlFor="password">Password</label>
              <input value={password} type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)}>
              </input>
            </li>

            <li>
              <button type="submit" className="button primary">Update</button>
            </li>
            <li>
              <button type="button" onClick={handleLogout} className="button secondary full-width">Logout</button>
            </li>

          </ul>
        </form>
      </div>
    </div>
    <TableContainer component={Paper}>
      {
        loadingOrders ? <div>Loading...</div> :
            errorOrders ? <div>{errorOrders} </div> :
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><h2>ITEM ID</h2></TableCell>
            <TableCell align="center"><h2>DATE</h2></TableCell>
            <TableCell align="center"><h2>TOTAL</h2></TableCell>
            <TableCell align="center"><h2>PAID</h2></TableCell>
            <TableCell align="center"><h2>ORDER STATUS</h2></TableCell>
            <TableCell align="center"><h2>MORE INFO</h2></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell component="th" scope="row">
                  <h2>{order._id}</h2>
                </TableCell>
                <TableCell align="center"><h2>{order.createdAt}</h2></TableCell>
                <TableCell align="center"><h2>Ksh. {order.totalPrice}</h2></TableCell>
                <TableCell align="center"><h2>{order.isPaid ? 'Paid' : 'Not Paid'}</h2></TableCell>
                <TableCell align="center"><h2>{order.isApproved ? 'Your order has been Approved' : 'Your order is Pending'}</h2></TableCell>
                <TableCell align="center">
                  <Link to={"/order/" + order._id}><h2>DETAILS</h2></Link>
                </TableCell>
              </TableRow>))}
        </TableBody>
      </Table>
      }
    </TableContainer>
  </div>
}

export default ProfilePage;