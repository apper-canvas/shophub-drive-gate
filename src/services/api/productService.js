import { getApperClient } from "@/services/apperClient";

export const getProducts = async () => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return [];
    }

    const response = await apperClient.fetchRecords('product_c', {
      fields: [
        {"field": {"Name": "name_c"}},
        {"field": {"Name": "description_c"}},
        {"field": {"Name": "price_c"}},
        {"field": {"Name": "original_price_c"}},
        {"field": {"Name": "category_c"}},
        {"field": {"Name": "subcategory_c"}},
        {"field": {"Name": "images_c"}},
        {"field": {"Name": "rating_c"}},
        {"field": {"Name": "review_count_c"}},
        {"field": {"Name": "in_stock_c"}},
        {"field": {"Name": "specifications_c"}},
        {"field": {"Name": "brand_c"}}
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    return (response.data || []).map(product => ({
      ...product,
      images_c: product.images_c ? product.images_c.split('\n').filter(Boolean) : [],
      specifications_c: product.specifications_c ? JSON.parse(product.specifications_c) : {}
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getBrands = async () => {
  try {
    const products = await getProducts();
    const brands = [...new Set(products.map(p => p.brand_c))].filter(Boolean).sort();
    return brands;
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

export const getProductById = async (id) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const response = await apperClient.getRecordById('product_c', parseInt(id), {
      fields: [
        {"field": {"Name": "name_c"}},
        {"field": {"Name": "description_c"}},
        {"field": {"Name": "price_c"}},
        {"field": {"Name": "original_price_c"}},
        {"field": {"Name": "category_c"}},
        {"field": {"Name": "subcategory_c"}},
        {"field": {"Name": "images_c"}},
        {"field": {"Name": "rating_c"}},
        {"field": {"Name": "review_count_c"}},
        {"field": {"Name": "in_stock_c"}},
        {"field": {"Name": "specifications_c"}},
        {"field": {"Name": "brand_c"}}
      ]
    });

    if (!response.success || !response.data) {
      return null;
    }

    const product = response.data;
    return {
      ...product,
      images_c: product.images_c ? product.images_c.split('\n').filter(Boolean) : [],
      specifications_c: product.specifications_c ? JSON.parse(product.specifications_c) : {}
    };
  } catch (error) {
    console.error("Error fetching product by id:", error);
    return null;
  }
};

export const getCategories = async () => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return [];
    }

    const response = await apperClient.fetchRecords('category_c', {
      fields: [
        {"field": {"Name": "name_c"}},
        {"field": {"Name": "subcategories_c"}},
        {"field": {"Name": "icon_c"}}
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    return (response.data || []).map(category => ({
      ...category,
      subcategories_c: category.subcategories_c ? category.subcategories_c.split('\n').filter(Boolean) : []
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCategoryById = async (id) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const response = await apperClient.getRecordById('category_c', parseInt(id), {
      fields: [
        {"field": {"Name": "name_c"}},
        {"field": {"Name": "subcategories_c"}},
        {"field": {"Name": "icon_c"}}
      ]
    });

    if (!response.success || !response.data) {
      return null;
    }

    const category = response.data;
    return {
      ...category,
      subcategories_c: category.subcategories_c ? category.subcategories_c.split('\n').filter(Boolean) : []
    };
  } catch (error) {
    console.error("Error fetching category by id:", error);
    return null;
  }
};

export const getProductsByCategory = async (categoryName) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return [];
    }

    const response = await apperClient.fetchRecords('product_c', {
      fields: [
        {"field": {"Name": "name_c"}},
        {"field": {"Name": "description_c"}},
        {"field": {"Name": "price_c"}},
        {"field": {"Name": "original_price_c"}},
        {"field": {"Name": "category_c"}},
        {"field": {"Name": "subcategory_c"}},
        {"field": {"Name": "images_c"}},
        {"field": {"Name": "rating_c"}},
        {"field": {"Name": "review_count_c"}},
        {"field": {"Name": "in_stock_c"}},
        {"field": {"Name": "specifications_c"}},
        {"field": {"Name": "brand_c"}}
      ],
      where: [
        {
          "FieldName": "category_c",
          "Operator": "EqualTo",
          "Values": [categoryName]
        }
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    return (response.data || []).map(product => ({
      ...product,
      images_c: product.images_c ? product.images_c.split('\n').filter(Boolean) : [],
      specifications_c: product.specifications_c ? JSON.parse(product.specifications_c) : {}
    }));
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const searchProducts = async (query) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return [];
    }

    const response = await apperClient.fetchRecords('product_c', {
      fields: [
        {"field": {"Name": "name_c"}},
        {"field": {"Name": "description_c"}},
        {"field": {"Name": "price_c"}},
        {"field": {"Name": "original_price_c"}},
        {"field": {"Name": "category_c"}},
        {"field": {"Name": "subcategory_c"}},
        {"field": {"Name": "images_c"}},
        {"field": {"Name": "rating_c"}},
        {"field": {"Name": "review_count_c"}},
        {"field": {"Name": "in_stock_c"}},
        {"field": {"Name": "specifications_c"}},
        {"field": {"Name": "brand_c"}}
      ],
      whereGroups: [
        {
          "operator": "OR",
          "subGroups": [
            {
              "conditions": [
                {
                  "fieldName": "name_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "description_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "category_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            },
            {
              "conditions": [
                {
                  "fieldName": "brand_c",
                  "operator": "Contains",
                  "values": [query]
                }
              ]
            }
          ]
        }
      ]
    });

    if (!response.success) {
      console.error(response.message);
      return [];
    }

    return (response.data || []).map(product => ({
      ...product,
      images_c: product.images_c ? product.images_c.split('\n').filter(Boolean) : [],
      specifications_c: product.specifications_c ? JSON.parse(product.specifications_c) : {}
    }));
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
};

export const createProduct = async (productData) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const payload = {
      name_c: productData.name_c || "",
      description_c: productData.description_c || "",
      price_c: productData.price_c || 0,
      original_price_c: productData.original_price_c || 0,
      category_c: productData.category_c || "",
      subcategory_c: productData.subcategory_c || "",
      images_c: Array.isArray(productData.images_c) ? productData.images_c.join('\n') : "",
      rating_c: productData.rating_c || 0,
      review_count_c: productData.review_count_c || 0,
      in_stock_c: productData.in_stock_c !== undefined ? productData.in_stock_c : true,
      specifications_c: productData.specifications_c ? JSON.stringify(productData.specifications_c) : "{}",
      brand_c: productData.brand_c || ""
    };

    const response = await apperClient.createRecord('product_c', {
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
          images_c: result.data.images_c ? result.data.images_c.split('\n').filter(Boolean) : [],
          specifications_c: result.data.specifications_c ? JSON.parse(result.data.specifications_c) : {}
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error creating product:", error);
    return null;
  }
};

export const updateProduct = async (id, updates) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return null;
    }

    const payload = {
      Id: parseInt(id),
      ...(updates.name_c && { name_c: updates.name_c }),
      ...(updates.description_c && { description_c: updates.description_c }),
      ...(updates.price_c !== undefined && { price_c: updates.price_c }),
      ...(updates.original_price_c !== undefined && { original_price_c: updates.original_price_c }),
      ...(updates.category_c && { category_c: updates.category_c }),
      ...(updates.subcategory_c && { subcategory_c: updates.subcategory_c }),
      ...(updates.images_c && { images_c: Array.isArray(updates.images_c) ? updates.images_c.join('\n') : updates.images_c }),
      ...(updates.rating_c !== undefined && { rating_c: updates.rating_c }),
      ...(updates.review_count_c !== undefined && { review_count_c: updates.review_count_c }),
      ...(updates.in_stock_c !== undefined && { in_stock_c: updates.in_stock_c }),
      ...(updates.specifications_c && { specifications_c: typeof updates.specifications_c === 'object' ? JSON.stringify(updates.specifications_c) : updates.specifications_c }),
      ...(updates.brand_c && { brand_c: updates.brand_c })
    };

    const response = await apperClient.updateRecord('product_c', {
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
          images_c: result.data.images_c ? result.data.images_c.split('\n').filter(Boolean) : [],
          specifications_c: result.data.specifications_c ? JSON.parse(result.data.specifications_c) : {}
        };
      }
    }

    return null;
  } catch (error) {
    console.error("Error updating product:", error);
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    const apperClient = getApperClient();
    if (!apperClient) {
      console.error("ApperClient not initialized");
      return false;
    }

    const response = await apperClient.deleteRecord('product_c', {
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
    console.error("Error deleting product:", error);
    return false;
  }
};