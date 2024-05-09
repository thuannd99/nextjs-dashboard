import mongoose from 'mongoose';

export interface Comments extends mongoose.Document {
  text: string;
  userId: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };
  postId: { type: mongoose.Schema.Types.ObjectId; ref: 'Post' };
  likes: { type: mongoose.Schema.Types.ObjectId; ref: 'User' }[];
  replies: Comments[];
  parent: { type: mongoose.Schema.Types.ObjectId; ref: 'Comment' };
  edited: boolean;
  deleted: boolean;
}

export const CommentSchema = new mongoose.Schema<Comments>(
  {
    text: {
      /* The text of this comment */
      type: String,
      required: [true, 'Please provide a text'],
      maxlength: [500, 'Text cannot be more than 500 characters'],
    },
    userId: {
      /* The user of this comment */
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postId: {
      /* The post of this comment */
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    likes: [
      {
        /* List of users who liked this comment */
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    replies: [
      {
        /* The replies of this comment */
        type: Array<Comments>,
      },
    ],
    parent: {
      /* The parent of this comment */
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
    edited: {
      /* The edited of this comment */
      type: Boolean,
      default: false,
    },
    deleted: {
      /* The deleted of this comment */
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Comment ||
  mongoose.model<Comments>('Comment', CommentSchema);
