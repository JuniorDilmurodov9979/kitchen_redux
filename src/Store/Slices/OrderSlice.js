import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: [], // Array of clients, each having their own orders
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      const { clientId, order } = action.payload;
      console.log(clientId);

      const clientIndex = state.clients.findIndex(
        (client) => client.clientId === clientId
      );

      if (clientIndex !== -1) {
        const client = state.clients[clientIndex];

        const existingOrderIndex = client.orders.findIndex(
          (o) => o.name === order.name
        );

        if (existingOrderIndex !== -1) {
          // If order exists, update count
          client.orders[existingOrderIndex].count = order.count;

          // If count is 0, remove the item
          if (order.count === 0) {
            client.orders.splice(existingOrderIndex, 1);
          }
        } else if (order.count > 0) {
          // Add order if it's a new order and count > 0
          client.orders.push(order);
        }

        // If client has no orders left, remove the client
        if (client.orders.length === 0) {
          state.clients.splice(clientIndex, 1);
        }
      } else {
        // If client doesn't exist, create a new one
        if (order.count > 0) {
          state.clients.push({
            clientId,
            orders: [order],
          });
        }
      }
    },

    removeClientOrders: (state, action) => {
      const { id } = action.payload;
      console.log(action.payload);

      state.clients = state.clients.filter(
        (client) => client.clientId !== id
      );
    },
  },
});

export const { setOrder, removeClientOrders } = orderSlice.actions;
export default orderSlice.reducer;
