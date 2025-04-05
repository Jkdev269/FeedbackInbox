export async function POST() {
    try {
      // Define a list of open-ended questions
      const predefinedQuestions = [
        "What's something new you learned this week?",
        "If you could have dinner with any historical figure, who would it be?",
        "What’s a simple thing that makes you happy?",
        "If you could live in any time period, when would it be?",
        "What’s a hobby you recently started?",
        "What's a dream destination you'd love to visit?",
        "If you could master any skill instantly, what would it be?",
        "What's your favorite way to spend a weekend?",
        "What's the best advice you've ever received?",
        "If you had to describe yourself in three words, what would they be?"
      ];
  
      // Shuffle and pick 3 random questions
      const shuffledQuestions = predefinedQuestions.sort(() => Math.random() - 0.5);
      const selectedQuestions = shuffledQuestions.slice(0, 3).join("||");
  
      // Return the response
      return new Response(
        JSON.stringify({ response: selectedQuestions }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("🚨 Error:", error);
      return new Response(
        JSON.stringify({ error: "Internal Server Error" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  