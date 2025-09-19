import "server-only";

import { Schema, model, models, InferSchemaType } from "mongoose";

const eventSchema = new Schema(
    {
        title: { type: String, required: true },
        title_image: { type: String, required: true },
        subtitle: { type: String, required: true },
        restaurantName: { type: String, required: true },
        restaurantId: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
        image: { type: String, required: true },
        content: { type: [Schema.Types.Mixed], required: true },
        short_description: { type: String, required: true },
        dateStart: { type: Date, required: true },
        dateFinish: { type: Date },
    },
    { timestamps: true }
);
export type TEventSchema = InferSchemaType<typeof eventSchema>;
const Event = models.Event || model("Event", eventSchema);

export default Event;
