export async function getAISuggestions({ mood, time, age, interests }) {
    const prompt = `Suggest 5 fun, personalized activities for a person who feels "${mood}" and has ${time} available.
  They are aged ${age} and interested in: ${interests.join(", ")}. Keep suggestions short and creative.`;
  

  console.log(prompt,'promptprompt')
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          { role: "system", content: "You are a creative assistant that suggests great ideas." },
          { role: "user", content: prompt }
        ]
      })
    });
  
    const data = await res.json();
    const fullText = data?.choices?.[0]?.message?.content || "";
  
    // ✅ Only extract lines that start with 1., 2., etc.
    const ideas = fullText
      .split("\n")
      .map(line => line.trim())
      .filter(line => /^[1-5]\.\s/.test(line))
      .map(line => line.replace(/^\d+\.\s*/, "").trim());
  
    return ideas; // now a clean array of 5 ideas
  }