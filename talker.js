/*
	This extension will talk to you
	Only ChatGPT answers!
*/

const synth = window.speechSynthesis;

class ChatGPTTalker {
	constructor() {
		this.message_ids = []
	}

	main() {
		console.log("main")
		let answers = document.querySelectorAll('div[data-message-author-role="assistant"]')
		for (let answer of answers) {
			let message_id = answer.getAttribute('data-message-id')
			this.message_ids.push(message_id)
		}
		this.loop()
	}

	loop() {
		this.read_new_texts()
		setTimeout(() => { this.loop() }, 250)
	}

	read_new_texts() {
		let answers = document.querySelectorAll('div[data-message-author-role="assistant"]')
		for (let answer of answers) {
			// get id for answer
			let message_id = answer.getAttribute('data-message-id')
			let message_text = answer.textContent

			if (!this.message_ids.find((str) => str === message_id)) {
				if (!answer.parentElement.parentElement.querySelector('svg')) {
					break;
				}
				try {
					let animation = window.getComputedStyle(
						answer.querySelectorAll('p')[answer.querySelectorAll('p').length - 1],
						':after')
						.getPropertyValue('content')
					if (animation != "none") {
						break;
					}
				} catch (error) {
					break;
				}

				this.talk(message_text)
				this.message_ids.push(message_id)
			}
		}
	}

	talk(input_text) {
		let text = new SpeechSynthesisUtterance(input_text);
		text.lang = navigator.language || navigator.userLanguage;
		text.pitch = 0;
		synth.speak(text);
	}
}

setTimeout(() => {
	chattygpt = new ChatGPTTalker()
	chattygpt.main()
}, 1000)
