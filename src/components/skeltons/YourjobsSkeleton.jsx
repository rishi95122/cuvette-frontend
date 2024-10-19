import { Box, Skeleton, Typography, Card, CardContent } from "@mui/material";

const YourjobsSkeltons = () => {
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2, padding: 2 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          <Skeleton width="80%" />
        </Typography>

        <Typography variant="body2" color="text.secondary">
          <Skeleton width="90%" />
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Skeleton variant="circular" width={24} height={24} />
          <Skeleton width="60%" sx={{ ml: 1 }} />
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Skeleton variant="rectangular" width={24} height={24} />
          <Skeleton width="40%" sx={{ ml: 1 }} />
        </Box>

        <Box sx={{ display: "flex", mt: 2, gap: 1, overflowX: "auto" }}>
          {[...Array(3)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              width={80}
              height={30}
              sx={{ borderRadius: 1 }}
            />
          ))}
        </Box>

        <Skeleton
          variant="rectangular"
          width="100%"
          height={40}
          sx={{ mt: 3, borderRadius: 2 }}
        />
      </CardContent>
    </Card>
  );
};

export default YourjobsSkeltons;
