import mongoose from 'mongoose';
import { Comments, CommentSchema } from './Comment';

export interface Posts extends mongoose.Document {
  title: string;
  text: string;
  userId: { type: mongoose.Schema.Types.ObjectId; ref: 'User' };
  likes: { type: mongoose.Schema.Types.ObjectId; ref: 'User' }[];
  comments: mongoose.Types.Array<Comments>;
  edited: boolean;
  deleted: boolean;
}

export const PostSchema = new mongoose.Schema<Posts>(
  {
    title: {
      /* The title of this post */
      type: String,
      required: [true, 'Please provide a title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    text: {
      /* The text of this post */
      type: String,
      required: [true, 'Please provide a text'],
      maxlength: [5000, 'Text cannot be more than 5000 characters'],
    },
    userId: {
      /* The user of this post */
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: [
      {
        /* List of users who liked this post */
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [CommentSchema],
    edited: {
      /* The edited of this post */
      type: Boolean,
      default: false,
    },
    deleted: {
      /* The deleted of this post */
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const updateEmbeddingData = async (post: Posts) => {
  return await 1;
};

PostSchema.post('save', async function (post) {
  await updateEmbeddingData(post);
});

export default mongoose.models.Post ||
  mongoose.model<Posts>('Post', PostSchema);
