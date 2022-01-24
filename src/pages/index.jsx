import Page from "@/ui/page";
import CreateLottery from "@/features/lottery/create";

export default function Homepage({}) {
  return (
    <Page>
      <div className="my-8 bg-gray-500 border rounded w-1/2 mx-auto p-8">
        <CreateLottery />
      </div>
    </Page>
  );
}
