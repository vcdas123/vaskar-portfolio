-- CreateEnum
CREATE TYPE "CaseStudyListKind" AS ENUM ('CONSTRAINT', 'DECISION', 'IMPLEMENTATION');

-- CreateEnum
CREATE TYPE "ContactSubmissionStatus" AS ENUM ('RECEIVED', 'REVIEWED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "site_settings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "title" TEXT NOT NULL,
    "headerName" TEXT NOT NULL,
    "logoText" TEXT NOT NULL,
    "statusText" TEXT NOT NULL,
    "contactNote" TEXT NOT NULL,
    "footerYear" INTEGER NOT NULL,
    "themeSource" TEXT NOT NULL,
    "colorBackground" TEXT NOT NULL,
    "colorSurface" TEXT NOT NULL,
    "colorText" TEXT NOT NULL,
    "colorPrimary" TEXT NOT NULL,
    "colorSecondary" TEXT NOT NULL,
    "colorWarning" TEXT NOT NULL,
    "colorMuted" TEXT NOT NULL,
    "colorBorder" TEXT NOT NULL,
    "fontBody" TEXT NOT NULL,
    "fontMono" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "site_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "careerStart" DATE NOT NULL,
    "positioning" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "metrics" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "terminalLabel" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "terminalValue" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "cardDescription" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_tech" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "project_tech_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_links" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "primary" BOOLEAN NOT NULL DEFAULT false,
    "position" INTEGER NOT NULL,

    CONSTRAINT "project_links_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "architecture_entries" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "architecture_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "build_logs" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "build_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_studies" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "outcome" TEXT NOT NULL,
    "why" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_studies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_study_list_items" (
    "id" TEXT NOT NULL,
    "caseStudyId" TEXT NOT NULL,
    "kind" "CaseStudyListKind" NOT NULL,
    "text" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "case_study_list_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_study_flow_nodes" (
    "id" TEXT NOT NULL,
    "caseStudyId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "case_study_flow_nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_groups" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "skill_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_items" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "skill_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "experiences" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "education_entries" (
    "id" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "education_entries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_channels" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "ContactSubmissionStatus" NOT NULL DEFAULT 'RECEIVED',
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "metrics_key_key" ON "metrics"("key");

-- CreateIndex
CREATE INDEX "metrics_position_idx" ON "metrics"("position");

-- CreateIndex
CREATE UNIQUE INDEX "projects_slug_key" ON "projects"("slug");

-- CreateIndex
CREATE INDEX "projects_position_idx" ON "projects"("position");

-- CreateIndex
CREATE UNIQUE INDEX "project_tech_projectId_position_key" ON "project_tech"("projectId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "project_links_projectId_position_key" ON "project_links"("projectId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "architecture_entries_projectId_position_key" ON "architecture_entries"("projectId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "build_logs_projectId_position_key" ON "build_logs"("projectId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "case_studies_projectId_key" ON "case_studies"("projectId");

-- CreateIndex
CREATE INDEX "case_study_list_items_caseStudyId_kind_idx" ON "case_study_list_items"("caseStudyId", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "case_study_list_items_caseStudyId_kind_position_key" ON "case_study_list_items"("caseStudyId", "kind", "position");

-- CreateIndex
CREATE UNIQUE INDEX "case_study_flow_nodes_caseStudyId_position_key" ON "case_study_flow_nodes"("caseStudyId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "skill_groups_name_key" ON "skill_groups"("name");

-- CreateIndex
CREATE INDEX "skill_groups_position_idx" ON "skill_groups"("position");

-- CreateIndex
CREATE UNIQUE INDEX "skill_items_groupId_position_key" ON "skill_items"("groupId", "position");

-- CreateIndex
CREATE UNIQUE INDEX "experiences_code_key" ON "experiences"("code");

-- CreateIndex
CREATE INDEX "experiences_position_idx" ON "experiences"("position");

-- CreateIndex
CREATE INDEX "education_entries_position_idx" ON "education_entries"("position");

-- CreateIndex
CREATE UNIQUE INDEX "education_entries_degree_institution_key" ON "education_entries"("degree", "institution");

-- CreateIndex
CREATE UNIQUE INDEX "contact_channels_type_key" ON "contact_channels"("type");

-- CreateIndex
CREATE INDEX "contact_channels_position_idx" ON "contact_channels"("position");

-- CreateIndex
CREATE INDEX "contact_submissions_receivedAt_idx" ON "contact_submissions"("receivedAt");

-- CreateIndex
CREATE INDEX "contact_submissions_status_idx" ON "contact_submissions"("status");

-- AddForeignKey
ALTER TABLE "project_tech" ADD CONSTRAINT "project_tech_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_links" ADD CONSTRAINT "project_links_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "architecture_entries" ADD CONSTRAINT "architecture_entries_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "build_logs" ADD CONSTRAINT "build_logs_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_studies" ADD CONSTRAINT "case_studies_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_study_list_items" ADD CONSTRAINT "case_study_list_items_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "case_studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "case_study_flow_nodes" ADD CONSTRAINT "case_study_flow_nodes_caseStudyId_fkey" FOREIGN KEY ("caseStudyId") REFERENCES "case_studies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "skill_items" ADD CONSTRAINT "skill_items_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "skill_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
