import React, { useContext, useEffect, useState } from "react";
import { Receipt } from "lucide-react";
import Modal from "react-modal";
import "./MyOrders.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/assets";

Modal.setAppElement("#root");

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel" />
              <p>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>${order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p>
                <span>&#x25cf;</span> <b>{order.status}</b>
              </p>
              <Receipt
                size={24}
                className="bill-icon"
                onClick={() => setSelectedOrder(order)}
              />
            </div>
          );
        })}
      </div>
      <Modal
        isOpen={!!selectedOrder}
        onRequestClose={() => setSelectedOrder(null)}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {selectedOrder && (
          <div className="bill-content" style={{ textAlign: "left", padding: "20px" }}>
            <h3 style={{ textAlign: "center", marginBottom: "10px" }}>Order Bill</h3>
            <p><b>Order ID:</b> {selectedOrder._id}</p>
            <p><b>Amount:</b> ${selectedOrder.amount}.00</p>
            <p><b>Items:</b></p>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>{item.name} x {item.quantity}</li>
              ))}
            </ul>
            <button
              style={{ display: "block", margin: "20px auto", padding: "8px 15px", border: "none", background: "#007bff", color: "white", cursor: "pointer", borderRadius: "5px" }}
              onClick={() => setSelectedOrder(null)}
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyOrders;