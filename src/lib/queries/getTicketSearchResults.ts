import { DistrictsArray } from "@/constants/DistrictsArray";
import { db } from "@/db";
import { customers, tickets } from "@/db/schema";
import { eq, ilike, or } from "drizzle-orm";

export default async function getTicketSearchResults(searchText: string) {
  const dist =
    DistrictsArray.find(
      (dist) =>
        dist.description.toLowerCase() === searchText.trim().toLowerCase() ||
        dist.id.toLowerCase() === searchText.trim().toLowerCase() ||
        dist.description.toLowerCase().includes(searchText.trim().toLowerCase())
    )?.id || searchText;

  const results = await db
    .select({
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      or(
        ilike(tickets.title, `%${searchText}%`),
        ilike(tickets.description, `%${searchText}%`),
        ilike(tickets.tech, `%${searchText}%`),
        ilike(customers.firstName, `%${searchText}%`),
        ilike(customers.lastName, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.address1, `%${searchText}%`),
        ilike(customers.address2, `%${searchText}%`),
        ilike(customers.upazilla, `%${searchText}%`),
        ilike(customers.district, `%${dist}%`),
        ilike(customers.zip, `%${searchText}%`)
      )
    );

  return results;
}
