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
  LinearProgress,
  alpha,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExperiences } from "@/service/public.service"; 
import { deleteExperience } from "@/service/admin.service"; 
import ExperienceDialog from "@/components/admin/ExperienceDialog";

export default function Experiences() {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExp, setSelectedExp] = useState(null);

  // Fetch Data
  const { data: expData, isLoading, isError } = useQuery({
    queryKey: ["experiences"],
    queryFn: getExperiences,
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: (err) => {
      alert("Error deleting experience");
      console.error(err);
    },
  });

  const handleAdd = () => {
    setSelectedExp(null);
    setOpenDialog(true);
  };

  const handleEdit = (exp) => {
    setSelectedExp(exp);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this experience?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LinearProgress />;
  if (isError) return <Typography color="error" p={3}>Failed to load experiences.</Typography>;

  // Data extraction
  const experiences = expData?.data || [];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Experience
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          color="primary"
        >
          Add Experience
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            {/* Header Background Theme se ayega (action.hover ya background.default) */}
            <TableRow sx={{ bgcolor: "action.hover" }}>
              <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Duration</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Location</TableCell>
              <TableCell align="center" sx={{ fontWeight: 600 }}>Sort Order</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experiences.map((exp) => (
              <TableRow key={exp.id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    {/* Logo logic improved using MUI Box */}
                    {exp.logo ? (
                      <Box
                        component="img"
                        src={exp.logo}
                        alt={exp.company}
                        sx={{
                          width: 32,
                          height: 32,
                          objectFit: "contain",
                          borderRadius: 1,
                          // Optional: agar transparent logo dark mode me na dikhe
                          // bgcolor: "background.paper" 
                        }}
                      />
                    ) : (
                      <BusinessIcon color="action" />
                    )}
                    <Typography fontWeight="500" color="text.primary">
                      {exp.company}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {exp.position}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={exp.duration} 
                    size="small" 
                    variant="outlined" 
                    // Chip automatically theme colors use karta hai
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {exp.location}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Typography variant="body2" color="text.secondary">
                    {exp.sort_order}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEdit(exp)}
                      sx={{ color: "primary.main" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(exp.id)}
                      disabled={deleteMutation.isPending}
                      sx={{ color: "error.main" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {experiences.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  <Typography color="text.secondary">
                    No experiences found.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <ExperienceDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        experienceToEdit={selectedExp}
      />
    </Box>
  );
}