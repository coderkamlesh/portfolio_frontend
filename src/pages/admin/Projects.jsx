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
  Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import GitHubIcon from "@mui/icons-material/GitHub";
import ImageIcon from "@mui/icons-material/Image"; // Image Icon import

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects } from "@/service/public.service";
import { deleteProject } from "@/service/admin.service";
import ProjectDialog from "@/components/admin/ProjectDialog";
import ProjectImageDialog from "@/components/admin/ProjectImageDialog"; // Import Image Dialog

export default function Projects() {
  const queryClient = useQueryClient();
  
  // States for Dialogs
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openImageDialog, setOpenImageDialog] = useState(false);
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

  // --- Handlers ---
  const handleAdd = () => {
    setSelectedProject(null);
    setOpenFormDialog(true);
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setOpenFormDialog(true);
  };

  // Handler to Open Image Dialog
  const handleImageClick = (project) => {
    setSelectedProject(project);
    setOpenImageDialog(true);
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
            <TableRow sx={{ bgcolor: "action.hover" }}>
              <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Tech Stack</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Repository</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Order</TableCell>
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
                  <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: 200, display: "block" }}>
                    {project.description}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Box display="flex" gap={0.5} flexWrap="wrap">
                    {project.tech_stack?.split(",").map((tech, index) => (
                      <Chip key={index} label={tech.trim()} size="small" variant="outlined" sx={{ fontSize: "0.75rem" }} />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>
                  {project.repo_link ? (
                    <Link href={project.repo_link} target="_blank" rel="noopener" color="text.primary" sx={{ display: "flex", alignItems: "center", "&:hover": { color: "primary.main" } }}>
                      <GitHubIcon fontSize="small" />
                    </Link>
                  ) : "-"}
                </TableCell>
                <TableCell align="center">
                  {project.sort_order}
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    
                    {/* Image Action Button */}
                    <Tooltip title="View/Update Image">
                      <IconButton 
                        size="small" 
                        color={project.image_url ? "primary" : "default"}
                        onClick={() => handleImageClick(project)}
                      >
                        <ImageIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    {/* Edit Text Button */}
                    <Tooltip title="Edit Details">
                      <IconButton size="small" onClick={() => handleEdit(project)} sx={{ color: "info.main" }}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                    {/* Delete Button */}
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(project.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>

                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {projects.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography color="text.secondary">No projects found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Main Form Dialog (Add/Edit Text) */}
      <ProjectDialog
        open={openFormDialog}
        onClose={() => setOpenFormDialog(false)}
        projectToEdit={selectedProject}
      />

      {/* Image Handling Dialog */}
      <ProjectImageDialog
        open={openImageDialog}
        onClose={() => setOpenImageDialog(false)}
        project={selectedProject}
      />
    </Box>
  );
}