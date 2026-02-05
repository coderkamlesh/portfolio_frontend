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
import { updateSkillIcon } from "@/service/admin.service";

export default function SkillIconDialog({ open, onClose, skill }) {
  const queryClient = useQueryClient();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const mutation = useMutation({
    mutationFn: updateSkillIcon,
    onSuccess: () => {
      queryClient.invalidateQueries(["skills"]);
      alert("Skill icon updated!");
      handleClose();
    },
    onError: (error) => {
      console.error(error);
      alert("Failed to upload icon");
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
    if (file && skill) {
      mutation.mutate({ id: skill.id, file });
    }
  };

  const handleClose = () => {
    setPreview(null);
    setFile(null);
    onClose();
  };

  
  const currentIcon = preview || skill?.icon;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center">
        Update Skill Icon
        <IconButton onClick={handleClose} size="small"><Close /></IconButton>
      </DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" py={2} gap={3}>
          {/* Icon Preview Area */}
          <Box 
            sx={{ 
              width: 100, 
              height: 100, 
              bgcolor: "action.hover", 
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              border: "1px dashed grey"
            }}
          >
            {currentIcon ? (
              <img 
                src={currentIcon} 
                alt="Skill Icon" 
                style={{ width: "100%", height: "100%", objectFit: "contain", padding: 10 }} 
              />
            ) : (
              <Typography variant="caption" color="text.secondary">No Icon</Typography>
            )}
          </Box>

          {/* Upload Button */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUpload />}
            >
              Select Icon
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