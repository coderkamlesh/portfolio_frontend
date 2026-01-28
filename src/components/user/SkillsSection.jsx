import { motion } from "motion/react"
import { SkillCard } from "@/styles/SkillCard";
import { Box, CardContent, Chip, Container, Grid, LinearProgress, Typography } from "@mui/material";
import { GradientText } from "@/styles/GradientText";

export default function SkillsSection() {
      const skills = [
    { name: 'Java', level: 90, category: 'Backend', color: '#f59e0b' },
    { name: 'JavaScript', level: 85, category: 'Frontend', color: '#ec4899' },
    { name: 'React', level: 80, category: 'Frontend', color: '#8b5cf6' },
    { name: 'Node.js', level: 75, category: 'Backend', color: '#10b981' },
    { name: 'Android', level: 70, category: 'Mobile', color: '#3b82f6' },
    { name: 'Spring Boot', level: 85, category: 'Backend', color: '#f59e0b' },
    { name: 'SQL', level: 80, category: 'Database', color: '#ec4899' },
    { name: 'Git', level: 85, category: 'Tools', color: '#8b5cf6' },
  ];

   return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: '#151921' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <GradientText variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2 }}>
              Technical Expertise
            </GradientText>
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300 }}>
              Technologies and tools I work with
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {skills.map((skill, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={skill.name}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <SkillCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {skill.name}
                      </Typography>
                      <Chip
                        label={skill.category}
                        size="small"
                        sx={{
                          background: 'rgba(245, 158, 11, 0.1)',
                          color: '#f59e0b',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: 1 }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                      >
                        <LinearProgress
                          variant="determinate"
                          value={skill.level}
                          sx={{
                            height: 8,
                            borderRadius: 10,
                            background: '#0a0e14',
                            '& .MuiLinearProgress-bar': {
                              background: `linear-gradient(90deg, ${skill.color}, #ec4899)`,
                              borderRadius: 10,
                            },
                          }}
                        />
                      </motion.div>
                    </Box>

                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                      {skill.level}%
                    </Typography>
                  </CardContent>
                </SkillCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
