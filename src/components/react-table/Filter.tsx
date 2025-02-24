import { Column } from "@tanstack/react-table";
import DebouncedInput from "@/components/react-table/DebouncedInput";

type Props<T> = {
  column: Column<T, unknown>;
  filteredRows: string[];
};

export default function Filter<T>({ column, filteredRows }: Props<T>) {
  const conlumnFilterValue = column.getFilterValue();

  const uniqueFilteredValues = new Set(filteredRows);

  const sortedUniqueValues = Array.from(uniqueFilteredValues).sort();

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
        placeholder={`Filter... (${uniqueFilteredValues.size})`}
        className="w-full border shadow rounded bg-card"
        list={column.id + "List"}
      />
    </>
  );
}
