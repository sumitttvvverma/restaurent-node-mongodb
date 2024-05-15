const mongoose = require("mongoose");

//schema
const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food Title is require"],
    },
    description: {
      type: String,
      required: [true, " food description is require"],
    },
    price: {
      type: Number,
      required: [true, "food price is require"],
    },
    imageUrl: {
      type: String,
      default:
        "https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png",
    },
    foodTags: {
      type: String,
    },
    catgeory: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurent",     //to build relationship b/w Restaurent model and food model
    },
    rating: {
      type: Number,
      default: 5,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

const Foods = mongoose.model("Foods", foodSchema)
//export
module.exports = Foods ;