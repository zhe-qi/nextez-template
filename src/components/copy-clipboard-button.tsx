"use client";

import { Button } from "@/components/ui/button";
import { useCopyToClipboard } from "@/lib/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type IProps = {
  textToCopy: string;
  label?: string;
  successMessage?: string;
} & React.ComponentProps<"div">;

export function CopyButtonData({
  textToCopy,
  label = "Copy",
  successMessage = "Copied to clipboard!",
  className,
  ...props
}: IProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) {
      return;
    }

    try {
      copyToClipboard(textToCopy);
      toast.success(successMessage, {
        duration: 2000,
      });
    } catch {
      toast.error("Failed to copy. Please try again.", {
        duration: 3000,
      });
    }
  };

  return (
    <div className={cn("flex items-center justify-end", className)} {...props}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="secondary"
            className="h-6 p-1.5"
            onClick={onCopy}
            aria-label={`Copy ${textToCopy}`}
          >
            {isCopied ? (
              <Check className="size-3" />
            ) : (
              <Copy className="size-3" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </div>
  );
}
