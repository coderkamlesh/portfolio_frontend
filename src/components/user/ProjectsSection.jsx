
import { GradientText } from "@/styles/GradientText";
import { ProjectCard } from "@/styles/ProjectCard";
import { Box, Button, CardContent, Chip, Container, Grid, Typography } from "@mui/material";
import { motion } from "motion/react"

export default function ProjectsSection() {
   const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with payment integration and real-time inventory management.',
      image: '🛒',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      link: '#',
    },
    {
      title: 'Task Management App',
      description: 'Android application for task management with offline support and cloud synchronization.',
      image: '📱',
      technologies: ['Android', 'Kotlin', 'Firebase', 'Room'],
      link: '#',
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media metrics with real-time data visualization.',
      image: '📊',
      technologies: ['React', 'D3.js', 'Java', 'Spring Boot'],
      link: '#',
    },
    {
      title: 'Weather Forecast App',
      description: 'Beautiful weather application with location-based forecasts and weather alerts.',
      image: '🌤️',
      technologies: ['JavaScript', 'React', 'Weather API', 'Tailwind'],
      link: '#',
    },
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
              Featured Projects
            </GradientText>
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 300 }}>
              Some of my recent work
            </Typography>
          </Box>
        </motion.div>

        <Grid container spacing={3}>
          {projects.map((project, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <ProjectCard>
                  <Box
                    sx={{
                      height: 200,
                      background: 'linear-gradient(135deg, #0a0e14, #151921)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '5rem',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at 30% 50%, rgba(245, 158, 11, 0.1), transparent)',
                      },
                    }}
                  >
                    <Box component="span" sx={{ zIndex: 1, filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))' }}>
                      {project.image}
                    </Box>
                  </Box>

                  <CardContent sx={{ p: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 1.5 }}>
                      {project.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.6 }}>
                      {project.description}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {project.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          sx={{
                            background: 'rgba(236, 72, 153, 0.1)',
                            color: '#ec4899',
                            fontWeight: 500,
                            fontSize: '0.75rem',
                          }}
                        />
                      ))}
                    </Box>

                    <Button
                      href={project.link}
                      sx={{
                        color: '#f59e0b',
                        fontWeight: 600,
                        textTransform: 'none',
                        p: 0,
                        '&:hover': {
                          background: 'transparent',
                        },
                      }}
                    >
                      View Project →
                    </Button>
                  </CardContent>
                </ProjectCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
