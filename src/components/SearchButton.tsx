"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

export default function SearchButton() {
  const status = useFormStatus();

  return (
    <Button type="submit" disabled={status.pending} className="w-20">
      {status.pending ? <LoaderCircle className="animate-spin" /> : "Search"}
    </Button>
  );
}
