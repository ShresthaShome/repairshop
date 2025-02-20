import { DistrictsArray } from "@/constants/DistrictsArray";

export function reasonDistrictQuery(searchText: string) {
  const query = searchText.trim();

  return (
    DistrictsArray.find(
      (dist) =>
        dist.description.toLowerCase() === query ||
        dist.id.toLowerCase() === query ||
        dist.description.toLowerCase().includes(query)
    )?.id || query
  );
}

export function headerParser(header: string): string {
  return header
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
