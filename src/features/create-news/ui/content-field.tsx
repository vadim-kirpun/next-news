import { FieldError } from "./field-error";

type ContentFieldProps = {
  value: string;
  onChange: (nextValue: string) => void;
  errors?: string[];
};

export function ContentField({ value, onChange, errors }: ContentFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor="content" className="text-sm font-medium">
        Content
      </label>

      <textarea
        id="content"
        name="content"
        required
        minLength={20}
        maxLength={10_000}
        aria-invalid={Boolean(errors)}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write the story details..."
        className="min-h-44 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20"
      />
      <FieldError errors={errors} />
    </div>
  );
}
