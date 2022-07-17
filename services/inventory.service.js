const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');

class InventoryService {

  constructor() {
  }

  async create(data) {
    const from = await this.getDateLastInventory();
    const to = new Date(new Date().getTime());
    const productInventories = await this.getProductInventories();
    let inventory = {
      from: from,
      to: to,
      productInventories: productInventories
    };

    return this.finishProductInventories(inventory);
  }

  async finishProductInventories(inventory) {
    for (let productInventory of inventory?.productInventories) {
      productInventory = await this.finishProductInventory(productInventory, inventory.from, inventory.to);
    }
    return inventory;
  }

  async finishProductInventory(productInventory, from, to) {
    const productMoves = await models.ProductMove.findAll({
      where: {
        productId: productInventory.productId,
        sizeId: productInventory.sizeId,
        delivered: true,
        createdAt: {
          [Op.gte]: from,
          [Op.lte]: to,
        }
      }
    });
    if (!productMoves)
      return productInventory;

    let selledQuantity = 0;
    let selledCost = 0;
    let addedQuantity = 0;
    let addedCost = 0;

    for (const productMove of productMoves) {
      if (productMove.exit) {
        selledQuantity += productMove.quantity;
        selledCost += productMove.cost * productMove.quantity;
      }
      else {
        addedQuantity += productMove.quantity;
        addedCost += productMove.cost * productMove.quantity;
      }
    }

    productInventory.addedQuantity = addedQuantity;
    productInventory.selledQuantity = selledQuantity;
    productInventory.selledCost = selledCost;
    productInventory.addedCost = addedCost;
    productInventory.finalQuantity = productInventory.initialQuantity + addedQuantity - selledQuantity;
    productInventory.finalCost = productInventory.initialCost + addedCost - selledCost;
    return productInventory;
  }

  async getProductInventories() {
    const productsId = await this.getProdutcsId();
    const sizesId = await this.getSizesId();

    const productInventories = []
    for (const product of productsId) {
      for (const size of sizesId) {
        const productInventory = await this.getProductInventory(size.id, product.id)
        productInventories.push(productInventory)
      }
    }

    return productInventories;
  }

  async getProductInventory(sizeId, productId) {
    const productInventory = await models.ProductInventory.findOne({
      where: {
        productId: productId,
        sizeId: sizeId
      },
      order: [['createdAt', 'DESC']]
    });

    return {
      productId: productId,
      initialQuantity: productInventory ? productInventory.finalQuantity : 0,
      addedQuantity: 0,
      selledQuantity: 0,
      finalQuantity: 0,
      initialCost: productInventory ? productInventory.finalcost : 0,
      addedCost: 0,
      selledCost: 0,
      finalCost: 0,
      sizeId: sizeId,
    }

  }

  async getDateLastInventory() {
    const inventory = await models.Inventory.findOne({
      order: [['createdAt', 'DESC']],
    });

    if (inventory)
      return inventory.to;


    const productMove = await models.ProductMove.findOne({
      order: [['createdAt', 'ASC']],
    });

    if (productMove)
      return productMove.createdAt;

    return new Date(new Date().getTime());
  }

  async getSizesId() {
    return await models.Size.findAll({
      attributes: ['id']
    });
  }

  async getProdutcsId() {
    return await models.Product.findAll({
      attributes: ['id']
    });
  }

}

module.exports = InventoryService;
