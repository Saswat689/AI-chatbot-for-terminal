Image generators are hot nowadays. AI can generate a completely unique image based on prompt from the user. Several platforms such as DALL-E(chatgpt) have these image models that help them achieve this task.

In this article we are going to build a image generator using openapi and node.js. This can be a great beginner node.js project. Below is the demo for the application:

![application demo](https://i.ibb.co/ryCFG3X/ezgif-4-1581c748fb.gif)

So let's get started:

## Configuring node.js

Let's configure our application and install necessary dependencies. Create an empty folder and write this in your terminal:

	npm init -y

This will initialise package.json with some basic options.

For this project we need express for our api's,openapi library to make requests to gpt4 api and dotenv to store open api secret keys in a different file.

We are using chatgpt api for this project. They have several pre built models we can readily use.

	npm install openapi express dotenv

## Project structure

The project structure will be simple:

* Create a file called index.html at the root
* Create index.js at the root
* Create .env file at the root

## Working on server

Let's start working on our server. We are going to have 2 get routes. One for serving our html file at the home path('/') and another for generating image from prompt using openapi library('/img')

Open up *index.js* and add the following code:

	const express = require('express')
	const app = express()
	require('dotenv').config()
	const path = require('path')

	const { Configuration, OpenAIApi } = require("openai");

	const configuration = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});

	async function getResponse(req,res) {
		const openai = new OpenAIApi(configuration);

		const response = await openai.createImage({
			prompt: req.query.prompt,
			n: 1,
			size: "1024x1024",
		});
		image_url = response.data.data[0].url;

		res.send(image_url)
	}


	app.get('/img',getResponse)

	app.get('/',(req,res) => {
		res.sendFile(path.join(__dirname,'index.html'))
	})

	app.listen(3000,() => console.log('Server active on port 3000'))

In this code we:

* We configure dotenv to access environment variables.
* Serve html file at the root path
* Send ai generated url based on the prompt given in the prompt query parameter in /img get request
* You can get your openapi key from the [openai website](https://platform.openai.com/docs/introduction)
* Create a server that listens on port 3000

Generate your open AI key and add it to *.env* file like this:

	OPENAI_API_KEY=your_key_here

Test this code by running **node index.js** in your terminal. Then go to localhost:3000 you should see a blank html page. Then go to this url localhost:3000/img?prompt=cute%20cat%20pictures

## Creating the UI

Our application now works but it lacks something... Yess an interface !

Let us design the interface for our application. We will be using google fonts and axios(for api requests) as our external packages.

*index.html*

	<!DOCTYPE html>
	<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>AI image generator</title>
		<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Rubik+Wet+Paint&display=swap" rel="stylesheet">
	</head>
	<body>
	<div class="container">
		<h1>AI Image Generator</h1>
		<form onsubmit="renderImage(event)">
			<input type="text" name="prompt" placeholder="Describe any image and AI will generate it for you." id="prompt">
		</form>
		<img src="" alt="ai image" id="target">
		<img src="https://media2.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e4720gtc4wwc32knzr9v6t8pabvs8nyw13d30pno9cd&ep=v1_gifs_search&rid=giphy.gif&ct=g" style="width: 200px; height: auto; margin: 1.4rem auto; display: none;" id="loader">
	</div>


	<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.4.0/axios.min.js" integrity="sha512-uMtXmF28A2Ab/JJO2t/vYhlaa/3ahUOgj1Zf27M5rOo8/+fcTUVH0/E0ll68njmjrLqOBjXM3V9NiPFL5ywWPQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	</body>
	</html>


The markup is pretty simple. We have a single input where the user enters his prompt and a hidden image container where we will display the output image.

We also have a loader. We can control the loader by setting its display property.

We call the **renderImage** function when the user presses enter on the keyboard after entering his prompt.

Let us define renderImage function:

	function renderImage(event) {
			event.preventDefault()
			const prompt = document.getElementById('prompt')
			const target = document.getElementById('target')
			const loader = document.getElementById('loader')

			loader.style.display = "block"

			axios.get('/img?prompt='+prompt.value)
			.then(res => {
				console.log(res.data)
				target.src = res.data
				loader.style.display = "none"
				target.style.display = 'block'
			})
		}

We hit a GET request on /img with our prompt. After getting the response we display our image by setting the src property and hide the loader.	

### Styling the application

We center our container and remove default input styles. Everything else is pretty basic:

	<style type="text/css">
			.container {
				width: 50%;
				margin: 3rem auto;
			}
			.container h1 {
				font-family: 'Rubik Wet Paint', cursive;
				font-size: 2.3rem;
				text-align: center;
				letter-spacing: 4px;
				margin-bottom: 2rem;
				color: #5556b6;
			}
			.container input {
				outline: none;
				padding: 14px;
				border-radius: 10px;
				width: 100%;
				border: 1px solid dimgrey;
			}

			.container input:focus {
				border: 1px solid #5556b6;
			}

			.container img {
				width: 100%;
				height: auto;
				background-size: cover;
				margin-top: 2rem;
				display: none;
			}
		</style>

Open up localhost:3000 and test your application.

That's it you have successfully created a live AI image generator using gpt4 api and node.js. Put this project on your github and shine in the crowd.

[Github respository](https://github.com/Saswat689/AI-Image-generator) for this project

## Gallery

Here are some of the images generated by the application when given suitable prompts

### 1. Prompt: Romantic couple dancing on mars

![ai image](https://i.ibb.co/TrbgdY5/Screenshot-40.png)

### 2. Prompt: Universe spinning on my fingers

![ai image](https://i.ibb.co/Y3ZS1Hr/Screenshot-41.png)

### 3. Prompt: Mountains and waterfalls on alpha centaury

![ai image[(https://i.ibb.co/1RWr28v/Screenshot-42.png)

## Conclusion

In this article we saw how to develop an AI image generator using gpt4 api(open ai). Although creating an ai model could be tough for some people but using existing models aren't so tough after all. I hope you loved it. If you have any further queries feel free to comment below or email me.