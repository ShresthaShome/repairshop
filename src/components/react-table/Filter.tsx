import { Column } from "@tanstack/react-table";
import DebouncedInput from "@/components/react-table/DebouncedInput";

type Props<T> = {
  column: Column<T, unknown>;
};

export default function Filter<T>({ column }: Props<T>) {
  const conlumnFilterValue = column.getFilterValue();

  const sortedUniqueValues = Array.from(
    column.getFacetedUniqueValues().keys()
  ).sort();

  return (
    <>
      <datalist id={column.id + "List"}>
        {sortedUniqueValues.map((value, i) => (
          <option value={value} key={`${i}-${column.id}`} />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(conlumnFilterValue ?? "") as string}
        onChange={(value) => column.setFilterValue(value)}
        placeholder={`Filter... (${
          [...column.getFacetedUniqueValues()].filter((arr) => arr[0]).length
        })`}
        className="w-full border shadow rounded bg-card"
        list={column.id + "List"}
      />
    </>
  );
}
