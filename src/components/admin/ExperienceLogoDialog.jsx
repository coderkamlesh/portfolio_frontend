import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  CircularProgress,
  IconButton,
  Stack
} from "@mui/material";
import { CloudUpload, Close } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExperienceLogo } from "@/service/admin.service";

export default function ExperienceLogoDialog({ open, onClose, experience }) {
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const mutation = useMutation({
    mutationFn: updateExperienceLogo,
    onSuccess: () => {
      queryClient.invalidateQueries(["experiences"]);
      alert("Company logo updated!");
      handleClose();
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to upload logo");
    },
  });

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = () => {
    if (file && experience) {
      mutation.mutate({ id: experience.id, file });
    }
  };

  const handleClose = () => {
    setPreview(null);
    setFile(null);
    onClose();
  };

  // Current Logo URL from backend or Preview
  const currentLogo = preview || experience?.logo;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center">
        Update Company Logo
        <IconButton onClick={handleClose} size="small"><Close /></IconButton>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" py={2} gap={3}>
          {/* Logo Preview Area */}
          <Box 
            sx={{ 
              width: 150, 
              height: 150, 
              bgcolor: "action.hover", 
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: "1px dashed grey"
            }}
          >
            {currentLogo ? (
              <img 
                src={currentLogo} 
                alt="Logo" 
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: 10 }} 
              />
            ) : (
              <Typography variant="caption" color="text.secondary">No Logo</Typography>
            )}
          </Box>

          {/* Upload Button */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
            >
              Select Logo
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
            
            {file && (
              <Typography variant="caption" color="primary">
                {file.name} selected
              </Typography>
            )}
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} color="inherit">Cancel</Button>
        <Button 
          onClick={handleUpload} 
          variant="contained" 
          disabled={!file || mutation.isPending}
        >
          {mutation.isPending ? <CircularProgress size={24} /> : "Upload & Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}