import { db } from "@/db";
import { customers } from "@/db/schema";
import { ilike, or, sql } from "drizzle-orm";
import { reasonDistrictQuery } from "@/lib/actions";

export default async function getCustomerSearchResults(searchText: string) {
  const dist = reasonDistrictQuery(searchText);
  searchText = searchText.trim();

  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.address1, `%${searchText}%`),
        ilike(customers.address2, `%${searchText}%`),
        ilike(customers.upazilla, `%${searchText}%`),
        ilike(customers.district, `%${dist}%`),
        ilike(customers.zip, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${
          customers.lastName
        })) LIKE ${`%${searchText.toLowerCase().replace(" ", "%")}%`}`
      )
    )
    .orderBy(customers.lastName);
  return results;
}
