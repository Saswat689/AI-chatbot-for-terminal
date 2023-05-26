require('dotenv').config()
const prompt = require('prompt-sync')({
    sigint: true
});

const {
    Configuration,
    OpenAIApi
} = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let messages = []

const chat = async (text) => {
    try {
        messages.push({
            role: "user",
            content: text
        })
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
        });
        let res = completion.data.choices[0].message;
        messages.push(res)

        console.log(res.content)

        let input = prompt('> ')
        chat(input)
    } catch (err) {
        console.log("Rate limit reached")
    }
}

console.log('Welcome ! Ask anything and get your answers using AI.')

chat('Hello')