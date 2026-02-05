import { Box, Typography } from "@mui/material";

export default function ResumeTemplate({ data }) {
  const { hero, skills, experiences, projects } = data;

  return (
    <Box
      id="resume-root"
      sx={{
        width: "210mm",
        minHeight: "297mm",
        padding: "20mm",
        fontFamily: "Arial, sans-serif",
        color: "#000",
        backgroundColor: "#fff",
        lineHeight: 1.4,
        fontSize: "12px",
      }}
    >
      {/* Header */}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {hero.full_name}
      </Typography>

      <Typography fontWeight={600}>{hero.job_title}</Typography>

      <Typography variant="body2" mb={2}>
        {hero.email} | {hero.github_link} | {hero.linkedin_link}
      </Typography>

      {/* Summary */}
      <Section title="Summary">
        <Typography variant="body2">{hero.description}</Typography>
      </Section>

      {/* Skills */}
      <Section title="Skills">
        {Object.entries(
          skills.reduce((acc, s) => {
            acc[s.category] = acc[s.category] || [];
            acc[s.category].push(s.name);
            return acc;
          }, {})
        ).map(([category, list]) => (
          <Typography
            key={category}
            variant="body2"
            sx={{ display: "block" }}
          >
            <strong>{category}:</strong> {list.join(", ")}
          </Typography>
        ))}
      </Section>

      {/* Experience */}
      <Section title="Experience">
        {experiences
          .slice()
          .sort((a, b) => b.sort_order - a.sort_order)
          .map((exp) => (
            <Box
              key={exp.id}
              sx={{
                mb: 1.5,
                pageBreakInside: "avoid",
                breakInside: "avoid",
                display: "block",
              }}
            >
              <Typography fontWeight={600}>
                {exp.position} – {exp.company}
              </Typography>

              <Typography variant="body2">
                {exp.duration} | {exp.location}
              </Typography>

              <Typography variant="body2">{exp.description}</Typography>
            </Box>
          ))}
      </Section>

      {/* Projects */}
      <Section title="Projects">
        {projects
          .slice()
          .sort((a, b) => b.sort_order - a.sort_order)
          .map((p) => (
            <Box
              key={p.id}
              sx={{
                mb: 1.5,
                pageBreakInside: "avoid",
                breakInside: "avoid",
                display: "block",
              }}
            >
              <Typography fontWeight={600}>{p.title}</Typography>
              <Typography variant="body2">{p.description}</Typography>
              <Typography variant="body2">
                <strong>Tech:</strong> {p.tech_stack}
              </Typography>
            </Box>
          ))}
      </Section>
    </Box>
  );
}

/* ---------------- SECTION COMPONENT ---------------- */

function Section({ title, children }) {
  return (
    <Box
      sx={{
        mt: 2,
        pageBreakBefore: "auto",
        breakBefore: "auto",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          borderBottom: "1px solid #000",
          mb: 1,
          pageBreakAfter: "avoid",
          breakAfter: "avoid",
        }}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
}
