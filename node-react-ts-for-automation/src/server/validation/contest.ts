import { minLength, object, string } from "valibot";

export const ContestSchema = object({
  contestName: string([
    minLength(1, "Please enter your contest name."),
    minLength(8, "Must have 8 characters or more."),
  ]),
  categoryName: string([
    minLength(1, "Please enter your contest name."),
  ]),
  url: string(),
  thumbnailUrl: string(),
  description: string(),
});

export const ContestFindByIdSchema = object({
  contestId: string("Please enter your contest ID"),
});

export const ContestUpdateNameSchema = object({
  newNameValue: string("Please enter new name"),
});
