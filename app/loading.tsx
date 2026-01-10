import { RefreshCw } from "lucide-react";

const loading = () => {
  return (
    <div className="h-screen w-screen absolute top-0 left-0 z-50 bg-secondary opacity-10">
      <div className="flex h-full justify-center items-center ">
        <RefreshCw className="animate-spin" size={48} />
      </div>
    </div>
  );
};

export default loading;
