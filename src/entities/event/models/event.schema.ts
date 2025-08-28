import "server-only";

import { Schema, model, models } from "mongoose";

const eventSchema = new Schema(
    {
        title: String,
        title_image: String,
        subtitle: String,
        restaurantName: String,
        restaurantId: String,
        image: String,
        content: Object,
        short_description: String,
        dateStart: Date,
        dateFinish: Date,
    },
    { timestamps: true }
);

const Event = models.Event || model("Event", eventSchema);

export default Event;
