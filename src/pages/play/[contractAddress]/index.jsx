import Page from "@/ui/page";
import PlayLottery from "@/features/lottery/play";

export default function PlayPage({}) {
  return (
    <Page>
      <div className="my-8 bg-gray-500 border rounded w-1/2 mx-auto p-8">
        <PlayLottery />
      </div>
    </Page>
  );
}
