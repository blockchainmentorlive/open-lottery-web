import Page from "@/ui/page";
import DeployLottery from "@/features/demo/deploy";

export default function Homepage({}) {
  return (
    <Page>
      <div className="my-8 bg-gray-500 border rounded w-1/2 mx-auto p-8">
        <DeployLottery />
      </div>
    </Page>
  );
}
