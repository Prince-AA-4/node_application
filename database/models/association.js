import { User } from "./user.model.js";
import Post from "./post.model.js";

User.hasMany(Post, {
  foreignKey: "user_id",
  as: "posts",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default { User, Post };
