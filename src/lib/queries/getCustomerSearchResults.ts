import { DistrictsArray } from "@/constants/DistrictsArray";
import { db } from "@/db";
import { customers } from "@/db/schema";
import { ilike, or } from "drizzle-orm";

export default async function getCustomerSearchResults(searchText: string) {
  const dist =
    DistrictsArray.find(
      (dist) =>
        dist.description.toLowerCase() === searchText.trim().toLowerCase() ||
        dist.id.toLowerCase() === searchText.trim().toLowerCase() ||
        dist.description.toLowerCase().includes(searchText.trim().toLowerCase())
    )?.id || searchText;

  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        ilike(customers.firstName, `%${searchText}%`),
        ilike(customers.lastName, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.address1, `%${searchText}%`),
        ilike(customers.address2, `%${searchText}%`),
        ilike(customers.upazilla, `%${searchText}%`),
        ilike(customers.district, `%${dist}%`),
        ilike(customers.zip, `%${searchText}%`),
        ilike(customers.notes, `%${searchText}%`)
      )
    );
  return results;
}
