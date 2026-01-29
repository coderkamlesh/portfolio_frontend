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
import { getProjects } from "@/service/public.service"; // Reading from public
import { deleteProject } from "@/service/admin.service"; // Deleting from admin
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
  if (isError) return <Typography color="error">Failed to load projects.</Typography>;

  const projects = projectData?.data || [];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Projects
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Create Project
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Title</TableCell>
              <TableCell>Tech Stack</TableCell>
              <TableCell>Repository</TableCell>
              <TableCell align="center">Sort Order</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} hover>
                <TableCell>
                  <Typography fontWeight="bold">{project.title}</Typography>
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 200, display: "block" }}>
                    {project.description}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Box display="flex" gap={0.5} flexWrap="wrap">
                    {project.tech_stack.split(",").map((tech, index) => (
                      <Chip 
                        key={index} 
                        label={tech.trim()} 
                        size="small" 
                        variant="outlined" 
                        sx={{ fontSize: "0.7rem" }}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  {project.repo_link ? (
                    <Link href={project.repo_link} target="_blank" rel="noopener" color="inherit">
                      <GitHubIcon fontSize="small" />
                    </Link>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell align="center">{project.sort_order}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEdit(project)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(project.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No projects found.
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