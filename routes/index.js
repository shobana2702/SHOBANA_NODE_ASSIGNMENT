const express = require("express");
const router = express.Router();

var prod = require("../models/product");

//1.list Product
router.post("/product", function(req, res, next) {
  var productArray = prod.getProducts(req.body);
  res.json(productArray);
});

//2.Add Product
router.post("/product/add", function(req, res, next) {
  req.checkBody("productName", " Product Name is required").notEmpty();
  req.checkBody("price", " Product Price is required").notEmpty();
  req.checkBody("inTheBox", " Box Details is required").notEmpty();
  req.checkBody("modelNumber", " Model Number is required").notEmpty();
  req.checkBody("size", " Size is required").notEmpty();
  req.checkBody("color", " Color is required").notEmpty();
  req.checkBody("touchScreen", " Touch Screen is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.status(400);
    res.send(errors);
  } else {
    var newProductArray = prod.addProduct(req.body);
    res.json(newProductArray);
  }
});

//4.Remove Product
router.delete("/product/remove", function(req, res, next) {
  req.checkBody("id", " Id is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.status(400);
    res.send(errors);
  } else {
    var productArray = prod.removeProduct(req.body);
    if (productArray !== null) {
      res.json(productArray);
    } else {
      res.status(400);
      res.send("Product not found");
    }
  }
});

//3.Update Product
router.post("/product/update", function(req, res, next) {
  req.checkBody("id", " Id is required").notEmpty();
  req.checkBody("productName", " Product Name is required").notEmpty();
  req.checkBody("price", " Product Price is required").notEmpty();
  req.checkBody("inTheBox", " Box Details is required").notEmpty();
  req.checkBody("modelNumber", " Model Number is required").notEmpty();
  req.checkBody("size", " Size is required").notEmpty();
  req.checkBody("color", " Color is required").notEmpty();
  req.checkBody("touchScreen", " Touch Screen is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.status(400);
    res.send(errors);
  } else {
    var updatedProductArray = prod.updateProduct(req.body);
    if (updatedProductArray !== null) {
      res.json(updatedProductArray);
    } else {
      res.status(400);
      res.send("Product not found");
    }
  }
});

//6.search by name
router.post("/product/searchByName", function(req, res, next) {
  req.checkBody("name", " Product Name is required").notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    res.status(400);
    res.send(errors);
  } else {
    var searchedProductArray = prod.searchProductByName(req.body);
    if (searchedProductArray !== null && searchedProductArray.length !== 0) {
      res.json(searchedProductArray);
    } else {
      res.status(400);
      res.send("Product not found");
    }
  }
});

//5. Search with name or id
router.post("/product/searchByNameOrId", function(req, res, next) {
  var errors = {};
  if (req.body.id === undefined && req.body.name === undefined) {
    errors = {
      location: "body",
      param: "id",
      msg: " Either Id or name is required"
    };
  } else if (req.body.id !== undefined && req.body.name !== undefined) {
    errors = {
      location: "body",
      param: "id",
      msg: " Provide Either Id or name"
    };
  }

  if (Object.keys(errors).length) {
    res.status(400);
    res.send(errors);
  } else {
    var searchedProductArray = prod.searchProductByNameOrId(req.body);
    if (searchedProductArray !== null && searchedProductArray.length !== 0) {
      res.json(searchedProductArray);
    } else {
      res.status(400);
      res.send("Product not found");
    }
  }
});

//8.Global Search
router.post("/product/globalSearch", function(req, res, next) {
  var errors = {};

  if (Object.keys(req.body).length === 0) {
    errors = {
      location: "body",
      param: "id",
      msg: " Provide Atleast one criteria to search"
    };
  }

  if (Object.keys(errors).length) {
    res.status(400);
    res.send(errors);
  } else {
    var searchedProductArray = prod.globalSearch(req.body);
    if (searchedProductArray != null && searchedProductArray.length !== 0) {
      res.json(searchedProductArray);
    } else {
      res.status(400);
      res.send("Product not found");
    }
  }
});

//7.Products by Category
router.post("/product/groupByCategory", function(req, res, next) {
  var productArray = prod.groupByCategory(req.body);
  res.json(productArray);
});

module.exports = router;
