import { Button } from "@mui/material";
import { useResumeData } from "@/resume/useResumeData";
import ResumeTemplate from "@/resume/ResumeTemplate";
import { generateResumePdf } from "@/resume/generateResumePdf";

export default function DownloadResumeButton({ variant = "outlined" }) {
  const { data, isLoading } = useResumeData();

  if (isLoading || !data) return null;

  return (
    <>
      {/* Hidden Resume */}
      <div style={{ display: "none" }}>
        <ResumeTemplate data={data} />
      </div>

      <Button variant={variant} onClick={generateResumePdf}>
        Download Resume
      </Button>
    </>
  );
}
