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
  Avatar,
  LinearProgress,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSkills } from "@/service/public.service"; 
import { deleteSkill } from "@/service/admin.service"; 
import SkillDialog from "@/components/admin/SkillDialog";

export default function Skills() {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Fetch Skills
  const { data: skillsData, isLoading, isError } = useQuery({
    queryKey: ["skills"],
    queryFn: getSkills,
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: deleteSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
    },
    onError: (err) => {
      alert("Error deleting skill");
      console.error(err);
    },
  });

  const handleAdd = () => {
    setSelectedSkill(null);
    setOpenDialog(true);
  };

  const handleEdit = (skill) => {
    setSelectedSkill(skill);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) return <LinearProgress />;
  if (isError) return <Typography color="error" p={3}>Failed to load skills.</Typography>;

  const skillsList = skillsData?.data || [];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Skills Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          color="primary"
        >
          Add Skill
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={1}>
        <Table>
          <TableHead>
            {/* Theme aware background */}
            <TableRow sx={{ bgcolor: "action.hover" }}>
              <TableCell sx={{ fontWeight: 600 }}>Icon</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Proficiency</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skillsList.map((skill) => (
              <TableRow key={skill.id} hover>
                <TableCell>
                  <Avatar
                    src={skill.icon}
                    alt={skill.name}
                    variant="rounded"
                    sx={{ 
                      width: 40, 
                      height: 40, 
                      objectFit: "contain",
                      bgcolor: "transparent", // Ensure transparent icons look good
                      border: "1px solid",
                      borderColor: "divider"
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography fontWeight="500" color="text.primary">
                    {skill.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  {/* Replaced manual Box with MUI Chip for better theming */}
                  <Chip 
                    label={skill.category} 
                    size="small" 
                    variant="outlined"
                    color="primary"
                    sx={{ fontWeight: 500 }}
                  />
                </TableCell>
                <TableCell sx={{ width: "30%" }}>
                  <Box display="flex" alignItems="center">
                    <Box width="100%" mr={1}>
                      <LinearProgress 
                        variant="determinate" 
                        value={skill.percentage} 
                        sx={{ 
                          height: 8, 
                          borderRadius: 5,
                          bgcolor: "action.hover", // Track color
                          "& .MuiLinearProgress-bar": {
                             borderRadius: 5,
                          }
                        }}
                      />
                    </Box>
                    <Box minWidth={35}>
                      <Typography variant="body2" color="text.secondary">
                        {skill.percentage}%
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <IconButton 
                      size="small"
                      onClick={() => handleEdit(skill)}
                      sx={{ color: "primary.main" }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(skill.id)}
                      disabled={deleteMutation.isPending}
                      sx={{ color: "error.main" }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {skillsList.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                  <Typography color="text.secondary">No skills found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <SkillDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        skillToEdit={selectedSkill}
      />
    </Box>
  );
}