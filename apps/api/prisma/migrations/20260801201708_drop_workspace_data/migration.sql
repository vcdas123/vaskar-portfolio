-- The reference no longer renders an IDE-style workspace, so the data that only
-- fed it is removed: the architecture block, the build log, and the project
-- description / primary-outcome metric shown in the output pane.
--
-- Nothing here is unrecoverable: every dropped value still exists in
-- `reference/portfolio-data.json` and is restored by `npm run db:seed` if these
-- fields are ever reinstated.

DROP TABLE "architecture_entries";

DROP TABLE "build_logs";

ALTER TABLE "projects"
  DROP COLUMN "description",
  DROP COLUMN "metric",
  DROP COLUMN "outcome";
