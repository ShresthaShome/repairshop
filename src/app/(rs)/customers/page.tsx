import CustomerSearch from "@/app/(rs)/customers/CustomerSearch";
import getCustomerSearchResults from "@/lib/queries/getCustomerSearchResults";

export const metadata = {
  title: "Customer Search",
};

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { searchText } = await searchParams;

  if (!searchText) return <CustomerSearch />;

  const results = await getCustomerSearchResults(searchText);

  return (
    <div>
      <CustomerSearch />
      <p>{JSON.stringify(results)}</p>
    </div>
  );
}
