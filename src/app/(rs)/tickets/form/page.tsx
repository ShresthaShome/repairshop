import BackButton from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";

import { init as kindeInit, Users } from "@kinde/management-api-js";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

const { getPermission, getUser } = getKindeServerSession();
const [managerPermission, user] = await Promise.all([
  getPermission("manager"),
  getUser(),
]);
const isManager = managerPermission?.isGranted;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId, ticketId } = await searchParams;
  if (!customerId && !ticketId)
    return { title: "Miising Ticket ID or Customer ID" };

  if (customerId && !ticketId) {
    const customer = await getCustomer(parseInt(customerId));

    if (!customer) return { title: "Customer Not Found" };
    if (!customer.active) return { title: "Customer Not Active" };
    return { title: `Ticket for Customer #${customerId}` };
  }

  if (ticketId) {
    const ticket = await getTicket(parseInt(ticketId));
    if (!ticket) return { title: "Ticket Not Found" };

    return {
      title: `${
        user.email?.toLowerCase() === ticket.tech.toLowerCase() || isManager
          ? "Update"
          : "View"
      } Ticket #${ticketId}`,
    };
  }
}

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID required to load ticket form!
          </h2>
          <BackButton title="Go Back" variant="default" />
        </>
      );
    }

    // New Ticket form

    if (customerId && !ticketId) {
      const customer = await getCustomer(parseInt(customerId));

      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} not found!
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer ID #{customerId} is not active!
            </h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      // TODO
      if (isManager) {
        kindeInit();
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({ id: user.id!, description: user.email! }))
          : [];

        return <TicketForm customer={customer} techs={techs} />;
      } else return <TicketForm customer={customer} />;
    }

    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));

      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket ID #{ticketId} not found!</h2>
            <BackButton title="Go Back" variant="default" />
          </>
        );
      }

      const customer = await getCustomer(ticket.customerId);

      // TODO
      if (isManager) {
        kindeInit();
        const { users } = await Users.getUsers();

        const techs = users
          ? users.map((user) => ({ id: user.id!, description: user.email! }))
          : [];

        return <TicketForm customer={customer} ticket={ticket} techs={techs} />;
      } else {
        const isEditable =
          user.email?.toLowerCase() === ticket.tech.toLowerCase();
        return (
          <TicketForm
            customer={customer}
            ticket={ticket}
            isEditable={isEditable}
          />
        );
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      Sentry.captureException(e);
      throw e;
    }
  }
}
