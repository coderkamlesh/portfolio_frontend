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
  Avatar,
  Stack
} from "@mui/material";
import { CloudUpload, Close } from "@mui/icons-material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProjectImage } from "@/service/admin.service";

export default function ProjectImageDialog({ open, onClose, project }) {
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const mutation = useMutation({
    mutationFn: updateProjectImage,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["projects"]);
      alert("Project image updated!");
      handleClose();
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to upload image");
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
    if (file && project) {
      mutation.mutate({ id: project.id, file });
    }
  };

  const handleClose = () => {
    setPreview(null);
    setFile(null);
    onClose();
  };

  // Current Image URL from backend or Placeholder
  const currentImage = preview || project?.image_url;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center">
        Update Project Image
        <IconButton onClick={handleClose} size="small"><Close /></IconButton>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" py={2} gap={3}>
          {/* Image Preview Area */}
          <Box 
            sx={{ 
              width: "100%", 
              height: 250, 
              bgcolor: "action.hover", 
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: "1px dashed grey"
            }}
          >
            {currentImage ? (
              <img 
                src={currentImage} 
                alt="Project" 
                style={{ width: "100%", height: "100%", objectFit: "contain" }} 
              />
            ) : (
              <Typography color="text.secondary">No Image Available</Typography>
            )}
          </Box>

          {/* Upload Button */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
            >
              Select New Image
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