import LeetcodeProblem from "./LeetcodeProblem"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

function LeetcodeSet(){
    return(
        <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 3 }}>
                <FormatListBulletedIcon sx={{ color: "primary.main", fontSize: 24 }} />
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                    Problem Set
                </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                <LeetcodeProblem name="1. Two Sum" difficulty="Easy" solved={true} />
                <LeetcodeProblem name="15. 3Sum" difficulty="Medium" solved={false} />
                <LeetcodeProblem name="42. Trapping Rain Water" difficulty="Hard" solved={false} />
            </Box>
        </Box>  
    )
}

export default LeetcodeSet;