import { getApperClient } from "@/services/apperClient";

export const getOrders = async () => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return [];
    }

    const response = await apperClient.fetchRecords('order_c', {
      fields: [
        {"field": {"Name": "items_c"}},
        {"field": {"Name": "total_c"}},
        {"field": {"Name": "delivery_address_c"}},
        {"field": {"Name": "payment_method_c"}},
        {"field": {"Name": "status_c"}},
        {"field": {"Name": "order_date_c"}},
        {"field": {"Name": "estimated_delivery_c"}}
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    return (response.data || []).map(order => ({
      ...order,
      items_c: order.items_c ? JSON.parse(order.items_c) : [],
      delivery_address_c: order.delivery_address_c ? JSON.parse(order.delivery_address_c) : {}
    }));
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const getOrderById = async (id) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const response = await apperClient.getRecordById('order_c', parseInt(id), {
      fields: [
        {"field": {"Name": "items_c"}},
        {"field": {"Name": "total_c"}},
        {"field": {"Name": "delivery_address_c"}},
        {"field": {"Name": "payment_method_c"}},
        {"field": {"Name": "status_c"}},
        {"field": {"Name": "order_date_c"}},
        {"field": {"Name": "estimated_delivery_c"}}
      ]
    });

    if (!response.success || !response.data) {
      return null;
    }

    const order = response.data;
    return {
      ...order,
      items_c: order.items_c ? JSON.parse(order.items_c) : [],
      delivery_address_c: order.delivery_address_c ? JSON.parse(order.delivery_address_c) : {}
    };
  } catch (error) {
    console.error("Error fetching order by id:", error);
    return null;
  }
};

export const createOrder = async (orderData) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const now = new Date().toISOString();
    const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();

    const payload = {
      items_c: JSON.stringify(orderData.items_c || []),
      total_c: orderData.total_c || 0,
      delivery_address_c: JSON.stringify(orderData.delivery_address_c || {}),
      payment_method_c: orderData.payment_method_c || "",
      status_c: orderData.status_c || "confirmed",
      order_date_c: now,
      estimated_delivery_c: estimatedDelivery
    };

    const response = await apperClient.createRecord('order_c', {
      records: [payload]
    });

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results && response.results.length > 0) {
      const result = response.results[0];
      if (result.success) {
        return {
          ...result.data,
          items_c: result.data.items_c ? JSON.parse(result.data.items_c) : [],
          delivery_address_c: result.data.delivery_address_c ? JSON.parse(result.data.delivery_address_c) : {}
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error creating order:", error);
    return null;
  }
};

export const updateOrder = async (id, updates) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const payload = {
      Id: parseInt(id),
      ...(updates.items_c && { items_c: JSON.stringify(updates.items_c) }),
      ...(updates.total_c !== undefined && { total_c: updates.total_c }),
      ...(updates.delivery_address_c && { delivery_address_c: JSON.stringify(updates.delivery_address_c) }),
      ...(updates.payment_method_c && { payment_method_c: updates.payment_method_c }),
      ...(updates.status_c && { status_c: updates.status_c }),
      ...(updates.order_date_c && { order_date_c: updates.order_date_c }),
      ...(updates.estimated_delivery_c && { estimated_delivery_c: updates.estimated_delivery_c })
    };

    const response = await apperClient.updateRecord('order_c', {
      records: [payload]
    });

    if (!response.success) {
      console.error(response.message);
      return null;
    }

    if (response.results && response.results.length > 0) {
      const result = response.results[0];
      if (result.success) {
        return {
          ...result.data,
          items_c: result.data.items_c ? JSON.parse(result.data.items_c) : [],
          delivery_address_c: result.data.delivery_address_c ? JSON.parse(result.data.delivery_address_c) : {}
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error updating order:", error);
    return null;
  }
};

export const deleteOrder = async (id) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return false;
    }

    const response = await apperClient.deleteRecord('order_c', {
      RecordIds: [parseInt(id)]
    });

    if (!response.success) {
      console.error(response.message);
      return false;
    }

    if (response.results && response.results.length > 0) {
      return response.results[0].success;
    }

    return false;
  } catch (error) {
    console.error("Error deleting order:", error);
    return false;
  }
};

export const getOrdersByStatus = async (status) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return [];
    }

    const response = await apperClient.fetchRecords('order_c', {
      fields: [
        {"field": {"Name": "items_c"}},
        {"field": {"Name": "total_c"}},
        {"field": {"Name": "delivery_address_c"}},
        {"field": {"Name": "payment_method_c"}},
        {"field": {"Name": "status_c"}},
        {"field": {"Name": "order_date_c"}},
        {"field": {"Name": "estimated_delivery_c"}}
      ],
      where: [
        {
          "FieldName": "status_c",
          "Operator": "EqualTo",
          "Values": [status]
        }
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    return (response.data || []).map(order => ({
      ...order,
      items_c: order.items_c ? JSON.parse(order.items_c) : [],
      delivery_address_c: order.delivery_address_c ? JSON.parse(order.delivery_address_c) : {}
    }));
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    return [];
  }
};