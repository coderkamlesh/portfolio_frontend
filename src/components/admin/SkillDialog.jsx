import { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSkill, updateSkill } from "@/service/admin.service";

const categories = ["Backend", "Frontend", "DevOps", "Database", "Tools"];

export default function SkillDialog({ open, onClose, skillToEdit }) {
  const queryClient = useQueryClient();
  const isEditMode = !!skillToEdit;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Jab bhi dialog open ho ya skillToEdit change ho, form reset/fill karo
  useEffect(() => {
    if (open) {
      if (skillToEdit) {
        setValue("name", skillToEdit.name);
        setValue("category", skillToEdit.category);
        setValue("percentage", skillToEdit.percentage);
        setValue("icon", skillToEdit.icon);
      } else {
        reset({
          name: "",
          category: "",
          percentage: 0,
          icon: "",
        });
      }
    }
  }, [open, skillToEdit, setValue, reset]);

  // Mutation for Add/Update
  const mutation = useMutation({
    mutationFn: (data) => {
        // Percentage ko number me convert karna zaroori hai agar input string de raha ho
        const payload = { ...data, percentage: Number(data.percentage) };
        
        if (isEditMode) {
            return updateSkill({ id: skillToEdit.id, data: payload });
        }
        return addSkill(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] }); // List refresh
      onClose();
      reset();
    },
    onError: (error) => {
        console.error("Error saving skill:", error);
        alert("Failed to save skill"); // Toast use kar sakte ho yahan
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEditMode ? "Update Skill" : "Add New Skill"}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Skill Name"
              {...register("name", { required: "Name is required" })}
              error={!!errors.name}
              helperText={errors.name?.message}
              fullWidth
            />

            <TextField
              select
              label="Category"
              defaultValue=""
              {...register("category", { required: "Category is required" })}
              error={!!errors.category}
              helperText={errors.category?.message}
              fullWidth
            >
              {categories.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Percentage (0-100)"
              type="number"
              {...register("percentage", { 
                  required: "Percentage is required",
                  min: { value: 0, message: "Min 0" },
                  max: { value: 100, message: "Max 100" }
              })}
              error={!!errors.percentage}
              helperText={errors.percentage?.message}
              fullWidth
            />

            <TextField
              label="Icon URL (SVG/PNG)"
              {...register("icon", { required: "Icon URL is required" })}
              error={!!errors.icon}
              helperText={errors.icon?.message}
              fullWidth
            />
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