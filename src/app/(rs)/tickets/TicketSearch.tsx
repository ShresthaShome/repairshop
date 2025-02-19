import SearchButton from "@/components/SearchButton";
import { Input } from "@/components/ui/input";
import Form from "next/form";

export default function TicketSearch() {
  return (
    <Form action="/tickets" className="flex gap-2 items-center">
      <Input
        name="searchText"
        type="text"
        placeholder="Search Tickets"
        className="w-full dark:border-gray-400 border-gray-300"
      />
      <SearchButton />
    </Form>
  );
}
