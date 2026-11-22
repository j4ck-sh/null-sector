
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const certificateSchema = z
  .object({
    title: z.string().min(1),

    type: z.enum([
      "professional-certification",
      "course-completion",
      "training-award",
    ]),

    image: z
      .string()
      .regex(
        /^\/certificates\/[a-zA-Z0-9/_-]+\.(png|jpg|jpeg|webp)$/i,
        "Certificate image must be a PNG, JPG, JPEG, or WebP file inside public/certificates/."
      ),

    alt: z.string().min(1),

    issuer: z.string().min(1),

    issuedAt: z.coerce.date().optional(),

    credentialId: z.string().min(1).optional(),
  });

const learning = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/learning",
  }),

  schema: z
    .object({
      title: z.string().min(1),

      description: z.string().min(1),

      provider: z.string().min(1),

      category: z.enum([
        "certification-training",
        "learning-path",
        "course",
        "lab",
      ]),

      status: z.enum([
        "planned",
        "in-progress",
        "completed",
      ]),

      certificationStatus: z
        .enum([
          "not-applicable",
          "not-attempted",
          "preparing",
          "earned",
        ])
        .default("not-applicable"),

      publishedAt: z.coerce.date(),

      completedAt: z.coerce.date().optional(),

      updatedAt: z.coerce.date().optional(),

      topics: z.array(z.string()).default([]),

      skills: z.array(z.string()).default([]),

      featured: z.boolean().default(false),

      draft: z.boolean().default(false),

      credentialUrl: z.string().url().optional(),

      certificate: certificateSchema.optional(),

      references: z
        .array(
          z.object({
            label: z.string().min(1),
            url: z.string().url(),
          })
        )
        .default([]),
    })
    .superRefine((data, ctx) => {
      if (
        data.certificationStatus === "earned" &&
        data.certificate &&
        data.certificate.type !== "professional-certification"
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "An earned professional certification must use the professional-certification certificate type.",
          path: ["certificate", "type"],
        });
      }

      if (
        data.certificate?.type === "professional-certification" &&
        data.certificationStatus !== "earned"
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "A professional certification certificate requires certificationStatus: earned.",
          path: ["certificationStatus"],
        });
      }

      if (
        data.certificate?.type === "course-completion" &&
        data.certificationStatus === "earned"
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "A course completion certificate does not establish an earned professional certification.",
          path: ["certificationStatus"],
        });
      }

      if (
        data.certificate?.type === "training-award" &&
        data.certificationStatus === "earned"
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "A training award does not establish an earned professional certification.",
          path: ["certificationStatus"],
        });
      }
    }),
});

