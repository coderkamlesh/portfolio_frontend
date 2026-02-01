import React, { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
  Avatar,
  Stack,
  IconButton,
  Badge
} from "@mui/material";
import Grid from '@mui/material/Grid'; 
import { motion } from "motion/react";
import { CloudUpload, Edit } from "@mui/icons-material";
import { getHeroData, updateHeroData, updateAvatar } from "@/service/admin.service";

export default function Profile() {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // 1. Fetch Data
  const { data, isLoading } = useQuery({
    queryKey: ["heroData"],
    queryFn: getHeroData,
  });

  // 2. Avatar Mutation (Instant Upload)
  const avatarMutation = useMutation({
    mutationFn: updateAvatar,
    onSuccess: () => {
      // Jaise hi upload khatam ho, naya data fetch karo taaki photo update ho jaye
      queryClient.invalidateQueries(["heroData"]);
      alert("Profile picture updated!");
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to upload image");
    }
  });

  // 3. Text Mutation (Form Submit)
  const textMutation = useMutation({
    mutationFn: updateHeroData,
    onSuccess: () => {
      queryClient.invalidateQueries(["heroData"]);
      alert("Profile details updated!");
    },
    onError: (error) => {
        alert(error.response?.data?.message || "Update failed");
    }
  });

  // Form Reset Logic
  useEffect(() => {
    if (data) {
      reset(data); // Form fields fill kar do
    }
  }, [data, reset]);

  // --- HANDLERS ---

  // 1. File Select karte hi Upload start
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Direct mutation call
      avatarMutation.mutate(file);
    }
  };

  // 2. Sirf Text Data Update
  const onSubmit = (formData) => {
    // Backend ko 'avatar_url' bhejne ki zaroorat nahi hai, wo already update ho chuka hai
    // Hum sirf text fields bhejenge
    const { avatar_url, ...payload } = formData;
    
    textMutation.mutate(payload);
  };

  if (isLoading) return <CircularProgress sx={{ m: 5 }} />;

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Edit Profile
      </Typography>

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            
            {/* --- Avatar Section (Instant Upload) --- */}
            <Grid size={{ xs: 12 }} sx={{ display: "flex", justifyContent: "center" }}>
              <Stack direction="column" alignItems="center" spacing={2}>
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  badgeContent={
                    <IconButton 
                      component="label" 
                      disabled={avatarMutation.isPending} // Upload ke time click disable
                      sx={{ bgcolor: "primary.main", color: "white", '&:hover': { bgcolor: "primary.dark" } }}
                    >
                      <Edit fontSize="small" />
                      <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                    </IconButton>
                  }
                >
                  {/* Relative Box taaki Loader Avatar ke upar aa sake */}
                  <Box position="relative">
                    <Avatar 
                      src={data?.avatar_url} // Direct backend data use ho raha hai
                      alt="Profile Avatar" 
                      sx={{ 
                        width: 120, 
                        height: 120, 
                        border: "4px solid #f0f0f0",
                        opacity: avatarMutation.isPending ? 0.5 : 1 // Upload ke waqt dhundhla
                      }} 
                    />
                    {/* Loader Overlay */}
                    {avatarMutation.isPending && (
                      <CircularProgress 
                        size={40}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-20px",
                          marginLeft: "-20px",
                          color: "primary.main"
                        }}
                      />
                    )}
                  </Box>
                </Badge>
                
                <Typography variant="caption" color="text.secondary">
                  {avatarMutation.isPending ? "Uploading..." : "Click pencil to change photo immediately"}
                </Typography>
              </Stack>
            </Grid>

            {/* --- Text Form Fields --- */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Full Name"
                {...register("full_name", { required: "Name is required" })}
                error={!!errors.full_name}
                helperText={errors.full_name?.message}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Job Title"
                {...register("job_title")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Description"
                {...register("description")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="GitHub Link"
                {...register("github_link")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="LinkedIn Link"
                {...register("linkedin_link")}
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                // Sirf text mutation ka pending state check karo yahan
                startIcon={textMutation.isPending ? <CircularProgress size={20} color="inherit"/> : <CloudUpload />}
                disabled={textMutation.isPending}
                sx={{ borderRadius: 2, px: 5 }}
              >
                {textMutation.isPending ? "Saving Details..." : "Save Details"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}