import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  path: String,
  description: String,
  resto_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "restaurants",
  },
});

export const Food =
  mongoose.models.foods || mongoose.model("foods", foodSchema);
