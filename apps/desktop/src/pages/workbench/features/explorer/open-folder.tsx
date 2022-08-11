import Button from "@/components/button";
import Typography from "@mui/material/Typography";
import { invoke } from "@tauri-apps/api/tauri";

export default function OpenFolder() {
  const handleOpenFolder = () => invoke("open_folder");

  return (
    <>
      <Typography variant="body2">You have not yet opened a folder.</Typography>
      <Button
        variant="accent"
        sx={{ marginTop: "8px" }}
        onClick={handleOpenFolder}
      >
        Open Folder
      </Button>
    </>
  );
}
