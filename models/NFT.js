import mongoose from "mongoose";

const NFTSchema = new mongoose.Schema(
  {
    src: String,
    name: String,
    price: String,
    description: String,
  },
  { collection: "NFTs" }
);

export default mongoose.model("NFT", NFTSchema, "NFTs");
