import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e, utils) {
    // console.error(e.constructor.name);
    const { clientInput, metadata } = utils;
    Sentry.captureException(e, (scope) => {
      scope.clear();
      scope.setContext("serverError", { message: e.message });
      scope.setContext("metadata", { actionName: metadata.actionName });
      scope.setContext("clientInput", { clientInput });
      return scope;
    });

    if (e.constructor.name === "NeonDbError") {
      return "Database Error: Your data did not save. The support team will be notified. Please try again later.";
    }
    return e.message;
  },
});