const research = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/research",
  }),

  schema: z
    .object({
      title: z.string().min(1),

      description: z.string().min(1),

      category: z.enum([
        "satellite-security",
        "drone-security",
        "mobile-forensics",
        "iot-security",
        "vehicle-security",
        "malware-analysis",
        "network-forensics",
        "ethical-hacking",
        "other",
      ]),

      status: z.enum([
        "planned",
        "in-progress",
        "completed",
      ]),

      evidenceType: z.enum([
        "public-source",
        "modelled",
        "simulated",
        "controlled-lab",
        "evidence-backed",
        "theoretical",
        "mixed",
      ]),

      publishedAt: z.coerce.date(),

      updatedAt: z.coerce.date().optional(),

      completedAt: z.coerce.date().optional(),

      topics: z.array(z.string()).default([]),

      tools: z.array(z.string()).default([]),

      featured: z.boolean().default(false),

      draft: z.boolean().default(true),

      methodology: z.object({
        objective: z.string().min(1),

        scope: z.string().min(1),

        environment: z.string().min(1),

        approach: z.string().min(1),

        assumptions: z.array(z.string()).default([]),

        limitations: z.array(z.string()).default([]),
      }),

      evidence: z
        .array(
          z.object({
            id: z.string().min(1),

            description: z.string().min(1),

            type: z.enum([
              "public-source",
              "modelled",
              "simulated",
              "controlled-lab",
              "theoretical",
            ]),

            source: z.string().min(1),

            collectedAt: z.coerce.date().optional(),

            sha256: z
              .string()
              .regex(/^[a-fA-F0-9]{64}$/)
              .optional(),

            limitations: z.array(z.string()).default([]),
          })
        )
        .default([]),

      findings: z
        .array(
          z.object({
            title: z.string().min(1),

            summary: z.string().min(1),

            evidenceIds: z.array(z.string()).default([]),

            confidence: z.enum([
              "low",
              "moderate",
              "high",
            ]),

            limitations: z.array(z.string()).default([]),
          })
        )
        .default([]),

      references: z
        .array(
          z.object({
            label: z.string().min(1),
            url: z.string().url(),
          })
        )
        .default([]),

      relatedLearning: z.array(z.string()).default([]),

      relatedResearch: z.array(z.string()).default([]),

      relatedNotes: z.array(z.string()).default([]),
    })
    .superRefine((data, ctx) => {
      const evidenceIds = new Set<string>();

      for (const [index, item] of data.evidence.entries()) {
        if (evidenceIds.has(item.id)) {
          ctx.addIssue({
            code: "custom",
            message: `Duplicate evidence ID: ${item.id}`,
            path: ["evidence", index, "id"],
          });
        }

        evidenceIds.add(item.id);
      }

      for (const [findingIndex, finding] of data.findings.entries()) {
        for (const [evidenceIndex, evidenceId] of finding.evidenceIds.entries()) {
          if (!evidenceIds.has(evidenceId)) {
            ctx.addIssue({
              code: "custom",
              message: `Unknown evidence ID: ${evidenceId}`,
              path: [
                "findings",
                findingIndex,
                "evidenceIds",
                evidenceIndex,
              ],
            });
          }
        }
      }
    }),
});

const fieldNotes = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/field-notes",
  }),

  schema: z
    .object({
      title: z.string().min(1),

      description: z.string().min(1),

      category: z.enum([
        "observations",
        "lab-notes",
        "tool-notes",
        "troubleshooting",
        "concepts",
        "reference-notes",
      ]),

      status: z.enum([
        "planned",
        "in-progress",
        "completed",
      ]),

      activityType: z.enum([
        "source-review",
        "guided-exercise",
        "independent-lab",
        "controlled-experiment",
        "technical-explanation",
        "troubleshooting",
        "observation",
      ]),

      evidenceType: z.enum([
        "public-source",
        "guided",
        "controlled-lab",
        "simulated",
        "theoretical",
        "direct-observation",
        "mixed",
      ]),

      publishedAt: z.coerce.date(),

      updatedAt: z.coerce.date().optional(),

      completedAt: z.coerce.date().optional(),

      topics: z.array(z.string()).default([]),

      tools: z.array(z.string()).default([]),

      featured: z.boolean().default(false),

      draft: z.boolean().default(true),

      context: z.string().min(1),

      environment: z.string().min(1),

      activitySummary: z.string().min(1),

      limitations: z.array(z.string()).default([]),

      references: z
        .array(
          z.object({
            label: z.string().min(1),
            url: z.string().url(),
          })
        )
        .default([]),

      relatedLearning: z.array(z.string()).default([]),

      relatedResearch: z.array(z.string()).default([]),

      relatedNotes: z.array(z.string()).default([]),
    })
    .superRefine((data, ctx) => {
      if (
        data.activityType === "independent-lab" &&
        data.evidenceType === "guided"
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "An independent lab cannot be classified solely as guided evidence. Use guided-exercise for walkthrough-led activity.",
          path: ["activityType"],
        });
      }

      if (
        data.activityType === "technical-explanation" &&
        data.evidenceType === "direct-observation"
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "A technical explanation alone does not establish direct observation. Use an appropriate evidence classification or record the observation as a separate note.",
          path: ["evidenceType"],
        });
      }

      if (
        data.status === "completed" &&
        data.completedAt === undefined
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "Completed field notes must include a completedAt date.",
          path: ["completedAt"],
        });
      }

      if (
        data.status !== "completed" &&
        data.completedAt !== undefined
      ) {
        ctx.addIssue({
          code: "custom",
          message:
            "Only completed field notes may include completedAt.",
          path: ["completedAt"],
        });
      }
    }),
});

export const collections = {
  learning,
  research,
  fieldNotes,
};
