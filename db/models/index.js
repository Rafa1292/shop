const { AccountHistory, AccountHistorySchema } = require('./account-history.model');
const { Account, AccountSchema } = require('./account.model');
const { Brand, BrandSchema } = require('./brand.model');
const { Category, CategorySchema } = require('./category.model');
const { Color, ColorSchema } = require('./color.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');
const { Order, OrderSchema } = require('./order.model');
const { PaymentAccountHistory, PaymentAccountHistorySchema } = require('./payment-accountHistory.model');
const { Payment, PaymentSchema } = require('./payment.model');
const { Paymethod, PaymethodSchema } = require('./paymethod.model');
const { ProductSize, ProductSizeSchema } = require('./product-size.model');
const { Product, ProductSchema } = require('./product.model');
const { Size, SizeSchema } = require('./size.model');
const { Subcategory, SubcategorySchema } = require('./subcategory.model');
const { User, UserSchema } = require('./user.model');
const { State, StateSchema } = require('./state.model');
const { OrderState, OrderStateSchema } = require('./order-state.model');

function SetUpModels(sequelize) {
  AccountHistory.init(AccountHistorySchema, AccountHistory.config(sequelize));
  Account.init(AccountSchema, Account.config(sequelize));
  Brand.init(BrandSchema, Brand.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Color.init(ColorSchema, Color.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  PaymentAccountHistory.init(PaymentAccountHistorySchema, PaymentAccountHistory.config(sequelize));
  Payment.init(PaymentSchema, Payment.config(sequelize));
  Paymethod.init(PaymethodSchema, Paymethod.config(sequelize));
  ProductSize.init(ProductSizeSchema, ProductSize.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Size.init(SizeSchema, Size.config(sequelize));
  Subcategory.init(SubcategorySchema, Subcategory.config(sequelize));
  User.init(UserSchema, User.config(sequelize));
  State.init(StateSchema, State.config(sequelize));
  OrderState.init(OrderStateSchema, OrderState.config(sequelize));

  AccountHistory.associate(sequelize.models);
  Account.associate(sequelize.models);
  Brand.associate(sequelize.models);
  Category.associate(sequelize.models);
  Color.associate(sequelize.models);
  Customer.associate(sequelize.models);
  OrderProduct.associate(sequelize.models);
  Order.associate(sequelize.models);
  Payment.associate(sequelize.models);
  ProductSize.associate(sequelize.models);
  Product.associate(sequelize.models);
  Size.associate(sequelize.models);
  Subcategory.associate(sequelize.models);
  User.associate(sequelize.models);
  State.associate(sequelize.models);
  OrderState.associate(sequelize.models);
  Paymethod.associate(sequelize.models);
}

module.exports = SetUpModels;
