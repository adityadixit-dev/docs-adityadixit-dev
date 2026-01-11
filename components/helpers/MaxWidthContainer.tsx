import { cn } from "@/lib/utils";

type MaxWidthContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const MaxWidthContainer = ({ children, className }: MaxWidthContainerProps) => {
  return (
    <div
      className={cn(
        "container mx-auto h-full overflow-y-auto no-scrollbar",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default MaxWidthContainer;
