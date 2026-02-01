import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid, // Standard Grid Import
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject, updateProject } from "@/service/admin.service";

export default function ProjectDialog({ open, onClose, projectToEdit }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const isEditMode = !!projectToEdit;

  useEffect(() => {
    if (projectToEdit) {
      reset(projectToEdit);
    } else {
      reset({
        title: "",
        description: "",
        tech_stack: "",
        repo_link: "",
        live_link: "",
        sort_order: 1,
      });
    }
  }, [projectToEdit, reset, open]);

  // Handle Add/Update Mutation
  const mutation = useMutation({
    mutationFn: (data) => {
      // Backend ko integer chahiye, form se string aa sakta hai
      const payload = { ...data, sort_order: parseInt(data.sort_order) };
      
      if (isEditMode) {
        return updateProject({ id: projectToEdit.id, data: payload });
      } else {
        return addProject(payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      onClose();
      reset();
    },
    onError: (error) => {
      console.error(error);
      alert("Operation failed");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{isEditMode ? "Edit Project" : "Create New Project"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Project Title"
                {...register("title", { required: "Title is required" })}
                error={!!errors.title}
                helperText={errors.title?.message}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                {...register("description")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Tech Stack (comma separated)"
                placeholder="React, Go, Turso"
                {...register("tech_stack")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="number"
                label="Sort Order"
                {...register("sort_order")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Repository Link"
                {...register("repo_link")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Live Demo Link"
                {...register("live_link")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={onClose} color="inherit">Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={mutation.isPending}
          >
            {mutation.isPending ? <CircularProgress size={24} /> : (isEditMode ? "Update" : "Create")}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}