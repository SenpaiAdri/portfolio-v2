import type {
  CSSProperties,
  HTMLAttributes,
  Key,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type SlideItemProps = HTMLAttributes<HTMLDivElement> &
  Record<`data-${string}`, string | number | undefined>;

type SlideStackProps<T> = {
  items: T[];
  current: number;
  getKey: (item: T, index: number) => Key;
  renderItem: (item: T, index: number) => ReactNode;
  getItemProps?: (item: T, index: number) => SlideItemProps;
  /** Outer positioning container (caller supplies sizing/overflow) */
  className?: string;
  /** Classes applied to every slide wrapper */
  itemClassName?: string;
  transition?: string;
};

/**
 * Stacks `items` vertically and slides them through the container via
 * translateY((index - current) * 100%). The standard reveal used across
 * the Projects section (logo, links, title, description, dates, counter).
 */
export function SlideStack<T>({
  items,
  current,
  getKey,
  renderItem,
  getItemProps,
  className,
  itemClassName,
  transition = "transform 1000ms ease-in-out",
}: SlideStackProps<T>) {
  return (
    <div className={className}>
      {items.map((item, index) => {
        const itemProps = getItemProps?.(item, index);
        return (
          <div
            key={getKey(item, index)}
            {...itemProps}
            className={cn(itemClassName, itemProps?.className)}
            style={{
              transform: `translateY(${(index - current) * 100}%)`,
              transition,
              ...(itemProps?.style as CSSProperties),
            }}
          >
            {renderItem(item, index)}
          </div>
        );
      })}
    </div>
  );
}
