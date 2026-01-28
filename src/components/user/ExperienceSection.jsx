
import { GradientText } from "@/styles/GradientText";
import { TimelineConnector } from "@/styles/TimelineConnector";
import { Avatar, Box, Chip, Container, Grid, Paper, Typography } from "@mui/material";
import { motion } from "motion/react"

export default function ExperienceSection() {
   const experiences = [
    {
      title: 'Senior Java Developer',
      company: 'Tech Corp',
      period: '2023 - Present',
      description: 'Leading backend development for enterprise applications using Spring Boot and microservices architecture.',
      technologies: ['Java', 'Spring Boot', 'Microservices', 'Docker'],
      icon: '💼',
    },
    {
      title: 'Full Stack Developer',
      company: 'StartUp Inc',
      period: '2021 - 2023',
      description: 'Developed full-stack web applications using React and Node.js, improving user experience by 40%.',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS'],
      icon: '🚀',
    },
    {
      title: 'Android Developer',
      company: 'Mobile Solutions',
      period: '2020 - 2021',
      description: 'Built native Android applications with modern architecture components and Material Design.',
      technologies: ['Android', 'Kotlin', 'MVVM', 'Room'],
      icon: '📱',
    },
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: '#0a0e14' }}>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <GradientText variant="h2" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2 }}>
              Work Experience
            </GradientText>
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300 }}>
              My professional journey
            </Typography>
          </Box>
        </motion.div>

        <Box sx={{ position: 'relative', py: 4 }}>
          <TimelineConnector />
          
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  mb: 8,
                  position: 'relative',
                  justifyContent: { xs: 'flex-start', md: index % 2 === 0 ? 'flex-end' : 'flex-start' },
                  pl: { xs: '60px', md: index % 2 === 0 ? `calc(50% + 40px)` : 0 },
                  pr: { xs: 0, md: index % 2 === 0 ? 0 : `calc(50% + 40px)` },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    left: { xs: '20px', md: '50%' },
                    transform: 'translateX(-50%)',
                    width: 20,
                    height: 20,
                    background: '#f59e0b',
                    borderRadius: '50%',
                    border: '4px solid #0a0e14',
                    zIndex: 2,
                    boxShadow: '0 0 0 4px rgba(245, 158, 11, 0.2)',
                  }}
                />
                
                <Paper
                  elevation={0}
                  sx={{
                    background: '#1f242e',
                    border: '1px solid #2a303c',
                    borderRadius: 3,
                    p: 3,
                    maxWidth: 400,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                    <Avatar
                      sx={{
                        background: 'linear-gradient(135deg, #f59e0b, #ec4899)',
                        width: 48,
                        height: 48,
                        fontSize: '1.5rem',
                      }}
                    >
                      {exp.icon}
                    </Avatar>
                    <Chip
                      label={exp.period}
                      size="small"
                      sx={{
                        background: 'transparent',
                        color: '#f59e0b',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                      }}
                    />
                  </Box>

                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {exp.title}
                  </Typography>

                  <Typography variant="h6" sx={{ color: '#ec4899', fontWeight: 600, mb: 2 }}>
                    {exp.company}
                  </Typography>

                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
                    {exp.description}
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {exp.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{
                          background: 'rgba(139, 92, 246, 0.1)',
                          color: '#8b5cf6',
                          fontWeight: 500,
                          fontSize: '0.75rem',
                        }}
                      />
                    ))}
                  </Box>
                </Paper>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
