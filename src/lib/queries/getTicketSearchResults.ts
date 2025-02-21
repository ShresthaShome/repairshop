import { db } from "@/db";
import { customers, tickets } from "@/db/schema";
import { asc, eq, ilike, or, sql } from "drizzle-orm";
import { reasonDistrictQuery } from "@/lib/actions";

export default async function getTicketSearchResults(searchText: string) {
  const dist = reasonDistrictQuery(searchText);
  searchText = searchText.trim();

  const results = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
      completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      or(
        ilike(tickets.title, `%${searchText}%`),
        ilike(tickets.description, `%${searchText}%`),
        ilike(tickets.tech, `%${searchText}%`),
        ilike(customers.email, `%${searchText}%`),
        ilike(customers.phone, `%${searchText}%`),
        ilike(customers.upazilla, `%${searchText}%`),
        ilike(customers.district, `%${dist}%`),
        ilike(customers.zip, `%${searchText}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${
          customers.lastName
        })) LIKE ${`%${searchText.toLowerCase().replace(" ", "%")}%`}`
      )
    )
    .orderBy(asc(tickets.createdAt));

  return results;
}

export type TicketSearchResultType = Awaited<
  ReturnType<typeof getTicketSearchResults>
>;
