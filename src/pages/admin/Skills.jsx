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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSkills } from "@/service/public.service"; // Reading from public
import { deleteSkill } from "@/service/admin.service"; // Deleting from admin
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
    }
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
  if (isError) return <Typography color="error">Failed to load skills.</Typography>;

  // Response structure check: data.data array hai ya direct array hai
  // Tumhare JSON response ke hisab se: { data: [...] }
  const skillsList = skillsData?.data || []; 

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold">
          Skills Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add Skill
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Icon</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Proficiency</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {skillsList.map((skill) => (
              <TableRow key={skill.id}>
                <TableCell>
                  <Avatar
                    src={skill.icon}
                    alt={skill.name}
                    variant="rounded"
                    sx={{ width: 40, height: 40, objectFit: "contain" }}
                  />
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>{skill.name}</TableCell>
                <TableCell>
                    <Typography variant="body2" sx={{ 
                        bgcolor: 'primary.light', 
                        color: 'primary.contrastText', 
                        px: 1, 
                        py: 0.5, 
                        borderRadius: 1,
                        display: 'inline-block',
                        fontSize: '0.75rem'
                    }}>
                        {skill.category}
                    </Typography>
                </TableCell>
                <TableCell sx={{ width: "30%" }}>
                  <Box display="flex" alignItems="center">
                    <Box width="100%" mr={1}>
                      <LinearProgress variant="determinate" value={skill.percentage} />
                    </Box>
                    <Box minWidth={35}>
                      <Typography variant="body2" color="text.secondary">
                        {skill.percentage}%
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEdit(skill)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => handleDelete(skill.id)}
                    disabled={deleteMutation.isPending}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {skillsList.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} align="center">No skills found.</TableCell>
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