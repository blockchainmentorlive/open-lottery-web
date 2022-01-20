export async function getMaticPrice() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd"
  );
  return (await res.json())["matic-network"].usd;
}
export default async function pricingApi(req, res) {
  res.json(getMaticPrice());
}
