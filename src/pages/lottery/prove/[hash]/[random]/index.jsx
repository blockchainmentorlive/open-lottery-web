import { useRouter } from "next/router";
import ProveFairness from "@/features/lottery/prove";
import Page from "@/ui/page";

export default function ProveLotteryResultPage() {
  const router = useRouter();
  return (
    <Page>
      <ProveFairness hash={router.query.hash} random={router.query.random} />
    </Page>
  );
}
