import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {listOrders, deleteOrder, approveOrder} from '../actions/orderActions';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {IconButton} from "@material-ui/core";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

function OrdersPage(props) {

  const orderList = useSelector(state => state.orderList);
  const { loading, orders, error } = orderList;

  const orderDelete = useSelector(state => state.orderDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;

  const orderApprove = useSelector(state => state.orderApprove);
  const { loading: loadingApproval, success: successApproval, error: errorApproval } = orderApprove;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders());
    return () => {
      //
    };
  }, [successDelete, successApproval]);

  const deleteHandler = (order) => {
    dispatch(deleteOrder(order._id));
  }

  const approveHandler = (order) => {
    dispatch(approveOrder(order._id));
  }

  return loading ? <div>Loading...</div> :
    <div className="content content-margined">

      <div className="order-header">
        <h3>ALL ORDERS</h3>
      </div>
      <div className="order-list">

        <table className="table">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>DATE</th>
              <th>TOTAL CHARGES</th>
              <th>ORDERED BY</th>
              <th>PAID</th>
              {/*<th>PAID AT</th>*/}
              <th>STATUS</th>
              {/*<th>DELIVERED</th>*/}
              {/*<th>DELIVERED AT</th>*/}
              <th>DETAILS/DELETE</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (<tr key={order._id}>
              <td>{order._id}</td>

              <td>{order.createdAt}</td>
              <td>Ksh {order.totalPrice}</td>
              <td>{order.user.name}</td>
              <td>{order.isPaid ? 'Paid' : 'Not Paid'}</td>
              {/*<td>{order.paidAt}</td>*/}
              <td>{order.isApproved ? 'Approved' : 'Pending'}</td>
              {/*/!*<td>{order.isDelivered.toString()}</td>*!/*/}
              {/*<td>{order.deliveredAt}</td>*/}
              <td>
                <Link to={"/order/" + order._id} >
                  <IconButton>
                    <InfoOutlinedIcon style={{fontSize: 'xx-large'}}/>
                  </IconButton>
                </Link>
                {' '}
                <IconButton type="button" onClick={(e) => deleteHandler(order)}>
                  <DeleteForeverIcon style={{color: 'red', fontSize: 'xx-large'}}/>
                </IconButton>
              </td>
              <td>
                <button onClick={()=>approveHandler(order)}>Approve</button>
              </td>
            </tr>))}
          </tbody>
        </table>

      </div>
    </div>
}
export default OrdersPage;