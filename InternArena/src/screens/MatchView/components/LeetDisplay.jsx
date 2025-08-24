import React from "react";
import {Box, Typography} from "@mui/material";

const leetcodes = [
    {title: 'Two Sum', difficulty: 'Easy'},
    {title: 'Add Two Numbers', difficulty: 'Medium'},
    {title: 'Longest Substring', difficulty: 'Medium'},
    {title: 'Valid Palindrome', difficulty: 'Easy'},
    {title: 'Longest Substring', difficulty: 'Medium'},
]

const getColor = (difficulty) => {
    switch (difficulty) {
        case 'Easy':
            return 'green';
        case 'Medium':
            return 'orange';
        case 'Hard':
            return 'red';
        default:
            return 'gray';
    }
};

const LeetDisplay = () => {
    return (
        <Box
        
        sx = {{
            height: "100%",
            width: "100%",
            p: 3,
            backgroundColor: '#343333',
            borderRadius: 2,
            color: 'white',
        }}
        
        >

            <Typography variant="h5" align = "center">LeetCodes Assigned</Typography>


            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
            {leetcodes.map((lc, index) => (
                <Box
                key={index}
                sx={{
                    minWidth: 120,
                    height: 50,
                    backgroundColor: getColor(lc.difficulty),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    color: 'white',
                    fontWeight: 'bold',
                }}
                >
                {lc.title}
                </Box>
            ))}
            </Box>

            {/*leetcode list*/}
            <Box>
                <Typography variant="body1">Valid Palindrome</Typography>
                <Typography variant="body1">Add Two Numbers</Typography>
                <Typography variant="body1">Longest Substring</Typography>
                <Typography variant="body1">Two Sum</Typography>
                <Typography variant="body1">Longest Substring</Typography>
            </Box>

        </Box>
    );
};

export default LeetDisplay;
