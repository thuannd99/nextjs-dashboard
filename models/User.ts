import mongoose from 'mongoose';
import { Posts, PostSchema } from './Post';
import { Comments, CommentSchema } from './Comment';

export interface Users extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  role: string[];
  posts: mongoose.Types.Array<Posts>;
  comments: mongoose.Types.Array<Comments>;
}

const UserSchema = new mongoose.Schema<Users>(
  {
    name: {
      /* The name of this user */
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [60, 'Name cannot be more than 60 characters'],
    },
    email: {
      /* The email of this user */
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      maxlength: [60, 'Email cannot be more than 60 characters'],
    },
    password: {
      /* The password of this user */
      type: String,
      required: [true, 'Please provide a password'],
      maxlength: [60, 'Password cannot be more than 60 characters'],
      minlength: [6, 'Password cannot be less than 6 characters'],
    },
    address: {
      /* The address of this user */
      type: String,
    },
    phone: {
      /* The phone of this user */
      type: String,
    },
    role: {
      /* The role of this user */
      type: [String],
      enum: ['user', 'admin'],
      default: ['user'],
    },
    posts: [PostSchema],
    comments: [CommentSchema],
  },
  { timestamps: true },
);

UserSchema.pre('save', function (next) {
  console.log("~~~~~~I'm about to save a user~~~~~~");
  next();
});

export default mongoose.models.User ||
  mongoose.model<Users>('User', UserSchema);
