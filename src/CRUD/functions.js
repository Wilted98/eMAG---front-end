import axios from "axios";

export const getCategories = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/categories`);
};

export const createCategory = async (authtoken, category, title) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/category`,
    { name: category, title },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getCategory = async (slug) => {
  return await axios.get(`${process.env.REACT_APP_API}/category/${slug}`);
};

export const removeCategory = async (slug, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/category/${slug}`, {
    headers: {
      authtoken,
    },
  });
};

export const updateCategory = async (slug, category, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/category/${slug}`,
    category,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createProduct = async (authtoken, product) => {
  return await axios.post(`${process.env.REACT_APP_API}/product`, product, {
    headers: {
      authtoken,
    },
  });
};

export const getProductByCat = async (slug) => {
  return await axios.post(`${process.env.REACT_APP_API}/homepageproducts`, {
    slug,
  });
};
export const getProductsByCat = async (slug) => {
  return await axios.post(`${process.env.REACT_APP_API}/homepageproduct`, {
    slug,
  });
};

export const getProductBySlug = async (slug) => {
  return await axios.post(`${process.env.REACT_APP_API}/${slug}`, {
    slug,
  });
};

export const LeaveRatingAndComment = async (arg, authtoken, id, images) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/leaveratingandcomment`,
    {
      arg,
      id,
      images,
    },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const GetRatingAndComment = async (id, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/getratingandcomment`,
    { id },
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const fetchProductsByFilter = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/search/filters`, arg);
};

export const fetchQuery = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/search/query`, arg);
};

export const addMainDescription = async (arg, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/admin/add-description`,
    arg,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getMainDescription = async (arg) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/admin/get-description`,
    arg
  );
};

export const addSpecs = async (arg, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/admin/add-specs`, arg, {
    headers: {
      authtoken,
    },
  });
};

export const getSpecs = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/admin/get-specs`, arg);
};

export const likeAndUnlike = async (arg, authtoken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/comment/likeandunlike`,
    arg,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const createCoupon = async (arg, authtoken) => {
  return await axios.post(`${process.env.REACT_APP_API}/admin/coupon`, arg, {
    headers: {
      authtoken,
    },
  });
};

export const removeCoupon = async (arg, authtoken) => {
  return await axios.delete(`${process.env.REACT_APP_API}/admin/${arg}`, {
    headers: {
      authtoken,
    },
  });
};

export const listCoupons = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/admin/coupons`);
};

export const verifyCoupon = async (arg) => {
  return await axios.post(`${process.env.REACT_APP_API}/user/coupon`, arg);
};

export const createPaymentIntent = async (authtoken, amount) => {
  return await axios.get(`${process.env.REACT_APP_API}/create-payment-intent`, {
    headers: {
      authtoken,
      amount,
    },
  });
};

export const updateQuantity = async (ids) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/productupdate/quantity`,
    ids
  );
};

export const updateImgProfile = async (arg, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/update-img-profile`,
    arg,
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const getImageProfile = async (id) => {
  return await axios.get(`${process.env.REACT_APP_API}/get-image-profile`, id);
};

export const updateUserProfile = async (arg, authtoken) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/update-user-profile`,
    arg,
    {
      headers: {
        authtoken,
      },
    }
  );
};
