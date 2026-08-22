import LeetcodeProblem from "./LeetcodeProblem";

function LeetcodeSet() {
    const problems = [
        { name: "Two Sum", difficulty: "Easy", solved: true },
        { name: "Valid Anagram", difficulty: "Easy", solved: true },
        { name: "Valid Parenthesis", difficulty: "Easy", solved: true },
        { name: "Longest Palindrome", difficulty: "Easy", solved: false },
        { name: "Reverse Integer", difficulty: "Medium", solved: true },
        { name: "Linked List Cycle II", difficulty: "Medium", solved: false },
        { name: "Maximun Subarray", difficulty: "Medium", solved: false },
        { name: "Number of Islands", difficulty: "Medium", solved: false },
        { name: "Max Area of Island", difficulty: "Medium", solved: false },
        { name: "Course Schedule", difficulty: "Medium", solved: true },
        { name: "Merge k List", difficulty: "Hard", solved: false },
        { name: "Trapping Rain Water", difficulty: "Hard", solved: false }
    ];

    return (
        <div className="w-full">
            <h2 className="text-4xl font-extralight italic text-center text-neutral-100 mb-8 tracking-wide">
                Leetcode Set
            </h2>
            <div className="flex flex-col gap-1">
                {problems.map((prob, idx) => (
                    <LeetcodeProblem 
                        key={idx}
                        name={prob.name} 
                        difficulty={prob.difficulty} 
                        solved={prob.solved} 
                    />
                ))}
            </div>
        </div>
    );
}

export default LeetcodeSet;