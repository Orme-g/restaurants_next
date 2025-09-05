import type { TEventSchema } from "./event.schema";

export type TEvent = TEventSchema & { _id: string };
