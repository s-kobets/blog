import mongoose, { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const PageSchema = new Schema({
  title: { type: String, require: true },
  body: { type: String, require: true },
  url: { type: String, require: true, unique: true },
  createdAt: { type: Date, require: true, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// mongoosePaginate.paginate.options = { 
//   lean:  true,
//   limit: 3
// };

PageSchema.plugin(mongoosePaginate);

export default mongoose.model('Page', PageSchema);