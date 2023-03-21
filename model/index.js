// 시퀄라이즈 모델 불러옴
const Sequelize = require("sequelize");
const config = require("../config/config.json")["development"];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);
db.Post = require("./Post")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);
db.SecComment = require("./SecComment")(sequelize, Sequelize);

db.Post.hasMany(db.Comment, {
  foreignKey: "post_id",
  sourcekey: "index_number",
  onDelete: "cascade",
  onUpdate: "cascade"
});

db.Comment.belongsTo(db.Post, {
  foreignKey: "post_id",
  sourcekey: "index_number",
  onDelete: "cascade",
  onUpdate: "cascade"
});

db.Post.hasMany(db.SecComment, {
  foreignKey: "post_id",
  sourcekey: "index_number",
  onDelete: "cascade",
  onUpdate: "cascade"
});

db.SecComment.belongsTo(db.Post, {
  foreignKey: "post_id",
  sourcekey: "index_number",
  onDelete: "cascade",
  onUpdate: "cascade"
});

db.Comment.hasMany(db.SecComment, {
  foreignKey: "foreign_comment_id",
  sourcekey: "comment_id",
  onDelete: "cascade",
  onUpdate: "cascade"
});

db.SecComment.belongsTo(db.Comment, {
  foreignKey: "foreign_comment_id",
  sourcekey: "comment_id",
  onDelete: "cascade",
  onUpdate: "cascade"
});

db.User.hasMany(db.Post, {
  foreignKey: "userid", //payment table
  sourceKey: "id", // user_id table
  onDelete: "casacade",
})
db.Post.belongsTo(db.User, {
  foreignKey: "userid",
  sourceKey: "id",
  onDelete: "casacade",
})
db.User.hasMany(db.Post, {
  foreignKey: "writer", //payment table
  sourceKey: "name", // user_id table
  onDelete: "casacade",
})
db.Post.belongsTo(db.User, {
  foreignKey: "writer",
  sourceKey: "name",
  onDelete: "casacade",
})

module.exports = db;