"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExpandableTextAreaProps {
  value: string;
  placeholder?: string;
  id?: string;
  className?: string;
  maxHeight?: number;
}

export function ExpandableTextArea({
  value,
  placeholder,
  id,
  className,
  maxHeight = 200,
}: ExpandableTextAreaProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update height and check if needs show more button whenever content changes
  useEffect(() => {
    if (textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight;
      setContentHeight(scrollHeight);
      
      // Only show button if content exceeds maxHeight
      const hasOverflow = scrollHeight > maxHeight;
      setShowButton(hasOverflow);
    }
  }, [value, maxHeight]);

  return (
    <div className="relative">
      <Textarea
        ref={textareaRef}
        id={id}
        className={cn(
          "read-only:bg-muted w-full transition-all duration-300",
          className
        )}
        value={value}
        readOnly
        placeholder={placeholder}
        style={{
          // If expanded, use full content height
          // If not expanded but has overflow, cap at maxHeight
          // If no overflow, use actual content height
          height: isExpanded
            ? `${contentHeight || 0}px`
            : showButton
              ? `${maxHeight}px`
              : `${contentHeight || 80}px`, // Use content height or min-height as fallback
          maxHeight: isExpanded ? "none" : showButton ? `${maxHeight}px` : "none",
          overflow: isExpanded ? "auto" : "hidden",
          // Ensure a reasonable minimum height even when empty
          minHeight: "80px"
        }}
      />
      {showButton && (
        <div className={cn(
          "flex justify-center w-full py-2",
          isExpanded 
            ? "relative mt-2" 
            : "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent pt-6"
        )}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs"
          >
            {isExpanded ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
    </div>
  );
}
