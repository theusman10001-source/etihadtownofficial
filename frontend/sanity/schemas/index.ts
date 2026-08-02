import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./blockContent";
import { blog } from "./blog";
import { media } from "./media";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, blog, media],
};
