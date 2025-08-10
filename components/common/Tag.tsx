import { cn } from '@/utils/cn';

interface TagProps {
  label: string;
  className?: string;
}

export function Tag({ label, className }: TagProps) {
  return (
    <span 
      className={cn(
        "px-2 py-1 rounded-full text-[0.65rem]",
        "bg-[rgba(255,255,255,0.02)]",
        className
      )}
    >
      {label}
    </span>
  );
}
