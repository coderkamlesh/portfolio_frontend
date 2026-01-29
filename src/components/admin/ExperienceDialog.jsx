import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Grid, // Fixed: Import Grid directly
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addExperience, updateExperience } from "@/service/admin.service";

export default function ExperienceDialog({ open, onClose, experienceToEdit }) {
  const queryClient = useQueryClient();
  const isEditMode = !!experienceToEdit;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Reset or Fill form
  useEffect(() => {
    if (open) {
      if (experienceToEdit) {
        setValue("company", experienceToEdit.company);
        setValue("position", experienceToEdit.position);
        setValue("duration", experienceToEdit.duration);
        setValue("location", experienceToEdit.location);
        setValue("description", experienceToEdit.description);
        setValue("logo", experienceToEdit.logo || "");
        setValue("sort_order", experienceToEdit.sort_order);
      } else {
        reset({
          company: "",
          position: "",
          duration: "",
          location: "",
          description: "",
          logo: "",
          sort_order: 1,
        });
      }
    }
  }, [open, experienceToEdit, setValue, reset]);

  const mutation = useMutation({
    mutationFn: (data) => {
      // Backend expects sort_order as number
      const payload = { ...data, sort_order: Number(data.sort_order) };

      if (isEditMode) {
        return updateExperience({ id: experienceToEdit.id, data: payload });
      }
      return addExperience(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      onClose();
      reset();
    },
    onError: (error) => {
      console.error("Error saving experience:", error);
      alert("Failed to save experience");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {isEditMode ? "Update Experience" : "Add Experience"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            {/* Grid container */}
            <Grid container spacing={2}>
              
              {/* Row 1: Company & Position */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Company Name"
                  {...register("company", { required: "Company is required" })}
                  error={!!errors.company}
                  helperText={errors.company?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Position / Role"
                  {...register("position", { required: "Position is required" })}
                  error={!!errors.position}
                  helperText={errors.position?.message}
                  fullWidth
                />
              </Grid>

              {/* Row 2: Duration & Location */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Duration (e.g. Jan 2024 - Present)"
                  {...register("duration", { required: "Duration is required" })}
                  error={!!errors.duration}
                  helperText={errors.duration?.message}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Location"
                  {...register("location", { required: "Location is required" })}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  fullWidth
                />
              </Grid>

              {/* Row 3: Logo & Sort Order */}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Company Logo URL (Optional)"
                  {...register("logo")}
                  fullWidth
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="Sort Order"
                  type="number"
                  {...register("sort_order", { valueAsNumber: true })}
                  fullWidth
                />
              </Grid>

              {/* Row 4: Description */}
              <Grid size={{ xs: 12 }}>
                <TextField
                  label="Job Description"
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
            {mutation.isPending ? "Saving..." : isEditMode ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}