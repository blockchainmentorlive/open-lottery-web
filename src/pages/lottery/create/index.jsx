import { ObjectId } from "mongodb";
import { isAfter, subHours } from "date-fns";
import dbPromise from "@/modules/db";
import { getMaticPrice } from "@/api/pricing";
import Page from "@/ui/page";
import CreateLottery from "@/features/lottery/create";

export default function CreateLotteryPage({ price }) {
  return (
    <Page>
      <CreateLottery maticPrice={price} />
    </Page>
  );
}

export async function getServerSideProps() {
  const client = await dbPromise;
  const db = await client.db("open-lottery");
  const pricing = await db.collection("pricing");
  const storedPrice = (await pricing.findOne({}))?.matic;

  async function persistPrice() {
    const matic = await getMaticPrice();
    pricing.remove({});
    pricing.insertOne({ matic });
    return matic;
  }

  // 61e9bf7058a24dbab3df7853
  const createdAt = storedPrice && new ObjectId(storedPrice._id).getTimestamp();

  const price =
    storedPrice && isAfter(createdAt, subHours(new Date(), 1))
      ? storedPrice
      : await persistPrice();

  return {
    props: { price: price.toString() },
  };
}
