const {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomersService,
  updateOneCustomerService,
  deleteACustomerService,
  deleteArrayCustomerService,
} = require("../services/customerService");
const { uploadSingleFile } = require("../services/fileService");

module.exports = {
  postCreateCustomer: async (req, res) => {
    let { name, address, phone, email, description } = req.body;

    let imageUrl = "";

    if (!req.files || Object.keys(req.files).length === 0) {
      //do nothing
    } else {
      let result = await uploadSingleFile(req.files.image);
      imageUrl = result.path;
    }
    let customerData = {
      name,
      address,
      phone,
      email,
      description,
      image: imageUrl,
    };
    let customer = await createCustomerService(customerData);
    return res.status(200).json({
      errorCode: 0,
      data: customer,
    });
  },

  postCreateArrayCustomer: async (req, res) => {
    let customers = await createArrayCustomerService(req.body.customers);
    if (customers) {
      return res.status(200).json({
        errorCode: 0,
        data: customers,
      });
    } else {
      return res.status(200).json({
        errorCode: -1,
        data: customers,
      });
    }
  },

  getAllCustomers: async (req, res) => {
    console.log(req.query);
    let limit = req.query.limit;
    let page = req.query.page;
    let result = null;
    if (limit && page) {
      result = await getAllCustomersService(limit, page);
    } else {
      result = await getAllCustomersService();
    }
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  },

  putUpdateOneCustomer: async (req, res) => {
    let { userId, name, address, phone, email, description } = req.body;
    let result = await updateOneCustomerService(
      userId,
      name,
      address,
      phone,
      email,
      description
    );
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  },

  deleteACustomer: async (req, res) => {
    let id = req.body.id;
    let result = await deleteACustomerService(id);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  },

  deleteArrayCustomer: async (req, res) => {
    let ids = req.body.id;
    // console.log(">>>check ids", req.body);
    let result = await deleteArrayCustomerService(ids);
    return res.status(200).json({
      errorCode: 0,
      data: result,
    });
  },
};
