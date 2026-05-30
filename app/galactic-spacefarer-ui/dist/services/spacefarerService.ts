import type { ODataCollection } from "../types/odata";
import type { Spacefarer } from "../types/spacefarer";

import { request } from "./httpClient";

export async function getSpacefarers(): Promise<Spacefarer[]> {
  const response = await request<ODataCollection<Spacefarer>>(
    "/odata/v4/galactic/Spacefarers"
  );

  return response.value;
}