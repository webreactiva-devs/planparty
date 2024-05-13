import type { Control } from "react-hook-form";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/shadcn/components/ui/form";
import { Input } from "@/shadcn/components/ui/input";

type Props = {
  name: string;
  control: Control<any>;
  className?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
};

export default function TextInput({
  name,
  control,
  className,
  label,
  required = false,
  disabled = false,
  description,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {required && <span>*</span>}
            {label}
          </FormLabel>
          <FormControl>
            <Input className={className} {...field} disabled={disabled} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
