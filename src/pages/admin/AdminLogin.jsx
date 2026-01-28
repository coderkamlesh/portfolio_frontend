import { useForm } from "react-hook-form";
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Container, 
  Alert,
  CircularProgress 
} from "@mui/material";
import { motion } from "motion/react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/store/authStore";
import { adminLogin } from "@/service/admin.service";

export default function AdminLogin() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);
  const setUser = useAuthStore((state) => state.setUser);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  // React Query Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: adminLogin,
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user || { email: "admin@portfolio.com" }); // fallback agar user data na ho
      navigate("/admin/dashboard"); // Successful login ke baad yahan bhejo
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Container maxWidth="xs">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center" fontWeight="bold">
            Admin Login
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Enter your credentials to manage your portfolio
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.response?.data?.message || "Login failed. Please check credentials."}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email Address"
              margin="normal"
              {...register("email", { required: "Email is required" })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              {...register("password", { required: "Password is required" })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            
            <Button
              fullWidth
              variant="contained"
              type="submit"
              size="large"
              disabled={isPending}
              sx={{ mt: 3, py: 1.5, textTransform: "none", fontSize: "1rem" }}
            >
              {isPending ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}