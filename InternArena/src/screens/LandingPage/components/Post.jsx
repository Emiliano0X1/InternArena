import PostHeader from "./PostHeader"
import postimage from '../../../assets/profilebanner.png'
import { BiHeart, BiComment, BiShareAlt } from "react-icons/bi";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

function Post() {
    return(
        <Paper 
            className="hover-scale"
            sx={{ 
                width: "100%",
                boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                overflow: "hidden",
                p: 2.5
            }}
        >
            <PostHeader/>

            <Typography 
                variant="body2" 
                sx={{ 
                    color: "text.primary", 
                    lineHeight: 1.6, 
                    my: 2.5,
                    px: 1 
                }}
            >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, corrupti sit. Ex, incidunt exercitationem accusantium a ipsa nulla labore officiis placeat quisquam, obcaecati ut! Dolorum impedit labore cupiditate illo eligendi.
            </Typography>

            <Box 
                sx={{ 
                    width: "100%", 
                    maxHeight: 320, 
                    overflow: "hidden", 
                    borderRadius: 2, 
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    mb: 2
                }}
            >
                <img 
                    src={postimage} 
                    alt="Post media" 
                    className="w-full h-full object-cover aspect-video" 
                />
            </Box>

            {/* Action Bar */}
            <Box 
                sx={{ 
                    display: "flex", 
                    justifyContent: "space-between", 
                    alignItems: "center", 
                    borderTop: "1px solid rgba(255, 255, 255, 0.05)", 
                    pt: 1.5,
                    px: 0.5 
                }}
            >
                <Button 
                    startIcon={<BiHeart />} 
                    variant="text" 
                    sx={{ color: "text.secondary", "&:hover": { color: "#f97316", backgroundColor: "rgba(249, 115, 22, 0.05)" }, px: 2, borderRadius: 2 }}
                >
                    Like
                </Button>
                <Button 
                    startIcon={<BiComment />} 
                    variant="text" 
                    sx={{ color: "text.secondary", "&:hover": { color: "primary.main", backgroundColor: "rgba(249, 115, 22, 0.05)" }, px: 2, borderRadius: 2 }}
                >
                    Comment
                </Button>
                <Button 
                    startIcon={<BiShareAlt />} 
                    variant="text" 
                    sx={{ color: "text.secondary", "&:hover": { color: "primary.main", backgroundColor: "rgba(249, 115, 22, 0.05)" }, px: 2, borderRadius: 2 }}
                >
                    Share
                </Button>
            </Box>
        </Paper>
    )
}

export default Post;