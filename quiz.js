const btn = document.getElementById("generateBtn");
const topicInput = document.getElementById("topicInput");
const result = document.getElementById("result");

btn.addEventListener("click", async () => {

    let topic = topicInput.value;

    if(!topic){
        result.innerText = "Please enter a topic.";
        return;
    }

    result.innerText = "Generating question...";

    const API_KEY = "AIzaSyA_Q_7OroXOC6NYy0icgbs-qrEKFF_yG9E";

    const prompt = `Create one simple quiz question and answer about ${topic}.
    Format:
    Question: ...
    Answer: ...`;

    try{

        const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
        {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                contents:[
                    {
                        parts:[{text:prompt}]
                    }
                ]
            })
        });

        const data = await response.json();

        const { candidates } = data;

        const text = candidates[0].content.parts[0].text;

        result.innerText = text;

    }catch(error){

        result.innerText = "Something went wrong.";
        console.error(error);

    }

});
