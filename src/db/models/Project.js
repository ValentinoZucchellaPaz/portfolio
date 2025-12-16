import mongoose, { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
    {
        slug: { type: String, required: true, unique: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        tech: [{ type: String }],
        link: { type: String },
        page: { type: String },
        detail: { type: Boolean, default: false },
        longDescription: { type: String },
        media: [{ type: String }],
    },
    { collection: "projects" },
); // <- fuerza el nombre exacto de la colección

export const Project = models.Project || model("Project", ProjectSchema);
