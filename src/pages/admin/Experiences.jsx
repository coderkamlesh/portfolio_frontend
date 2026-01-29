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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import BusinessIcon from "@mui/icons-material/Business";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getExperiences } from "@/service/public.service"; // Public Read
import { deleteExperience } from "@/service/admin.service"; // Admin Write
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
  if (isError) return <Typography color="error">Failed to load experiences.</Typography>;

  // Data extraction
  const experiences = expData?.data || [];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Experience
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Experience
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Company</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Location</TableCell>
              <TableCell align="center">Sort Order</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {experiences.map((exp) => (
              <TableRow key={exp.id} hover>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={2}>
                    {/* Logo or Icon */}
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        style={{ width: 32, height: 32, objectFit: "contain", borderRadius: 4 }}
                      />
                    ) : (
                      <BusinessIcon color="action" />
                    )}
                    <Typography fontWeight="bold">{exp.company}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{exp.position}</TableCell>
                <TableCell>
                  <Chip label={exp.duration} size="small" variant="outlined" />
                </TableCell>
                <TableCell>{exp.location}</TableCell>
                <TableCell align="center">{exp.sort_order}</TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEdit(exp)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(exp.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {experiences.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No experiences found.
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