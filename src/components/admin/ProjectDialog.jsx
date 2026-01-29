import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid, // MUI v7 standard Grid
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject, updateProject } from "@/service/admin.service";

export default function ProjectDialog({ open, onClose, projectToEdit }) {
  const queryClient = useQueryClient();
  const isEditMode = !!projectToEdit;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (open) {
      if (projectToEdit) {
        setValue("title", projectToEdit.title);
        setValue("description", projectToEdit.description);
        setValue("tech_stack", projectToEdit.tech_stack);
        setValue("repo_link", projectToEdit.repo_link);
        setValue("sort_order", projectToEdit.sort_order);
      } else {
        reset({
          title: "",
          description: "",
          tech_stack: "",
          repo_link: "",
          sort_order: 1,
        });
      }
    }
  }, [open, projectToEdit, setValue, reset]);

  const mutation = useMutation({
    mutationFn: (data) => {
      const payload = { ...data, sort_order: Number(data.sort_order) };
      
      if (isEditMode) {
        return updateProject({ id: projectToEdit.id, data: payload });
      }
      return addProject(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      onClose();
      reset();
    },
    onError: (error) => {
      console.error("Error saving project:", error);
      alert("Failed to save project");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEditMode ? "Update Project" : "Create New Project"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {/* Row 1: Title & Sort Order */}
              <Grid size={{ xs: 12, md: 8 }}>
                <TextField
                  label="Project Title"
                  {...register("title", { required: "Title is required" })}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <TextField
                  label="Sort Order"
                  type="number"
                  {...register("sort_order", { valueAsNumber: true })}
                  fullWidth
                />
              </Grid>

              {/* Row 2: Tech Stack & Repo Link */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Tech Stack (comma separated)"
                  placeholder="Go, Gin, React..."
                  {...register("tech_stack", { required: "Tech stack is required" })}
                  error={!!errors.tech_stack}
                  helperText={errors.tech_stack?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Repository Link"
                  {...register("repo_link")}
                  fullWidth
                />
              </Grid>

              {/* Row 3: Description */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Project Description"
                  multiline
                  rows={4}
                  {...register("description", { required: "Description is required" })}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : isEditMode ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}