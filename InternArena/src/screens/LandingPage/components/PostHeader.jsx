import joeswag from '../../../assets/joeswag.png';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

function PostHeader(){
    return(
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1 }}>
            <Avatar 
                src={joeswag} 
                alt="Profile picture" 
                sx={{ 
                    width: 40, 
                    height: 40, 
                    border: "1px solid rgba(255, 255, 255, 0.1)" 
                }} 
            />
            <Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: "text.primary" }}>
                    Flavio Gonsales
                </Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    2 hours ago
                </Typography>
            </Box>
        </Box>
    )
}

export default PostHeader;