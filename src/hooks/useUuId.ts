import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useUuId = () => {
  const [uuid] = useState(() => uuidv4());
  return uuid;
};
