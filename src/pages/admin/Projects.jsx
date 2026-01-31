import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Chip,
  Link,
  LinearProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import GitHubIcon from "@mui/icons-material/GitHub";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects } from "@/service/public.service";
import { deleteProject } from "@/service/admin.service";
import ProjectDialog from "@/components/admin/ProjectDialog";

export default function Projects() {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // Fetch Projects
  const { data: projectData, isLoading, isError } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      alert("Error deleting project");
      console.error(err);
    },
  });

  const handleAdd = () => {
    setSelectedProject(null);
    setOpenDialog(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LinearProgress />;
  if (isError) return <Typography color="error" p={3}>Failed to load projects.</Typography>;

  const projects = projectData?.data || [];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          color="primary"
        >
          Create Project
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            {/* Theme-aware background color */}
            <TableRow sx={{ bgcolor: "action.hover" }}>
              <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tech Stack</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Repository</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Sort Order</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} hover>
                <TableCell>
                  <Typography fontWeight="bold" color="text.primary">
                    {project.title}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary" 
                    noWrap 
                    sx={{ maxWidth: 200, display: "block" }}
                  >
                    {project.description}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Box display="flex" gap={0.5} flexWrap="wrap">
                    {project.tech_stack?.split(",").map((tech, index) => (
                      <Chip 
                        key={index} 
                        label={tech.trim()} 
                        size="small" 
                        variant="outlined" 
                        // Chip styles automatically adapt to theme mode
                        sx={{ fontSize: "0.75rem" }}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  {project.repo_link ? (
                    <Link 
                      href={project.repo_link} 
                      target="_blank" 
                      rel="noopener" 
                      color="text.primary"
                      sx={{ 
                        display: "flex", 
                        alignItems: "center",
                        "&:hover": { color: "primary.main" } 
                      }}
                    >
                      <GitHubIcon fontSize="small" />
                    </Link>
                  ) : (
                    <Typography variant="body2" color="text.secondary">-</Typography>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" color="text.secondary">
                    {project.sort_order}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <IconButton 
                      size="small"
                      onClick={() => handleEdit(project)}
                      sx={{ color: "primary.main" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDelete(project.id)}
                      disabled={deleteMutation.isPending}
                      sx={{ color: "error.main" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography color="text.secondary">
                    No projects found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <ProjectDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        projectToEdit={selectedProject}
      />
    </Box>
  );
}