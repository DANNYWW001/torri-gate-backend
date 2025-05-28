const { parse } = require("dotenv");
const PROPERTY = require("../models/property");

const createProperty = async (req, res) => {
  res.send("create property");
};

const getLandlordsProperties = async (req, res) => {
  const { userId } = req.user;
  const { page = 1 } = req.query;
  const limit = 5;
  const skip = (page - 1) * limit;
  try {
    const properties = await PROPERTY.find({ landlord: userId })
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);
    // const [total, availableProperties, rentedProperties] = await Promise.all([
    //   PROPERTY.countDocuments({ landlord: userId }),
    //   PROPERTY.countDocuments({ landlord: userId, availability: "available" }),
    //   PROPERTY.countDocuments({ landlord: userId, availability: "rented" }),
    // ]); this code was refactored from the one below they are both correct, you can use this one commented or the one below 
    const total = await PROPERTY.countDocuments({ landlord: userId });
    const totalPages = Math.ceil(total / limit);
    const availableProperties = await PROPERTY.countDocuments({
      landlord: userId,
      availability: "availableJJ",
    });
    const rentedProperties = await PROPERTY.countDocuments({
      landlord: userId,
      availability: "rented",
    });
    res.status(200).json({
      total,
      availableProperties,
      rentedProperties,
      currentPage: parseInt(page),
      totalPages,
      properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updatePropertyAvailability = async (req, res) => {
  res.send("update property availability");
};

//find() // numof pages
const getAllProperties = async (req, res) => {
  const { page = 1, location, budget, type } = req.query;
  const limit = 12;
  const skip = (page - 1) * limit;
  try {
    const filter = {
      availability: "available",
    };
    if (location) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }
    if (budget) {
      filter.price = { $lte: parseInt(budget) };
    }
    if (type) {
      filter.title = { $regex: type, $options: "i" };
    }

    const properties = await PROPERTY.find(filter)
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    const totalProperties = await PROPERTY.countDocuments(filter);
    const totalPages = Math.ceil(totalProperties / limit);

    res.status(200).json({
      num: properties.length,
      totalPages,
      currentPage: parseInt(page),
      properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAProperty = async (req, res) => {
  res.send("get a property");
};

module.exports = {
  createProperty,
  getLandlordsProperties,
  updatePropertyAvailability,
  getAllProperties,
  getAProperty,
};
