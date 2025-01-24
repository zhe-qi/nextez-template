import { document } from "@/lib/openapi";
import SwaggerUI from "swagger-ui-react";

import "swagger-ui-react/swagger-ui.css";

export const dynamic = "force-static";

export default async function ApiDocsPage() {
  const spec = { ...document };

  return <SwaggerUI spec={spec} />;
}
